import { Expense } from "@/components/budgets/new-budget-form";
import { useState } from "react";

export const useExpenses = (initialState: Expense[]) => {
  const [expenses, setExpenses] = useState<Expense[]>(initialState);

  const addExpense = () => {
    const newId = window.crypto.randomUUID();

    setExpenses((prev) => [
      ...prev,
      { id: newId, category: "", amount: "", description: "" },
    ]);
  };

  const removeExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const updateExpense = (id: string, field: string, value: string) => {
    setExpenses((prev) =>
      prev.map((expense) =>
        expense.id === id ? { ...expense, [field]: value } : expense
      )
    );
  };

  const total = expenses.reduce((sum, expense) => {
    const amount = Number.parseFloat(expense.amount) || 0;
    return sum + amount;
  }, 0);

  return {
    addExpense,
    removeExpense,
    updateExpense,
    setExpenses,
    expenses,
    total,
  };
};
