import { Config } from "@/model/Config.model"
import { defaultConfig, getConfig, saveConfig } from "@/services/storage.service"
import { onlyDigits } from "@/utils/onlyDigits"
import { rangeError } from "@/utils/rangeError"
import { useEffect, useState } from "react"
import { Alert } from "react-native"

export function useSettingsViewModel() {
    const [config, setConfig] = useState<Config>(defaultConfig)
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        async function load() {
            try {
                const saved = await getConfig()
                setConfig(saved)
            } catch (error) {
                console.error("Erro ao carregar configurações:", error)
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [])

    const errors = {
        sensitivity: rangeError(config.sensitivity, 1, 10, ""),
        detectionDuration: rangeError(config.detectionDuration, 100, 5000, " ms"),
        alertCooldown: rangeError(config.alertCooldown, 0, 3600000, " ms"),
    }

    const canSave =
        !errors.sensitivity &&
        !errors.detectionDuration &&
        !errors.alertCooldown

    function handleChangeSensitivity(text: string) {
        setConfig((prev) => ({...prev, sensitivity: onlyDigits(text)}))
    }

    function handleChangeDetectionDuration(text: string) {
        setConfig((prev) => ({...prev, detectionDuration: onlyDigits(text)}))
    }

    function handleChangeAlertCooldown(text: string) {
        setConfig((prev) => ({...prev, alertCooldown: onlyDigits(text)}))
    }

    async function handleSave() {
        if (!canSave) return

        try {
            setSaving(true)
            await saveConfig(config)
            Alert.alert("Pronto", "Configurações salvas.")
        } catch (error: any) {
            Alert.alert("Erro", error?.message ?? String(error))
        } finally {
            setSaving(false)
        }
    }

    return {
        config,
        errors,
        canSave,
        loading,
        saving,
        handleChangeSensitivity,
        handleChangeDetectionDuration,
        handleChangeAlertCooldown,
        handleSave,
    }
}