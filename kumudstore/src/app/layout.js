import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
import ClientLayout from "../components/ClientLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Advanced SEO Metadata
export const metadata = {
  title: "MK Frame Work | Premium Chokhat & Boundary Walls in Kokrajhar",
  description: "Transform your property with MK Frame Work. We specialize in high-quality chokhat designs and durable boundary wall solutions across Kokrajhar District.",
  keywords: ["MK Frame Work", "Chokhat designs Kokrajhar", "Boundary walls Kokrajhar", "RCC door frames", "Construction solutions Assam"],
  alternates: {
    canonical: 'https://www.mkframework.shop',
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    android:[
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ]
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: "MK Frame Work - Quality Chokhat & Boundary Wall Solutions",
    description: "Premium custom chokhat and boundary wall designs in Kokrajhar District.",
    url: 'https://www.mkframework.shop',
    siteName: 'MK Frame Work',
    images: [{ url: 'https://www.mkframework.shop/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'your-google-verification-code', // Replace with your actual code from Search Console
  },
};

// Structural Data for Google Sitelinks & Local Business
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "MK Frame Work",
      "image": "https://www.mkframework.shop/og-image.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kokrajhar",
        "addressRegion": "Assam",
        "addressCountry": "IN"
      },
      "url": "https://www.mkframework.shop"
    },
    {
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "SiteNavigationElement",
          "position": 1,
          "name": "About Us",
          "url": "https://www.mkframework.shop/about"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 2,
          "name": "Contact Us",
          "url": "https://www.mkframework.shop/contact"
        },
        {
          "@type": "SiteNavigationElement",
          "position": 3,
          "name": "Products",
          "url": "https://www.mkframework.shop/products"
        }
      ]
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

        {/* Injecting the Schema for Sitelinks */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Google Analytics */}
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

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}