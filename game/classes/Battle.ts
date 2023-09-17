import {
  calculateAttackOnMonster,
  calculateAttackOnPlayer,
} from "../utils/battleUtils";
import { Creature } from "./Creature";
import { PlayerCharacter } from "./PlayerCharacter";
import { CharacterSkill } from "./classes";

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
      const innerPowerConsumed =
        (skill.innerPowerConsume / 100) *
        this.playerCharacter?.getMaxInnerPower()!;
      if (this.playerCharacter?.currentInnerPower) {
        this.playerCharacter.currentInnerPower =
          (this.playerCharacter?.currentInnerPower || 0) - innerPowerConsumed;
      }

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
    let playerClone = this.playerCharacter?.clone();
    this.playerCharacter = playerClone;
    // Copy over all properties from this instance to the cloned instance
    Object.assign(cloned, this);
    return cloned;
  }
}
