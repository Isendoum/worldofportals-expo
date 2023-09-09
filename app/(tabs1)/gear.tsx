import GearView from "@/components/other/GearView";
import ItemSlot from "@/components/other/ItemSlot";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { useRouter } from "expo-router";
import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";

const Gear = () => {
  const router = useRouter();
  const [playerCharacter] = usePlayerCharacter();

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        paddingTop: 20,
        justifyContent: "center",
      }}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <ItemSlot name="Helmet" item={playerCharacter?.gear?.helmet} />
          <ItemSlot name="Chest" item={playerCharacter?.gear?.chest} />
          <ItemSlot name="Gloves" item={playerCharacter?.gear?.gloves} />
          <ItemSlot name="Pants" item={playerCharacter?.gear?.pants} />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
            // height: "100%",
          }}>
          <View>
            <Image
              style={{
                // flex: 1,
                resizeMode: "contain",
                height: 200,
                width: 150,
              }}
              source={require("assets/warrior.png")}
            />
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "column",

              justifyContent: "flex-end",
            }}>
            <View
              style={{
                flexDirection: "row",
              }}>
              <ItemSlot name="Weapon" item={playerCharacter?.gear?.weapon} />
              <ItemSlot name="Off-Hand" item={playerCharacter?.gear?.offHand} />
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <ItemSlot name="Shoulders" item={playerCharacter?.gear?.shoulders} />
          <ItemSlot name="Boots" item={playerCharacter?.gear?.boots} />
          <ItemSlot name="Amulet" item={playerCharacter?.gear?.amulet} />
          <ItemSlot name="Ring" item={playerCharacter?.gear?.ring} />
          <ItemSlot name="Earings" item={playerCharacter?.gear?.earings} />
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get("window");
const styles = StyleSheet.create({
  itemGearView: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderColor: "#000000",
    borderRadius: 5,
    marginBottom: "5%",
  },
  itemImage: {
    flex: 1,

    resizeMode: "contain",
  },
});

export default Gear;
