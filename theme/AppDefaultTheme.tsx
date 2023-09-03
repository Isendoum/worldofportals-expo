import { AppTheme } from "@/types/themeTypes";

const AppDefaultTheme: AppTheme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgba(242, 242, 242,0)", // this is used for background colors
    card: "rgb(255, 255, 255)", //this is used for header colors
    text: "rgb(1, 1, 1)", //this is used for text colors
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
    // custom colors
    buttonBackground: "rgb(53, 47, 68)", // this is for button background color
    buttonText: "rgb(255, 255, 255)", // this is for button text color
    modalBackground: "rgba(242, 242, 242, 0.95)",
    appCardBackground: "rgb(220, 220, 220)",
    disabledButtonBackground: "rgb(100, 100, 100)",
    disabledButtonText: "rgba(200, 200, 200, 0.95)",
  },
};

export default AppDefaultTheme;
