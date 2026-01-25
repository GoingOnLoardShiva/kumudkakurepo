import React from "react";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers"; // Add this

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  
  // Get the current URL path
  const headerList = await headers();
  const pathname = headerList.get("x-invoke-path") || ""; 

  // CHECK: If we are already on /login, DO NOT redirect, just show the page
  if (pathname === "/login") {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  // Auth logic for all other pages
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