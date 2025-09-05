import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { getCategories ,} from "../storage/Asyncstorage";

export default function CategoryPicker({ label, selectedValue, onValueChange }) {
  console.log("CategoryPicker props:", { label, selectedValue, onValueChange });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    (async () => {
      const stored = await getCategories();
      setCategories(stored);
    })();
  }, []);
  console.log(categories)

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue || categories[0] || ""}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          {categories.map((cat) => (
            <Picker.Item key={cat.name} label={`${cat.icon} ${cat.name}`} value={cat.name} />
          ))}

        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width:"80%",
    margin: 27,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#000000ff",
    borderRadius: 6,
  },
  picker: {
    width:'100%',
    padding:10,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 6,
    fontSize: 16,
  },
});
