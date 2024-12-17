"use server";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function onCreateContract(formData: FormData) {
  const name = formData.get("name");
  const status = formData.get("status");

  const res = await fetch("/api/contract", {
    method: "post",
    body: JSON.stringify({ name, status }),
  });

  //   if (!res) return NextResponse.json({ success: false });

  //   return NextResponse.json({ success: true });
}
