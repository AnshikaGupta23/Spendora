import Expense from "../models/Expense.js";
export const getExpenses = async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
};
export const addExpense = async (req, res) => {
  const { title, amount, category } = req.body;

  let finalCategory = category || "Other";

  // ✅ Safe check
  if (title) {
    if (title.toLowerCase().includes("pizza")) finalCategory = "Food";
    if (title.toLowerCase().includes("uber")) finalCategory = "Travel";
  }

  const expense = new Expense({
    title,
    amount,
    category: finalCategory
  });

  await expense.save();
  res.json(expense);
};
export const deleteAllExpenses = async (req, res) => {
  await Expense.deleteMany({});
  res.json({ message: "All expenses deleted" });
};