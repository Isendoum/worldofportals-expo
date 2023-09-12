import AppButton from "@/components/AppButton";
import React, { useEffect, useState } from "react";

import { useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import AppCard from "@/components/AppCard";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { useTimer } from "@/context/TimerContext";
import * as Location from "expo-location";

const IntroPage = () => {
  const router = useRouter();
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const [locationStatus, setLocationStatus] = useState("");
  const { startTimer, timeLeft } = useTimer();

  const clearStorage = async () => {
    try {
      // await AsyncStorage.clear();
      setPlayerCharacter(null!);
      alert("Storage successfully cleared!");
    } catch (e) {
      alert("Failed to clear the async storage.");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocationStatus(status);
        alert("Permission to access location was denied");
        return;
      }
      setLocationStatus(status);
      if (timeLeft === 600) {
        // startTimer();
      }
    })();
  }, []);

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
          disabled={!playerCharacter || locationStatus !== "granted"}
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
