import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import CustomButton from "../components/CustomButton";
import { getCategories, saveCategories,initialiseCategories } from "../storage/Asyncstorage";
import EMOJI_OPTIONS from "../utils/emojis";

export default function CategoriesScreen() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("Emoji");
  const [openEmojiModal, setOpenEmojiModal] = useState(false);
  const [confirmClearModal, setConfirmClearModal] = useState(false);

  // Load categories on mount
  useEffect(() => {
    (async () => {
      const stored = await initialiseCategories();
      setCategories(stored || []);
      console.log(categories)
    })();
  }, []);

  // Add new category
  const addCategory = async () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return Alert.alert("Category cannot be empty");
    if (categories.some(cat => cat.name === trimmed))
      return Alert.alert("Category already exists");

    const updated = [...categories, { name: trimmed, emoji: selectedEmoji }];
    setCategories(updated);
    await saveCategories(updated);
    setNewCategory("");
    setSelectedEmoji("📌");
  };

  // Clear all categories
  const clearAllCategories = async () => {
    setConfirmClearModal(false);
    setCategories([]);
    await saveCategories([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      {/* Add new category */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add new category"
          value={newCategory}
          onChangeText={setNewCategory}
        />
        <CustomButton
          title={selectedEmoji}
          onPress={() => setOpenEmojiModal(true)}
          style={styles.emojiButton}
        />
      </View>

      <CustomButton title="Add Category" onPress={addCategory} style={styles.addButton} />
      <CustomButton title="Clear All" onPress={() => setConfirmClearModal(true)} style={styles.clearButton} />

      {/* Emoji picker modal */}
      <Modal visible={openEmojiModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Emoji</Text>
            <FlatList
              data={EMOJI_OPTIONS}
              numColumns={5}
              keyExtractor={(item) => item} // emoji itself is unique
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emojiContainer}
                  onPress={() => setSelectedEmoji(item)}
                >
                  <Text
                    style={[styles.emoji, selectedEmoji === item && styles.selectedEmoji]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <CustomButton title="Done" onPress={() => setOpenEmojiModal(false)} />
          </View>
        </View>
      </Modal>

      {/* Clear all confirmation modal */}
      <Modal visible={confirmClearModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmText}>Are you sure you want to clear all categories?</Text>
            <View style={styles.confirmButtons}>
              <CustomButton title="Cancel" onPress={() => setConfirmClearModal(false)} style={styles.cancelButton} />
              <CustomButton title="Clear" onPress={clearAllCategories} style={styles.clearConfirmButton} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Categories list */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.name} // unique key
        renderItem={({ item }) => (
          console.log(item),
          <View style={styles.categoryCard}>
            <Text style={styles.categoryEmoji}>{item.icon||"?"}</Text>
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No categories found</Text>}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center", color: "#333" },

  inputRow: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 10, backgroundColor: "#fff" },
  emojiButton: { marginLeft: 8, width: 50, height: 50, borderRadius: 12, fontSize: 24, backgroundColor: "#eee" },

  addButton: { marginVertical: 8, backgroundColor: "#4CAF50" },
  clearButton: { backgroundColor: "#FF3B30", marginBottom: 16 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#fff", padding: 20, borderRadius: 16, width: "90%", maxHeight: "70%" },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12, textAlign: "center" },
  emojiContainer: { flex: 1, alignItems: "center", justifyContent: "center", margin: 5 },
  emoji: { fontSize: 28 },
  selectedEmoji: { borderWidth: 2, borderColor: "#007AFF", borderRadius: 8, padding: 6 },

  confirmContent: { backgroundColor: "#fff", padding: 20, borderRadius: 16, width: "80%" },
  confirmText: { fontSize: 16, marginBottom: 20, textAlign: "center" },
  confirmButtons: { flexDirection: "row", justifyContent: "center" },
  cancelButton: { backgroundColor: "#aaa" },
  clearConfirmButton: { backgroundColor: "#FF3B30", marginLeft: 12 },

  categoryCard: { flexDirection: "row", alignItems: "center", padding: 14, backgroundColor: "#fff", marginBottom: 8, borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  categoryEmoji: { fontSize: 28, marginRight: 12 },
  categoryName: { fontSize: 16, fontWeight: "500", color: "#333" },

  emptyText: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 }
});
