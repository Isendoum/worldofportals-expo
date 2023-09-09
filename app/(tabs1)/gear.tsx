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
    <ScrollView
      contentContainerStyle={{
        // flex: 1,

        flexDirection: "column",
        paddingTop: 40,
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
            <Text
              style={{ ...styles.text, textAlign: "center", paddingBottom: 4 }}>
              Hp: {playerCharacter?.currentHp}/{playerCharacter?.getMaxHp()}
            </Text>
            <Image
              style={{
                // flex: 1,
                resizeMode: "stretch",
                height: 200,
                width: 130,
              }}
              source={require("assets/warrior.png")}
            />
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              flex: 1,
            }}>
            <Text style={styles.text}>
              Attack: {playerCharacter?.getAttack()}
            </Text>
            <Text style={styles.text}>
              Defence: {playerCharacter?.getDefence()}
            </Text>
            <Text style={styles.text}>
              M.Attack: {playerCharacter?.getMagicAttack()}
            </Text>
            <Text style={styles.text}>
              M.Defence: {playerCharacter?.getMagicDefence()}
            </Text>
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
    </ScrollView>
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
  text: {
    flexDirection: "column",
    fontFamily: "BruntsfieldCFBlackRegular",
    fontSize: 18,
    color: "#F0F8FF",
  },
  itemImage: {
    flex: 1,

    resizeMode: "contain",
  },
});

export default Gear;
