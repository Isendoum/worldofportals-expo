import React, { useEffect, useState } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

const ProgressBar = ({
  current,
  max,
  color,
}: {
  current: number;
  max: number;
  color: string;
}) => {
  const percentage = (current / max) * 100;
  const [progress, setProgress] = useState(new Animated.Value(percentage));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false, // We're animating the width, so we can't use the native driver
    }).start();
  }, [current]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bar,
          {
            width: widthInterpolated,
            backgroundColor: color,
          },
        ]}
      />
      <Text style={styles.text}>
        {current}/{max}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ccc",
    //borderRadius: 8,
    margin: 4,
    width: 100,
    //height: 14,
    //flexDirection: "column",
    //alignItems: "center",
    justifyContent: "center",
    // position: "relative",
  },
  bar: {
    position: "absolute",
    left: 0,
    //bottom: 0,
    height: "100%",

    // borderRadius: 8,
  },
  text: {
    //position: "absolute",
    //bottom: 0,
    fontSize: 12,
    alignSelf: "center",
  },
});

export default ProgressBar;
