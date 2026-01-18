// app/api/products/[slug]/route.js
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req, { params }) {
  const { slug } = await params;

  // Search by slug column in Supabase
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}