import AppButton from "@/components/AppButton";
import AppText from "@/components/AppText";
import AppTextInput from "@/components/inputs/AppTextInput";
import React, { useState } from "react";

import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import AppCard from "@/components/AppCard";
import { usePlayerCharacter } from "@/context/PlayerContext";
import {
  CharacterRace,
  ItemType,
  PlayerCharacter,
} from "@/game/classes/classes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ShowModalContent = () => {
  const [text, setText] = useState<string>("");
  return (
    <View style={{ width: "80%" }}>
      <AppText>Input</AppText>
      <AppTextInput
        value={text}
        onChangeText={setText}
        placeholder="Enter your name"
      />
    </View>
  );
};

const IntroPage = () => {
  const router = useRouter();
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const clearStorage = async () => {
    try {
      // await AsyncStorage.clear();
      setPlayerCharacter(null);
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        flexDirection: "column",
        paddingBottom: 26,
        paddingTop: 26,
      }}>
      <AppCard
        style={{
          justifyContent: "space-around",
          flexDirection: "column",
        }}>
        <AppButton
          disabled={!playerCharacter}
          title="Explore"
          onPress={() => router.push("/(stack)/map")}
        />
        <AppButton
          disabled={!playerCharacter}
          title="Character"
          onPress={() => router.push("/(tabs1)/statistics")}
        />
      </AppCard>

      <AppCard
        style={{
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "column",
        }}>
        <AppButton
          disabled={!!playerCharacter}
          title="Create character"
          onPress={() => router.push("/(stack)/create")}
        />
        <AppButton
          disabled={!playerCharacter}
          title="Delete Character"
          onPress={async () => await clearStorage()}
        />
      </AppCard>
    </ScrollView>
  );
};

export default IntroPage;
