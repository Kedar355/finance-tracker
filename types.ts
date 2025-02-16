// types.ts
export interface TransactionType {
  _id?: string;
  description: string;
  amount: number;
  date: string; // or Date
  category?: string;
}

export interface BudgetType {
  _id?: string;
  category: string;
  monthlyLimit: number;
}