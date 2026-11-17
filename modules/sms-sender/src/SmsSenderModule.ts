
import { requireNativeModule } from "expo";
import type { SmsStatus, SmsMonitoringConfig } from "../index";

declare class SmsSenderModuleType {
  isAvailable(): boolean;

  sendSMS(
    phoneNumber: string,
    message: string
  ): Promise<SmsStatus>;

  startMonitoring(
    phoneNumber: string,
    message: string,
    config: SmsMonitoringConfig
  ): boolean;

  stopMonitoring(): boolean;
}

export default requireNativeModule<SmsSenderModuleType>("SmsSender");
