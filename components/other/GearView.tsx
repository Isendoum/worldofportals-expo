import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";
import { findImage } from "@/utils/imageUtils";

const GearView = ({ item }: { item: any }) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <View style={styles.itemGearView}>
      {item?.itemName === null ? (
        <Text style={styles.text}>Empty</Text>
      ) : (
        <Tooltip
          isVisible={toolTipVisible}
          backgroundColor="#60606090"
          placement="bottom"
          onClose={() => setToolTipVisible(false)}
          //   style={{
          //     justifyContent: 'center',
          //   }}
          content={
            <View>
              <Text style={styles.text}>{item?.itemName}</Text>
              <Text style={styles.text}>Hp: {item?.hpModifier}</Text>
              <Text style={styles.text}>Attack: {item?.attackModifier}</Text>
              <Text style={styles.text}>Defence: {item?.defenceModifier}</Text>
              <Text style={styles.text}>
                M. Attack: {item?.magicAttackModifier}
              </Text>
              <Text style={styles.text}>
                M. Defence: {item?.magicDefenceModifier}
              </Text>
              <Text style={styles.text}>Lvl req: {item?.levelRequired}</Text>
            </View>
          }>
          <Pressable onPress={() => setToolTipVisible(true)}>
            <Image
              style={styles.itemImage}
              source={findImage(item?.itemName)}
            />
          </Pressable>
        </Tooltip>
      )}
    </View>
  );
};

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
    color: "black",
    alignSelf: "center",
  },
});

export default GearView;
