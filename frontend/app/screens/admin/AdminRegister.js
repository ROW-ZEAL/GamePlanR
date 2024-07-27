import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import Checkbox from "expo-checkbox";
import { styles, toastConfig } from "../../../style";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tc, setTc] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const clearTextInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setTc(false);
    setPhone_number("");
    setGender("");
  };

  const handleFormSubmit = () => {
    if (email && password && password2 && tc && phone_number && gender) {
      if (password === password2) {
        console.log("Registration Success");
        const formData = {
          name,
          email,
          password,
          password2,
          tc,
          phone_number,
          gender,
        };
        console.log(formData);
        clearTextInput();
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: "Registration Success",
        });
      } else {
        console.log("password and confirm doesnot match");
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: "password and confirm doesnot match",
        });
      }

      // navigation.navigate("UserPanelTab");
    } else {
      console.log("All fields are Required");
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "All fields are Required",
      });
    }
  };

  return (
    <SafeAreaView>
      <Toast config={toastConfig} />

      <ScrollView style={[styles.inputWithLabel, { marginBottom: 10 }]}>
        <View>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Write Your Name"
          />
        </View>

        <View>
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

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={password2}
            onChangeText={setPassword2}
            placeholder="Write Your Confirm Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone_number}
            onChangeText={setPhone_number}
            placeholder="Phone Number"
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Gender</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onFocus={() => setShowGenderPicker(true)}
            placeholder="Select or Write Gender"
          />
          {showGenderPicker && (
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
                setShowGenderPicker(false);
              }}
              style={styles.input}
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          )}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Checkbox
            value={tc}
            onValueChange={setTc}
            color={tc ? "#4630EB" : undefined}
          />
          <Text style={styles.labelText}>I agree to term and condition.</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("AdminLogin");
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Already Registered ? Login
            </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ width: 200, alignSelf: "center", margin: 50 }}>
          <Button title="Register" onPress={handleFormSubmit} color="#1F41BB" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;
