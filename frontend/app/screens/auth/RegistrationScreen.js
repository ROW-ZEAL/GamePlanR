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
import { useRegisterUserMutation } from "../../../services/userAuthApi";

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
  const [interested_categories, setInterested_categories] = useState("");
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);

  const clearTextInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setTc(false);
    setPhone_number("");
    setGender("");
    setInterested_categories("");
  };

  const [registerUser] = useRegisterUserMutation();
  const handleFormSubmit = async () => {
    const formData = {
      name,
      email,
      password,
      password2,
      tc,
      phone_number,
      gender,
      interested_categories,
    };
    const res = await registerUser(formData);
    // console.log("Response", res);
    if (res.data) {
      console.log("Response Data", res.data);
      // await storeToken(res.data.token); // Store Token in Storage
      clearTextInput();
      navigation.navigate("UserPanelTab");
    }
    if (res.error) {
      // console.log("Response Error", res.error.data.errors);
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        ...(res.error.data.errors.name
          ? { text1: res.error.data.errors.name[0] }
          : ""),
        ...(res.error.data.errors.email
          ? { text1: res.error.data.errors.email[0] }
          : ""),
        ...(res.error.data.errors.password
          ? { text1: res.error.data.errors.password[0] }
          : ""),
        ...(res.error.data.errors.password2
          ? { text1: res.error.data.errors.password2[0] }
          : ""),
        ...(res.error.data.errors.tc
          ? { text1: res.error.data.errors.tc[0] }
          : ""),
        ...(res.error.data.errors.phone_number
          ? { text1: res.error.data.errors.phone_number[0] }
          : ""),
        ...(res.error.data.errors.gender
          ? { text1: res.error.data.errors.gender[0] }
          : ""),
        ...(res.error.data.errors.interested_categories
          ? { text1: res.error.data.errors.interested_categories[0] }
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
      <ScrollView keyboardShouldPersistTaps="handled">
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

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Interested Categories</Text>
          <TextInput
            style={styles.input}
            value={interested_categories}
            onFocus={() => setShowCategoryPicker(true)}
            placeholder="Select or Write Category"
          />
          {showCategoryPicker && (
            <Picker
              selectedValue={interested_categories}
              onValueChange={(itemValue) => {
                setInterested_categories(itemValue);
                setShowCategoryPicker(false);
              }}
              style={styles.input}
            >
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Sports" value="sports" />
              <Picker.Item label="Music" value="music" />
              <Picker.Item label="Technology" value="technology" />
              <Picker.Item label="Art" value="art" />
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
              navigation.navigate("UserLogin");
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
