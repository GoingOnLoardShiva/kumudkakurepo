import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Basic in-memory rate limiter (allows 5 attempts per 15 minutes per IP)
const rateLimiter = new RateLimiterMemory({
  points: 5, 
  duration: 15 * 60, 
});

export async function POST(req) {
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  try {
    // 1. Rate Limiting Check
    await rateLimiter.consume(ip);

    const { email, password } = await req.json();

    // 2. Find admin data using Supabase
    const { data: admin, error } = await supabase
      .from("admin") // Ensure your table is named 'admins'
      .select("*")
      .eq("adminEmail", email)
      .single();

    // 3. Check if admin exists
    if (error || !admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 4. Check password match
    const isMatch = await bcrypt.compare(password, admin.adminPasswordHash);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // 5. Create token
    const token = signToken({
      id: admin.id,
      email: admin.adminEmail,
      role: "admin",
    });

    // 6. Send response with cookie
    const res = NextResponse.json({ message: "Login successful" });
    res.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return res;

  } catch (rejRes) {
    // If rate limiter blocked the request
    return NextResponse.json(
      { message: "Too many attempts. Please try again in 15 minutes." },
      { status: 429 }
    );
  }
}