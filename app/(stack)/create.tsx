import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import AppTextInput from "@/components/inputs/AppTextInput";
import { useRouter } from "expo-router";
import { Text, View, Button } from "react-native";
import React from "react";
import { CharacterRace } from "@/game/classes/classes";
import { races } from "@/game/data/races";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { PlayerCharacter } from "@/game/classes/PlayerCharacter";
import { startingSkills } from "@/game/data/skills";
import { generateConsumableNyName } from "@/game/utils/itemUtils";

export default function Create() {
  const router = useRouter();
  const [text, setText] = React.useState<string>("");
  const [race, setRace] = React.useState<CharacterRace>();
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const setCharacterRace = (name: string) => {
    switch (name) {
      case "human":
        setRace(races.human);
        break;

      default:
        break;
    }
  };

  const createCharacter = () => {
    if (text && race) {
      const character = PlayerCharacter.characterInit(
        text,
        race,
        startingSkills
      );
      try {
        character.addItemToInventory(
          generateConsumableNyName(1, "Hp potion", 5)
        );
        character.addItemToInventory(
          generateConsumableNyName(1, "Mana potion", 5)
        );
        setPlayerCharacter(character);
        router.back();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,

        alignItems: "center",
      }}>
      <AppText>Create Character</AppText>
      <View
        style={{
          flex: 1,
          paddingTop: 50,

          alignItems: "center",
        }}>
        <AppText>Character name</AppText>
        <AppTextInput
          value={text}
          style={{ minWidth: "50%" }}
          onChangeText={setText}
          placeholder="Enter character name"
        />
        <AppText>Pick race</AppText>
        <AppButton onPress={() => setCharacterRace("human")} title="Human" />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 50,

          alignItems: "center",
        }}>
        <AppButton onPress={createCharacter} title="create" />
      </View>
    </View>
  );
}
