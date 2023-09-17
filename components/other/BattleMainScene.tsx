import { Animated, Image, StyleSheet, Text, View } from "react-native";
import Particle from "./Particle";
import { Battle } from "@/game/classes/Battle";
import { CharacterSkill } from "@/game/classes/classes";
import { findSkillEffect } from "@/utils/imageUtils";

const BattleMainScene = ({
  battleState,
  battleEnded,
  animatedPlayerXValue,
  animatedPlayerYValue,
  animatedCreatureXValue,
  animatedCreatureYValue,
  animatedEffectOpacity,
  showEffect,
  skill,
  damage,
}: {
  battleState: Battle;
  battleEnded: boolean;
  animatedPlayerXValue: Animated.Value;
  animatedPlayerYValue: Animated.Value;
  animatedCreatureXValue: Animated.Value;
  animatedCreatureYValue: Animated.Value;
  animatedEffectOpacity: Animated.Value;
  showEffect: boolean;
  skill?: CharacterSkill;
  damage?: number;
}) => {
  return (
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
            <Animated.Text
              style={{
                position: "absolute",
                top: -20,
                left: 55,
                fontSize: 18,
                color: "white",
                width: 100,
                height: 20,
                zIndex: 2,
                opacity: animatedEffectOpacity,
              }}>
              {damage}
            </Animated.Text>

            {Array.from({ length: 20 }).map((_, index) => (
              <Particle
                //   opacity={ animatedEffectOpacity}
                key={index}
                style={{
                  position: "absolute",
                  width: 5,
                  height: 5,
                  zIndex: 2,
                  opacity: animatedEffectOpacity,
                  top: Math.random() * 100, // Random position
                  left: Math.random() * 100, // Random position
                }}>
                <Image
                  style={{ width: 12, height: 12, resizeMode: "contain" }}
                  source={findSkillEffect(skill?.characterSkillName)}
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
              source={battleState.creature?.asset}
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default BattleMainScene;
