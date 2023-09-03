import React from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import { useTheme } from "@react-navigation/native";
import { AppTheme } from "@/types/themeTypes";
interface AppCardProps extends ViewProps {
  // You can add additional props here if needed
  children: React.ReactNode;
}

const AppCard: React.FC<AppCardProps> = ({ children, style, ...props }) => {
  const theme = useTheme() as AppTheme;
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: theme.colors.appCardBackground },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 8,
    minHeight: 150,
    marginTop: 6,
    marginBottom: 6,
    width: "80%",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // This provides the elevation (shadow) for Android
  },
});

export default AppCard;
