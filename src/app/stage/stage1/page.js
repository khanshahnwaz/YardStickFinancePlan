"use client"
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function FinanceTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2024-02-10", description: "Grocery Shopping", amount: -1500 },
    { id: 2, date: "2024-02-12", description: "Netflix Subscription", amount: -499 },
  ]);
  const [form, setForm] = useState({ id: null, date: "", description: "", amount: "" });

  const handleAddOrUpdateTransaction = () => {
    if (!form.date || !form.description || !form.amount) return;
    if (form.id) {
      setTransactions(transactions.map(t => t.id === form.id ? { ...form, amount: parseFloat(form.amount) } : t));
    } else {
      setTransactions([...transactions, { id: Date.now(), ...form, amount: parseFloat(form.amount) }]);
    }
    setForm({ id: null, date: "", description: "", amount: "" });
  };

  const handleEdit = (transaction) => {
    setForm(transaction);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const chartData = transactions.reduce((acc, t) => {
    const month = t.date.substring(0, 7);
    acc[month] = (acc[month] || 0) + t.amount;
    return acc;
  }, {});

  const formattedChartData = Object.keys(chartData).map((month) => ({ month, expense: Math.abs(chartData[month]) }));

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Personal Finance Visualizer</h1>
      
      {/* Transaction Form */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <Input type="text" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <Input type="number" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <Button onClick={handleAddOrUpdateTransaction}>{form.id ? "Update" : "Add"} Transaction</Button>
        </CardContent>
      </Card>
      
      {/* Transaction List */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Transactions</h2>
          <ul className="space-y-2">
            {transactions.map((t) => (
              <li key={t.id} className="flex justify-between p-2 border rounded">
                <span>{t.date}</span>
                <span>{t.description}</span>
                <span className="font-semibold">₹{t.amount}</span>
                <Button size="sm" onClick={() => handleEdit(t)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(t.id)}>Delete</Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      
      {/* Monthly Expenses Chart */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={formattedChartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="expense" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}