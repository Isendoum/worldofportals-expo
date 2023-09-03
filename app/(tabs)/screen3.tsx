import AppText from "@/components/AppText";
import { useRouter } from "expo-router";
import { Switch, View } from "react-native";

import { Appearance } from "react-native";
import { useColorScheme } from "react-native";

export default function Screen3() {
  let colorScheme = useColorScheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 25,
      }}>
      <AppText>General</AppText>
      <View
        style={{
          alignItems: "center",
          // backgroundColor: "brown",
          padding: 10,
          justifyContent: "space-around",
          flexDirection: "row",
          marginTop: 25,
          width: "100%",
        }}>
        <AppText>Switch theme</AppText>
        <Switch
          value={colorScheme === "dark" ? true : false}
          onChange={() =>
            Appearance.setColorScheme(colorScheme === "dark" ? "light" : "dark")
          }
        />
      </View>
    </View>
  );
}
