// components/BudgetVsActualChart.tsx
'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BudgetType, TransactionType } from '../../../types';
// import { BudgetType, TransactionType } from '@/types';

interface Props {
  budgets: BudgetType[];
  transactions: TransactionType[];
}

export default function BudgetVsActualChart({ budgets, transactions }: Props) {
  const data = budgets.map((budget) => {
    const spent = transactions
      .filter((t) => t.category === budget.category)
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      category: budget.category,
      budget: budget.monthlyLimit,
      spent
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="budget" fill="#8884d8" />
        <Bar dataKey="spent" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}