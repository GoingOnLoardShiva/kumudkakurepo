// app/admin/page.js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboard";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // 1. Redirect to login if no token
  if (!token) {
    redirect("/login");
  }

  // 2. Decrypt the token
  const decoded = await verifyToken(token);

  // 3. If token is fake or expired, redirect
  if (!decoded) {
    redirect("/login");
  }

  // 4. Pass the email to the Client Component
  return (
    <AdminDashboardClient adminEmail={decoded.email} />
  )
}