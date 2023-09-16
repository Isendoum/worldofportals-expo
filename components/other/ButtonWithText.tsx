import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ButtonWithText = ({
  buttonText,
  callback,
}: {
  buttonText: string;
  callback: () => void;
}) => {
  return (
    <TouchableOpacity onPress={() => callback()}>
      <Text style={styles.equipDiscardText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  equipDiscardText: {
    flexDirection: "column",
    fontFamily: "FFFTusj",
    fontSize: 18,
    color: "#000000",
  },
});

export default ButtonWithText;
