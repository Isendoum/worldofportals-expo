import React, { useEffect, useState } from "react";
import { Animated, View, Text, StyleSheet } from "react-native";

const ProgressBar = ({ current, max }: { current: number; max: number }) => {
  const percentage = (current / max) * 100;
  const [progress, setProgress] = useState(new Animated.Value(percentage));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [current]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, { width: widthInterpolated, left: 0 }]}
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
    borderRadius: 10,
    margin: 10,
    width: 100,
    height: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  bar: {
    position: "absolute",
    bottom: 0,
    height: 20,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  text: {
    position: "absolute",
    top: 0,
    alignSelf: "center",
  },
});

export default ProgressBar;
