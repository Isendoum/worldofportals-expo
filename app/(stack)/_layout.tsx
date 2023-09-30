import { MapBattleProvider } from "@/context/MapBattleContext";
import { Stack, Tabs } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
const Tbs = () => {
  return (
    <ImageBackground
      style={{ ...StyleSheet.absoluteFillObject }}
      imageStyle={{ resizeMode: "stretch" }}
      source={require("../../assets/backgrounds/characterStatsBg.png")}>
      <MapBattleProvider>
        <Stack initialRouteName="index">
          <Stack.Screen
            name="index"
            options={{
              title: "Main menu",
              headerShown: false,
              // tabBarIcon: () => (
              //   <Ionicons name="airplane" size={24} color="black" />
              // ),
            }}
          />
          <Stack.Screen
            name="map"
            options={{
              title: "Map",
              headerShown: false,
              // tabBarIcon: () => (
              //   <Ionicons name="airplane" size={24} color="black" />
              // ),
            }}
          />
          <Stack.Screen
            name="skillShop"
            options={{
              title: "Portal",
              headerShown: false,
              // tabBarIcon: () => (
              //   <Ionicons name="aperture" size={24} color="black" />
              // ),
            }}
          />
          <Stack.Screen
            name="battle"
            options={{
              title: "Battle",
              headerShown: false,
              // tabBarIcon: () => (
              //   <Ionicons name="aperture" size={24} color="black" />
              // ),
            }}
          />
          <Stack.Screen
            name="create"
            options={{
              title: "Create Character",
              headerShown: false,
              // tabBarIcon: () => (
              //   <Ionicons name="aperture" size={24} color="black" />
              // ),
            }}
          />
        </Stack>
      </MapBattleProvider>
    </ImageBackground>
  );
};

export default Tbs;
