import AsyncStorage from "@react-native-async-storage/async-storage";


export async function initialseExpense() {
    try{
        const keyExsist = await AsyncStorage.getItem("myExpenses")
        if (!keyExsist){
            await AsyncStorage.setItem('myExpenses', JSON.stringify([]));
        }
    }
    catch(error){
        console.log(error)

    }
    
}

export async function fetchExpenses() {
  try{
    const fetchExpenses = await AsyncStorage.getItem("myExpenses")
    return fetchExpenses? JSON.parse(fetchExpenses) :[]
  }
  catch(err){
    console.log(err)
  }

}

export async function clearAllExpenses() {
  try{
    await AsyncStorage.setItem("myExpenses",[])

  }
  catch(err){
    console.log(err)
  }
  
}

export async function saveExpense(expense) {
  const { amount, category, note } = expense;
  console.log(amount,category,note)
  
  
  try {
    // Get existing expenses or default to empty array
    const expensesArray = await AsyncStorage.getItem("myExpenses");
    const array = expensesArray ? JSON.parse(expensesArray) : [];

    // Add new expense
    array.push({
      amount,
      category,
      note, 
      date: new Date().toISOString().split("T")[0]
    });

    // Save back to AsyncStorage
    await AsyncStorage.setItem('myExpenses', JSON.stringify(array));

    console.log('Expense saved!');
    const final = await AsyncStorage.getItem("myExpenses");
      console.log(final,"final post add");

  } catch (err) {
    console.log('Error saving expense:', err);
  }
}