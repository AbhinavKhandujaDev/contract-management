import { Contract } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const contracts: Contract[] = [
  {
    id: "1",
    name: "Rahul Mahajan",
    status: "1",
  },
  {
    id: "2",
    name: "Ajay Juneja",
    status: "1",
  },
  {
    id: "3",
    name: "Abhinav Khanduja",
    status: "2",
  },
];

export async function GET(req: NextRequest) {
  return NextResponse.json(contracts);
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const contractId = req.nextUrl.searchParams.get("id");

  const idx = contracts.findIndex(({ id }) => id === contractId);
  contracts[idx] = { ...contracts[idx], ...body };
  return NextResponse.json(contracts);
}
export async function POST(req: NextRequest) {
  const body = await req.json();
  contracts.push({ id: contracts.length + 1, ...body });

  return NextResponse.json({ success: true });
  // return NextResponse.json({ success: false }, { status: 400 });
}
export async function DELETE(req: NextRequest) {
  const urlSearchParams = new URLSearchParams(req.nextUrl.search);
  const contractId = urlSearchParams.get("id");

  const idx = contracts.findIndex(({ id }) => id === contractId);

  contracts.splice(idx, 1);

  return NextResponse.json({ success: true });
}
