// components/CategoryPieChart.tsx
'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TransactionType } from '../../../types';
// import { TransactionType } from '@/types';

interface Props {
  transactions: TransactionType[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1', '#a4de6c'];

export default function CategoryPieChart({ transactions }: Props) {
  // Summarize total spending by category
  const categoryMap: Record<string, number> = {};

  transactions.forEach((t) => {
    if (!t.category) t.category = 'Uncategorized';
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const data = Object.keys(categoryMap).map((cat) => ({
    name: cat,
    value: categoryMap[cat]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={`cell-${index}`} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}