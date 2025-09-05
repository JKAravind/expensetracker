import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { fetchExpenses } from "../storage/expenses";
import { useFocusEffect } from "@react-navigation/native";
import { PieChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";



export default function HomeScreen() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    fetchExpenses().then(data => setExpenses(data || []));
  }, []);

  




useFocusEffect(
  useCallback(() => {
    const loadExpenses = async () => {
      const data = await fetchExpenses();
      setExpenses(data || []);
    };
    loadExpenses();
  }, [])
);
  const getDisplayedExpenses = () => {
    let filtered = filterCategory
      ? expenses.filter(exp => exp.category === filterCategory)
      : [...expenses];

    if (sortBy === "latest") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sortBy === "highest") filtered.sort((a, b) => Number(b.amount) - Number(a.amount));

    return filtered;
  };

  const groupByDate = (arr) => {
    return arr.reduce((acc, exp) => {
      if (!acc[exp.date]) acc[exp.date] = [];
      acc[exp.date].push(exp);
      return acc;
    }, {});
  };
  function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}

  const calculateTotals = (arr) => {
    const today = new Date();
    const startOfWeek = new Date();
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    let totals = { today: 0, week: 0, month: 0 };

    arr.forEach(exp => {
      const amount = Number(exp.amount);
      const expDate = new Date(exp.date);

      totals.month += amount;
      if (expDate >= startOfWeek) totals.week += amount;
      if (
        expDate.getFullYear() === today.getFullYear() &&
        expDate.getMonth() === today.getMonth() &&
        expDate.getDate() === today.getDate()
      ) totals.today += amount;
    });

    return totals;
  };

  const displayedExpenses = getDisplayedExpenses();
  const groupedExpenses = groupByDate(displayedExpenses);
  const totals = calculateTotals(displayedExpenses);

  // Example categories for filter
  const categories = ["All", "Food", "Transport", "Shopping", "Bills", "Other"];
const screenWidth = Dimensions.get("window").width;

// Define fixed colors per category (optional)
const CATEGORY_COLORS = {
  Food: "#FF6384",
  Transport: "#36A2EB",
  Shopping: "#FFCE56",
  Bills: "#4BC0C0",
  Other: "#9966FF",
};

// Prepare PieChart data
const pieData = categories
  .filter(cat => cat !== "All") // skip 'All'
  .map(cat => {
    const total = expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
    return {
      name: cat,
      amount: total,
      color: CATEGORY_COLORS[cat] || getRandomColor(),
      legendFontColor: "#333",
      legendFontSize: 12,
    };
  })
  .filter(d => d.amount > 0); // remove categories with 0 amount


  return (
    <View style={styles.container}>
      {/* Totals Cards */}
      <View style={styles.totalsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Today</Text>
          <Text style={styles.cardAmount}>₹{totals.today.toFixed(2)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Week</Text>
          <Text style={styles.cardAmount}>₹{totals.week.toFixed(2)}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>This Month</Text>
          <Text style={styles.cardAmount}>₹{totals.month.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.filterButton,
              filterCategory === cat || (cat === "All" && !filterCategory)
                ? styles.filterActive
                : {}
            ]}
            onPress={() => setFilterCategory(cat === "All" ? null : cat)}
          >
            <Text
              style={[
                styles.filterText,
                filterCategory === cat || (cat === "All" && !filterCategory)
                  ? styles.filterTextActive
                  : {}
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sortContainer}>
        <Text style={styles.sortLabel}>Sort By:</Text>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "latest" ? styles.sortActive : {}
          ]}
          onPress={() => setSortBy("latest")}
        >
          <Text style={sortBy === "latest" ? styles.sortTextActive : {}}>Latest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.sortButton,
            sortBy === "highest" ? styles.sortActive : {}
          ]}
          onPress={() => setSortBy("highest")}
        >
          <Text style={sortBy === "highest" ? styles.sortTextActive : {}}>Highest</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{ marginTop: 10 }}
        data={Object.entries(groupedExpenses)}
        keyExtractor={([date]) => date}
        renderItem={({ item: [date, items] }) => (
          <View style={styles.groupContainer}>
            <Text style={styles.groupDate}>{date}</Text>
            {items.map((exp, index) => (
              <View key={index} style={styles.expenseCard}>
                <Text style={styles.expenseText}>
                  {exp.category}: ₹{Number(exp.amount).toFixed(2)}
                </Text>
                {exp.note ? <Text style={styles.expenseNote}>{exp.note}</Text> : null}
              </View>
            ))}
          </View>
        )}
      />
  <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Monthly Spending by Category</Text>
  <PieChart
    data={pieData}
    width={screenWidth - 30}
    height={220}
    chartConfig={{
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }}
    accessor="amount"
    backgroundColor="transparent"
    paddingLeft="15"
    absolute
  />

{/* 
  <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>Daily Spending This Week</Text>
  <BarChart
    data={barData}
    width={screenWidth - 30}
    height={220}
    fromZero
    chartConfig={{
      backgroundGradientFrom: "#fff",
      backgroundGradientTo: "#fff",
      color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
    }}
    style={{ marginVertical: 8, borderRadius: 8 }}
  /> */} 

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#f5f5f5" },
  totalsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3
  },
  cardTitle: { fontSize: 14, color: "#555" },
  cardAmount: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
  filterContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 10 },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8,
    marginBottom: 8
  },
  filterActive: { backgroundColor: "#4CAF50" },
  filterText: { fontSize: 12, color: "#555" },
  filterTextActive: { color: "#fff" },
  sortContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  sortLabel: { fontSize: 14, marginRight: 10 },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 8
  },
  sortActive: { backgroundColor: "#2196F3" },
  sortTextActive: { color: "#fff" },
  groupContainer: { marginBottom: 15 },
  groupDate: { fontWeight: "bold", fontSize: 16, marginBottom: 5 },
  expenseCard: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1
  },
  expenseText: { fontSize: 14, fontWeight: "500" },
  expenseNote: { fontSize: 12, color: "#777", marginTop: 2 }
});
