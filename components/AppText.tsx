import { StyleSheet, Text } from "react-native";
import { TextProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import React from "react";

const AppText: React.FC<TextProps> = (props) => {
  const theme = useTheme();

  return (
    <Text style={{ ...styles.text, color: theme.colors.text }}>
      {props.children}
    </Text>
  );
};

export default AppText;

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
