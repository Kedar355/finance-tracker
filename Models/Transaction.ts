// models/Transaction.ts
import mongoose, { Schema, model, models } from 'mongoose';

const TransactionSchema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, default: 'Uncategorized' } // For Stage 2
  },
  { timestamps: true }
);

export default models.Transaction || model('Transaction', TransactionSchema);