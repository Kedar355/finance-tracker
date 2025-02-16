"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Paper,
  IconButton,
  Avatar,
  Tooltip,
  Fade,
  useTheme,
  Stack,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AddCircle as AddIcon,
  Settings as SettingsIcon,
  AccountBalance as AccountIcon,
  TrendingUp as TrendingUpIcon,
  Receipt as ReceiptIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { BudgetType, TransactionType } from "../../types";
import MonthlyExpensesChart from "./components/MonthlyExpensesChart";
import CategoryPieChart from "./components/CategoryPieChart";
import BudgetVsActualChart from "./components/BudgetVsActualChart";

export default function HomePage() {
  const theme = useTheme();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [budgets, setBudgets] = useState<BudgetType[]>([]);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  useEffect(() => {
    fetch("/api/budgets")
      .then((res) => res.json())
      .then((data) => setBudgets(data))
      .catch((err) => console.error("Error fetching budgets:", err));
  }, []);

  const totalExpenses = transactions.reduce((acc, t) => acc + t.amount, 0);
  const totalTransactions = transactions.length;
  const totalBudgets = budgets.length;

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Paper
        elevation={3}
        sx={{
          width: 80,
          position: 'fixed',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 2,
          bgcolor: theme.palette.primary.main,
        }}
      >
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }}
          >
            <DashboardIcon />
          </Avatar>
          <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Tooltip title="Dashboard" placement="right" TransitionComponent={Fade}>
              <IconButton sx={{ color: 'white' }}>
                <AccountIcon />
              </IconButton>
            </Tooltip>
            <Link href="/transactions" passHref>
              <Tooltip title="Add Transaction" placement="right" TransitionComponent={Fade}>
                <IconButton sx={{ color: 'white' }}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </Link>
            <Link href="/budgets" passHref>
              <Tooltip title="Manage Budgets" placement="right" TransitionComponent={Fade}>
                <IconButton sx={{ color: 'white' }}>
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Link>
          </Box>
        </Stack>
      </Paper>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: '80px', p: 3 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
            Financial Overview
          </Typography>

          {/* Summary Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                      <TrendingUpIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">Total Expenses</Typography>
                      <Typography variant="h4">${totalExpenses.toFixed(2)}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.secondary.light} 90%)`,
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                      <ReceiptIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">Total Transactions</Typography>
                      <Typography variant="h4">{totalTransactions}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.success.main} 30%, ${theme.palette.success.light} 90%)`,
                  color: 'white',
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                      <AccountIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">Active Budgets</Typography>
                      <Typography variant="h4">{totalBudgets}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Charts Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Monthly Expenses Trend
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <MonthlyExpensesChart transactions={transactions} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={3} sx={{ borderRadius: 2, height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Spending by Category
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <CategoryPieChart transactions={transactions} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card elevation={3} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'medium' }}>
                    Budget vs Actual Comparison
                  </Typography>
                  <Box sx={{ height: 400 }}>
                    <BudgetVsActualChart budgets={budgets} transactions={transactions} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}