import { BottomMenu } from "@/components/Menu";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <View style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <BottomMenu/>
    </View>
  );
}
