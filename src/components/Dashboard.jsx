"use client"
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const Dashboard = ({transactions}) => {
  
      const recentTransactions = transactions.slice(-5);
      const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
      const totalBalance = transactions.reduce((sum, t) => sum + t.amount, 0);



  return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-md bg-gray-100">
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-semibold">Total Expenses</h3>
                <p className="text-red-600 font-bold text-xl">₹{Math.abs(totalExpenses)}</p>
              </CardContent>
            </Card>
            <Card className="shadow-md bg-gray-100">
              <CardContent className="p-4 text-center">
                <h3 className="text-lg font-semibold">Recent Transactions</h3>
                <ul className="text-sm space-y-1">
                  {recentTransactions.map((t) => (
                    <li key={t.id} className="text-gray-700">{t.date} - {t.description}: ₹{t.amount}</li>
                  ))}
                </ul>
              </CardContent>
              </Card>
            </div>
  )
}

export default Dashboard