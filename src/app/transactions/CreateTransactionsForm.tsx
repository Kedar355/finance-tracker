// app/transactions/CreateTransactionForm.tsx
'use client';

import React, { useState } from 'react';
import { TextField, Button, Grid, MenuItem } from '@mui/material';

interface Props {
  onSuccess: () => void;
}
const categories = ['Food', 'Rent', 'Utilities', 'Entertainment', 'Uncategorized'];

interface Props {
  onSuccess: () => void;
}
export default function CreateTransactionForm({ onSuccess }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Uncategorized');
  const [date, setDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, amount: Number(amount), date, category })
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextField
            required
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        <Grid item xs={12} md={4} mt={2} >
          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} >
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            label="Amount"
            type="number"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            required
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}