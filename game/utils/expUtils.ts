const a = 500;
const b = 120;
const c = 1000;

export function getNextLevelExperience(level: number): number {
  if (level < 1 || level >= 100) {
    throw new Error("Level must be between 1 and 99 inclusive.");
  }

  return a * level * level + b * level + c;
}

export function getMonstersNeededForLevelUp(level: number): number {
  const d = 15;
  const e = 1;

  return d * level + e;
}

export function getMonsterExperienceAward(monsterLevel: number): number {
  return Math.floor(
    getNextLevelExperience(monsterLevel) /
      getMonstersNeededForLevelUp(monsterLevel)
  );
}

// for (let index = 1; index < 100; index++) {
//   const expNeeded = getNextLevelExperience(index);
//   const monsterNeeded = getMonstersNeededForLevelUp(index);
//   const monsterExperience = getMonsterExperienceAward(index);
//   console.log(`Level ${index}`, expNeeded);
//   console.log(`Monsters needed in level: ${index} is ${monsterNeeded}`);
//   console.log(`Monsters level ${index} exp awards: ${monsterExperience}`);
// }
