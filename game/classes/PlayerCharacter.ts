import { getNextLevelExperience } from "../utils/expUtils";
import {
  Career,
  CharacterRace,
  CharacterSkill,
  Gear,
  Item,
  ItemType,
  Quest,
} from "./classes";

export class PlayerCharacter {
  constructor(
    public name?: string,
    public maxHp?: number,
    public currentHp?: number,
    public defence?: number,
    public attack?: number,
    public magicAttack?: number,
    public magicDefence?: number,
    public speed?: number,
    public level?: number,
    public exp?: number,
    public expRequired?: number,
    public maxInnerPower?: number,
    public currentInnerPower?: number,
    public skillPoints?: number,
    public gear: Gear = new Gear(),
    public resourceName?: string,
    public characterSkills?: CharacterSkill[],
    public skill1?: CharacterSkill,
    public skill2?: CharacterSkill,
    public skill3?: CharacterSkill,
    public skill4?: CharacterSkill,
    public characterRace?: CharacterRace,
    public gold?: number,
    public questList?: Quest[],
    public inventory?: Item[],
    public career: Career = new Career()
  ) {
    this.resourceName = "Inner Power";

    // ... initialize other properties ...
  }

  // initialize a new character
  static characterInit(
    name: string,
    race: CharacterRace,
    startingSkills: CharacterSkill[]
  ) {
    const char = new PlayerCharacter();
    char.name = name;
    char.characterRace = race;
    char.characterSkills = [...startingSkills];
    char.level = 1;
    char.exp = 0;
    char.gold = 50;
    char.inventory = [];
    char.skillPoints = 0;
    char.expRequired = getNextLevelExperience(char.level);
    char.currentHp = char.getMaxHp();
    char.maxInnerPower = char.getMaxInnerPower();
    char.currentInnerPower = char.getMaxInnerPower();
    char.career = new Career();
    char.gear = new Gear();
    return char;
  }

  // deep copy constructor
  clone() {
    const cloned = new PlayerCharacter();
    // Copy over all properties from this instance to the cloned instance
    Object.assign(cloned, this);
    return cloned;
  }

  // add item to the inventory
  addItemToInventory(item: Item) {
    if (this.inventory) {
      if (this.inventory.length < 20) {
        if (item.itemType === ItemType.CONSUMABLE) {
          let itemInInve = this.inventory.find(
            (itemInv) => item.itemName === itemInv.itemName
          );
          if (itemInInve) {
            const index = this.inventory?.indexOf(itemInInve);
            this.inventory[index].quantity = this.inventory[index].quantity + 1;
          } else {
            this.inventory?.push(item);
          }
        } else {
          this.inventory?.push(item);
        }
      } else {
        if (item.itemType === ItemType.CONSUMABLE) {
          let itemInInve = this.inventory.find(
            (itemInv) => item.itemName === itemInv.itemName
          );
          if (itemInInve) {
            const index = this.inventory?.indexOf(itemInInve);
            this.inventory[index].quantity = this.inventory[index].quantity + 1;
          }
        }
      }
    }
  }

  //remove item from the inventory
  removeItemFromInventory(item: Item) {
    if (this.inventory && this.inventory.length > 0) {
      const index = this.inventory?.indexOf(item);

      this.inventory?.splice(index, 1);
    }
  }

