import { ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { StatusBar, View, useColorScheme } from "react-native";
import AppDarkTheme from "../theme/AppDarkTheme";
import AppDefaultTheme from "../theme/AppDefaultTheme";
import AppIcon from "@/components/AppIcon";
import AppText from "@/components/AppText";
import { ModalProvider } from "@/context/ModalContext";
import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import React from "react";
import {
  PlayerCharacterProvider,
  usePlayerCharacter,
} from "@/context/PlayerContext";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useEvent } from "react-native-reanimated";
import { TimerProvider } from "@/context/TimerContext";

export default function AppLayout() {
  const [isReady, setReady] = React.useState(false);
  const [playerExists, setPlayerExists] = React.useState(false);
  const [playerCharacter] = usePlayerCharacter();
  const a = useAsyncStorage("playerCharacter");

  const [fontsLoaded] = useFonts({
    BruntsfieldCFBlackRegular: require("../assets/BruntsfieldCFBlackRegular.otf"),
  });
  const [fontsLoaded2] = useFonts({
    RomanAntique: require("../assets/RomanAntique.ttf"),
  });
  const [fontsLoaded3] = useFonts({
    FFFTusj: require("../assets/FFFTusj.ttf"),
  });
  const [fontsLoaded4] = useFonts({
    GranthamRoman: require("../assets/GranthamRoman.ttf"),
  });
  let colorScheme = useColorScheme();
  SplashScreen.preventAutoHideAsync();

  React.useEffect(() => {
    if (fontsLoaded && fontsLoaded2 && fontsLoaded3 && fontsLoaded4) {
      setTimeout(() => {
        // When all loading is setup, unmount the splash screen component.
        SplashScreen.hideAsync();
        // setReady(true);
      }, 3000);
    }
  }, [fontsLoaded, fontsLoaded2, fontsLoaded3, fontsLoaded4]);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? AppDarkTheme : AppDefaultTheme}>
      <StatusBar animated barStyle="light-content" />
      <PlayerCharacterProvider>
        <TimerProvider>
          <ModalProvider>
            <Drawer
              initialRouteName="(stack)"
              screenOptions={({ navigation }) => ({
                headerShown: false,
                sceneContainerStyle: {
                  paddingTop: 20,
                  backgroundColor: "grey",
                },
                // header: (props) => <View></View>,
                // headerLeft: (props) => (
                //   <View {...props}>
                //     <TouchableOpacity onPress={navigation.toggleDrawer}>
                //       <AppIcon name="menu" size={36} />
                //     </TouchableOpacity>
                //   </View>
                // ),
              })}>
              <Drawer.Screen
                name="(stack)"
                options={{
                  title: "Home",
                  //   headerShown: false,
                  // icon for menu item of drawer
                  // drawerIcon: (props) => {
                  //   return (
                  //     <View {...props}>
                  //       <Text>O</Text>
                  //     </View>
                  //   );
                  // },
                  headerTitle: (props) => (
                    <View>
                      <AppText>Header for all stacks</AppText>
                    </View>
                  ),
                }}
              />
              <Drawer.Screen
                name="(tabs1)"
                options={{
                  title: "Character",
                }}
              />
            </Drawer>
          </ModalProvider>
        </TimerProvider>
      </PlayerCharacterProvider>
    </ThemeProvider>
  );
}
