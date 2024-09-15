import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { TabBar } from "./TabBar";
import { useSafeArea } from "react-native-safe-area-context";
import { View } from "react-native";
import Home from "../screens/home/Home";
import Video from "../screens/video/Video";
import Games from "../screens/games/Games";
import Reports from "../screens/reports/Reports";
import Account from "../screens/account/Account";

export const BottomMenu = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={{ flex: 1, position: "relative" }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Video" component={Video} />
        <Tab.Screen name="Games" component={Games} />
        <Tab.Screen name="Reports" component={Reports} />
        <Tab.Screen name="Account" component={Account} />
      </Tab.Navigator>
      {useSafeArea().bottom > 0 && (
        <View
          style={{
            height: useSafeArea().bottom - 5,
            backgroundColor: "white",
          }}
        />
      )}
    </View>
  );
};
