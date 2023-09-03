import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import { useRouter } from "expo-router";
import { View } from "react-native";

const Screen4 = () => {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
      <AppText style={{ textAlign: "center", fontSize: 20 }}>Other</AppText>
      <AppButton title="go home" onPress={() => router.push("/")} />
    </View>
  );
};

export default Screen4;
