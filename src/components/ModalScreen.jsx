import React from "react";
import { View, StyleSheet } from "react-native";

export default function ModalScreenWrapper({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7f7c7cff", 
    height:'70%',
    width:'60%',
    borderRadius:16,
    padding:20// optional default bg
  },
});
