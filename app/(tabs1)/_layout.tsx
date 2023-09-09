import AppButton from "@/components/AppButton";
import AppIcon from "@/components/AppIcon";
import { Tabs, useRouter } from "expo-router";
import { Button, ImageBackground, StyleSheet } from "react-native";

const Tbs = () => {
  const router = useRouter();
  return (
    <ImageBackground
      style={{ ...StyleSheet.absoluteFillObject }}
      imageStyle={{ resizeMode: "stretch" }}
      source={require("../../assets/backgrounds/characterStatsBg.png")}>
      <AppButton title="<-" onPress={() => router.back()} />
      <Tabs>
        <Tabs.Screen
          name="statistics"
          options={{
            title: "Statistics",
            headerShown: false,
            tabBarIcon: () => <AppIcon name="stats-chart" size={24} />,
          }}
        />
        <Tabs.Screen
          name="gear"
          options={{
            title: "Gear",
            headerShown: false,
            tabBarIcon: () => <AppIcon name="body" size={24} />,
          }}
        />
        <Tabs.Screen
          name="skills"
          options={{
            title: "Skills",
            headerShown: false,
            tabBarIcon: () => <AppIcon name="man" size={24} />,
          }}
        />
        <Tabs.Screen
          name="inventory"
          options={{
            title: "Inventory",
            headerShown: false,
            tabBarIcon: () => <AppIcon name="cube" size={24} />,
          }}
        />
      </Tabs>
    </ImageBackground>
  );
};

export default Tbs;
