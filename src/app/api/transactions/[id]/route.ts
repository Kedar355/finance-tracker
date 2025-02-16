// app/api/transactions/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongoose';
import Transaction from '../../../../../Models/Transaction';


interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const updatedTransaction = await Transaction.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const deletedTransaction = await Transaction.findByIdAndDelete(params.id);
    if (!deletedTransaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Transaction deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}