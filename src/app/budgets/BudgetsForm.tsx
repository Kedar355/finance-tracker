// app/budgets/BudgetForm.tsx
'use client';

import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

interface Props {
  onSuccess: () => void;
}

const categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Uncategorized'];
export default function BudgetForm({ onSuccess }: Props) {
  const [category, setCategory] = useState('Uncategorized');
  const [monthlyLimit, setMonthlyLimit] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        category,
        monthlyLimit: Number(monthlyLimit)
      })
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            label="Monthly Limit"
            type="number"
            fullWidth
            value={monthlyLimit}
            onChange={(e) => setMonthlyLimit(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}