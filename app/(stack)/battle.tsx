import ProgressBar from "@/components/other/ProgressBar";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { Creature, Battle, CharacterSkill } from "@/game/classes/classes";
import { findSkillImage } from "@/utils/imageUtils";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// const startingBattleState = {
//   turn: 1,
//   player: {
//     playerCharacter: {
//       name: "geotsek",
//       level: 20,
//       characterRace: { raceName: "Elf" },
//       exp: 3000,
//       expRequired: 10000,
//       currentHp: 100,
//       maxHp: 100,
//       resourceName: "Mana",
//       currentInnerPower: 30,
//       maxInnerPower: 30,
//       attack: 10,
//       defence: 10,
//       magicAttack: 10,
//       magicDefence: 10,
//     },
//   },
//   battleMessage: "Battle is starting",
// };

const BattleScreen = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();

  const [arePlayerButtonDisabled, setArePlayerButtonDisabled] = useState(false);
  const [endBattleOverlay, setEndBattleOverlay] = useState(false);
  const [battleState, setBattleState] = useState(new Battle(playerCharacter));
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isSkillDisabled, setIsSkillDisabled] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [loot, setLoot] = useState([]);
  const [creatureMaxHp, setCreatureMaxHp] = useState(100);
  const router = useRouter();
  const animatedRotateValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerXValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerYValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureXValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureYValue = useRef(new Animated.Value(0)).current;
  const creatureTimeout = useRef(null);

  const skillButton = (skill: CharacterSkill | undefined) => {
    if (skill !== null) {
      return (
        <View
          style={{
            flexDirection: "column",
          }}>
          <TouchableOpacity
            // ref={(skillBtn) => (this.skillBtn = skillBtn)}
            style={{ alignItems: "center" }}
            //  onPressIn={() => this.attackRequest(skill)}

            //disabled={this.isAttackDisabled(skill.innerPowerConsume)}
          >
            <Image
              style={{
                resizeMode: "contain",
                width: 50,
                height: 50,
              }}
              source={findSkillImage(skill?.characterSkillName)}
            />
          </TouchableOpacity>
        </View>
      );
    } else
      return (
        <TouchableOpacity
          style={{ flex: 1, alignItems: "center" }}
          disabled={true}>
          <Text style={{ fontSize: 20, fontFamily: "RomanAntique" }}>
            No skill
          </Text>
        </TouchableOpacity>
      );
  };

  const hasEnoughInnerPower = (innerPower: number) => {
    if (innerPower === null) {
      return false;
    } else if (innerPower <= battleState.playerCharacter.currentInnerPower) {
      return true;
    } else return false;
  };

  //   useEffect(() => {
  //     hasEnoughInnerPower();

  //   }, []);

  // ... (rest of the component)

  return (
    <ImageBackground
      style={styles.background}
      source={require("assets/backgrounds/postApocalypticTown.gif")}>
      <StatusBar animated hidden />

      <TouchableOpacity
        onPress={() => router.back()}
        disabled={arePlayerButtonDisabled}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: "RomanAntique",
            color: "#ffffff",
          }}>
          Run
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 0,
          backgroundColor: "#0000FF",
          borderColor: "#000000",
          borderWidth: 3,
        }}>
        <Text style={{ color: "#ffffff", fontSize: 22, alignSelf: "center" }}>
          Round: {battleState?.turn}
        </Text>
        <Text style={{ color: "#ffffff", fontSize: 18, alignSelf: "center" }}>
          {battleState?.battleMessage}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "space-between",
        }}>
        {!battleEnded ? (
          <View style={styles.playerView}>
            <View style={{ flex: 0, maxHeight: "100%", maxWidth: "100%" }}>
              <Animated.Image
                style={{
                  flex: -1,
                  resizeMode: "contain",
                  aspectRatio: 0.7,
                  transform: [
                    {
                      translateX: animatedPlayerXValue,
                    },
                    {
                      translateY: animatedPlayerYValue,
                    },
                  ],
                }}
                source={require("assets/warrior.png")}
              />
            </View>
          </View>
        ) : null}
        {!battleEnded ? (
          <View style={styles.creatureView}>
            <View style={{ flex: 0, maxHeight: "100%", maxWidth: "100%" }}>
              <Animated.Image
                style={{
                  flex: -1,
                  aspectRatio: 0.7,
                  resizeMode: "contain",
                  alignSelf: "flex-end",
                  transform: [
                    {
                      rotate: animatedRotateValue.interpolate({
                        inputRange: [-5, 5],
                        outputRange: ["-0.1rad", "0.1rad"],
                      }),
                    },
                    {
                      translateX: animatedCreatureXValue,
                    },
                    {
                      translateY: animatedCreatureYValue,
                    },
                  ],
                }}
                source={require("assets/creatures/skeletonWarrior.png")}
              />
            </View>
          </View>
        ) : null}
      </View>
      <View style={styles.infoView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.infoText}>
              {battleState.playerCharacter?.name}
            </Text>
            <ProgressBar
              current={battleState.playerCharacter?.currentHp}
              max={battleState.playerCharacter?.maxHp}
            />
            {/* <ProgressBar style={{ marginTop: 2, alignSelf: "center" }} borderColor={"#000000"} color={"#00008B"} height={8} width={100} animated={true}
              progress={battleState.player.playerCharacter.currentInnerPower / this.state.battleState.player.playerCharacter.maxInnerPower} />
            {buffs(battleState)} */}
          </View>
          <View>
            <Text style={styles.infoText}>
              Skeleton
              {/* {battleState?.creature?.name} */}
            </Text>
            <ProgressBar current={222} max={222} />
            {/* <Progress.Bar style={{ marginTop: 2, alignSelf: "center" }} borderColor={"#000000"} color={"#DC143C"} height={8} width={100} animated={true}
              progress={battleState.creature.hp / creatureMaxHp} /> */}
          </View>
        </View>
        <View style={styles.playerCommandsView}>
          {skillButton(battleState?.playerCharacter?.skill1)}
          {skillButton(battleState?.playerCharacter?.skill2)}
          {skillButton(battleState?.playerCharacter?.skill3)}
          {skillButton(battleState?.playerCharacter?.skill4)}
        </View>
      </View>

      {/* <Overlay
          onBackdropPress={() => null}
          isVisible={endBattleOverlay}
          overlayStyle={{ height: '50%' }}>
          {endOverlay()}
        </Overlay> */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },

  playerView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: "90%",
  },
  creatureView: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    marginTop: "90%",
  },

  playerCommandsView: {
    flexDirection: "row",
    // flex: 1,
    justifyContent: "space-between",
  },
  infoView: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 0,
    backgroundColor: "#ffffff90",
    borderRadius: 5,
  },
  infoText: {
    alignSelf: "center",
    fontFamily: "RomanAntique",
  },
  endBattleText: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "RomanAntique",
  },

  listItem: {
    borderRadius: 5,
    backgroundColor: "#999999",
    marginBottom: "3%",
  },
});

export default BattleScreen;
