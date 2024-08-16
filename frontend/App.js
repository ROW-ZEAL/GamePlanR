import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLoginScreen from "./app/screens/auth/UserLoginScreen";
import ShopTab from "./app/screens/shop/ShopTab";
import RegistrationScreen from "./app/screens/auth/RegistrationScreen";
import SendPasswordResetEmailScreen from "./app/screens/auth/SendPasswordResetEmailScreen";
import UserPanelTab from "./app/screens/UserPanelTab";
import AdminRegister from "./app/screens/admin/AdminRegister";
import AdminLogin from "./app/screens/admin/AdminLogin";
import AdminDashboard from "./app/screens/admin/AdminDashboard";
import { Provider } from "react-redux";
import { store } from "./app/store";
import HomeScreen from "./app/screens/admin/Pages/HomeScreen";
import AddVenue from "./app/screens/admin/Pages/AddVenue";

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#85C1E9" },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="ShopTab"
          component={ShopTab}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{ title: "User Login" }}
        />

        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ title: "Registration", headerBackVisible: false }}
        />
        <Stack.Screen
          name="SendPasswordResetEmail"
          component={SendPasswordResetEmailScreen}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen
          name="UserPanelTab"
          component={UserPanelTab}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="AdminRegister"
          component={AdminRegister}
          options={{ title: "Admin Registration", headerBackVisible: false }}
        />

        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{ title: "Admin Login", headerBackVisible: false }}
        />

        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboard}
          options={{ title: "Admin Dashboard", headerBackVisible: false }}
        />

        <Stack.Screen
          name="AdminHome"
          component={HomeScreen}
          options={{ title: "Admin Home", headerBackVisible: false }}
        />

        <Stack.Screen
          name="AddVenue"
          component={AddVenue}
          options={{ title: "AddVenue", headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
