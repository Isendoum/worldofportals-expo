import { usePlayerCharacter } from "@/context/PlayerContext";
import { Stack } from "expo-router";

const CustomStack = () => {
  const [playerCharacter] = usePlayerCharacter();

  return (
    <Stack initialRouteName={playerCharacter ? "(mainMenu)" : "create"}>
      <Stack.Screen
        name="(mainMenu)"
        options={{
          title: "Main menu",
          //headerShown: false,

          // tabBarIcon: () => (
          //   <Ionicons name="airplane" size={24} color="black" />
          // ),
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          title: "Create Player",
          //headerShown: false,

          // tabBarIcon: () => (
          //   <Ionicons name="airplane" size={24} color="black" />
          // ),
        }}
      />
    </Stack>
  );
};

export default CustomStack;
