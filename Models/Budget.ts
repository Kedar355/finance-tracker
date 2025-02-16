// models/Budget.ts
import mongoose, { Schema, model, models } from 'mongoose';

const BudgetSchema = new Schema({
  category: { type: String, required: true, unique: true },
  monthlyLimit: { type: Number, required: true }
});

export default models.Budget || model('Budget', BudgetSchema);