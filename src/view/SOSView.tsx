import { useSOSViewModel } from "@/viewmodel/sos.viewmodel";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native"


export function SOSView({
    setContact,
    setConfig,
    monitoring,
    handleStartMonitoring,
    handleStopMonitoring,
    loading
}: ReturnType<typeof useSOSViewModel>) {
    return (
        <View style={styles.container}>
            <View>
                <Text>ampare</Text>
                <Text>Olá!</Text>
                <Text>Você não está sozinha.</Text>
            </View>

            <View style={{alignItems: "center"}}>
                <TouchableOpacity
                style={styles.button}
                onPress={!monitoring ? handleStartMonitoring : handleStopMonitoring}
                >
                    
                    <Image 
                    source={{uri: 'https://www.shutterstock.com/shutterstock/photos/2731415297/display_1500/stock-vector-number-with-hands-gesture-vector-illustration-2731415297.jpg'}}
                    style={{width: 128, height: 128}}
                    resizeMode="contain"
                    >
                    </Image>

                    <Text>{!monitoring ? "Ativar monitoramento" : "Desativar monitoramento"}</Text>
                </TouchableOpacity>

                <View>
                    <Text> {!monitoring ? "Monitoramento inativo" : "Monitoramento ativo"}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    button: {
        backgroundColor: "#741016",
        
    }
})