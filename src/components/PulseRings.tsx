import { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

type Props = {
    active: boolean;
};

function Wave({ delay }: { delay: number }) {
    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const anim = Animated.sequence([
            Animated.delay(delay),
            Animated.loop(
                Animated.timing(progress, {
                    toValue: 1,
                    duration: 2200,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                })
            ),
        ]);

        anim.start();
        return () => anim.stop();
    }, []);

    const scale = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.75, 1.08],
    });
    const opacity = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0],
    });

    return (
        <Animated.View
            pointerEvents="none"
            style={[styles.wave, { opacity, transform: [{ scale }] }]}
        />
    );
}

export function PulseRings({ active }: Props) {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
            <View style={styles.outer} />
            <View style={styles.mid} />

            {active && (
                <>
                    <Wave delay={0} />
                    <Wave delay={1100} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    outer: {
        ...StyleSheet.absoluteFill,
        borderRadius: 999,
        backgroundColor: "rgba(139,13,26,0.05)",
    },
    mid: {
        position: "absolute",
        top: "6%",
        bottom: "6%",
        left: "6%",
        right: "6%",
        borderRadius: 999,
        backgroundColor: "rgba(139,13,26,0.10)",
    },
    wave: {
        ...StyleSheet.absoluteFill,
        borderRadius: 999,
        backgroundColor: "#8B0D1A",
    },
});