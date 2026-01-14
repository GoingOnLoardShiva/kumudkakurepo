// app/layout.js or RootLayout.jsx
import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth"; // your JWT verify function
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  // Get cookies on server
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  // If no token or invalid, redirect to login
  if (!token) {
    redirect("/login");
  }

  try {
    // Verify JWT token
    verifyToken(token); // throw error if invalid
  } catch (err) {
    redirect("/login");
  }

  // Token is valid → render children
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
