import { generateUniqueId } from "@/utils/generalUtils";
import { MONSTER_IMAGES } from "../utils/assetMap";
import { getMonsterExperienceAward } from "../utils/expUtils";
import { MonsterType, monsterTemplate } from "../data/monsters";

export class Creature {
  constructor(
    public id?: string,
    public name?: string,
    public level?: number,
    public currentHp?: number,
    public maxHp?: number,
    public attack?: number,
    public defence?: number,
    public MagicAttack?: number,
    public MagicDefence?: number,
    public expRewards?: number,
    public goldRewards?: number,
    public asset?: any,
    public location?: MLocation,
    public monsterType?: MonsterType
  ) {}

  static generateMonster(level: number) {
    const monster = new Creature();
    monster.id = generateUniqueId();
    // get a monster template
    const monTemplate =
      monsterTemplate[Math.floor(Math.random() * monsterTemplate.length)];
    const name = monTemplate.name;
    monster.name = name;
    monster.monsterType = monTemplate.type;
    monster.maxHp = monTemplate.baseHp * level;
    monster.currentHp = monTemplate.baseHp * level;
    monster.attack = 1 + level;
    monster.defence = 1 + level;
    monster.MagicAttack = 1 + level;
    monster.MagicDefence = 1 + level;
    monster.level = level;
    monster.expRewards = getMonsterExperienceAward(level);
    monster.goldRewards = 100;
    const assetProp: string = name.replace(" ", "").toLocaleLowerCase();
    monster.asset = MONSTER_IMAGES[assetProp];
    return monster;
  }
}

export interface MLocation {
  latitude: number;
  longitude: number;
}