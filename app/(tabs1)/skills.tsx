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
import Tooltip from "react-native-walkthrough-tooltip";
import { useState } from "react";
import { usePlayerCharacter } from "@/context/PlayerContext";
import CharacterSkills from "@/components/other/CharacterSkills";
const Skills = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();
  // const [skills, setSkills] = useState();
  const [toolTipVisible, setToolTipVisible] = useState<number | string | null>(
    null
  );

  const assignSkill = (skill: any, slot: number) => {
    if (playerCharacter) {
      // Create a new instance of PlayerCharacter with the updated skill
      const updatedPlayerCharacter = playerCharacter.clone();
      updatedPlayerCharacter.assignSkillToSlot(skill, slot);

      // Set the new instance as the state
      setPlayerCharacter(updatedPlayerCharacter);
      setToolTipVisible(null);
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.titleText}>Skills</Text>
      <Text style={styles.skillPointsText}>
        Skill Points:{" " + playerCharacter?.skillPoints}
      </Text>
      <View>
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
            data={playerCharacter?.characterSkills}
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
                    {/* Invisible trigger for tooltip positioning */}
                    <View style={{ height: 0, opacity: 0 }} />
                  </Tooltip>
                </View>
              );
            }}
          />
        </View>
        <CharacterSkills playerCharacter={playerCharacter} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 25,
  },
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
