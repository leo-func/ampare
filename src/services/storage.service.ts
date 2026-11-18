import { Config } from "@/model/Config.model"
import { Contact } from "@/model/Contact.model"
import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY = "@ampare:contacts"
const CONFIG_KEY = "@ampare:config"

export async function getContacts(): Promise<Contact[]> {
    const json = await AsyncStorage.getItem(KEY)
    return json ? JSON.parse(json) : []
}

export async function saveContacts(contacts: Contact[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(contacts))
}

export const defaultConfig: Config = {
    sensitivity: "1",
    detectionDuration: "100",
    alertCooldown: "2000",
}

export async function getConfig(): Promise<Config> {
    const json = await AsyncStorage.getItem(CONFIG_KEY)
    return json ? { ...defaultConfig, ...JSON.parse(json) } : defaultConfig
}

export async function saveConfig(config: Config) {
    await AsyncStorage.setItem(CONFIG_KEY, JSON.stringify(config))
}