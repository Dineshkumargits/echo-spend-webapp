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
  title: "Echo Spend | 100% Private, On-Device Budget Tracker & AI SMS Parser",
  description:
    "Secure your financial privacy with Echo Spend. Track expenses, budgets, subscriptions, and EMIs offline using Echo AI. Zero ads, zero tracking, and sandboxed Google Drive sync.",
  keywords: [
    "personal finance app",
    "privacy budget tracker",
    "local AI expense manager",
    "offline finance",
    "sandboxed Google Drive backup",
    "Echo AI",
    "SMS parse budget",
  ],
  authors: [{ name: "Echo Spend Developer" }],
  alternates: {
    canonical: "https://echospend.adkdev.in",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Echo Spend | 100% Private, On-Device Budget Tracker",
    description:
      "Track budgets and transaction alerts offline with Echo AI. Zero tracking, zero servers.",
    url: "https://echospend.adkdev.in",
    siteName: "Echo Spend",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Echo Spend | 100% Private Budget Tracker",
    description:
      "Budget tracking with offline Echo AI. Complete privacy control over your money.",
  },
  icons: {
    icon: "/logos/icon.png",
    shortcut: "/logos/icon.png",
    apple: "/logos/adaptive-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
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
        {/* Glow grids in layout to apply on all app sub-routes */}
        <div className="glow-bg" aria-hidden="true">
          <div className="glow-sphere sphere-1"></div>
          <div className="glow-sphere sphere-2"></div>
        </div>
        {children}
      </body>
    </html>
  );
}
