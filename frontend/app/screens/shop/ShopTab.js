import { View, Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import { useEffect, useState } from "react";
import { getToken } from "../../../services/AsyncStorageService";

const Drawer = createDrawerNavigator();
const ShopTab = () => {
  const navigation = useNavigation();
  const [usertoken, setUserToken] = useState({});

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setUserToken({
          access: access,
          refresh: refresh,
        });
      } else {
        setUserToken({});
      }
    })();
  }, []);

  const handleUserAuth = () => {
    if (usertoken.access) {
      navigation.navigate("UserPanelTab", { screen: "Dashboard" });
    } else {
      navigation.navigate("UserLogin");
    }
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#768CFF" },
        headerTintColor: "white",
        drawerStyle: { backgroundColor: "#F0EDED" },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: "GamePlanR",
          drawerActiveTintColor: "black",
          headerRight: () => (
            <TouchableWithoutFeedback onPress={handleUserAuth}>
              {usertoken.access ? (
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingRight: 20,
                    fontWeight: "bold",
                  }}
                >
                  Dashboard
                </Text>
              ) : (
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                    paddingRight: 20,
                    fontWeight: "bold",
                  }}
                >
                  Login
                </Text>
              )}
            </TouchableWithoutFeedback>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopTab;
