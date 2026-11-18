import { HomeIcon, SettingsIcon, UsersIcon } from "@/components/MenuIcons";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BottomMenu({
    pathname
} : {pathname: string}) {
    const transformX = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.parallel([
                Animated.timing(transformX, {
                    toValue: pathname === '/' 
                    ? 0 
                    : pathname === '/contacts'
                        ? 110
                        : 220,
                    duration: 200,
                    useNativeDriver: false
                })
        ]).start()
    }, [pathname])

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { bottom: insets.bottom + 16 }]}>

            <TouchableOpacity onPress={() => router.push('/')} style={styles.item}>
                <HomeIcon size={24} color="#fff" filled={pathname ? pathname == '/' : false}/>
                <Text style={[styles.label, styles.labelActive]}>Início</Text>
                <Animated.View style={[styles.underline, {transform: [{translateX: transformX}]}]} />
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity onPress={() => router.push('/contacts')} style={styles.item}>
                <UsersIcon size={24} color="#FCE3E0" filled={pathname ? pathname == '/contacts' : false}/>
                <Text style={styles.label}>Contatos</Text>
            </TouchableOpacity>

            <View style={styles.separator} />

            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.item}>
                <SettingsIcon size={24} color="#FCE3E0" filled={pathname ? pathname == '/settings' : false}/>
                <Text style={styles.label}>Configurações</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 16,
        right: 16,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#5E0912",
        flexDirection: "row",
        paddingHorizontal: 6,
    },
    item: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    separator: {
        width: 1,
        backgroundColor: "rgba(255,255,255,0.25)",
        marginVertical: 16,
    },
    label: {
        color: "#FCE3E0",
        fontSize: 12,
        fontWeight: "500",
    },
    labelActive: {
        color: "#fff",
        fontWeight: "700",
    },
    underline: {
        position: "absolute",
        bottom: 7,
        width: 44,
        height: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
    },
});