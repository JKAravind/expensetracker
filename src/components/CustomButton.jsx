// src/components/CustomButton.jsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function CustomButton({ 
  title, 
  onPress, 
  disabled = false, 
  loading = false, 
  variant = "primary" // "primary", "secondary", "outline"
}) {
  const getButtonStyle = () => {
    switch (variant) {
      case "secondary":
        return [styles.button, styles.secondary];
      case "outline":
        return [styles.button, styles.outline];
      default:
        return [styles.button, styles.primary];
    }
  };

  return (
    <TouchableOpacity 
      style={[getButtonStyle(), disabled && styles.disabled]} 
      onPress={onPress} 
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.text, variant === "outline" && styles.outlineText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  primary: {
    backgroundColor: "#007AFF", // iOS blue
  },
  secondary: {
    backgroundColor: "#34C759", // iOS green
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  outlineText: {
    color: "#007AFF",
  },
});
