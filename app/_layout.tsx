import { ThemeProvider } from "@react-navigation/native";
import { Drawer } from "expo-router/drawer";
import { View, useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppDarkTheme from "../theme/AppDarkTheme";
import AppDefaultTheme from "../theme/AppDefaultTheme";
import AppIcon from "@/components/AppIcon";
import AppText from "@/components/AppText";
import { ModalProvider } from "@/context/ModalContext";
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import React from "react";
import { PlayerCharacterProvider } from "@/context/PlayerContext";

export default function AppLayout() {
  const [isReady, setReady] = React.useState(false);

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
        setReady(true);
      }, 3000);
    }
  }, [fontsLoaded, fontsLoaded2, fontsLoaded3, fontsLoaded4]);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? AppDarkTheme : AppDefaultTheme}>
      <ModalProvider>
        <PlayerCharacterProvider>
          <Drawer
            initialRouteName="(stack)"
            screenOptions={({ navigation }) => ({
              headerLeft: (props) => (
                <View {...props}>
                  <TouchableOpacity onPress={navigation.toggleDrawer}>
                    <AppIcon name="menu" size={36} />
                  </TouchableOpacity>
                </View>
              ),
            })}>
            <Drawer.Screen
              name="(stack)"
              options={{
                title: "Home",
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
              name="(tabs)"
              options={{
                title: "Settings",
              }}
            />
            <Drawer.Screen
              name="(tabs1)"
              options={{
                title: "Character",
              }}
            />
          </Drawer>
        </PlayerCharacterProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}
