import React, { useCallback, useEffect, useState } from "react";
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
  Button,
} from "react-native";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { Item, ItemAbility, ItemType } from "@/game/classes/classes";

import { ITEM_IMAGES } from "@/game/utils/assetMap";
import { generateConsumable, generateRandomItem } from "@/game/utils/itemUtils";
import ButtonWithText from "@/components/other/ButtonWithText";
import UseAndDiscardOverlay from "@/components/other/UseAndDiscardOverlay";
import ItemInfoView from "@/components/other/ItemInfo";

const CharacterInventory = () => {
  const [playerCharacter, setPlayerCharacter] = usePlayerCharacter();

  const [inventory, setInventory] = useState(playerCharacter?.inventory || []);
  const [itemInfo, setItemInfo] = useState<Item | null>(null);
  const [action, setAction] = useState<string | null>(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const removeItemAndUpdatePlayerState = useCallback(
    async (item: Item) => {
      if (playerCharacter) {
        const updatedPlayerCharacter = playerCharacter.clone();
        updatedPlayerCharacter.removeItemFromInventory(item);
        setPlayerCharacter(updatedPlayerCharacter);
        setItemInfo(null);
      }
    },
    [playerCharacter]
  );

  const useItemAndUpdatePlayerState = useCallback(
    async (item: Item) => {
      if (playerCharacter) {
        const updatedPlayerCharacter = playerCharacter.clone();
        updatedPlayerCharacter.equipGearItemAndRemoveItFromInventory(item);
        setPlayerCharacter(updatedPlayerCharacter);
        setItemInfo(null);
      }
    },
    [playerCharacter]
  );

  const closeOverlay = () => {
    setAction(null);
    setIsOverlayVisible(false);
  };

  const discardItem = useCallback(() => {
    setIsOverlayVisible(true);
    setAction("discard");
  }, [action, isOverlayVisible]);

  const useItem = useCallback(() => {
    setIsOverlayVisible(true);
    setAction("use");
  }, [action, isOverlayVisible]);

  const equipItem = useCallback(() => {
    setIsOverlayVisible(true);
    setAction("equip");
  }, [action, isOverlayVisible]);

  useEffect(() => {
    if (playerCharacter) {
      // Create a new instance of PlayerCharacter with the updated skill
      const updatedPlayerCharacter = playerCharacter.clone();
      const item = generateRandomItem(playerCharacter.level!);
      const consumable = generateConsumable(playerCharacter.level!);
      updatedPlayerCharacter.addItemToInventory(item);
      updatedPlayerCharacter.addItemToInventory(consumable);

      // Set the new instance as the state
      setPlayerCharacter(updatedPlayerCharacter);
    }
  }, [trigger]);

  return (
    <View style={{ marginTop: "2%" }}>
      <Button onPress={() => setTrigger(!trigger)} title="Gen" />
      <Text style={styles.titleText}>Inventory ({inventory.length}/20)</Text>

      <View
        // fadingEdgeLength={20}
        style={{
          marginStart: "10%",
          marginEnd: "10%",
          marginBottom: "10%",
          height: "50%",
        }}>
        <FlatList
          data={playerCharacter?.inventory}
          renderItem={({ item }) => (
            <Pressable onPress={() => setItemInfo(item)}>
              <View style={styles.listItem}>
                <View style={styles.itemView}>
                  <Image
                    width={64}
                    height={64}
                    source={
                      item?.assetFile
                        ? ITEM_IMAGES[
                            `${item.assetFile}` as keyof typeof ITEM_IMAGES
                          ]
                        : ""
                    }
                  />
                </View>
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

      {itemInfo !== null ? (
        <UseAndDiscardOverlay
          closeOverlay={closeOverlay}
          isOverlayVisible={isOverlayVisible}
          action={action}
          item={itemInfo}
          useItemAndUpdatePlayerState={useItemAndUpdatePlayerState}
          playerCharacter={playerCharacter}
          removeItemAndUpdatePlayerState={removeItemAndUpdatePlayerState}
        />
      ) : null}
      <View
        style={{
          flexDirection: "column",
          width: "75%",
          height: "45%",
          alignSelf: "center",
        }}>
        <ItemInfoView
          itemInfo={itemInfo}
          useItem={useItem}
          equipItem={equipItem}
          discardItem={discardItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 5,
    backgroundColor: "#999999",
    marginBottom: "3%",
    flexDirection: "row",
    alignItems: "center",
  },
  itemView: {
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 3,
    borderColor: "black",
    marginRight: 12,
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
    flex: 1,
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
  },
  itemSubtitleText: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "#ffffff",
  },
});
export default CharacterInventory;
