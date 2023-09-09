import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Image, Text } from "react-native";
import Tooltip from "react-native-walkthrough-tooltip";

import { ITEM_IMAGES } from "@/game/utils/assetMap";
import { Item } from "@/game/classes/classes";

const GearView = ({ item }: { item: Item | undefined }) => {
  const [toolTipVisible, setToolTipVisible] = useState(false);
  return (
    <View style={styles.itemGearView}>
      {item === undefined ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={styles.text}>Empty</Text>
        </View>
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
            {item?.assetFile && (
              <Image
                width={64}
                height={64}
                style={styles.itemImage}
                source={
                  item?.assetFile
                    ? ITEM_IMAGES[
                        `${item.assetFile}` as keyof typeof ITEM_IMAGES
                      ]
                    : ""
                }
              />
            )}
          </Pressable>
        </Tooltip>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemGearView: {
    alignItems: "center",
    // borderRadius: 2,
    borderWidth: 3,
    borderColor: "black",
    width: 64,
    height: 64,
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
