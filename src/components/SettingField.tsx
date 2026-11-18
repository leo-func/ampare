import { ReactNode } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

type Props = {
    label: string
    icon: ReactNode
    value: string
    unit: string
    hint: string
    error: string
    onChange: (text: string) => void
}

export function SettingField({ label, icon, value, unit, hint, error, onChange }: Props) {
    return (
        <View style={styles.field}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputWrapper}>
                <View style={styles.inputIcon}>{icon}</View>
                <TextInput
                    style={[styles.input, !!error && styles.inputError]}
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChange}
                />
                {!!unit && <Text style={styles.unit}>{unit}</Text>}
            </View>
            <Text style={error ? styles.error : styles.hint}>{error || hint}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    field: {
        gap: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B0A14",
    },
    inputWrapper: {
        justifyContent: "center",
    },
    inputIcon: {
        position: "absolute",
        left: 14,
        zIndex: 1,
    },
    input: {
        height: 48,
        borderWidth: 1.5,
        borderColor: "#E8C9C9",
        borderRadius: 14,
        backgroundColor: "#FFF8F5",
        paddingLeft: 44,
        paddingRight: 80,
        fontSize: 16,
        fontWeight: "600",
        color: "#3A0A10",
    },
    inputError: {
        borderColor: "#B3261E",
    },
    unit: {
        position: "absolute",
        right: 14,
        fontSize: 13,
        color: "#6E4F52",
    },
    hint: {
        fontSize: 12.5,
        color: "#6E4F52",
    },
    error: {
        fontSize: 12.5,
        color: "#B3261E",
        fontWeight: "600",
    },
})