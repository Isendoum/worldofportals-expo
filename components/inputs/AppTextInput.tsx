import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import { useTheme } from "@react-navigation/native";
interface AppTextInputProps extends TextInputProps {
  // You can add additional props here if needed
  value: string;
  onChangeText: (text: string) => void;
}

const AppTextInput: React.FC<AppTextInputProps> = ({
  value,
  onChangeText,
  ...props
}) => {
  const theme = useTheme();
  return (
    <TextInput
      {...props}
      style={[styles.input, props.style, { color: theme.colors.text }]}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,

    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
  },
});

export default AppTextInput;
