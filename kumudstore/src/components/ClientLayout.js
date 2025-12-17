"use client";

import SmoothScroll from "./SmoothScroll";
import Header from "./Header";

export default function ClientLayout({ children }) {
  return (
    <SmoothScroll>
      <Header />
      <main>{children}</main>
    </SmoothScroll>
  );
}
