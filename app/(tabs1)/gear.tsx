import GearView from "@/components/other/GearView";
import { usePlayerCharacter } from "@/context/PlayerContext";
import { useRouter } from "expo-router";
import {
  ImageBackground,
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
        flex: 1,
        justifyContent: "center",
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          maxHeight: height / 2,
          justifyContent: "space-between",
        }}>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            alignContent: "center",
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
            }}>
            <Text style={styles.text}>Helmet</Text>
            <GearView item={playerCharacter?.gear?.helmet} />

            <Text style={styles.text}>Chest</Text>
            <GearView item={playerCharacter?.gear?.chest} />

            <Text style={styles.text}>Gloves</Text>
            <GearView item={playerCharacter?.gear?.gloves} />

            <Text style={styles.text}>Pants</Text>
            <GearView item={playerCharacter?.gear?.pants} />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
            <Image
              style={{ resizeMode: "contain", flex: 1, maxWidth: "100%" }}
              source={require("assets/warrior.png")}
            />
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                }}>
                <Text style={styles.text}>Weapon</Text>
                <GearView item={playerCharacter?.gear?.weapon} />
              </View>
              <View style={{ flex: 1, flexDirection: "column" }}>
                <Text style={styles.text}>Off-Hand</Text>
                <GearView item={playerCharacter?.gear?.offHand} />
              </View>
            </View>
          </View>

          <View style={{ flex: 1, flexDirection: "column" }}>
            <Text style={styles.text}>Shoulders</Text>
            <GearView item={playerCharacter?.gear?.shoulders} />

            <Text style={styles.text}>Boots</Text>
            <GearView item={playerCharacter?.gear?.boots} />

            <Text style={styles.text}>Amulet</Text>
            <GearView item={playerCharacter?.gear?.amulet} />

            <Text style={styles.text}>Ring 1</Text>
            <GearView item={playerCharacter?.gear?.ring1} />

            <Text style={styles.text}>Ring 2</Text>
            <GearView item={playerCharacter?.gear?.ring2} />
          </View>
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
  itemImage: {
    flex: 1,

    resizeMode: "contain",
  },

  text: {
    flexDirection: "column",
    fontFamily: "RomanAntique",
    fontSize: 13,
    color: "#F0F8FF",
    alignSelf: "center",
  },
});

export default Gear;
