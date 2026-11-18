
import * as Location from "expo-location";
import { useState } from "react";

export function useLocation() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(false);

    async function getCurrentLocation() {
        try {
            setLoading(true);

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                return null;
            }

            const currentLocation = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
            });

            setLocation(currentLocation);

            return currentLocation;
        } catch (error) {
            console.error("Erro ao obter localização:", error);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return {
        location,
        loading,
        getCurrentLocation,
    };
}
