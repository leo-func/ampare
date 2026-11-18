import { SettingsView } from "@/view/SettingsView"
import { useSettingsViewModel } from "@/viewmodel/settings.viewmodel"

export default function SettingsScreen() {
  const model = useSettingsViewModel()

  return (
    <SettingsView {...model}/>
  )
}
