# Expense Tracker App

A mobile expense tracker app built with **React Native and Expo**, allowing users to add, categorize, and visualize their expenses over time.

## Features

* Add, edit, and delete expenses.
* Categorize expenses (Food, Transport, Shopping, Bills, Other).
* Optional notes for each expense.
* View expenses grouped by date.
* Filter expenses by category.
* Sort expenses by latest or highest amount.
* Display totals for Today, This Week, and This Month.
* Visualize monthly spending by category with a Pie Chart.
* Persistent storage using **AsyncStorage**.

## Screenshots

![Add Expense Modal](screenshots/add_expense.png)
![Expenses List](screenshots/expenses_list.png)
![Pie Chart](screenshots/pie_chart.png)

*(Add your own screenshots here)*

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/expense-tracker.git
cd expense-tracker
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the Expo project:

```bash
npm start
# or
yarn start
```

4. Open the app on a device or simulator using the Expo Go app.

## Project Structure

```
/components   # Reusable components like CustomButton, CustomInputBox, CategoryPicker
/screens      # App screens: HomeScreen, AddExpense, etc.
/storage      # AsyncStorage utilities for saving and fetching expenses
/assets       # Images, icons, and other static assets
/App.js       # Main app entry point
```

## Dependencies

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [react-native-chart-kit](https://github.com/indiespirit/react-native-chart-kit)
* [@react-navigation/native](https://reactnavigation.org/)
* AsyncStorage (via `@react-native-async-storage/async-storage`)

## Usage

1. Open the app.
2. Tap **Add Expense** to add a new expense.
3. Select a category, enter the amount, and add an optional note.
4. View expenses grouped by date.
5. Use filters and sort options to analyze your spending.
6. Visualize your monthly spending by category in the Pie Chart.

## Future Improvements

* Edit and delete individual expenses.
* Add recurring expenses.
* Implement a weekly bar chart for daily spending.
* Sync data with cloud storage for multiple devices.

## License

This project is licensed under the MIT License.
