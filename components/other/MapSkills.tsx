import { PlayerCharacter } from "@/game/classes/PlayerCharacter";
import { CharacterSkill } from "@/game/classes/classes";
import { findSkillImage } from "@/utils/imageUtils";
import { Image, StyleSheet, Text, View } from "react-native";

const MapSkills = ({ player }: { player: PlayerCharacter | null }) => {
  const playerSkills = [
    player?.skill1,
    player?.skill2,
    player?.skill3,
    player?.skill4,
  ];

  return playerSkills.map(
    (skill: CharacterSkill | undefined, index: number) => {
      return skill === undefined ? (
        <View key={index}>
          <Text style={styles.skillText}>Skill {index + 1}</Text>
          <View
            style={{
              //flex: 1,
              width: 70,
              height: 70,
              flexDirection: "column",
              alignSelf: "center",
              borderWidth: 3,
              borderBlockColor: "black",
              justifyContent: "center",
            }}>
            <Text style={styles.skillText}>Empty</Text>
          </View>
        </View>
      ) : (
        <View key={index}>
          <Text style={styles.skillText}>Skill {index + 1}</Text>
          <View style={{ borderWidth: 3, borderBlockColor: "black" }}>
            <Image
              style={styles.skillImage}
              source={findSkillImage(skill?.characterSkillName)}
            />
          </View>
        </View>
      );
    }
  );
};

const styles = StyleSheet.create({
  skillText: {
    alignSelf: "center",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 16,
  },
  view: {
    width: 64,
    height: 64,
    // flex: 1,
  },
  skillImage: {
    resizeMode: "stretch",
    //  flex: 1,
    width: 64,
    height: 64,
    alignSelf: "center",
  },
});

export default MapSkills;
