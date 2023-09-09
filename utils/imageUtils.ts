import { ITEM_IMAGES } from "@/game/utils/assetMap";

// export function findImage(name: string | undefined) {
//   if (name === undefined) {
//     return require("../assets/Items/generic.png");
//   } else if (name?.includes("Weapon")) {
//     const num = Math.floor(Math.random() * 2);
//     return ITEM_IMAGES[`Sword${num}` as keyof typeof ITEM_IMAGES];
//   } else if (name?.includes("Boots")) {
//     return require("../assets/Items/rustyBoots.png");
//   } else if (name?.includes("Helmet")) {
//     return require("../assets/Items/helmet.png");
//   } else if (name?.includes("Shield")) {
//     return require("../assets/Items/shieldSmall.png");
//   } else if (name?.includes("Chest")) {
//     return require("../assets/Items/chest.png");
//   } else if (name?.includes("Gloves")) {
//     return require("../assets/Items/rustyGloves.png");
//   } else if (name?.includes("Pants")) {
//     return require("../assets/Items/pants.png");
//   } else if (name?.includes("Ring")) {
//     return require("../assets/Items/rustyRing.png");
//   } else if (name === "Potion") {
//     return require("../assets/Items/potion.png");
//   } else if (name === "Ip Potion") {
//     return require("../assets/Items/ippotion.png");
//   } else if (name === "Attack") {
//     return require("../assets/skills/attack.png");
//   } else if (name === "Wild Swing") {
//     return require("../assets/skills/wildSwing.png");
//   } else if (name === "Arcane Bolt") {
//     return require("../assets/skills/arcaneBolt.png");
//   } else if (name === "Magic Attack") {
//     return require("../assets/skills/magicAttack.png");
//   } else if (name === "Healing Touch") {
//     return require("../assets/skills/healingTouch.png");
//   } else if (name === "Burst of Power") {
//     return require("../assets/skills/burstOfPower.png");
//   } else {
//     return require("../assets/Items/generic.png");
//   }
// }

export function findSkillImage(name: string | undefined) {
  switch (name) {
    case undefined:
      "../assets/Items/generic.png";
      return;
    case "Attack":
      return require("../assets/skills/attack.png");
    case "Wild Swing":
      return require("../assets/skills/wildSwing.png");
    case "Arcane Bolt":
      return require("../assets/skills/arcaneBolt.png");
    case "Magic Attack":
      return require("../assets/skills/magicAttack.png");
    case "Healing Touch":
      return require("../assets/skills/healingTouch.png");
    case "Burst of Power":
      return require("../assets/skills/burstOfPower.png");
    default:
      return require("../assets/Items/generic.png");
  }
}
