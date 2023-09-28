import { useModal } from "@/hooks/useModal";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { BackHandler, Text, TouchableOpacity, View } from "react-native";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { generateConsumable, generateRandomItem } from "@/game/utils/itemUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { usePickedMonster } from "@/context/MapBattleContext";
import { Battle } from "@/game/classes/Battle";
import { Creature } from "@/game/classes/Creature";

export const EndBattleModalContent = ({
  battleState,
}: {
  battleState: Battle;
}) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [, setPlayerCharacter] = usePlayerCharacter();
  const [isWin] = useState(battleState.playerCharacter?.currentHp! > 0);
  const [, setMonster] = usePickedMonster();

  const handleBackButton = () => {
    // closeModalAndGatherGoldAndExp();
    return true; // prevent default behavior
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackButton
    );

    return () => backHandler.remove();
  }, []);
  const closeModalAndGatherGoldAndExp = async () => {
    if (battleState.playerCharacter) {
      try {
        const upPlayer = battleState.playerCharacter?.clone();
        upPlayer.addAndCheckExp(battleState.creature?.expRewards!);
        console.log(upPlayer.exp);
        upPlayer.gold =
          (upPlayer?.gold || 0) + (battleState.creature?.goldRewards || 0);

        // Check if the monster drops an item
        if (Math.random() * 100 < battleState.creature?.itemDropChance!) {
          upPlayer.addItemToInventory(
            generateRandomItem(battleState.creature?.level!)
          );
        }

        // Check if the monster drops a potion
        if (Math.random() * 100 < battleState.creature?.potionDropChance!) {
          upPlayer.addItemToInventory(
            generateConsumable(battleState.creature?.level!)
          );
        }

        setPlayerCharacter(upPlayer);
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
        closeModal();
        router.back();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const closeModalAndLeave = async () => {
    if (battleState.playerCharacter) {
      try {
        const upPlayer = battleState.playerCharacter?.clone();

        setPlayerCharacter(upPlayer);
        closeModal();

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
          textAlign: "center",
          marginBottom: 10,
          // color: "#ffffff",
        }}>
        {!isWin ? "Fight lost!" : "Fight won!"}
      </Text>
      {isWin && (
        <View>
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
        </View>
      )}
      <TouchableOpacity
        onPress={isWin ? closeModalAndGatherGoldAndExp : closeModalAndLeave}>
        <Text
          style={{
            fontSize: 26,
            fontFamily: "RomanAntique",
            marginTop: 20,
            textAlign: "center",
            // color: "#ffffff",
          }}>
          Back to map
        </Text>
      </TouchableOpacity>
    </View>
  );
};
