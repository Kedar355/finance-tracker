// app/api/budgets/[category]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../../lib/mongoose';
import Budget from '../../../../../Models/Budget';


interface Params {
  params: {
    category: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const body = await request.json();
    const updatedBudget = await Budget.findOneAndUpdate(
      { category: params.category },
      body,
      { new: true }
    );
    if (!updatedBudget) {
      return NextResponse.json({ message: 'Budget category not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();
    const deleted = await Budget.findOneAndDelete({ category: params.category });
    if (!deleted) {
      return NextResponse.json({ message: 'Budget category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Budget deleted' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}