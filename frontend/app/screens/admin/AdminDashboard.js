import React from "react";
import { View, Text } from "react-native";
import { removeToken } from "../../../services/AsyncStorageService";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";

const DashboardScreen = () => {
  const handleLogout = async () => {
    await removeToken();
    navigation.navigate("Home");
    console.log("Logout");
  };
  return (
    <View>
      <Text> Admin DashboardScreen text</Text>
      <DrawerItem label="Logout" onPress={handleLogout} />
    </View>
  );
};

export default DashboardScreen;
