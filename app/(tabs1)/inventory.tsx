import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Pressable,
  Modal,
} from "react-native";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { Item, ItemAbility, ItemType } from "@/game/classes/classes";
import { findImage } from "@/utils/imageUtils";
import { findGearItem } from "@/utils/gearUtils";

const CharacterInventory = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();

  const [inventory, setInventory] = useState(playerCharacter?.inventory || []);
  const [itemInfo, setItemInfo] = useState(null);
  const [action, setAction] = useState<string | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const removeItemAndUpdatePlayerState = async (item) => {
    if (playerCharacter) {
      const updatedPlayerCharacter = playerCharacter.clone();
      updatedPlayerCharacter.removeItemFromInventory(item);
      setPlayerCharacter(updatedPlayerCharacter);
    }
  };

  const useItemAndUpdatePlayerState = async (item) => {
    if (playerCharacter) {
      const updatedPlayerCharacter = playerCharacter.clone();
      updatedPlayerCharacter.equipGearItemAndRemoveItFromInventory(item);
      setPlayerCharacter(updatedPlayerCharacter);
    }
  };

  const closeOverlay = () => {
    setAction(null);
    setIsOverlayVisible(false);
  };

  const useAndDiscardOverlay = (item) => {
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
            <Text>Use {item.itemName}?</Text>
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <TouchableOpacity onPress={closeOverlay}>
                <Text>cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  useItemAndUpdatePlayerState(item);
                  closeOverlay();
                }}>
                <Text>use</Text>
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
              {item.defenceModifier - (equipedItem?.defenceModifier || 0)}{" "}
              Defence{" "}
            </Text>
            <Text style={styles.overlayText}>
              {item.magicAttackModifier -
                (equipedItem?.magicAttackModifier || 0)}{" "}
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
              paddingStart: "10%",
              paddingEnd: "10%",
              paddingBottom: "10%",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
            }}>
            <Text style={styles.itemNameText}>Discard {item.itemName}?</Text>
            <View
              style={{
                flex: 0,
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

  const itemInfoComponent = () => {
    if (itemInfo === null) {
      return (
        <View style={{ alignContent: "center", alignItems: "center" }}>
          <Text style={{ ...styles.itemNameText }}>no item selected</Text>
        </View>
      );
    } else {
      return itemInfoBasedOnItemType(itemInfo);
    }
  };

  const itemInfoBasedOnItemType = (item) => {
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
            }}>
            <Text style={styles.itemSubtitleText}>
              Lvl required: {item.levelRequired}
            </Text>
            <Text style={styles.itemSubtitleText}>
              Sell value: {item.goldValue} g.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={() => {
                setIsOverlayVisible(true);
                setAction("discard");
              }}>
              <Text style={styles.equipDiscardText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOverlayVisible(true);
                setAction("equip");
              }}>
              <Text style={styles.equipDiscardText}>Equip</Text>
            </TouchableOpacity>
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
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TouchableOpacity
              onPress={() => {
                setIsOverlayVisible(true);
                setAction("discard");
              }}>
              <Text style={styles.equipDiscardText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsOverlayVisible(true);
                setAction("use");
              }}>
              <Text style={styles.equipDiscardText}>Use</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  //   useEffect(() => {
  //     if (playerCharacter) {
  //       // Create a new instance of PlayerCharacter with the updated skill
  //       const updatedPlayerCharacter = playerCharacter.clone();
  //       const item = new Item(
  //         "123129",
  //         "Helmet",
  //         ItemType.HELMET,
  //         1,
  //         1,
  //         1,
  //         2,
  //         4,
  //         1,
  //         1,
  //         1
  //       );
  //       updatedPlayerCharacter.addItemToInventory(item);

  //       // Set the new instance as the state
  //       setPlayerCharacter(updatedPlayerCharacter);
  //     }
  //   }, []);

  return (
    <View style={{ flex: 1, marginTop: "10%" }}>
      <Text style={styles.titleText}>Inventory ({inventory.length}/20)</Text>

      <View
        // fadingEdgeLength={20}
        style={{
          marginStart: "10%",
          marginEnd: "10%",
          marginBottom: "10%",
          height: "55%",
        }}>
        <FlatList
          data={playerCharacter?.inventory}
          renderItem={({ item }) => (
            <Pressable onPress={() => setItemInfo(item)}>
              <View style={styles.listItem}>
                <Image source={findImage(item.itemName)} />
                <Text style={styles.itemNameText}>
                  {item.itemName}
                  {item.itemType === ItemType.CONSUMABLE ? (
                    <Text> x{item.quantity}</Text>
                  ) : null}
                </Text>
              </View>
            </Pressable>
          )}
        />
      </View>

      {itemInfo !== null ? useAndDiscardOverlay(itemInfo) : null}
      <View
        style={{
          flexDirection: "column",
          width: "75%",
          height: "45%",
          alignSelf: "center",
        }}>
        {itemInfoComponent()}
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {
    borderRadius: 5,
    backgroundColor: "#FFF8DC",
    alignSelf: "center",
  },
  listItem: {
    borderRadius: 5,
    backgroundColor: "#999999",
    marginBottom: "3%",
  },
  listItemContent: {},
  titleText: {
    fontFamily: "FFFTusj",
    fontSize: 24,
    marginBottom: 5,
    alignSelf: "center",
    color: "#F0F8FF",
  },
  itemNameText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 20,
  },
  itemSubtitleText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "#ffffff",
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
  bottomSheetButton: {
    fontSize: 20,
    fontFamily: "RomanAntique",
    color: "#ffffff",
  },
});
export default CharacterInventory;
