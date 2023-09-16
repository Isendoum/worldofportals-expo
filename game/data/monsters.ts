export enum MonsterType {
  "PHYSICAL",
  "MAGICAL",
}
export const monsterTemplate = [
  {
    name: "Skeleton Warrior",
    baseHp: 80,
    type: MonsterType.PHYSICAL,
    baseAttack: 2,
    baseDefence: 2,
    baseMAttack: 0,
    baseMDefence: 1,
  },
  {
    name: "Red Soldier",
    baseHp: 110,
    type: MonsterType.PHYSICAL,
    baseAttack: 4,
    baseDefence: 3,
    baseMAttack: 0,
    baseMDefence: 2,
  },
  {
    name: "Mage Warrior",
    baseHp: 98,
    type: MonsterType.MAGICAL,
    baseAttack: 0,
    baseDefence: 1,
    baseMAttack: 3,
    baseMDefence: 3,
  },
];
