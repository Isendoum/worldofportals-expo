import { CharacterRace } from "../classes/classes";

export const races = {
  human: {
    raceName: "human",
    statModifier: 1,
    hp: 10,
    attack: 10,
    defence: 10,
    magicAttack: 10,
    magicDefence: 10,
    speed: 10,
    innerPower: 10,
  },
};

export const startingSkills = [
  {
    id: "1",
    characterSkillName: "Attack",
    characterSkillType: "ATTACK",
    skillDescription:
      "Basic melee attack. Does 100.0% magic damage to the target. Consumes 0% of inner power.",
    characterSkillModifier: 1,
    skillLevel: 1,
    skillMaxLevel: 1,
    innerPowerConsume: 0,
    skillRank: "D",
    buffedTurnsRemaining: 0,
    crystalCost: 0,
  },
  {
    id: "2",
    characterSkillName: "Wild Swing",
    characterSkillType: "ATTACKSKILL",
    skillDescription:
      "Swing you weapon wildly, causing 150.0% melee damage to the target. Consumes 10% of inner power.",
    characterSkillModifier: 1.5,
    skillLevel: 1,
    skillMaxLevel: 5,
    innerPowerConsume: 10,
    skillRank: "C",
    buffedTurnsRemaining: 0,
    crystalCost: 0,
  },
  {
    id: "3",
    characterSkillName: "Arcane Bolt",
    characterSkillType: "MAGICATTACK",
    skillDescription:
      "Throw an arcane bolt causing 150.0% magic damage to the target. Consumes 10% of inner power.",
    characterSkillModifier: 1.5,
    skillLevel: 1,
    skillMaxLevel: 5,
    innerPowerConsume: 10,
    skillRank: "C",
    buffedTurnsRemaining: 0,
    crystalCost: 0,
  },
  {
    id: "4",
    characterSkillName: "Magic Attack",
    characterSkillType: "MAGICATTACK",
    skillDescription:
      "Basic magic attack. Does 100.0% magic damage to the target. Consumes 0% of inner power.",
    characterSkillModifier: 1,
    skillLevel: 1,
    skillMaxLevel: 1,
    innerPowerConsume: 0,
    skillRank: "D",
    buffedTurnsRemaining: 0,
    crystalCost: 0,
  },
];
