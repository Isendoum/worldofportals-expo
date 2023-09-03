import AppIcon from "@/components/AppIcon";
import { Tabs } from "expo-router";

const Tbs = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="screen3"
        options={{
          title: "General",
          headerShown: false,
          tabBarIcon: () => <AppIcon name="airplane" size={24} />,
        }}
      />
      <Tabs.Screen
        name="screen4"
        options={{
          title: "Other",
          headerShown: false,
          tabBarIcon: () => <AppIcon name="aperture" size={24} />,
        }}
      />
    </Tabs>
  );
};

export default Tbs;
