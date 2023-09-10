import { Item, ItemAbility, ItemType } from "../classes/classes";

export const ItemTypeDisplayNames = {
  [ItemType.WEAPON]: "Weapon",
  [ItemType.OFFHAND]: "Offhand",
  [ItemType.CHEST]: "Chest",
  [ItemType.HELMET]: "Helmet",
  [ItemType.BOOTS]: "Boots",
  [ItemType.AMULET]: "Amulet",
  [ItemType.RING]: "Ring",
  [ItemType.SHOULDERS]: "Shoulders",
  [ItemType.EARINGS]: "Earings",
  [ItemType.GLOVES]: "Gloves",
  [ItemType.PANTS]: "Pants",
  [ItemType.CONSUMABLE]: "Hp potion",
};

const getAssetType = (itemType: ItemType) => {
  switch (itemType) {
    case ItemType.WEAPON:
      const num = Math.floor(Math.random() * 2);
      return `sword${num}`;
    case ItemType.OFFHAND:
      return "shield";
    case ItemType.CHEST:
      return "chest";
    case ItemType.HELMET:
      return "helmet";
    case ItemType.BOOTS:
      return "boots";
    case ItemType.AMULET:
      return "amulet";
    case ItemType.RING:
      return "ring";
    case ItemType.SHOULDERS:
      return "shoulders";
    case ItemType.GLOVES:
      return "gloves";
    case ItemType.PANTS:
      return "pants";
    case ItemType.EARINGS:
      return "earrings";
    case ItemType.CONSUMABLE:
      return "hppotion";
  }
};

export function generateRandomItem(level: number) {
  // Exclude CONSUMABLE from the random selection
  const itemTypes: ItemType[] = Object.values(ItemType).filter(
    (type) => type !== ItemType.CONSUMABLE
  );
  const randomType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
  const factor = 2;
  const randomRange = level;
  // Generate random stats based on level (you can adjust the formula as needed)
  const defenceModifier = Math.floor(
    level * factor * Math.random() + randomRange
  );
  const attackModifier = Math.floor(
    level * factor * Math.random() + randomRange
  );
  const magicDefenceModifier = Math.floor(
    level * factor * Math.random() + randomRange
  );
  const magicAttackModifier = Math.floor(
    level * factor * Math.random() + randomRange
  );
  const hpModifier = Math.floor(level * factor * Math.random() + randomRange);

  // Calculate average
  const average =
    (defenceModifier +
      attackModifier +
      magicDefenceModifier +
      magicAttackModifier +
      hpModifier) /
    5;

  // Determine quality based on average
  let quality;
  if (average <= level * 0.33) {
    quality = "Rusty";
  } else if (average <= level * 0.66) {
    quality = "Fine";
  } else {
    quality = "Exceptional";
  }

  // Construct item name
  const itemName = `${quality} ${ItemTypeDisplayNames[randomType]}`;
  // Generate a gold value (for demonstration purposes, you can adjust as needed)
  const goldValue = Math.floor(level * 10 + average * 5);
  const id = generateUniqueId();
  const num = Math.floor(Math.random() * 2);
  const assetFile = getAssetType(randomType);

  // Create and return the new item
  return new Item(
    id,
    itemName,
    randomType,
    1,
    level,
    defenceModifier,
    attackModifier,
    magicDefenceModifier,
    magicAttackModifier,
    hpModifier,
    goldValue,
    undefined,
    assetFile
  );
}

export const generateConsumable = (level: number) => {
  const type = ItemType.CONSUMABLE;
  // Construct item name
  const itemName = `${ItemTypeDisplayNames[type]}`;
  // Generate a gold value (for demonstration purposes, you can adjust as needed)
  const goldValue = Math.floor(level * 10 + 1 * 5);
  const id = generateUniqueId();

  const assetFile = getAssetType(type);
  const itemAbilityModifier = level * 10;
  const itemAbility = new ItemAbility(
    `Hp potion that heals for ${itemAbilityModifier} the player`,
    itemAbilityModifier
  );
  // Create and return the new item
  return new Item(
    id,
    itemName,
    type,
    1,
    level,
    0, // defenceModifier,
    0, // attackModifier,
    0, // magicDefenceModifier,
    0, // magicAttackModifier,
    0, // hpModifier,
    goldValue,
    itemAbility,
    assetFile
  );
};

function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
}
