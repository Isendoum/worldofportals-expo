import ProgressBar from "@/components/other/ProgressBar";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { CharacterSkill } from "@/game/classes/classes";
import { useModal } from "@/hooks/useModal";
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
import { EndBattleModalContent } from "@/components/other/EndBattleModalContent";
import { usePickedMonster } from "@/context/MapBattleContext";
import { Battle } from "@/game/classes/Battle";
import SkillButton from "@/components/other/SkillButton";
import BattleMainScene from "@/components/other/BattleMainScene";

const BattleScreen = () => {
  const [monster, setMonster] = usePickedMonster();
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  const { openModal } = useModal();
  const [arePlayerButtonDisabled, setArePlayerButtonDisabled] = useState(false);

  const [battleState, setBattleState] = useState(
    new Battle(playerCharacter!, monster!)
  );
  const [battleEnded, setBattleEnded] = useState(false);
  const router = useRouter();
  const animatedRotateValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerXValue = useRef(new Animated.Value(0)).current;
  const animatedPlayerYValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureXValue = useRef(new Animated.Value(0)).current;
  const animatedCreatureYValue = useRef(new Animated.Value(0)).current;
  const [showEffect, setShowEffect] = useState(false);
  const [currentSkill, setCurrentSkill] = useState<
    CharacterSkill | undefined
  >();
  const animatedEffectOpacity = useRef(new Animated.Value(0)).current;

  const attackRequest = (skill: CharacterSkill | undefined) => {
    setCurrentSkill(skill);
    const battle = battleState.clone();
    const prevCreatureHp = battleState?.creature?.currentHp;
    battle.playerAttack(skill);
    const playerDamage = prevCreatureHp! - battle?.creature?.currentHp! || 0;
    console.log(playerDamage);
    setBattleState(battle);
    setShowEffect(true);
    // Animation
    if (skill?.characterSkillType !== "MAGICAL") {
      Animated.sequence([
        Animated.timing(animatedPlayerXValue, {
          toValue: 200, // Dash towards the monster by 200 units
          duration: 200,
          useNativeDriver: true,
        }),

        Animated.timing(animatedPlayerXValue, {
          toValue: 0, // Return to the original position
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }

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
            margin: 5,
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
      <BattleMainScene
        battleState={battleState}
        battleEnded={battleEnded}
        animatedPlayerXValue={animatedPlayerXValue}
        animatedPlayerYValue={animatedPlayerYValue}
        animatedCreatureXValue={animatedCreatureXValue}
        animatedCreatureYValue={animatedCreatureYValue}
        showEffect={showEffect}
        skill={currentSkill}
      />
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
          <SkillButton
            skill={battleState?.playerCharacter?.skill1}
            battleState={battleState}
            attackRequest={attackRequest}
          />
          <SkillButton
            skill={battleState?.playerCharacter?.skill2}
            battleState={battleState}
            attackRequest={attackRequest}
          />
          <SkillButton
            skill={battleState?.playerCharacter?.skill3}
            battleState={battleState}
            attackRequest={attackRequest}
          />
          <SkillButton
            skill={battleState?.playerCharacter?.skill4}
            battleState={battleState}
            attackRequest={attackRequest}
          />
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
    justifyContent: "space-around",
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
