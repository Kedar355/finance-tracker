"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  LinearProgress,
  Fade,
  Stack,
  Chip,
  Divider,
  useTheme,
  Paper,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccountBalance as AccountIcon,
} from "@mui/icons-material";
import { BudgetType, TransactionType } from "../../../types";
import BudgetForm from "./BudgetsForm";

export default function BudgetsPage() {
  const theme = useTheme();
  const [budgets, setBudgets] = useState<BudgetType[]>([]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [showForm, setShowForm] = useState(false);

  const fetchBudgets = async () => {
    const res = await fetch("/api/budgets");
    const data = await res.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    const res = await fetch("/api/transactions");
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  const handleDelete = async (category: string) => {
    await fetch(`/api/budgets/${category}`, { method: "DELETE" });
    fetchBudgets();
  };

  const handleNewBudgetClick = () => {
    setShowForm(!showForm);
  };

  const onFormSuccess = () => {
    setShowForm(false);
    fetchBudgets();
  };

  const getSpentByCategory = (cat: string) => {
    return transactions
      .filter((t) => t.category === cat)
      .reduce((acc, t) => acc + t.amount, 0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <AccountIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            <Typography variant="h4" fontWeight="bold">
              Budget Management
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleNewBudgetClick}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
            }}
          >
            {showForm ? "Close Form" : "Create Budget"}
          </Button>
        </Stack>

        <Dialog
          open={showForm}
          onClose={() => setShowForm(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <BudgetForm onSuccess={onFormSuccess} />
          </DialogContent>
        </Dialog>

        <Stack spacing={2}>
          {budgets.map((budget) => {
            const spent = getSpentByCategory(budget.category);
            const percentage = (spent / budget.monthlyLimit) * 100;
            const isOverBudget = spent > budget.monthlyLimit;

            return (
              <Fade key={budget._id} in={true}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-2px)",
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
                        <Typography variant="h6" fontWeight="medium">
                          {budget.category}
                        </Typography>
                        <Chip
                          label={isOverBudget ? "Over Budget" : "Within Budget"}
                          color={isOverBudget ? "error" : "success"}
                          size="small"
                          icon={isOverBudget ? <WarningIcon /> : <CheckCircleIcon />}
                        />
                      </Stack>
                      <IconButton
                        onClick={() => handleDelete(budget.category)}
                        color="error"
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>

                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Monthly Limit
                        </Typography>
                        <Typography variant="h6" color="primary">
                          ${budget.monthlyLimit.toFixed(2)}
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography variant="body2" color="text.secondary">
                          Spent
                        </Typography>
                        <Typography
                          variant="h6"
                          color={isOverBudget ? "error" : "success"}
                        >
                          ${spent.toFixed(2)}
                        </Typography>
                      </Stack>

                      <Box sx={{ mt: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={Math.min(percentage, 100)}
                          color={isOverBudget ? "error" : "success"}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: theme.palette.grey[200],
                          }}
                        />
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ mt: 0.5, display: "block" }}
                        >
                          {percentage.toFixed(1)}% of budget used
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </Paper>
              </Fade>
            );
          })}
        </Stack>

        {budgets.length === 0 && (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 2,
              bgcolor: theme.palette.grey[50],
            }}
          >
            <Typography variant="h6" color="text.secondary">
              No budgets set yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Click the "Create Budget" button to set up your first budget
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
}