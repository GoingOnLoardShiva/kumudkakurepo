import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";

export async function POST(req) {
  const { email, password } = await req.json();
  console.log("Login attempt:", email);

  // Hardcoded admin credentials
  const adminEmail = "kumudroy@gmail.com";
  const adminPasswordHash = "$2a$12$HWi/0ih0VqnSDcd.HkNu2.7euBBYIIyW6/bx9.QYPCLn7cJoITwXC"; // bcrypt hash

  // Check email
  if (email !== adminEmail) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, adminPasswordHash);
  if (!isMatch) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  // Create token
  const token = signToken({
    id: 1,
    email: adminEmail,
    role: "admin",
  });

  // Send response with cookie
  const res = NextResponse.json({ message: "Login successful" });
  res.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });

  return res;
}
