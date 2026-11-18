import { BackgroundShape } from "@/components/BackgroundShape"
import { BellIcon, ClockIcon, SensitivityIcon } from "@/components/FormIcons"
import { SettingField } from "@/components/SettingField"
import { ShieldHeartIcon } from "@/components/Shield"
import { useSettingsViewModel } from "@/viewmodel/settings.viewmodel"
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native"

export function SettingsView({
    config,
    errors,
    canSave,
    loading,
    saving,
    handleChangeSensitivity,
    handleChangeDetectionDuration,
    handleChangeAlertCooldown,
    handleSave,
}: ReturnType<typeof useSettingsViewModel>) {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.background}>
                    <BackgroundShape />
                </View>

                <View style={styles.logoRow}>
                    <ShieldHeartIcon size={26} />
                    <Text style={styles.logo}>ampare</Text>
                </View>
                <Text style={styles.title}>Configurações</Text>
                <Text style={styles.subtitle}>Ajuste a detecção de movimento.</Text>
            </View>

            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.content}
            >
                {!loading && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Detecção de movimento</Text>

                        <SettingField
                            label="Sensibilidade"
                            icon={<SensitivityIcon />}
                            value={config.sensitivity}
                            unit="de 1 a 10"
                            hint="Quanto maior o valor, mais fácil o movimento é detectado."
                            error={errors.sensitivity}
                            onChange={handleChangeSensitivity}
                        />

                        <SettingField
                            label="Duração de detecção"
                            icon={<ClockIcon />}
                            value={config.detectionDuration}
                            unit="ms"
                            hint="Tempo mínimo de movimento contínuo para ser considerado."
                            error={errors.detectionDuration}
                            onChange={handleChangeDetectionDuration}
                        />

                        <SettingField
                            label="Tempo de espera do alerta"
                            icon={<BellIcon />}
                            value={config.alertCooldown}
                            unit="ms"
                            hint="Intervalo mínimo entre um alerta e o próximo."
                            error={errors.alertCooldown}
                            onChange={handleChangeAlertCooldown}
                        />

                        <TouchableOpacity
                            style={[styles.saveButton, (!canSave || saving) && styles.saveButtonDisabled]}
                            activeOpacity={0.85}
                            disabled={!canSave || saving}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>
                                {saving ? "Salvando..." : "Salvar alterações"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCEFE8",
    },

    header: {
        height: 190,
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    logoRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logo: { color: "#fff", fontSize: 22, fontWeight: "600" },
    title: { color: "#fff", fontSize: 32, fontWeight: "700", marginTop: 14 },
    subtitle: { color: "#FCE3E0", fontSize: 15, marginTop: 2 },

    content: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 110,
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 18,
        gap: 16,
        shadowColor: "#6B0A14",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#6B0A14",
    },

    saveButton: {
        height: 50,
        borderRadius: 25,
        backgroundColor: "#7A0C18",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2,
    },
    saveButtonDisabled: {
        opacity: 0.45,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})