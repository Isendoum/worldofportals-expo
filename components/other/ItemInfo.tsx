import { Item } from "@/game/classes/classes";
import { StyleSheet, Text, View } from "react-native";
import ItemInfoBasedOnItemType from "./ItemInfoBasedOnItemType";

const ItemInfoView = ({
  itemInfo,
  useItem,
  equipItem,
  discardItem,
}: {
  itemInfo: Item | null;
  useItem: () => void;
  equipItem: () => void;
  discardItem: () => void;
}) => {
  if (itemInfo === null) {
    return (
      <View style={{ alignContent: "center", alignItems: "center" }}>
        <Text style={{ ...styles.itemNameText }}>no item selected</Text>
      </View>
    );
  } else {
    return (
      <ItemInfoBasedOnItemType
        item={itemInfo}
        useItemCallback={useItem}
        equipItemCallback={equipItem}
        discardItemCallback={discardItem}
      />
    );
  }
};

const styles = StyleSheet.create({
  itemNameText: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
  },
});

export default ItemInfoView;
