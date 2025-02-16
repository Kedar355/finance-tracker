'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  Button,
  IconButton,
  Stack,
  Paper,
  Dialog,
  DialogContent,
  useTheme,
  Chip,
  Fade,
  Tooltip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Receipt as ReceiptIcon,
  AttachMoney as MoneyIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import { TransactionType } from '../../../types';
import CreateTransactionForm from './CreateTransactionsForm';
import EditTransactionForm from './EditTransactiosForm';

export default function TransactionsPage() {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [editTx, setEditTx] = useState<TransactionType | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
    fetchTransactions();
  };

  const handleEdit = (transaction: TransactionType) => {
    setEditTx(transaction);
  };

  const handleCreateButtonClick = () => {
    setShowCreateForm(!showCreateForm);
  };

  const onCreateSuccess = () => {
    setShowCreateForm(false);
    fetchTransactions();
  };

  const onEditSuccess = () => {
    setEditTx(null);
    fetchTransactions();
  };

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <ReceiptIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Transactions
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                Total Spent: ${totalAmount.toFixed(2)}
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateButtonClick}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            }}
          >
            New Transaction
          </Button>
        </Stack>

        <Dialog
          open={showCreateForm}
          onClose={() => setShowCreateForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <CreateTransactionForm onSuccess={onCreateSuccess} />
          </DialogContent>
        </Dialog>

        <Dialog
          open={!!editTx}
          onClose={() => setEditTx(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            {editTx && <EditTransactionForm transaction={editTx} onSuccess={onEditSuccess} />}
          </DialogContent>
        </Dialog>

        <Stack spacing={2}>
          {transactions.map((transaction) => (
            <Fade key={transaction._id} in={true}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  },
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: theme.palette.primary.light,
                          color: theme.palette.primary.main,
                        }}
                      >
                        <MoneyIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          {transaction.description}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <CalendarIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {new Date(transaction.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </Typography>
                        </Stack>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Chip
                        icon={<CategoryIcon />}
                        label={transaction.category}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography
                        variant="h6"
                        color={transaction.amount > 0 ? 'error.main' : 'success.main'}
                        sx={{ minWidth: 100, textAlign: 'right' }}
                      >
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </Typography>
                      <Stack direction="row">
                        <Tooltip title="Edit Transaction">
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(transaction)}
                            sx={{ color: theme.palette.primary.main }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Transaction">
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(transaction._id)}
                            sx={{ color: theme.palette.error.main }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Stack>
                  </Stack>
                </Stack>
              </Paper>
            </Fade>
          ))}

          {transactions.length === 0 && (
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: theme.palette.grey[50],
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No transactions recorded
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Click the "New Transaction" button to add your first transaction
              </Typography>
            </Paper>
          )}
        </Stack>
      </Box>
    </Container>
  );
}