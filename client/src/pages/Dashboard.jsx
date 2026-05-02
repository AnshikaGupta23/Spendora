import { useEffect, useState } from "react";
import axios from "axios";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import AIAssistant from "../components/AIAssistant";

export default function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const fetchExpenses = async () => {
    const res = await axios.get("http://localhost:5000/api/expenses");
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredExpenses = selectedMonth
    ? expenses.filter((exp) => {
        const month = new Date(exp.date).toLocaleString("default", {
          month: "long",
        });
        return month === selectedMonth;
      })
    : expenses;

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const clearAll = async () => {
    await axios.delete("http://localhost:5000/api/expenses");
    fetchExpenses();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/previews/023/736/849/original/elegant-bokeh-soft-light-abstract-backgrounds-eps-10-illustration-bokeh-particles-backgrounds-decoration-vector.jpg')",
      }}
    >
      {/* 🌑 Dark overlay for readability */}
      <div className="bg-black/40 min-h-screen">

        <div className="max-w-7xl mx-auto px-4 py-6">

          {/* 🔥 Heading */}
          <h1 className="text-4xl font-bold text-center mb-6 text-white drop-shadow-lg">
            💸 AI Expense Tracker
          </h1>

          {/* 💰 Total Box */}
          <div className="bg-white/70 backdrop-blur-lg p-5 rounded-2xl shadow-lg mb-6 text-center">
            <h2 className="text-xl font-semibold">Total: ₹{total}</h2>

            <button
              onClick={clearAll}
              className="bg-red-600 text-white px-5 py-2 rounded-lg mt-3 hover:bg-red-700"
            >
              🗑 Clear All
            </button>
          </div>

          {/* 📝 Form */}
          <ExpenseForm
            fetchExpenses={fetchExpenses}
            selectedMonth={selectedMonth}
          />

          {/* 📅 Month Filter */}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
          >
            <option value="">All Months</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>

          {/* 📋 Expense List */}
          <ExpenseList expenses={filteredExpenses} />

          {/* 📊 Chart + 🤖 AI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 items-start">

            <div className="w-full">
              <ExpenseChart expenses={filteredExpenses} />
            </div>

            <div className="w-full">
              <AIAssistant expenses={filteredExpenses} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}