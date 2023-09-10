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
  const award =
    Math.floor(
      getNextLevelExperience(monsterLevel) /
        getMonstersNeededForLevelUp(monsterLevel)
    ) + 150;
  return award;
}
