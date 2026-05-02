import express from "express";
import { getExpenses, addExpense, deleteAllExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.get("/", getExpenses);
router.post("/", addExpense);
router.delete("/", deleteAllExpenses);
export default router;