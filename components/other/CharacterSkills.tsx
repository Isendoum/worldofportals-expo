
import { findSkillImage } from "@/utils/imageUtils";
import { Image, StyleSheet, Text, View } from "react-native";
import MapSkills from "./MapSkills";
import { PlayerCharacter } from "@/game/classes/PlayerCharacter";

const CharacterSkills = ({
  playerCharacter,
}: {
  playerCharacter: PlayerCharacter | null;
}) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "80%",
          height: "35%",
          alignSelf: "center",
        }}>
        <MapSkills player={playerCharacter} />
      </View>
    </View>
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

export default CharacterSkills;
