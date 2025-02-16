// app/api/budgets/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongoose';
import Budget from '../../../../Models/Budget';


export async function GET() {
  try {
    await connectToDatabase();
    const budgets = await Budget.find({});
    return NextResponse.json(budgets, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const newBudget = await Budget.create(body);
    return NextResponse.json(newBudget, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}