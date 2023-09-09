import { usePlayerCharacter } from "@/context/PlayerContext";
import { getNextLevelExperience } from "@/game/utils/expUtils";

import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFocusEffect } from "expo-router";

export default function Statistics() {
  const [playerCharacter] = usePlayerCharacter();
  React.useEffect(() => {}, [playerCharacter]);
  useFocusEffect(() => {
    console.log(playerCharacter?.exp);
  });
  return (
    <ScrollView
      contentContainerStyle={{
        //flex: 1,
        justifyContent: "flex-start",
        // alignItems: "center",
        marginTop: 25,
        paddingBottom: 50,
        height: "auto",
      }}>
      <View>
        <View style={styles.nameView}>
          <Text style={styles.nameText}>{playerCharacter?.name}</Text>

          <Text style={styles.nameText}>Lvl: {playerCharacter?.level}</Text>
        </View>
        <View>
          <Text style={styles.inBetweenText}>Character Info</Text>
        </View>

        <View style={styles.columnView}>
          <Text style={styles.text}>
            Race: {playerCharacter?.characterRace?.raceName}
          </Text>

          <Text style={styles.text}>
            Exp: {playerCharacter?.exp}/
            {getNextLevelExperience(playerCharacter?.level!)}
          </Text>

          <Text style={styles.text}>
            Hp: {playerCharacter?.currentHp}/{playerCharacter?.getMaxHp()}
          </Text>
          <Text style={styles.text}>
            {playerCharacter?.resourceName + ": "}
            {playerCharacter?.currentInnerPower}/
            {playerCharacter?.maxInnerPower}
          </Text>
          <Text style={styles.text}>Gold: {playerCharacter?.gold}</Text>
        </View>

        <View>
          <Text style={styles.inBetweenText}>Career</Text>
        </View>

        <View style={styles.careerColumnView}>
          <Text style={styles.text}>
            Distance traveled(km):{" "}
            {(
              (playerCharacter?.career?.distanceTraveled || 0) / 1000
            ).toPrecision(2)}
          </Text>
          <Text style={styles.text}>
            Creatures killed: {playerCharacter?.career?.creaturesKilled}
          </Text>
          <Text style={styles.text}>
            Valor Tower top floor reached:{" "}
            {playerCharacter?.career?.topValorTowerFloor}
          </Text>
          <Text style={styles.text}>
            Total deaths: {playerCharacter?.career?.totalDeaths}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nameView: {
    flexDirection: "row",
    justifyContent: "space-around",

    borderStyle: "solid",

    marginBottom: 8,
    marginStart: "10%",
    marginEnd: "10%",
  },
  nameText: {
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 26,
    color: "#F0F8FF",
  },
  inBetweenText: {
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 24,
    marginStart: "10%",
    marginEnd: "10%",
    color: "#F0F8FF",
  },

  columnView: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 10,
    borderColor: "#F0F8FF",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 7,
    padding: 6,
    marginStart: "10%",
    marginEnd: "10%",
    flex: 0,
  },
  careerColumnView: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginBottom: 10,
    padding: 6,
    borderColor: "#F0F8FF",
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 7,
    marginStart: "10%",
    marginEnd: "10%",
  },
  text: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 16,
    color: "#F0F8FF",
  },
});
