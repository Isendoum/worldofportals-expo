import { Gear, ItemType } from "@/game/classes/classes";

export function findGearItem(itemType: ItemType, playerGear: Gear) {
  switch (itemType) {
    case ItemType.WEAPON:
      return playerGear.weapon;

    case ItemType.OFFHAND:
      return playerGear.offHand;

    case ItemType.HELMET:
      return playerGear.helmet;

    case ItemType.CHEST:
      return playerGear.chest;

    case ItemType.GLOVES:
      return playerGear.gloves;

    case ItemType.PANTS:
      return playerGear.pants;

    case ItemType.SHOULDERS:
      return playerGear.shoulders;

    case ItemType.BOOTS:
      return playerGear.boots;

    case ItemType.AMULET:
      return playerGear.amulet;

    case ItemType.RING:
      return playerGear.ring1;
  }
}
