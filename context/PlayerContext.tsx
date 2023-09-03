import React, { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PlayerCharacter } from "@/game/classes/classes";

const PlayerCharacterContext = createContext<
  [PlayerCharacter | null, (player: PlayerCharacter) => void]
>([null, () => {}]);

export const usePlayerCharacter = () => {
  return useContext(PlayerCharacterContext);
};

export const PlayerCharacterProvider: React.FC<any> = ({ children }) => {
  const [playerCharacter, setPlayerCharacter] =
    useState<PlayerCharacter | null>(null);

  // Load the saved PlayerCharacter from AsyncStorage when the app starts
  React.useEffect(() => {
    (async () => {
      const savedPlayer = await AsyncStorage.getItem("playerCharacter");
      if (savedPlayer) {
        setPlayerCharacter(PlayerCharacter.deserialize(savedPlayer));
      }
    })();
  }, []);

  // Save the PlayerCharacter to AsyncStorage whenever it changes
  React.useEffect(() => {
    if (playerCharacter) {
      AsyncStorage.setItem("playerCharacter", playerCharacter.serialize());
      console.info("Saved");
    }
  }, [playerCharacter]);

  return (
    <PlayerCharacterContext.Provider
      value={[playerCharacter, setPlayerCharacter]}>
      {children}
    </PlayerCharacterContext.Provider>
  );
};
