export enum MonsterType {
  "PHYSICAL",
  "MAGICAL",
}
export const monsterTemplate = [
  {
    name: "Skeleton Warrior",
    baseHp: 28,
    type: MonsterType.PHYSICAL,
    baseAttack: 2,
    baseDefence: 2,
    baseMAttack: 0,
    baseMDefence: 1,
    itemDropChance: 50,
    potionDropChance: 100,
  },
  {
    name: "Red Soldier",
    baseHp: 31,
    type: MonsterType.PHYSICAL,
    baseAttack: 4,
    baseDefence: 3,
    baseMAttack: 0,
    baseMDefence: 2,
    itemDropChance: 90,
    potionDropChance: 50,
  },
  {
    name: "Mage Warrior",
    baseHp: 29,
    type: MonsterType.MAGICAL,
    baseAttack: 0,
    baseDefence: 1,
    baseMAttack: 3,
    baseMDefence: 3,
    itemDropChance: 90,
    potionDropChance: 30,
  },
];
