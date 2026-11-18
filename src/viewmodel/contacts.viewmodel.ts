import { Contact } from "@/model/Contact.model"
import { getContacts, saveContacts } from "@/services/storage.service"
import { formatPhone } from "@/utils/formatPhone"
import { useEffect, useState } from "react"

export function useContactsViewModel() {
    const [contact, setContact] = useState<Contact>(() => ({
        name: "",
        phone: "",
    }))
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function load() {
            try {
                const saved = await getContacts()
                setContacts(saved)
            } catch (error) {
                console.error("Erro ao carregar contatos:", error)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    const canAdd = contact.name.trim().length > 0 && contact.phone.replace(/\D/g, "").length >= 10

    function handleChangeName(name: string) {
        setContact((prev) => ({ ...prev, name }))
    }

    function handleChangePhone(text: string) {
        setContact((prev) => ({ ...prev, phone: formatPhone(text) }))
    }

    async function handleAddContact() {
        if (!canAdd) return
        if (contacts.some((c) => c.phone === contact.phone)) return

        const next = [...contacts, { name: contact.name.trim(), phone: contact.phone }]

        try {
            await saveContacts(next)
            setContacts(next)
            setContact({ name: "", phone: "" })
        } catch (error) {
            console.error("Erro ao salvar contato:", error)
        }
    }

    async function handleRemoveContact(phone: string) {
        const next = contacts.filter((c) => c.phone !== phone)

        try {
            await saveContacts(next)
            setContacts(next)
        } catch (error) {
            console.error("Erro ao remover contato:", error)
        }
    }

    return {
        contact,
        contacts,
        canAdd,
        loading,
        handleChangeName,
        handleChangePhone,
        handleAddContact,
        handleRemoveContact,
    }
}