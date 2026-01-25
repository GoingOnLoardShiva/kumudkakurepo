import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const cookieStore = await cookies(); // ✅ NO await
  const token =  cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await verifyToken(token);
  } catch (err) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
