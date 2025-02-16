// app/transactions/EditTransactionForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { TransactionType } from '../../../types';
// import { TransactionType } from '@/types';

interface Props {
  transaction: TransactionType;
  onSuccess: () => void;
}

export default function EditTransactionForm({ transaction, onSuccess }: Props) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    setDescription(transaction.description);
    setAmount(String(transaction.amount));
    setDate(transaction.date.substring(0, 10)); // format to YYYY-MM-DD
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/transactions/${transaction._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description,
        amount: Number(amount),
        date
      })
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
            Update
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}