import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";

declare type IconProps = {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size: number;
  onPress?: () => void;
};

const AppIcon: React.FC<IconProps> = (props) => {
  const theme = useTheme();
  return (
    <Ionicons
      {...props}
      color={props.color ? props.color : theme.colors.text}
    />
  );
};

export default AppIcon;
