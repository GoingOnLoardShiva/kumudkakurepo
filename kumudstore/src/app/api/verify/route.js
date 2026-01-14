import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) throw new Error("No token");

    const decoded = verifyToken(token);

    if (decoded.role !== "admin") {
      throw new Error("Unauthorized");
    }

    return NextResponse.json({
      authenticated: true,
      admin: decoded.email,
    });

  } catch {
    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    );
  }
}
