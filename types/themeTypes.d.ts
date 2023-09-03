import { Theme } from "@react-navigation/native";

declare type AppThemeColors = Theme["colors"] & {
  buttonBackground: string;
  buttonText: string;
  modalBackground: string;
  appCardBackground: string;
  disabledButtonBackground: string;
  disabledButtonText: string;
};

declare type AppTheme = Theme & {
  colors: AppThemeColors;
};
