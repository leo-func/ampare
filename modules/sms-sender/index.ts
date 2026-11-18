
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
    phoneNumbers: string[],
    message: string
  ): Promise<SmsStatus> {
    return SmsSenderModule.sendSMS(phoneNumbers, message);
  },

  startMonitoring(
    phoneNumbers: string[],
    message: string,
    config: SmsMonitoringConfig
  ): boolean {
    return SmsSenderModule.startMonitoring(
      phoneNumbers,
      message,
      config
    );
  },

  stopMonitoring(): boolean {
    return SmsSenderModule.stopMonitoring();
  },
};
