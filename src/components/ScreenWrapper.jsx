// src/components/ScreenWrapper.jsx
import React from "react";
import { View, StyleSheet } from "react-native";

export default function ScreenWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", // optional default bg
  },
});
