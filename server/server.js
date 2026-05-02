import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/expenseDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("MY SERVER WORKING 123");
});

// ✅ MAIN ROUTE
app.use("/api/expenses", expenseRoutes);
app.post("/api/ai", async (req, res) => {
  const { question, expenses } = req.body;

  // Simple smart logic (no API key needed)
  let total = 0;
  const categoryMap = {};

  expenses.forEach((e) => {
    total += e.amount;

    if (!categoryMap[e.category]) {
      categoryMap[e.category] = 0;
    }

    categoryMap[e.category] += e.amount;
  });

  let maxCategory = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b
  );

  let answer = "";

  if (question.toLowerCase().includes("spend")) {
    answer = `You spent ₹${total}. Most spending is on ${maxCategory}.`;
  } else {
    answer = `Total: ₹${total}. Highest category: ${maxCategory}. Try reducing that.`;
  }

  res.json({ answer });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

