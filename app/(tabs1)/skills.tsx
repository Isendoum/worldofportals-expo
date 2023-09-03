import { findSkillImage } from "@/utils/imageUtils";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import { usePlayerCharacter } from "@/context/PlayerContext";
const Skills = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  // const [skills, setSkills] = useState();
  const [toolTipVisible, setToolTipVisible] = useState<number | null>(null);
  const skills = [
    {
      id: 1,
      characterSkillName: "Attack",
      skillDescription: "Normal attack.",
    },
    {
      id: 2,
      characterSkillName: "Wild Swing",
      skillDescription: "Throws a magic orb.",
    },
    {
      id: 3,
      characterSkillName: "Arcane Bolt",
      skillDescription: "Throws a magic orb.",
    },
    {
      id: 4,
      characterSkillName: "Magic Attack",
      skillDescription: "Throws a magic orb.",
    },
  ];

  const assignSkill = (skill: any, slot: number) => {
    if (playerCharacter) {
      // Create a new instance of PlayerCharacter with the updated skill
      const updatedPlayerCharacter = playerCharacter.clone();
      updatedPlayerCharacter.assignSkillToSlot(skill, slot);

      console.log(updatedPlayerCharacter.skill1);

      // Set the new instance as the state
      setPlayerCharacter(updatedPlayerCharacter);
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
      <Text style={styles.titleText}>Skills</Text>
      <Text style={styles.skillPointsText}>
        Skill Points:{" " + playerCharacter?.skillPoints}
      </Text>

      <View style={{ flex: 1 }}>
        <View
          //  fadingEdgeLength={20}
          style={{
            marginStart: "10%",
            marginEnd: "10%",
            marginBottom: "10%",
            flex: 1,
            flexDirection: "column",
          }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={skills}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItem}>
                  <Tooltip
                    disableShadow
                    isVisible={toolTipVisible === item.id}
                    backgroundColor="#606060"
                    placement="bottom"
                    onClose={() => setToolTipVisible(null)}
                    content={
                      <View>
                        <TouchableOpacity
                          onPress={() => assignSkill(item, 1)}
                          disabled={false}>
                          <Text style={styles.toolTipText}>Set at slot 1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => assignSkill(item, 2)}
                          disabled={false}>
                          <Text style={styles.toolTipText}>Set at slot 2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => assignSkill(item, 3)}
                          disabled={false}>
                          <Text style={styles.toolTipText}>Set at slot 3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => assignSkill(item, 4)}
                          disabled={false}>
                          <Text style={styles.toolTipText}>Set at slot 4</Text>
                        </TouchableOpacity>
                      </View>
                    }>
                    <Pressable
                      onPress={() => {
                        setToolTipVisible(item.id);
                        console.log(item.characterSkillName);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                          margin: 4,
                        }}>
                        <Image
                          style={{ width: 50, height: 50 }}
                          source={findSkillImage(item.characterSkillName)}
                        />
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
                  </Tooltip>
                </View>
              );
            }}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "75%",
              height: "35%",
              alignSelf: "center",
            }}>
            {playerCharacter?.skill1 === null ? (
              <View>
                <Text style={styles.skillText}>Skill 1</Text>
                <Text style={styles.skillText}>Empty</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.skillText}>Skill 1</Text>
                <Image
                  style={styles.skillImage}
                  source={findSkillImage(
                    playerCharacter?.skill1?.characterSkillName
                  )}
                />
              </View>
            )}

            {playerCharacter?.skill2 === null ? (
              <View>
                <Text style={styles.skillText}>Skill 2</Text>
                <Text style={styles.skillText}>Empty</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.skillText}>Skill 2</Text>
                <Image
                  style={styles.skillImage}
                  source={findSkillImage(
                    playerCharacter?.skill2?.characterSkillName
                  )}
                />
              </View>
            )}

            {playerCharacter?.skill3 === null ? (
              <View>
                <Text style={styles.skillText}>Skill 3</Text>
                <Text style={styles.skillText}>Empty</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.skillText}>Skill 3</Text>
                <Image
                  style={styles.skillImage}
                  source={findSkillImage(
                    playerCharacter?.skill3?.characterSkillName
                  )}
                />
              </View>
            )}
            {playerCharacter?.skill4 === null ? (
              <View>
                <Text style={styles.skillText}>Skill 4</Text>
                <Text style={styles.skillText}>Empty</Text>
              </View>
            ) : (
              <View>
                <Text style={styles.skillText}>Skill 4</Text>
                <Image
                  style={styles.skillImage}
                  source={findSkillImage(
                    playerCharacter?.skill4?.characterSkillName
                  )}
                />
              </View>
            )}
          </View>
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

export default Skills;
