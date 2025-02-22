"use client"
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-02-10", description: "Salary", amount: 50000, category: "Income" },
    { id: 2, date: "2024-02-12", description: "Grocery Shopping", amount: -1500, category: "Food" },
    { id: 3, date: "2024-02-15", description: "Netflix Subscription", amount: -499, category: "Entertainment" },
  ]);

  const categories = ["Income", "Food", "Entertainment", "Bills", "Shopping", "Other"];
const COLORS = ["#4CAF50", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];
  const totalExpenses = transactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
  const [budgets, setBudgets] = useState({ Food: 5000, Entertainment: 3000, Bills: 7000, Shopping: 4000, Other: 2000 });
  const [form, setForm] = useState({ id: null, date: "", description: "", amount: "", category: "Income" });
  const[errors,setErrors]=useState({})


  const validateForm = () => {
    let errors = {};
    if (!form.date) errors.date = "Date is required";
    if (!form.description.trim()) errors.description = "Description is required";
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) === 0) errors.amount = "Enter a valid amount";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddOrUpdateTransaction = () => {
    if (!validateForm()) return;
    if (form.id) {
      setTransactions(transactions.map(t => t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t));
    } else {
      setTransactions([...transactions, { id: Date.now(), ...form, amount: form.category=="Income"?parseFloat(form.amount):-parseFloat(form.amount) }]);
    }
    setForm({ id: null, date: "", description: "", amount: "", category: "Income" });
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };
  const categoryData = categories
    .filter((cat) => cat !== "Income")
    .map((cat) => ({
      name: cat,
      value: Math.abs(transactions.filter((t) => t.category === cat).reduce((sum, t) => sum + t.amount, 0)),
      color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    }));

  const handleBudgetChange = (category, amount) => {
    setBudgets({ ...budgets, [category]: parseFloat(amount) || 0 });
  };

  const chartData = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  const formattedChartData = Object.keys(chartData).map((month) => ({ month, balance: chartData[month] }));

  const recentTransactions = transactions.slice(-5);
//   const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);


  return (
    <div className="p-6 space-y-6 bg-blue-600 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center">Stage 1</h1>
      <h2 className="text-xl font-semibold">Balance: ₹{totalBalance}</h2>
      
     

             {/* Transaction Form */}
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <Input required  type="date" value={form.date} onChange={(e) => {setForm({ ...form, date: e.target.value }),setErrors({})}} />
                      {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
                      <Input required type="text" placeholder="Description" value={form.description} onChange={(e) => {setForm({ ...form, description: e.target.value }),setErrors({})}} />
                      {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                      <Input type="number" placeholder="Amount (positive for income, negative for expense)" value={form.amount} onChange={(e) => {setForm({ ...form, amount: e.target.value }),setErrors({})}} />
                      {errors.amount && <p className="text-red-500 text-xs">{errors.amount}</p>}
                      <select className="border p-2 rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <Button type="submit" onClick={handleAddOrUpdateTransaction}>{form.id ? "Update" : "Add"} Transaction</Button>
                    </CardContent>
                  </Card>

      {/* Transaction List */}
            <Card>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold">Transactions</h2>
                <ul className="space-y-2">
                  {transactions.map((t,i) => (
                    <li key={i} className="flex justify-between p-2 border rounded">
                      <span>{t.date}</span>
                      <span>{t.description}</span>
                      <span>{t.category}</span>
                      <span className={`font-semibold ${t.category =="Income" ? "text-green-600" : "text-red-600"}`}>₹{t.amount}</span>
                      <Button size="sm" onClick={() => handleEdit(t)}>Edit</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>Delete</Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

     {/* Monthly Balance Chart */}
     <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Monthly Balance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="balance" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      

      
    </div>
  );
};

export default Dashboard;
