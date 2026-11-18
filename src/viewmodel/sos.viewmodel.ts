
import { Config } from "@/model/Config.model";
import { Contact } from "@/model/Contact.model";
import { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform } from "react-native";
import smsSender from "../../modules/sms-sender";

import {
  getConfig,
  getContacts,
  saveConfig,
} from "@/services/storage.service";

import { useLocation } from "@/hooks/useLocation";

export function useSOSViewModel() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const [config, setConfig] = useState<Config>({
    sensitivity: "1",
    detectionDuration: "100",
    alertCooldown: "2000",
  });

  const [loading, setLoading] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getCurrentLocation } = useLocation();

  useEffect(() => {
    async function loadData() {
      try {
        const [savedContacts, savedConfig] = await Promise.all([
          getContacts(),
          getConfig(),
        ]);

        setContacts(savedContacts);
        setConfig(savedConfig);
      } catch (error: any) {
        Alert.alert("Erro", error?.message ?? String(error));
      } finally {
        setDataLoaded(true);
      }
    }

    loadData();
  }, []);

  async function ensureSmsPermission(): Promise<boolean> {
    if (Platform.OS !== "android") return false;

    const permission = PermissionsAndroid.PERMISSIONS.SEND_SMS;
    const already = await PermissionsAndroid.check(permission);

    if (already) return true;

    const result = await PermissionsAndroid.request(permission);

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  async function ensureNotificationPermission(): Promise<boolean> {
    if (Platform.OS !== "android") return false;

    const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS;
    const already = await PermissionsAndroid.check(permission);

    if (already) return true;

    const result = await PermissionsAndroid.request(permission);

    return result === PermissionsAndroid.RESULTS.GRANTED;
  }

  function validateFields(): boolean {
    if (contacts.length === 0) return false;

    const phoneNumbers = contacts
      .map((contact) => contact.phone.trim())
      .filter((phone) => phone.length > 0);

    if (phoneNumbers.length === 0) return false;

    if (!smsSender.isAvailable()) return false;

    return true;
  }

  function validateConfig(): boolean {
    const sensitivityValue = Number(config.sensitivity);
    const detectionValue = Number(config.detectionDuration);
    const cooldownValue = Number(config.alertCooldown);

    if (
      !Number.isInteger(sensitivityValue) ||
      sensitivityValue < 1 ||
      sensitivityValue > 10
    ) return false;

    if (
      !Number.isInteger(detectionValue) ||
      detectionValue < 100 ||
      detectionValue > 5000
    ) return false;

    if (
      !Number.isInteger(cooldownValue) ||
      cooldownValue < 0 ||
      cooldownValue > 3600000
    ) return false;

    return true;
  }

  async function handleStartMonitoring() {
    if (!dataLoaded) return;

    if (!validateFields()) {
      Alert.alert(
        "Atenção",
        "Cadastre pelo menos um contato com número de telefone válido."
      );
      return;
    }

    if (!validateConfig()) {
      Alert.alert("Atenção", "Verifique as configurações de monitoramento.");
      return;
    }

    try {
      setLoading(true);

      const smsGranted = await ensureSmsPermission();

      if (!smsGranted) {
        Alert.alert("Permissão necessária", "Permita o envio de SMS.");
        return;
      }

      const notificationGranted = await ensureNotificationPermission();

      if (!notificationGranted) {
        Alert.alert("Permissão necessária", "Permita o envio de notificações.");
        return;
      }

      // Obtém a localização atual
      const currentLocation = await getCurrentLocation();

      if (!currentLocation) {
        Alert.alert(
          "Localização indisponível",
          "Não foi possível obter sua localização. Verifique a permissão e o GPS."
        );
        return;
      }

      const { latitude, longitude } = currentLocation.coords;

      const message =
        `EMERGÊNCIA! Preciso de ajuda!\n\n` +
        `Minha localização:\n` +
        `Latitude: ${latitude}\n` +
        `Longitude: ${longitude}\n\n` +
        `Ver localização no Google Maps:\n` +
        `https://www.google.com/maps?q=${latitude},${longitude}`;

      const phoneNumbers = contacts
        .map((contact) => contact.phone.trim())
        .filter((phone) => phone.length > 0);

      await saveConfig(config);

      smsSender.startMonitoring(
        phoneNumbers,
        message,
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
    contacts,
    config,
    setConfig,
    monitoring,
    handleStartMonitoring,
    handleStopMonitoring,
    loading,
    dataLoaded,
  };
}
