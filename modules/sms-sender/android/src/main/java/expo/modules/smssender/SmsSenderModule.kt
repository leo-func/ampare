
package expo.modules.smssender

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.telephony.SmsManager
import androidx.core.content.ContextCompat
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SmsSenderModule : Module() {

    override fun definition() = ModuleDefinition {

        Name("SmsSender")

        Function("isAvailable") {
            val context = appContext.reactContext
                ?: return@Function false

            context.packageManager.hasSystemFeature(
                "android.hardware.telephony"
            )
        }

        AsyncFunction("sendSMS") {
            phoneNumbers: List<String>,
            message: String ->

            val context = appContext.reactContext
                ?: throw CodedException(
                    "E_CONTEXT",
                    "Contexto indisponível",
                    null
                )

            if (
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.SEND_SMS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                throw CodedException(
                    "E_PERMISSION",
                    "Permissão SEND_SMS não concedida",
                    null
                )
            }

            val validNumbers = phoneNumbers.filter { it.isNotBlank() }

            if (validNumbers.isEmpty()) {
                return@AsyncFunction "failed"
            }

            var failed = false

            try {
                val smsManager =
                    if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                        context.getSystemService(SmsManager::class.java)
                    } else {
                        @Suppress("DEPRECATION")
                        SmsManager.getDefault()
                    }

                val parts = smsManager.divideMessage(message)

                for (phoneNumber in validNumbers) {
                    try {
                        if (parts.size > 1) {
                            smsManager.sendMultipartTextMessage(
                                phoneNumber,
                                null,
                                parts,
                                null,
                                null
                            )
                        } else {
                            smsManager.sendTextMessage(
                                phoneNumber,
                                null,
                                message,
                                null,
                                null
                            )
                        }
                    } catch (error: Exception) {
                        failed = true
                        error.printStackTrace()
                    }
                }

                if (failed) "failed" else "sent"

            } catch (error: Exception) {
                error.printStackTrace()
                "failed"
            }
        }

        Function("startMonitoring") {
            phoneNumbers: List<String>,
            message: String,
            config: Map<String, Any?> ->

            val context = appContext.reactContext
                ?: throw CodedException(
                    "E_CONTEXT",
                    "Contexto indisponível",
                    null
                )

            if (
                ContextCompat.checkSelfPermission(
                    context,
                    Manifest.permission.SEND_SMS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                throw CodedException(
                    "E_PERMISSION",
                    "Permissão SEND_SMS não concedida",
                    null
                )
            }

            val validNumbers = phoneNumbers.filter { it.isNotBlank() }

            if (validNumbers.isEmpty()) {
                throw CodedException(
                    "E_RECIPIENTS",
                    "Nenhum destinatário informado",
                    null
                )
            }

            val sensitivity = (
                (config["sensitivity"] as? Number)?.toInt() ?: 5
            ).coerceIn(1, 10)

            val detectionDuration = (
                (config["detectionDuration"] as? Number)?.toLong() ?: 500L
            ).coerceIn(100L, 5000L)

            val alertCooldown = (
                (config["alertCooldown"] as? Number)?.toLong() ?: 60_000L
            ).coerceIn(0L, 3_600_000L)

            val intent = Intent(
                context,
                SmsMonitorService::class.java
            ).apply {
                putStringArrayListExtra(
                    SmsMonitorService.EXTRA_PHONES,
                    ArrayList(validNumbers)
                )

                putExtra(SmsMonitorService.EXTRA_MESSAGE, message)
                putExtra(SmsMonitorService.EXTRA_SENSITIVITY, sensitivity)
                putExtra(
                    SmsMonitorService.EXTRA_DETECTION_DURATION,
                    detectionDuration
                )
                putExtra(
                    SmsMonitorService.EXTRA_ALERT_COOLDOWN,
                    alertCooldown
                )
            }

            ContextCompat.startForegroundService(context, intent)

            true
        }

        Function("stopMonitoring") {
            val context = appContext.reactContext
                ?: throw CodedException(
                    "E_CONTEXT",
                    "Contexto indisponível",
                    null
                )

            context.stopService(
                Intent(context, SmsMonitorService::class.java)
            )

            true
        }
    }
}
