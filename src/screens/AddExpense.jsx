import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import ModalScreenWrapper from "../components/ModalScreen";
import CustomInputBox from "../components/CustomInputBox";
import CustomButton from "../components/CustomButton";
import CategoryPicker from "../components/CategoryPicker";
import { saveExpense, fetchExpenses, saveAllExpenses ,clearAllExpenses} from "../storage/expenses";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function AddExpense() {
  const [visible, setVisible] = useState(false);
  const [clearModalVisible, setClearModalVisible] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [note, setNote] = useState("");
  const [expenses, setExpenses] = useState([]);

  // Load existing expenses
  useEffect(() => {
    fetchExpenses()
      .then((data) => setExpenses(data || []))
      .catch((err) => console.log(err));
  }, []);



  const handleSave = async () => {
    if (!amount || !category) {
      alert("Enter all required values");
      return;
    }

    const newExpense = { amount: parseFloat(amount), category, note, date: new Date().toISOString() };
    await saveExpense(newExpense);
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setCategory(null);
    setNote("");
    setVisible(false);
  };

  const handleClearAll = async () => {
    // Clear all expenses
    await clearAllExpenses(); // implement this in your storage file
    setExpenses([]);
    setClearModalVisible(false);
  };

  return (
    <ScreenWrapper>
      <Text style={styles.title}>Add Your Expense</Text>

      <CustomButton
        title="Add Expense"
        onPress={() => setVisible(true)}
        style={styles.addButton}
      />

      <CustomButton
        title="Clear All Expenses"
        onPress={() => setClearModalVisible(true)}
        style={styles.clearButton}
      />

      {/* Modal for adding expense */}
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Expense Details</Text>

            <CustomInputBox
              label="Amount"
              value={amount}
              onChangeText={setAmount}
              placeholder="Enter amount"
              keyboardType="numeric"
            />

            <CategoryPicker
              label="Category"
              selectedValue={category}
              onValueChange={setCategory}
            />

            <CustomInputBox
              label="Note"
              value={note}
              onChangeText={setNote}
              placeholder="Optional note"
            />

            <View style={styles.modalButtons}>
              <CustomButton title="Cancel" onPress={() => setVisible(false)} style={styles.cancelButton} />
              <CustomButton title="Save" onPress={handleSave} style={styles.saveButton} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Confirmation Modal for Clear All */}
      <Modal visible={clearModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear All Expenses?</Text>
            <Text style={{ textAlign: "center", marginVertical: 10 }}>This action cannot be undone!</Text>
            <View style={styles.modalButtons}>
              <CustomButton title="Cancel" onPress={() => setClearModalVisible(false)} style={styles.cancelButton} />
              <CustomButton title="Clear All" onPress={handleClearAll} style={styles.saveButton} />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 22, fontWeight: "700", textAlign: "center", marginVertical: 16, color: "#333" },
  addButton: { backgroundColor: "#4CAF50", marginBottom: 12 },
  clearButton: { backgroundColor: "#FF3B30", marginBottom: 16 },

  expenseCard: {
    backgroundColor: "#fff",
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  expenseAmount: { fontSize: 18, fontWeight: "600", color: "#333" },
  expenseCategory: { fontSize: 16, fontWeight: "500", color: "#555" },
  expenseNote: { fontSize: 14, color: "#777", marginTop: 4 },
  emptyText: { textAlign: "center", color: "#777", marginTop: 20, fontSize: 16 },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    maxHeight: "80%",
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 16, textAlign: "center", color: "#333" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20 },
  cancelButton: { backgroundColor: "#aaa", flex: 1, marginRight: 8 },
  saveButton: { backgroundColor: "#4CAF50", flex: 1, marginLeft: 8 },
});
