
import { requireNativeModule } from "expo";
import type { SmsMonitoringConfig, SmsStatus } from "../index";

declare class SmsSenderModuleType {
  isAvailable(): boolean;

  sendSMS(
    phoneNumbers: string[],
    message: string
  ): Promise<SmsStatus>;

  startMonitoring(
    phoneNumbers: string[],
    message: string,
    config: SmsMonitoringConfig
  ): boolean;

  stopMonitoring(): boolean;
}

export default requireNativeModule<SmsSenderModuleType>("SmsSender");
