import { BottomMenu } from "@/components/Menu";
import { Stack, usePathname } from "expo-router";

export default function RootLayout() {
  const pathname = usePathname();

  return (
    <>
      <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      <BottomMenu pathname={pathname}/>
    </>
  );
}
