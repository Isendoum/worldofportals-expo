import { Stack, Tabs } from "expo-router";
import { ImageBackground, StyleSheet } from "react-native";
const Tbs = () => {
  return (
    <ImageBackground
      style={{ ...StyleSheet.absoluteFillObject }}
      imageStyle={{ resizeMode: "stretch" }}
      source={require("../../assets/backgrounds/characterStatsBg.png")}>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
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
          name="screen2"
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
      </Stack>
    </ImageBackground>
  );
};

export default Tbs;
