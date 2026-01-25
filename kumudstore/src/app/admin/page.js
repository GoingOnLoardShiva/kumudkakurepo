import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import AdminDashboardClient from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies(); // ✅ MUST await
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    return null; // middleware already protects
  }

  const decoded = await verifyToken(token);

  return <AdminDashboardClient adminEmail={decoded.email} />;
}
