import { Battle } from "@/game/classes/Battle";
import { CharacterSkill } from "@/game/classes/classes";
import { findSkillImage } from "@/utils/imageUtils";
import { Image, Text, TouchableOpacity, View } from "react-native";

const SkillButton = ({
  skill,
  battleState,
  attackRequest,
}: {
  skill: CharacterSkill | undefined;
  battleState: Battle;
  attackRequest: (skill: CharacterSkill | undefined) => void;
}) => {
  if (skill !== (null || undefined)) {
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
  } else {
    return (
      <View
        style={{
          flexDirection: "column",
        }}>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 50,
            height: 50,
          }}
          disabled={true}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "RomanAntique",
              lineHeight: 24,
              textAlign: "center",
            }}>
            No skill
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default SkillButton;
