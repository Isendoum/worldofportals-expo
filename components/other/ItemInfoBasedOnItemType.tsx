import { ItemType, Item } from "@/game/classes/classes";
import { StyleSheet, Text, View } from "react-native";
import ButtonWithText from "./ButtonWithText";

const ItemInfoBasedOnItemType = ({
  item,
  discardItemCallback,
  useItemCallback,
  equipItemCallback,
}: {
  item: Item;
  discardItemCallback: () => void;
  useItemCallback: () => void;
  equipItemCallback: () => void;
}) => {
  if (
    item.itemType === ItemType.PANTS ||
    item.itemType === ItemType.BOOTS ||
    item.itemType === ItemType.HELMET ||
    item.itemType === ItemType.CHEST ||
    item.itemType === ItemType.SHOULDERS ||
    item.itemType === ItemType.GLOVES ||
    item.itemType === ItemType.WEAPON ||
    item.itemType === ItemType.AMULET ||
    item.itemType === ItemType.RING ||
    item.itemType === ItemType.EARINGS ||
    item.itemType === ItemType.OFFHAND
  ) {
    return (
      <View style={styles.listItemContent}>
        <Text style={styles.itemNameText}>{item.itemName}</Text>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.itemSubtitleText}>{item.hpModifier} Hp</Text>
            <Text style={styles.itemSubtitleText}>
              {item.attackModifier} Att.
            </Text>
            <Text style={styles.itemSubtitleText}>
              {item.defenceModifier} Def
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={styles.itemSubtitleText}>
              {item.magicAttackModifier} M. Att.
            </Text>
            <Text style={styles.itemSubtitleText}>
              {item.magicDefenceModifier} M. Def.
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 8,
          }}>
          <Text style={styles.itemSubtitleText}>
            Lvl required: {item.levelRequired}
          </Text>
          <Text style={styles.itemSubtitleText}>
            Sell value: {item.goldValue} g.
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}>
          <ButtonWithText buttonText="Discard" callback={discardItemCallback} />
          <ButtonWithText buttonText="Equip" callback={equipItemCallback} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.listItemContent}>
        <Text style={styles.itemNameText}>
          {item.itemName} x{item.quantity}
        </Text>
        <Text style={styles.itemSubtitleText}>
          {item.itemAbility?.abilityDescription}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ButtonWithText buttonText="Discard" callback={discardItemCallback} />
          <ButtonWithText buttonText="Use" callback={useItemCallback} />
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listItemContent: {},

  itemNameText: {
    textAlign: "center",
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 22,
    marginBottom: 6,
    color: "#ffffff",
  },
  itemSubtitleText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "#ffffff",
  },
});

export default ItemInfoBasedOnItemType;
