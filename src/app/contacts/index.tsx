import { ContactsView } from "@/view/ContactsView"
import { useContactsViewModel } from "@/viewmodel/contacts.viewmodel"

export default function ContactScreen() {
  const model = useContactsViewModel()

  return (
    <ContactsView {...model}/>
  )
}
