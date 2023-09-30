import { findSkillImage } from "@/utils/imageUtils";
import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { useFocusEffect, useRouter } from "expo-router";
import CharacterSkills from "@/components/other/CharacterSkills";
import AppButton from "@/components/AppButton";
import { availableSkills } from "@/game/data/skills";
import { CharacterSkill } from "@/game/classes/classes";

const SkillShop = () => {
  const router = useRouter();
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  // const [skills, setSkills] = useState();
  const [toolTipVisible, setToolTipVisible] = useState<number | string | null>(
    null
  );
  const showNotEnoughPointsMessage = () => {
    Alert.alert("Not enough points to buy this skill!");
  };
  const buySkill = (skill: CharacterSkill) => {
    if (playerCharacter) {
      if (
        playerCharacter.skillPoints! >= skill.crystalCost &&
        playerCharacter.skillPoints !== 0
      ) {
        // Create a new instance of PlayerCharacter with the updated skill
        const updatedPlayerCharacter = playerCharacter.clone();
        updatedPlayerCharacter.addSkill(skill);

        // Set the new instance as the state
        setPlayerCharacter(updatedPlayerCharacter);
      } else {
        showNotEnoughPointsMessage();
      }
      setToolTipVisible(null);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 25,
      }}>
      <AppButton title="<--" onPress={() => router.back()} />
      <Text style={styles.titleText}>Skill shop</Text>
      <Text style={styles.skillPointsText}>
        Skill Points:{" " + playerCharacter?.skillPoints}
      </Text>

      <View style={{}}>
        <View
          //  fadingEdgeLength={20}
          style={{
            marginStart: "10%",
            marginEnd: "10%",
            marginBottom: "10%",
            alignItems: "center",
            flex: 1,
            flexDirection: "column",
          }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={availableSkills}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem}>
                  <Pressable
                    onPress={() => {
                      setToolTipVisible((prev) =>
                        prev === item.id ? null : item.id
                      );
                      console.log(item.characterSkillName);
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                        margin: 4,
                      }}>
                      <View
                        style={{
                          borderWidth: 3,
                          borderBlockColor: "black",
                          borderRadius: 2,
                        }}>
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={findSkillImage(item.characterSkillName)}
                        />
                      </View>
                      <View style={{ margin: 4 }}>
                        <Text style={styles.itemNameText}>
                          {item.characterSkillName}
                        </Text>
                        <Text style={styles.itemSubtitleText}>
                          {item.skillDescription}
                        </Text>
                      </View>
                    </View>
                  </Pressable>

                  <Tooltip
                    disableShadow
                    isVisible={toolTipVisible === item.id}
                    backgroundColor="transparent"
                    placement="bottom"
                    onClose={() => setToolTipVisible(null)}
                    content={
                      <View>
                        {/* Your slot assignment options */}
                        <TouchableOpacity
                          onPress={() => buySkill(item)}
                          disabled={false}>
                          <Text style={styles.toolTipText}>Buy</Text>
                        </TouchableOpacity>
                      </View>
                    }>
                    {/* Invisible trigger for tooltip positioning */}
                    <View style={{ height: 0, opacity: 0 }} />
                  </Tooltip>
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 5,
    backgroundColor: "#FFF8DC",
    alignSelf: "center",
  },
  listItem: {
    borderRadius: 5,
    backgroundColor: "#999999",
    marginBottom: "3%",
  },
  listItemContent: {},
  titleText: {
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 26,
    alignSelf: "center",
    color: "#F0F8FF",
  },
  skillPointsText: {
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 24,
    alignSelf: "flex-start",
    marginStart: "10%",
    color: "#F0F8FF",
  },
  itemNameText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 22,
  },
  toolTipText: {
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "black",
  },
  itemSubtitleText: {
    maxWidth: "90%",
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 16,
    color: "#ffffff",
  },
  skillText: {
    alignSelf: "center",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 16,
  },
  skillImage: {
    resizeMode: "contain",
    flex: 0,
    width: "110%",
    height: "110%",
    alignSelf: "center",
  },
});

export default SkillShop;
