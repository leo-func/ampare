import { Config } from "@/model/Config.model";
import { EmergencyContact } from "@/model/EmergencyContact.model";
import { useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import smsSender from "../../modules/sms-sender";


export function useSOSViewModel() {
    const [contact, setContact] = useState<EmergencyContact>(() => ({
        phone: '75981180393',
        message: '6777',
    }))

    const [config, setConfig] = useState<Config>(() => ({
        sensitivity: '1',
        detectionDuration: '100',
        alertCooldown: '2000'
    }))

    const [loading, setLoading] = useState(false);
    const [monitoring, setMonitoring] = useState(false);


    async function ensureSmsPermission(): Promise<boolean> {
        if (Platform.OS !== 'android') return false;

        const permission = PermissionsAndroid.PERMISSIONS.SEND_SMS;
        const already = await PermissionsAndroid.check(permission);
        if (already) return true;

        const result = await PermissionsAndroid.request(permission);
        return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    
    async function ensureNotificationPermission(): Promise<boolean> {
        if (Platform.OS !== 'android') return false

        const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        const already = await PermissionsAndroid.check(permission)

        if (already) return true

        const result = await PermissionsAndroid.request(permission)
        return result === PermissionsAndroid.RESULTS.GRANTED
    }


  function validateFields(): boolean {
    if (!contact.phone.trim() || !contact.message.trim()) {
      return false;
    }

    if (!smsSender.isAvailable()) {
      return false;
    }

    return true;
  }

  function validateConfig(): boolean {
    const sensitivityValue = Number(config.sensitivity);
    const detectionValue = Number(config.detectionDuration);
    const cooldownValue = Number(config.alertCooldown);

    if (!Number.isInteger(sensitivityValue) ||sensitivityValue < 1 ||sensitivityValue > 10) return false

    if (!Number.isInteger(detectionValue) || detectionValue < 100 || detectionValue > 5000) return false

    if (!Number.isInteger(cooldownValue) || cooldownValue < 0 || cooldownValue > 3600000) return false

    return true;
  }

  async function handleStartMonitoring() {
    if (!validateFields() || !validateConfig()) return;

    try {
      setLoading(true);

      const smsGranted = await ensureSmsPermission();

      if (!smsGranted) {
        return;
      }


      const notificationGranted = await ensureNotificationPermission();

      if (!notificationGranted) {
        return;
      }

      smsSender.startMonitoring(
        contact.phone.trim(),
        contact.message.trim(),
        {
          sensitivity: Number(config.sensitivity),
          detectionDuration: Number(config.detectionDuration),
          alertCooldown: Number(config.alertCooldown),
        }
      );

      setMonitoring(true);
    } catch (error: any) {
      Alert.alert("Erro", error?.message ?? String(error));
    } finally {
      setLoading(false);
    }
  }

  function handleStopMonitoring() {
    try {
      smsSender.stopMonitoring();
      setMonitoring(false);
    } catch (error: any) {
      Alert.alert("Erro", error?.message ?? String(error));
    }
  }

  return {
    setContact,
    setConfig,
    monitoring,
    handleStartMonitoring,
    handleStopMonitoring,
    loading
  }
}