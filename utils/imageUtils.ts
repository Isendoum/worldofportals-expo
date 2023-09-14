import { ITEM_IMAGES } from "@/game/utils/assetMap";

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
