import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useRouter } from "expo-router";
import { Text, View, Button } from "react-native";

export default function Screen2() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <AppText>Enya</AppText>
      <AppButton title="go home" onPress={() => router.push("/")} />
    </View>
  );
}
