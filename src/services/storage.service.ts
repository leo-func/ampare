import { Contact } from "@/model/Contact.model"
import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY = "@ampare:contacts"

export async function getContacts(): Promise<Contact[]> {
    const json = await AsyncStorage.getItem(KEY)
    return json ? JSON.parse(json) : []
}

export async function saveContacts(contacts: Contact[]) {
    await AsyncStorage.setItem(KEY, JSON.stringify(contacts))
}