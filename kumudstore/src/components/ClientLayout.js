"use client";

import SmoothScroll from "./SmoothScroll";
import Header from "./Header";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  // Define which paths should NOT show the header
  // This checks if the URL starts with /admin
  const isAdminPage = pathname.startsWith("/admin");
  return (
    <SmoothScroll>
      {!isAdminPage && <Header />}
      <main>{children}</main>
    </SmoothScroll>
  );
}
