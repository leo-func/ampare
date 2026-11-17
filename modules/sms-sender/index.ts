
import SmsSenderModule from "./src/SmsSenderModule";

export type SmsStatus = "sent" | "cancelled" | "failed";

export type SmsMonitoringConfig = {
  sensitivity: number;
  detectionDuration: number;
  alertCooldown: number;
};

export default {
  isAvailable(): boolean {
    return SmsSenderModule.isAvailable();
  },

  sendSMS(
    phoneNumber: string,
    message: string
  ): Promise<SmsStatus> {
    return SmsSenderModule.sendSMS(phoneNumber, message);
  },

  startMonitoring(
    phoneNumber: string,
    message: string,
    config: SmsMonitoringConfig
  ): boolean {
    return SmsSenderModule.startMonitoring(
      phoneNumber,
      message,
      config
    );
  },

  stopMonitoring(): boolean {
    return SmsSenderModule.stopMonitoring();
  },
};
