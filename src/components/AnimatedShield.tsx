import { ShieldHeartIcon } from "@/components/Shield";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type Props = {
    size: number;
    active: boolean;
};

export function AnimatedShield({ size, active }: Props) {
    const scale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (!active) {
            scale.setValue(1); // volta ao normal
            return;
        }

        const loop = Animated.loop(
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.15,           // cresce 15%
                    duration: 600,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,              // volta
                    duration: 600,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        );

        loop.start();
        return () => loop.stop(); // para a animação ao desligar ou sair da tela
    }, [active]);

    return (
        <Animated.View style={{ transform: [{ scale }] }}>
            <ShieldHeartIcon size={size} />
        </Animated.View>
    );
}