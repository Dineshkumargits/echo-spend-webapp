import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Echo Spend — Automate Your Budget. Keep Your Data Private.",
  description:
    "India's most private finance app. On-device AI (Qwen 2.5) reads bank SMS offline, auto-categorizes spending, tracks budgets, subscriptions & split expenses — all 100% on your phone. No servers. No bank linking. Free download.",
  keywords: [
    "personal finance app India",
    "expense tracker India",
    "privacy budget tracker",
    "SMS expense tracker",
    "offline AI finance",
    "HDFC SMS parser",
    "ICICI expense tracker",
    "SBI budget app",
    "money manager India",
    "local AI finance app",
    "split expenses app",
    "subscription tracker",
    "on-device AI",
    "Echo Spend",
  ],
  authors: [{ name: "Echo Spend" }],
  alternates: {
    canonical: "https://echospend.adkdev.in",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Echo Spend — Automate Your Budget. Keep Your Data Private.",
    description:
      "On-device AI reads your bank SMS offline, auto-categorizes spending. Zero cloud servers. 100% local-first. Free for Android.",
    url: "https://echospend.adkdev.in",
    siteName: "Echo Spend",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/app-screens/01_dashboard.png",
        width: 720,
        height: 1560,
        alt: "Echo Spend Dashboard showing ₹1,64,450 net worth",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Spend — Automate Your Budget. Keep Your Data Private.",
    description:
      "On-device AI reads your bank SMS offline. Zero cloud servers. 100% private finance for India.",
    images: ["/app-screens/01_dashboard.png"],
  },
  icons: {
    icon: "/logos/icon.png",
    shortcut: "/logos/icon.png",
    apple: "/logos/adaptive-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A1416",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="dark-theme">
        {/* Decorative glow spheres (green + amber) */}
        <div className="glow-bg" aria-hidden="true">
          <div className="glow-sphere sphere-1"></div>
          <div className="glow-sphere sphere-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
