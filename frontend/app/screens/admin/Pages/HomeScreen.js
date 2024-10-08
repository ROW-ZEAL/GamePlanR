// HomeScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TaskBar from "../TaskBar"; // Adjust the import path according to your project structure

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>

      {/* Render TaskBar here */}
      <TaskBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
