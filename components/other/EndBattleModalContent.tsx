import { Battle } from "@/game/classes/classes";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { generateRandomItem } from "@/game/utils/itemUtils";

export const EndBattleModalContent = ({
  battleState,
}: {
  battleState: Battle;
}) => {
  const router = useRouter();
  const { closeModal } = useModal();
  const [, setPlayerCharacter] = usePlayerCharacter();
  const closeModalAndGatherGoldAndExp = () => {
    console.log(battleState.playerCharacter?.gold);
    if (battleState.playerCharacter) {
      const upPlayer = battleState.playerCharacter?.clone();
      upPlayer.addAndCheckExp(battleState.creature?.expRewards!);
      upPlayer.gold =
        (upPlayer?.gold || 0) + (battleState.creature?.goldRewards || 0);
      upPlayer.inventory = [
        ...upPlayer.inventory!,
        generateRandomItem(battleState.creature?.level!),
      ];
      setPlayerCharacter(upPlayer);
    }
    closeModal();
    router.back();
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
