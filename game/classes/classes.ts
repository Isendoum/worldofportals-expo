import { generateUniqueId } from "@/utils/generalUtils";
import { MONSTER_IMAGES } from "../utils/assetMap";
import {
  calculateAttackOnMonster,
  calculateAttackOnPlayer,
} from "../utils/battleUtils";
import {
  getMonsterExperienceAward,
  getNextLevelExperience,
} from "../utils/expUtils";
import { PlayerCharacter } from "./PlayerCharacter";
import { monsterNames } from "../data/monsters";

export class Gear {
  constructor(
    public weapon?: Item,
    public offHand?: Item,
    public chest?: Item,
    public helmet?: Item,
    public boots?: Item,
    public amulet?: Item,
    public ring?: Item,
    public earings?: Item,
    public shoulders?: Item,
    public gloves?: Item,
    public pants?: Item
  ) {}
}

export enum ItemType {
  WEAPON = "WEAPON",
  OFFHAND = "OFFHAND",
  CHEST = "CHEST",
  HELMET = "HELMET",
  BOOTS = "BOOTS",
  AMULET = "AMULET",
  RING = "RING",
  EARINGS = "EARINGS",
  SHOULDERS = "SHOULDERS",
  GLOVES = "GLOVES",
  PANTS = "PANTS",
  CONSUMABLE = "CONSUMABLE",
}
export class Item {
  constructor(
    public _id: string,
    public itemName: string,
    public itemType: ItemType,
    public quantity: number,
    public levelRequired: number,
    public defenceModifier: number,
    public attackModifier: number,
    public magicDefenceModifier: number,
    public magicAttackModifier: number,
    public hpModifier: number,
    public goldValue: number,
    public itemAbility?: ItemAbility,
    public assetFile?: string
  ) {}
}

export class CharacterSkill {
  constructor(
    public id: string | number,
    public characterSkillName: string,
    public characterSkillType: string,
    public skillDescription: string,
    public characterSkillModifier: number,
    public skillLevel: number,
    public skillMaxLevel: number,
    public innerPowerConsume: number,
    public skillRank: string,
    public buffedTurnsRemaining: number,
    public crystalCost: number
  ) {}
}

export class CharacterRace {
  constructor(
    public raceName?: string,
    public statModifier?: number,
    public hp?: number,
    public attack?: number,
    public defence?: number,
    public magicAttack?: number,
    public magicDefence?: number,
    public speed?: number,
    public innerPower?: number
  ) {}
}

export class Battle {
  constructor(
    public playerCharacter?: PlayerCharacter,
    public creature?: Creature,
    public turn: number = 1,
    public battleMessage: string = "Battle starting",
    public battleState: string = "player"
  ) {
    this.playerCharacter = playerCharacter;
    this.creature = creature;
    this.battleState = battleState;
  }

  playerAttack(skill: CharacterSkill | undefined) {
    if (skill && this.creature?.currentHp) {
      const attackDamage = calculateAttackOnMonster(this, skill);
      const projectedCreatureHp = this.creature?.currentHp - attackDamage;
      if (projectedCreatureHp <= 0) {
        this.creature.currentHp = 0;
        this.battleState = "end";
        this.battleMessage = `${this.playerCharacter?.name} wins!`;
      } else {
        this.creature.currentHp = projectedCreatureHp;
        this.battleState = "monster";
        this.battleMessage = `${this.creature.name} turn!`;
        this.turn = this.turn + 1;
      }
    }
  }
  monsterAttack() {
    if (this.playerCharacter?.currentHp) {
      const attackDamage = calculateAttackOnPlayer(this);
      const projectedPlayerHp = this.playerCharacter?.currentHp - attackDamage;
      if (projectedPlayerHp <= 0) {
        this.playerCharacter.currentHp = 0;
        this.battleState = "end";
        this.battleMessage = `${this.playerCharacter?.name} loses!`;
      } else {
        this.playerCharacter.currentHp = projectedPlayerHp;
        this.battleState = "player";
        this.battleMessage = `${this.playerCharacter.name} turn!`;
        this.turn = this.turn + 1;
      }
    }
  }

  clone() {
    const cloned = new Battle();
    // Copy over all properties from this instance to the cloned instance
    Object.assign(cloned, this);
    return cloned;
  }
}

export interface MLocation {
  latitude: number;
  longitude: number;
}

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
    console.log(name);
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

export class Quest {
  constructor(
    public _id: string,
    public name: string,
    public description: string,
    public objectiveList: Objective[],
    public questLevel: number,
    public exp: number,
    public gold: number,
    public itemRewards: Item[],
    public isQuestCompleted: boolean,
    public questTypeEnum: string
  ) {}
}

export class Objective {
  constructor(
    public description: string,
    public objectiveTypeEnum: string,
    public isCompleted: boolean,
    public maxTasks: number,
    public tasksDone: number
  ) {}
}

export class Career {
  constructor(
    public distanceTraveled?: number,
    public creaturesKilled?: number,
    public bossesKilled?: number,
    public currentValorTowerFloor?: number,
    public topValorTowerFloor?: number,
    public totalGoldAcquired?: number,
    public totalGoldSpent?: number,
    public totalDeaths?: number,
    public totalLootedItems?: number,
    public valorTowerAvailableResets?: number
  ) {
    this.distanceTraveled = 0;
    this.creaturesKilled = 0;
    this.bossesKilled = 0;
    this.currentValorTowerFloor = 0;
    this.topValorTowerFloor = 0;
    this.totalGoldAcquired = 0;
    this.totalGoldSpent = 0;
    this.totalDeaths = 0;
    this.totalLootedItems = 0;
    this.valorTowerAvailableResets = 0;
  }
}

export class ItemAbility {
  constructor(
    public abilityDescription: string,
    public abilityModifier: number
  ) {}
}
