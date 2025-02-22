"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import Dashboard from "@/components/Dashboard";

const categories = ["Income", "Food", "Entertainment", "Bills", "Shopping", "Other"];
const COLORS = ["#4CAF50", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"];

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-02-10", description: "Salary", amount: 50000, category: "Income" },
    { id: 2, date: "2024-02-12", description: "Grocery Shopping", amount: -1500, category: "Food" },
    { id: 3, date: "2024-02-15", description: "Netflix Subscription", amount: -499, category: "Entertainment" },
  ]);
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

  const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);

  const chartData = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  const formattedChartData = Object.keys(chartData).map((month) => ({ month, balance: chartData[month] }));

  const categoryData = categories.map((cat, index) => ({
    name: cat,
    value: Math.abs(transactions.filter(t => t.category === cat).reduce((sum, t) => sum + t.amount, 0)),
    color: COLORS[index]
  }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      <h2 className="text-xl font-semibold">Balance: ₹{totalBalance}</h2>
      
      {/* Transaction Form */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Input required  type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
          <Input required type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
          <Input type="number" placeholder="Amount (positive for income, negative for expense)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
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
      
      {/* Category-wise Pie Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Category-wise Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Dashboard/>
    </div>
  );
}
