import { Pressable, StyleSheet, Text, PressableProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/types/themeTypes";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
interface AppButtonProps extends PressableProps {
  title?: string;
  onPress?: () => void;
}

const AppButton: React.FC<AppButtonProps> = (props) => {
  const { title = "" } = props;
  const theme = useTheme() as AppTheme;
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.button,
        animatedStyle,
        { backgroundColor: theme.colors.buttonBackground },
      ]}
      onStartShouldSetResponder={() => true}
      onResponderGrant={() => {
        scale.value = withSpring(1.2);
      }}
      onResponderRelease={() => {
        scale.value = withSpring(1);
        props.onPress && props.onPress();
      }}>
      <Text style={{ ...styles.text, color: theme.colors.buttonText }}>
        {title}
      </Text>
    </Animated.View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});
