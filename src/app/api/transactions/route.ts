// app/api/transactions/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongoose';
import Transaction from '../../../../Models/Transaction';

export async function GET() {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find({}).sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newTransaction = await Transaction.create(body);
    return NextResponse.json(newTransaction, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}