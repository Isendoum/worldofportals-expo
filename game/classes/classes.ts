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
