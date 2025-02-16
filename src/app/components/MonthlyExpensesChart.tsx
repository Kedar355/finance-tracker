// components/MonthlyExpensesChart.tsx
'use client';

import React from 'react';
// import { TransactionType } from '@/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import dayjs from 'dayjs';
import { TransactionType } from '../../../types';

interface Props {
  transactions: TransactionType[];
}

export default function MonthlyExpensesChart({ transactions }: Props) {
  // Group and sum amounts by month (YYYY-MM).
  const monthlyData: { month: string; total: number }[] = [];

  transactions.forEach((t) => {
    const month = dayjs(t.date).format('YYYY-MM');
    const existing = monthlyData.find((m) => m.month === month);
    if (existing) {
      existing.total += t.amount;
    } else {
      monthlyData.push({ month, total: t.amount });
    }
  });

  // Sort by month ascending
  monthlyData.sort((a, b) => {
    if (a.month < b.month) return -1;
    if (a.month > b.month) return 1;
    return 0;
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" fill="#1976d2" />
      </BarChart>
    </ResponsiveContainer>
  );
}