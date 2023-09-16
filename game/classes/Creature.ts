import { generateUniqueId } from "@/utils/generalUtils";
import { MONSTER_IMAGES } from "../utils/assetMap";
import { getMonsterExperienceAward } from "../utils/expUtils";
import { monsterNames } from "../data/monsters";

export class Creature {
  constructor(
    public id?: string,
    public name?: string,
    public level?: number,
    public currentHp?: number,
    public maxHp?: number,
    public attack?: number,
    public defence?: number,
    public expRewards?: number,
    public goldRewards?: number,
    public asset?: any,
    public location?: MLocation
  ) {}

  static generateMonster(level: number) {
    const monster = new Creature();
    monster.id = generateUniqueId();
    const name = monsterNames[Math.floor(Math.random() * monsterNames.length)];
    monster.name = name;
    monster.maxHp = 100 * level;
    monster.currentHp = 100 * level;
    monster.attack = 1 + level;
    monster.defence = 1 + level;
    monster.level = level;
    monster.expRewards = getMonsterExperienceAward(level);
    monster.goldRewards = 100;
    const assetProp: string = name.replace(" ", "").toLocaleLowerCase();
    monster.asset = MONSTER_IMAGES[assetProp];
    return monster;
  }

  static generateMonsterWithLocation(level: number) {
    const monster = new Creature();
    monster.id = generateUniqueId();
    const name =
      monsterNames[Math.floor(Math.random() * monsterNames.length + 1)];
    monster.name = name;
    monster.maxHp = 100 * level;
    monster.currentHp = 100 * level;
    monster.attack = 1 + level;
    monster.defence = 1 + level;
    monster.level = level;
    monster.expRewards = getMonsterExperienceAward(level);
    monster.goldRewards = 100;
    const assetProp: string = monster.name.replace(" ", "").toLocaleLowerCase();
    monster.asset = MONSTER_IMAGES[assetProp];
    return monster;
  }
}

export interface MLocation {
  latitude: number;
  longitude: number;
}
