import { Battle, CharacterSkill } from "../classes/classes";

export const calculateAttackOnMonster = (
  battle: Battle,
  skill: CharacterSkill
): number => {
  const playerAttack = battle.playerCharacter?.getAttack() || 0;
  const monsterDefence = battle.creature?.defence || 0;

  if (skill.characterSkillType === "PHYSICAL") {
    const playerDamageBasedOnPlayerStats =
      playerAttack * skill.characterSkillModifier;
    // Assuming that higher defence reduces the damage.
    const damageReduction =
      playerDamageBasedOnPlayerStats * (monsterDefence / 100);
    console.log(damageReduction);
    return Math.floor(playerDamageBasedOnPlayerStats - damageReduction);
  }

  if (skill.characterSkillType === "MAGICAL") {
    // Example formula for magic damage. Adjust as needed.
    const playerMagicPower = battle.playerCharacter?.getMagicAttack() || 0;
    return Math.floor(playerMagicPower * skill.characterSkillModifier);
  }

  return 0;
};

export const calculateAttackOnPlayer = (battle: Battle): number => {
  const monsterAttack = battle.creature?.attack || 0;
  const playerDefence = battle.playerCharacter?.getDefence() || 0;

  // Assuming that higher defence reduces the damage.
  const damageReduction = monsterAttack * (playerDefence / 100);
  console.log(damageReduction);
  return Math.floor(monsterAttack - damageReduction);
};
