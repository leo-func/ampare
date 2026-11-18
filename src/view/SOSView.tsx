import { AnimatedShield } from "@/components/AnimatedShield";
import { BackgroundShape } from "@/components/BackgroundShape";
import { PulseRings } from "@/components/PulseRings";
import { useSOSViewModel } from "@/viewmodel/sos.viewmodel";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function SOSView({
    monitoring,
    handleStartMonitoring,
    handleStopMonitoring,
}: ReturnType<typeof useSOSViewModel>) {
    return (
        <View style={styles.container}>

            <View style={styles.header}>
                <View style={styles.background}>
                    <BackgroundShape />
                </View>
                
                <Text style={styles.title}>Olá!</Text>
                <Text style={styles.subtitle}>Você não está sozinha.</Text>
            </View>

            <View style={styles.statusContainer}>
                <View
                    style={[
                        styles.dotRing,
                        { backgroundColor: !monitoring ? "#F9CDCF" : "#D3F5CC" },
                    ]}
                >
                    <View
                        style={[
                            styles.dot,
                            { backgroundColor: !monitoring ? "#741016" : "#17c700" },
                        ]}
                    />
                </View>
                <Text style={styles.statusText}>
                    {!monitoring ? "Monitoramento inativo" : "Monitoramento ativo"}
                </Text>
            </View>


            <View style={styles.body}>
                <View style={styles.halo}>
                    <PulseRings active={monitoring} />

                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.85}
                        onPress={!monitoring ? handleStartMonitoring : handleStopMonitoring}
                    >
                        <AnimatedShield size={72} active={monitoring} />

                        {!monitoring && (
                            <Text style={styles.buttonText}>
                                Ativar{"\n"}Monitoramento
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FCEFE8",
    },

    /* header */
    header: {
        height: 190,
        paddingHorizontal: 24,
        paddingTop: 60,
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

    /* status */
    statusContainer: {
        position: "absolute",
        top: 164,
        left: 24,
        height: 40,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "#fff",
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 18,
        shadowColor: "#5E0912",
        shadowOpacity: 0.22,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    dotRing: {
        width: 20,
        height: 20,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    dot: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    statusText: {
        color: "#6B0A14",
        fontSize: 14,
        fontWeight: "600",
    },

    /* corpo */
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 20,
        paddingBottom: 100, // espaço para o menu
    },

    /* botão com halo */
    halo: {
        width: "80%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "75%",
        aspectRatio: 1,
        borderRadius: 999,
        backgroundColor: "#741016",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center",
    },
});