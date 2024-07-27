import { View, Text, TextInput, Button, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../../../services/userAuthApi";
import { storeToken } from "../../../services/AsyncStorageService";

const UserLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearTextInput = () => {
    setEmail("");
    setPassword("");
  };

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async () => {
    const formData = { email, password };
    const res = await loginUser(formData);

    if (res.data) {
      console.log("Response Data", res.data);

      // Extracting data from response
      const { token, isAdmin } = res.data;

      await storeToken(token); // Store Token in Storage

      if (isAdmin) {
        // Navigate to Admin Dashboard if the user is an admin
        navigation.navigate("AdminDashboard");
      } else {
        // Navigate to a different screen for non-admin users
        navigation.navigate("AdminLogin");
      }

      clearTextInput();
    } else if (res.error) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        ...(res.error.data.errors.email
          ? { text1: res.error.data.errors.email[0] }
          : ""),
        ...(res.error.data.errors.password
          ? { text1: res.error.data.errors.password[0] }
          : ""),
        ...(res.error.data.errors.non_field_errors
          ? { text1: res.error.data.errors.non_field_errors[0] }
          : ""),
      });
    }
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 34, fontWeight: "bold", color: "#1F41BB" }}>
          Login Here
        </Text>
        <View style={[styles.inputWithLabel, { marginBottom: 10 }]}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Write Your Email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Write Your Password"
            secureTextEntry={true}
          />
        </View>

        <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
          <Button title="Login" onPress={handleFormSubmit} color="#1F41BB" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserLoginScreen;
