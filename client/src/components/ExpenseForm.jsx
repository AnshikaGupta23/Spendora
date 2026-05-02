import { useState } from "react";
import axios from "axios";

export default function ExpenseForm({ fetchExpenses, selectedMonth }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation
    if (!title || !amount || !category) {
      alert("Fill all fields");
      return;
    }

    if (!selectedMonth) {
      alert("Please select a month from dashboard");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/expenses", {
        title,
        amount: Number(amount),
        category,
        month: selectedMonth, // ✅ from Dashboard
      });

      await fetchExpenses();

      // ✅ Reset fields
      setTitle("");
      setAmount("");
      setCategory("");

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {/* 🔥 Show selected month */}
      <h2 className="text-center mb-2 font-semibold">
        Adding expenses for: <span className="text-blue-600">
          {selectedMonth || "Select Month Above"}
        </span>
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-xl shadow flex gap-4"
      >
        <input
          className="border p-2 rounded w-full"
          placeholder="Expense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded w-32"
          type="number"
          placeholder="₹"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>

        <button className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </form>
    </div>
  );
}