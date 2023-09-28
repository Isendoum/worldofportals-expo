import { Battle } from "../classes/Battle";
import { CharacterSkill } from "../classes/classes";
import { MonsterType } from "../data/monsters";

export const calculateAttackOnMonster = (
  battle: Battle,
  skill: CharacterSkill
): number => {
  const playerAttack = battle.playerCharacter?.getAttack() || 0;
  const playerMAttack = battle.playerCharacter?.getMagicAttack() || 0;
  const monsterDefence = battle.creature?.defence || 0;
  const monsterMDefence = battle.creature?.MagicDefence || 0;

  if (skill.characterSkillType === "PHYSICAL") {
    const playerDamageBasedOnPlayerStats =
      playerAttack * skill.characterSkillModifier;
    // Assuming that higher defence reduces the damage.
    const damageReduction =
      playerDamageBasedOnPlayerStats * (monsterDefence / 10);
    console.log(damageReduction);
    return Math.floor(playerDamageBasedOnPlayerStats - damageReduction);
  }

  if (skill.characterSkillType === "MAGICAL") {
    // Example formula for magic damage. Adjust as needed.
    const playerDamageBasedOnPlayerStats =
      playerMAttack * skill.characterSkillModifier;
    // Assuming that higher defence reduces the damage.
    const damageReduction =
      playerDamageBasedOnPlayerStats * (monsterMDefence / 10);
    console.log(damageReduction);
    return Math.floor(playerDamageBasedOnPlayerStats - damageReduction);
  }

  return 0;
};

export const calculateAttackOnPlayer = (battle: Battle): number => {
  const monsterAttack = battle.creature?.attack || 0;
  const playerDefence = battle.playerCharacter?.getDefence() || 0;
  const monsterMAttack = battle.creature?.MagicAttack || 0;
  const playerMDefence = battle.playerCharacter?.getMagicDefence() || 0;

  if (battle.creature?.monsterType === MonsterType.PHYSICAL) {
    // Assuming that higher defence reduces the damage.
    const damageReduction = monsterAttack * (playerDefence / 200);
    console.log("Physical " + damageReduction);
    return Math.floor(monsterAttack - damageReduction);
  } else {
    // Assuming that higher defence reduces the damage.
    const damageReduction = monsterMAttack * (playerMDefence / 200);
    console.log("Magical " + damageReduction);
    return Math.floor(monsterMAttack - damageReduction);
  }
};
