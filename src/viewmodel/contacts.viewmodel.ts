import { Contact } from "@/model/Contact.model"
import { useState } from "react"

export function useContactsViewModel() {
    const [contact, setContact] = useState<Contact>(() => ({
        name: '',
        phone: ''
    }))


    


    return {

    }
}