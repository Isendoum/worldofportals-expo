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

  const swapItems = (pos1: number, pos2: number) => {
    if (playerCharacter) {
      const updatedPlayerCharacter = playerCharacter.clone();
      updatedPlayerCharacter.swapItemsPositionInInventory(pos1, pos2);
      setPlayerCharacter(updatedPlayerCharacter);
      setItemInfo(null);
    }
  };

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

  return (
    <View style={{}}>
      <Text style={styles.titleText}>Inventory ({inventory.length}/20)</Text>

      <View
        // fadingEdgeLength={20}
        style={{
          marginStart: "10%",
          marginEnd: "10%",
          marginBottom: "10%",
          height: "40%",
        }}>
        <FlatList
          data={playerCharacter?.inventory}
          numColumns={4} // for example, 4 items in a row
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setItemInfo(item)}
              onLongPress={() => console.log("long press")}>
              <View style={styles.gridItem}>
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
  gridItem: {
    flex: 1,
    borderRadius: 2,
    margin: 2,
    borderWidth: 2,
    alignItems: "center",
    //justifyContent: "center",
  },
  listItemContent: {},
  titleText: {
    fontFamily: "FFFTusj",
    fontSize: 24,
    marginTop: 16,
    marginBottom: 8,
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
