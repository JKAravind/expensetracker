import AsyncStorage from "@react-native-async-storage/async-storage";

const CATEGORIES_KEY = "categories";

const DEFAULT_CATEGORIES = [
  { name: "Food", icon: "🍔" },
  { name: "Transport", icon: "🚌" },
  { name: "Shopping", icon: "🛍️" },
  { name: "Bills", icon: "💸" },
  { name: "Other", icon: "❓" }
];

export async function initialiseCategories() {
  try{
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    inital = await AsyncStorage.getItem(CATEGORIES_KEY)
    array = JSON.parse(inital)
    console.log(array,"reyrb")
    return array
  }
  catch(err){console.log(err)}
  
}

export async function getCategories() {
  try {
    const stored = await AsyncStorage.getItem(CATEGORIES_KEY);
    if (stored) {
      console.log("activated",stored)
      return JSON.parse(stored); // always array of objects
    }
  } catch (error) {
    console.error("Error loading categories:", error);
    return DEFAULT_CATEGORIES;
  }
}


export async function saveCategories(categories) {
  try {
    await AsyncStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    console.log("sacved succes")
  } catch (error) {
    console.error("Error saving categories:", error);
  }

};
