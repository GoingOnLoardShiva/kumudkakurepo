import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import Script from 'next/script'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MK Frame Work - Quality Chokhat & Boundary Wall Solutions",
  description: "MK Frame Work offers premium chokhat and boundary wall designs in Kokrajhar District. Contact us for custom solutions that enhance your property's aesthetics and security.",
};

import ClientLayout from "../components/ClientLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en"
      <head>
        <link rel="icon" href="/favicon.ico" sizes="48x48" type="image/x-icon">
        </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* //google analytics// */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-27CD6CLE3T"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-27CD6CLE3T');
          `}
        </Script>
        {/* <CookieConsent/> */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