  equipGearItemAndRemoveItFromInventory(item: Item) {
    switch (item.itemType) {
      case ItemType.WEAPON:
        if (this.gear?.weapon) {
          const equipedItem = this.gear.weapon;
          this.gear.weapon = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.weapon = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.OFFHAND:
        if (this.gear?.offHand) {
          const equipedItem = this.gear.offHand;
          this.gear.offHand = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.offHand = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.CHEST:
        if (this.gear?.chest) {
          const equipedItem = this.gear.chest;
          this.gear.chest = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.chest = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.HELMET:
        if (this.gear?.helmet) {
          const equipedItem = this.gear.helmet;
          this.gear.helmet = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.helmet = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.BOOTS:
        if (this.gear?.boots) {
          const equipedItem = this.gear.boots;
          this.gear.boots = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.boots = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.AMULET:
        if (this.gear?.amulet) {
          const equipedItem = this.gear.amulet;
          this.gear.amulet = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.amulet = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.RING:
        if (this.gear?.ring) {
          const equipedItem = this.gear.ring;
          this.gear.ring = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.ring = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.EARINGS:
        if (this.gear?.earings) {
          const equipedItem = this.gear.earings;
          this.gear.earings = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.earings = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.SHOULDERS:
        if (this.gear?.shoulders) {
          const equipedItem = this.gear.shoulders;
          this.gear.shoulders = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.shoulders = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.GLOVES:
        if (this.gear?.gloves) {
          const equipedItem = this.gear.gloves;
          this.gear.gloves = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            this.gear.gloves = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.PANTS:
        if (this.gear?.pants) {
          console.log("PANTS");
          const equipedItem = this.gear.pants;
          this.gear.pants = item;
          this.removeItemFromInventory(item);
          this.inventory?.push(equipedItem);
        } else {
          if (this.gear) {
            console.log("PANTS else");
            this.gear.pants = item;
            this.removeItemFromInventory(item);
          }
        }
        break;
      case ItemType.CONSUMABLE:
        this.useConsumable(item);
        break;
    }
  }

  useConsumable(item: Item) {
    //switch that decides what the consumable will do
    switch (item.itemName) {
      case "Hp potion":
        if (this.currentHp && item.itemAbility) {
          if (
            this.currentHp + item.itemAbility?.abilityModifier >
            this.getMaxHp()
          ) {
            this.currentHp = this.getMaxHp();
          } else {
            this.currentHp = this.currentHp + item.itemAbility?.abilityModifier;
          }
        }
        break;
    }
    item.quantity = item.quantity - 1;
    if (item.quantity === 0 && this.inventory) {
      const index = this.inventory?.indexOf(item);

      this.inventory?.splice(index, 1);
    }
  }

  getCurrentHp() {
    return this.currentHp;
  }

  getMaxHp(): number {
    let gearHpSum =
      (this.gear?.weapon?.hpModifier || 0) +
      (this.gear?.offHand?.hpModifier || 0) +
      (this.gear?.helmet?.hpModifier || 0) +
      (this.gear?.chest?.hpModifier || 0) +
      (this.gear?.gloves?.hpModifier || 0) +
      (this.gear?.pants?.hpModifier || 0) +
      (this.gear?.shoulders?.hpModifier || 0) +
      (this.gear?.boots?.hpModifier || 0) +
      (this.gear?.amulet?.hpModifier || 0) +
      (this.gear?.ring?.hpModifier || 0) +
      (this.gear?.earings?.hpModifier || 0);

    return (this.characterRace?.hp || 0) + gearHpSum;
  }

  getDefence(): number {
    let gearDefenceSum =
      (this.gear?.weapon?.defenceModifier || 0) +
      (this.gear?.offHand?.defenceModifier || 0) +
      (this.gear?.helmet?.defenceModifier || 0) +
      (this.gear?.chest?.defenceModifier || 0) +
      (this.gear?.gloves?.defenceModifier || 0) +
      (this.gear?.pants?.defenceModifier || 0) +
      (this.gear?.shoulders?.defenceModifier || 0) +
      (this.gear?.boots?.defenceModifier || 0) +
      (this.gear?.amulet?.defenceModifier || 0) +
      (this.gear?.ring?.defenceModifier || 0) +
      (this.gear?.earings?.defenceModifier || 0);

    return (this.characterRace?.defence || 0) + gearDefenceSum;
  }

  getAttack(): number {
    let gearAttackSum =
      (this.gear?.weapon?.attackModifier || 0) +
      (this.gear?.offHand?.attackModifier || 0) +
      (this.gear?.helmet?.attackModifier || 0) +
      (this.gear?.chest?.attackModifier || 0) +
      (this.gear?.gloves?.attackModifier || 0) +
      (this.gear?.pants?.attackModifier || 0) +
      (this.gear?.shoulders?.attackModifier || 0) +
      (this.gear?.boots?.attackModifier || 0) +
      (this.gear?.amulet?.attackModifier || 0) +
      (this.gear?.ring?.attackModifier || 0) +
      (this.gear?.earings?.attackModifier || 0);

    return (this.characterRace?.attack || 0) + gearAttackSum;
  }

  getMagicDefence(): number {
    let gearMagicDefenceSum =
      (this.gear?.weapon?.magicDefenceModifier || 0) +
      (this.gear?.offHand?.magicDefenceModifier || 0) +
      (this.gear?.helmet?.magicDefenceModifier || 0) +
      (this.gear?.chest?.magicDefenceModifier || 0) +
      (this.gear?.gloves?.magicDefenceModifier || 0) +
      (this.gear?.pants?.magicDefenceModifier || 0) +
      (this.gear?.shoulders?.magicDefenceModifier || 0) +
      (this.gear?.boots?.magicDefenceModifier || 0) +
      (this.gear?.amulet?.magicDefenceModifier || 0) +
      (this.gear?.ring?.magicDefenceModifier || 0) +
      (this.gear?.earings?.magicDefenceModifier || 0);

    return (this.characterRace?.magicDefence || 0) + gearMagicDefenceSum;
  }

  getMagicAttack(): number {
    let gearMagicAttackSum =
      (this.gear?.weapon?.magicAttackModifier || 0) +
      (this.gear?.offHand?.magicAttackModifier || 0) +
      (this.gear?.helmet?.magicAttackModifier || 0) +
      (this.gear?.chest?.magicAttackModifier || 0) +
      (this.gear?.gloves?.magicAttackModifier || 0) +
      (this.gear?.pants?.magicAttackModifier || 0) +
      (this.gear?.shoulders?.magicAttackModifier || 0) +
      (this.gear?.boots?.magicAttackModifier || 0) +
      (this.gear?.amulet?.magicAttackModifier || 0) +
      (this.gear?.ring?.magicAttackModifier || 0) +
      (this.gear?.earings?.magicAttackModifier || 0);

    return (this.characterRace?.magicAttack || 0) + gearMagicAttackSum;
  }

  getMaxInnerPower(): number {
    return this.characterRace?.innerPower || 0;
  }

  assignSkillToSlot(skill: CharacterSkill, slot: number) {
    switch (slot) {
      case 1:
        this.skill1 = skill;
        break;
      case 2:
        this.skill2 = skill;
        break;
      case 3:
        this.skill3 = skill;
        break;
      case 4:
        this.skill4 = skill;
        break;
    }
  }

  // Convert the class instance to a JSON string
  serialize(): string {
    return JSON.stringify(this);
  }

  addAndCheckExp(exp: number) {
    const expWithAward = (this.exp || 0) + exp;
    if (expWithAward >= this.expRequired!) {
      this.level = this.level! + 1;
      const remainingExp = expWithAward - this.expRequired!;
      this.exp = remainingExp;
      this.currentHp = this.getMaxHp();
      if (remainingExp > 0) {
        this.addAndCheckExp(remainingExp);
      }
    } else {
      this.exp = expWithAward;
    }
  }

  // Create a new class instance from a JSON string
  static deserialize(json: string): PlayerCharacter {
    const obj: PlayerCharacter = JSON.parse(json);
    const player = new PlayerCharacter(
      obj.name,
      obj.maxHp,
      obj.currentHp,
      obj.defence,
      obj.attack,
      obj.magicAttack,
      obj.magicDefence,
      obj.speed,
      obj.level,
      obj.exp,
      obj.expRequired,
      obj.maxInnerPower,
      obj.currentInnerPower,
      obj.skillPoints,
      obj.gear,
      obj.resourceName,
      obj.characterSkills,
      obj.skill1,
      obj.skill2,
      obj.skill3,
      obj.skill4,
      obj.characterRace,
      obj.gold,
      obj.questList,
      obj.inventory,
      obj.career
    );
    // ... assign other properties from obj to player ...
    return player;
  }
}
