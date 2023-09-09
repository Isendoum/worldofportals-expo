import { Item } from "@/game/classes/classes";
import { StyleSheet, Text, View } from "react-native";
import GearView from "./GearView";

const ItemSlot = ({ name, item }: { name: string; item: Item | undefined }) => {
  return (
    <View
      style={{
        padding: 2,
        flexDirection: "column",
        // height: 64,
        // width: 64,
      }}>
      <Text style={styles.text}>{name}</Text>
      <GearView item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    flexDirection: "column",
    fontFamily: "RomanAntique",
    fontSize: 13,
    color: "#F0F8FF",
    alignSelf: "center",
  },
});

export default ItemSlot;
