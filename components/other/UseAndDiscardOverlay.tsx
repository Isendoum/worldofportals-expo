import { PlayerCharacter } from "@/game/classes/PlayerCharacter";
import { Item } from "@/game/classes/classes";
import { findGearItem } from "@/utils/gearUtils";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UseAndDiscardOverlay = ({
  closeOverlay,
  isOverlayVisible,
  action,
  item,
  useItemAndUpdatePlayerState,
  playerCharacter,
  removeItemAndUpdatePlayerState,
}: {
  closeOverlay: () => void;
  isOverlayVisible: boolean;
  action: string | null;
  item: Item;
  useItemAndUpdatePlayerState: (item: Item) => void;
  playerCharacter: PlayerCharacter | null;
  removeItemAndUpdatePlayerState: (item: Item) => void;
}) => {
  if (action === "use") {
    return (
      <Modal onRequestClose={closeOverlay} visible={isOverlayVisible}>
        <View
          style={{
            backgroundColor: "#606060",
            paddingStart: "10%",
            paddingEnd: "10%",
            paddingBottom: "10%",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
          }}>
          <Text style={styles.overlayQuestion}>Use {item.itemName}?</Text>
          <View
            style={{
              marginTop: 15,
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity onPress={closeOverlay}>
              <Text style={styles.equipDiscardText}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                useItemAndUpdatePlayerState(item);
                closeOverlay();
              }}>
              <Text style={styles.equipDiscardText}>use</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else if (action === "equip") {
    const equipedItem = findGearItem(item.itemType, playerCharacter?.gear);
    return (
      <Modal onRequestClose={closeOverlay} visible={isOverlayVisible}>
        <View
          style={{
            backgroundColor: "#606060",
            paddingStart: "10%",
            paddingEnd: "10%",
            paddingBottom: "10%",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
          }}>
          <Text style={styles.overlayQuestion}>Equip {item.itemName}?</Text>
          <Text style={styles.overlayText}>
            {item.attackModifier - (equipedItem?.attackModifier || 0)} Attack{" "}
          </Text>
          <Text style={styles.overlayText}>
            {item.hpModifier - (equipedItem?.hpModifier || 0)} Hp{" "}
          </Text>
          <Text style={styles.overlayText}>
            {item.defenceModifier - (equipedItem?.defenceModifier || 0)} Defence{" "}
          </Text>
          <Text style={styles.overlayText}>
            {item.magicAttackModifier - (equipedItem?.magicAttackModifier || 0)}{" "}
            M.Attack{" "}
          </Text>
          <Text style={styles.overlayText}>
            {item.magicDefenceModifier -
              (equipedItem?.magicDefenceModifier || 0)}{" "}
            M.Defence{" "}
          </Text>
          <View
            style={{
              flex: 0,
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
            }}>
            <TouchableOpacity onPress={closeOverlay}>
              <Text style={styles.equipDiscardText}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                useItemAndUpdatePlayerState(item);
                closeOverlay();
              }}>
              <Text style={styles.equipDiscardText}>equip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  } else {
    return (
      <Modal onRequestClose={closeOverlay} visible={isOverlayVisible}>
        <View
          style={{
            backgroundColor: "#606060",
            paddingStart: "5%",
            paddingEnd: "5%",
            paddingBottom: "10%",
            justifyContent: "center",
            flex: 1,
            flexDirection: "column",
          }}>
          <Text style={styles.itemNameDiscardText}>
            Discard {item.itemName}?
          </Text>

          <View
            style={{
              //  flex: 1,
              marginTop: 12,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            <TouchableOpacity onPress={closeOverlay}>
              <Text style={styles.equipDiscardText}>cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                removeItemAndUpdatePlayerState(item);
                closeOverlay();
              }}>
              <Text style={styles.equipDiscardText}>discard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 5,
    backgroundColor: "#FFF8DC",
    alignSelf: "center",
  },

  itemNameDiscardText: {
    // flex: 1,
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
  },

  equipDiscardText: {
    flexDirection: "column",
    fontFamily: "FFFTusj",
    fontSize: 18,
    color: "#000000",
  },
  overlayQuestion: {
    flexDirection: "column",
    fontFamily: "GranthamRoman",
    fontSize: 18,
    color: "#000000",
  },
  overlayText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "#000000",
  },
});

export default UseAndDiscardOverlay;
