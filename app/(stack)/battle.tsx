import ProgressBar from "@/components/other/ProgressBar";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { Creature, Battle, CharacterSkill } from "@/game/classes/classes";
import { useModal } from "@/hooks/useModal";
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
import { EndBattleModalContent } from "../../components/other/EndBattleModalContent";
import Particle from "@/components/other/Particle";

const BattleScreen = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const { openModal } = useModal();
  const [arePlayerButtonDisabled, setArePlayerButtonDisabled] = useState(false);

  const [battleState, setBattleState] = useState(
    new Battle(
      playerCharacter!,
      Creature.generateMonster(playerCharacter?.level!)
    )
  );
  const [battleEnded, setBattleEnded] = useState(false);
  const router = useRouter();
  const animatedRotateValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerXValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerYValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureXValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureYValue = useRef(new Animated.Value(0)).current;
  const [showEffect, setShowEffect] = useState(false);
  const animatedEffectOpacity = useRef(new Animated.Value(0)).current;

  const attackRequest = (skill: CharacterSkill | undefined) => {
    const battle = battleState.clone();
    battle.playerAttack(skill);
    setBattleState(battle);
    setShowEffect(true);
    // Animation
    Animated.sequence([
      Animated.timing(animatedPlayerXValue, {
        toValue: 200, // Dash towards the monster by 50 units
        duration: 200,
        useNativeDriver: true,
      }),

      Animated.timing(animatedPlayerXValue, {
        toValue: 0, // Return to the original position
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    // Animated.sequence([
    //   Animated.timing(animatedEffectOpacity, {
    //     toValue: 1, // Make the effect fully visible
    //     duration: 100,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(animatedEffectOpacity, {
    //     toValue: 0, // Hide the effect
    //     duration: 500,
    //     useNativeDriver: true,
    //   }),
    // ]).start(() => );
    Animated.sequence([
      Animated.timing(animatedCreatureYValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedCreatureYValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => setShowEffect(false));
  };

  const monsterAttack = () => {
    const battle = battleState.clone();
    setTimeout(() => {
      battle.monsterAttack();
      setBattleState(battle);
    }, 1000);

    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(animatedCreatureXValue, {
        toValue: -200, // Monster dashes towards the player
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(animatedCreatureXValue, {
        toValue: 0, // Monster returns to its original position
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(animatedPlayerYValue, {
        toValue: -10,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPlayerYValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // check currently playing property
  useEffect(() => {
    if (battleState.battleState === "monster") {
      monsterAttack();
    }
    if (battleState.battleState === "end") {
      setTimeout(
        () => openModal(<EndBattleModalContent battleState={battleState} />),
        1000
      );
    }
  }, [battleState.battleState]);

  const skillButton = (skill: CharacterSkill | undefined) => {
    if (skill !== null) {
      return (
        <View
          style={{
            flexDirection: "column",
          }}>
          <TouchableOpacity
            disabled={
              battleState.battleState === "monster" ||
              battleState.battleState === "end"
            }
            // ref={(skillBtn) => (this.skillBtn = skillBtn)}
            style={{ alignItems: "center" }}
            onPressIn={() => {
              attackRequest(skill);
            }}

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
                source={require("assets/player/warriorBattle.png")}
              />
            </View>
          </View>
        ) : null}

        {!battleEnded ? (
          <View style={styles.creatureView}>
            <View style={{ flex: 0, maxHeight: "100%", maxWidth: "100%" }}>
              {showEffect &&
                Array.from({ length: 20 }).map((_, index) => (
                  <Particle
                    key={index}
                    style={{
                      position: "absolute",
                      width: 5,
                      height: 5,
                      zIndex: 2,
                      // backgroundColor: "red",
                      top: Math.random() * 100, // Random position
                      left: Math.random() * 100, // Random position
                    }}>
                    <Image
                      style={{ width: 12, height: 12, resizeMode: "contain" }}
                      source={require("../../assets/effects/portal.png")}
                    />
                  </Particle>
                ))}
              <Animated.Image
                style={{
                  flex: -1,
                  aspectRatio: 0.7,
                  resizeMode: "contain",
                  alignSelf: "flex-end",
                  transform: [
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
              current={battleState.playerCharacter?.getCurrentHp()!}
              max={battleState.playerCharacter?.getMaxHp()!}
            />
            {/* <ProgressBar style={{ marginTop: 2, alignSelf: "center" }} borderColor={"#000000"} color={"#00008B"} height={8} width={100} animated={true}
              progress={battleState.player.playerCharacter.currentInnerPower / this.state.battleState.player.playerCharacter.maxInnerPower} />
            {buffs(battleState)} */}
          </View>
          <View>
            <Text style={styles.infoText}>{battleState?.creature?.name}</Text>
            <ProgressBar
              current={battleState?.creature?.currentHp!}
              max={battleState?.creature?.maxHp!}
            />
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
