
package expo.modules.smssender

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.Service
import android.content.Intent
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Build
import android.os.IBinder
import android.telephony.SmsManager
import androidx.core.app.NotificationCompat
import kotlin.math.sqrt

class SmsMonitorService : Service(), SensorEventListener {

    companion object {
        const val CHANNEL_ID = "sos_monitor_channel"
        const val NOTIFICATION_ID = 1001

        const val EXTRA_PHONE = "phone"
        const val EXTRA_MESSAGE = "message"
        const val EXTRA_SENSITIVITY = "sensitivity"
        const val EXTRA_DETECTION_DURATION = "detectionDuration"
        const val EXTRA_ALERT_COOLDOWN = "alertCooldown"
    }

    private lateinit var sensorManager: SensorManager
    private var accelerometer: Sensor? = null

    private var phone = ""
    private var message = ""

    private var sensitivity = 5
    private var detectionDuration = 500L
    private var alertCooldown = 60_000L

    private var shakeThreshold = 9.0

    private var gravityX = 0f
    private var gravityY = 0f
    private var gravityZ = 0f
    private var gravityInitialized = false

    private var activeDuration = 0L
    private var lastAboveThreshold = 0L
    private var lastAlertTime = 0L

    override fun onCreate() {
        super.onCreate()

        sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)

        createNotificationChannel()
    }

    override fun onStartCommand(
        intent: Intent?,
        flags: Int,
        startId: Int
    ): Int {

        phone = intent?.getStringExtra(EXTRA_PHONE).orEmpty()
        message = intent?.getStringExtra(EXTRA_MESSAGE).orEmpty()

        sensitivity = (intent?.getIntExtra(
            EXTRA_SENSITIVITY,
            5
        ) ?: 5).coerceIn(1, 10)

        detectionDuration = (intent?.getLongExtra(
            EXTRA_DETECTION_DURATION,
            500L
        ) ?: 500L).coerceIn(100L, 5000L)

        alertCooldown = (intent?.getLongExtra(
            EXTRA_ALERT_COOLDOWN,
            60_000L
        ) ?: 60_000L).coerceIn(0L, 3_600_000L)

        configureSensitivity()

        if (phone.isBlank() || message.isBlank() || accelerometer == null) {
            stopSelf()
            return START_NOT_STICKY
        }

        startForeground(NOTIFICATION_ID, createNotification())

        resetDetection()

        sensorManager.unregisterListener(this)

        sensorManager.registerListener(
            this,
            accelerometer,
            SensorManager.SENSOR_DELAY_GAME
        )

        return START_NOT_STICKY
    }

    private fun configureSensitivity() {
        // 1 = mais sensível
        // 10 = menos sensível
        shakeThreshold = 5.0 + ((sensitivity - 1) * 1.0)
    }

    override fun onSensorChanged(event: SensorEvent?) {
        if (event == null) return

        val alpha = 0.8f

        if (!gravityInitialized) {
            gravityX = event.values[0]
            gravityY = event.values[1]
            gravityZ = event.values[2]
            gravityInitialized = true
            return
        }

        gravityX = alpha * gravityX + (1 - alpha) * event.values[0]
        gravityY = alpha * gravityY + (1 - alpha) * event.values[1]
        gravityZ = alpha * gravityZ + (1 - alpha) * event.values[2]

        val x = event.values[0] - gravityX
        val y = event.values[1] - gravityY
        val z = event.values[2] - gravityZ

        val acceleration = sqrt(
            (x * x + y * y + z * z).toDouble()
        )

        val now = System.currentTimeMillis()

        if (acceleration >= shakeThreshold) {

            if (
                lastAboveThreshold == 0L ||
                now - lastAboveThreshold > 250L
            ) {
                activeDuration = 0L
            } else {
                activeDuration += now - lastAboveThreshold
            }

            lastAboveThreshold = now

            if (activeDuration >= detectionDuration) {
                if (
                    lastAlertTime == 0L ||
                    now - lastAlertTime >= alertCooldown
                ) {
                    sendEmergencySMS()
                    lastAlertTime = now
                }

                resetDetection()
            }

        } else if (
            lastAboveThreshold != 0L &&
            now - lastAboveThreshold > 250L
        ) {
            resetDetection()
        }
    }

    private fun sendEmergencySMS() {
        try {
            val smsManager = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                getSystemService(SmsManager::class.java)
            } else {
                @Suppress("DEPRECATION")
                SmsManager.getDefault()
            }

            val parts = smsManager.divideMessage(message)

            if (parts.size > 1) {
                smsManager.sendMultipartTextMessage(
                    phone,
                    null,
                    parts,
                    null,
                    null
                )
            } else {
                smsManager.sendTextMessage(
                    phone,
                    null,
                    message,
                    null,
                    null
                )
            }

        } catch (error: Exception) {
            error.printStackTrace()
        }
    }

    private fun resetDetection() {
        activeDuration = 0L
        lastAboveThreshold = 0L
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val channel = NotificationChannel(
                CHANNEL_ID,
                "Monitoramento SOS",
                NotificationManager.IMPORTANCE_LOW
            )

            val manager = getSystemService(NotificationManager::class.java)
            manager.createNotificationChannel(channel)
        }
    }

    private fun createNotification(): Notification {
        return NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("SOS Mulher ativo")
            .setContentText("Monitorando movimentos de emergência")
            .setSmallIcon(android.R.drawable.ic_dialog_alert)
            .setOngoing(true)
            .build()
    }

    override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {}

    override fun onDestroy() {
        sensorManager.unregisterListener(this)
        super.onDestroy()
    }

    override fun onBind(intent: Intent?): IBinder? = null
}
