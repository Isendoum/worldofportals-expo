import { Battle, Creature } from "@/game/classes/classes";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { generateRandomItem } from "@/game/utils/itemUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePickedMonster } from "@/context/MapBattleContext";

export const EndBattleModalContent = ({
  battleState,
}: {
  battleState: Battle;
}) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [, setPlayerCharacter] = usePlayerCharacter();
  const [, setMonster] = usePickedMonster();
  const closeModalAndGatherGoldAndExp = async () => {
    if (battleState.playerCharacter) {
      try {
        const upPlayer = battleState.playerCharacter?.clone();
        upPlayer.addAndCheckExp(battleState.creature?.expRewards!);
        console.log(upPlayer.exp);
        upPlayer.gold =
          (upPlayer?.gold || 0) + (battleState.creature?.goldRewards || 0);
        upPlayer.addItemToInventory(
          generateRandomItem(battleState.creature?.level!)
        );

        setPlayerCharacter(upPlayer);
        closeModal();

        const storedMonsters = await AsyncStorage.getItem("randomMonsters");
        if (storedMonsters) {
          const parsedMonsters: Creature[] = JSON.parse(storedMonsters);
          const updatedMonsters = parsedMonsters.filter(
            (mon) => mon.id !== battleState.creature?.id
          );
          await AsyncStorage.setItem(
            "randomMonsters",
            JSON.stringify(updatedMonsters)
          );
          setMonster(null);
        }
        router.back();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <View style={{ width: "80%" }}>
      <Text
        style={{
          fontSize: 26,
          fontFamily: "RomanAntique",
          // color: "#ffffff",
        }}>
        Fight won
      </Text>
      <Text
        style={{
          fontSize: 26,
          fontFamily: "RomanAntique",
          // color: "#ffffff",
        }}>
        Exp: {battleState.creature?.expRewards}
      </Text>
      <Text
        style={{
          fontSize: 26,
          fontFamily: "RomanAntique",
          // color: "#ffffff",
        }}>
        Gold: {battleState.creature?.goldRewards}
      </Text>
      <TouchableOpacity onPress={closeModalAndGatherGoldAndExp}>
        <Text
          style={{
            fontSize: 26,
            fontFamily: "RomanAntique",
            // color: "#ffffff",
          }}>
          Back to map
        </Text>
      </TouchableOpacity>
    </View>
  );
};
