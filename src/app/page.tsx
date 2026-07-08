"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const tourTabs = [
  {
    title: "Smart Dashboard",
    subtitle: "Unified Financial Control",
    description:
      "Get a clean, instant overview of your cash flows, account balances, and budgets. All powered by a secure local SQLite instance that never leaves your device.",
    image: "/app-screens/dashboard.jpg",
    highlight: "Fully Offline SQLite database sandbox",
  },
  {
    title: "Local Echo AI Insights",
    subtitle: "Zero-Cloud Intelligence",
    description:
      "Run the offline Echo AI engine natively on your CPU/RAM. Echo Spend categorizes transactions, detects anomalies, and drafts budget advice without a single API request.",
    image: "/app-screens/ai-insights.jpg",
    highlight: "18 tokens/sec locally on standard mobile processors",
  },
  {
    title: "Smart Receipt Scan",
    subtitle: "Instant OCR Extraction",
    description:
      "Take pictures of your receipts to extract amounts, dates, and merchants using on-device text recognition. Absolutely no image is ever uploaded to external servers.",
    image: "/app-screens/smart-scan.jpg",
    highlight: "Fully offline optical character recognition",
  },
  {
    title: "Trends & Analytics",
    subtitle: "WoW Spending Metrics",
    description:
      "Visualize weekly limits, track spending trends, and monitor multi-period budgets. Identify precisely where your money goes with detailed local charts.",
    image: "/app-screens/trends.jpg",
    highlight: "Interactive charts and week-over-week trends",
  },
  {
    title: "Subscriptions & Splits",
    subtitle: "Manage Recurring Costs & Groups",
    description:
      "Keep track of active subscriptions, billing cycles, and upcoming payments. Split restaurant bills or shared rent offline with friends securely.",
    image: "/app-screens/subscriptions.jpg",
    image2: "/app-screens/splits.jpg",
    highlight: "Track recurring fees and manage shared tabs",
  },
  {
    title: "Cards & Loans Tracker",
    subtitle: "Balance and Debt Management",
    description:
      "Monitor credit card balances, credit utilization ratios, outstanding loans, and monthly EMI schedules. Never miss a payment or let interest pile up.",
    image: "/app-screens/credit-cards.jpg",
    image2: "/app-screens/loans.jpg",
    highlight: "Credit utilization warnings & EMI scheduling",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTourTab, setActiveTourTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  // Initialize theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("echo-spend-theme");
    const body = document.body;
    let isDarkTheme = true;
    if (savedTheme) {
      body.className = savedTheme + "-theme";
      isDarkTheme = savedTheme === "dark";
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      body.className = prefersDark ? "dark-theme" : "light-theme";
      isDarkTheme = prefersDark;
    }

    const timer = setTimeout(() => {
      setIsDark(isDarkTheme);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleThemeToggle = () => {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
      body.classList.replace("dark-theme", "light-theme");
      localStorage.setItem("echo-spend-theme", "light");
      setIsDark(false);
    } else {
      body.classList.replace("light-theme", "dark-theme");
      localStorage.setItem("echo-spend-theme", "dark");
      setIsDark(true);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How is Echo Spend different from other budgeting apps?",
      a: "Traditional budgeting apps require linking your bank account credentials or uploading statements to their cloud databases, storing your personal financial life on their servers. Echo Spend is offline-first. It processes and stores all your data right on your phone in a local SQLite file. Your money is your business; we don't own, see, or sell your data.",
    },
    {
      q: "Does Echo Spend read my banking SMS messages?",
      a: "Only with your explicit permission (Android only). If granted, the app reads incoming transaction alerts to draft records automatically. This parsing is done 100% locally on-device using regex patterns or your downloaded Echo AI model. No SMS text strings or financial numbers are ever sent to our servers.",
    },
    {
      q: "How does the Google Drive sync work?",
      a: "If you choose to sync your data, Echo Spend authenticates via Google Sign-In and uploads your encrypted database directly to a hidden, application-specific sandbox in your personal Google Drive (the appDataFolder). The developers and third parties have no access to this folder, and Echo Spend has no access to your other Google Drive files.",
    },
    {
      q: "Can I use Echo Spend on iOS?",
      a: "Echo Spend is currently under development for iOS and will be coming soon to the Apple App Store. However, because iOS restricts apps from reading incoming SMS messages, you will log transactions manually or attach receipt photos. The receipt scanner parses transaction details on-device, preserving your privacy.",
    },
    {
      q: "What is Echo AI?",
      a: "Echo AI is our on-device intelligence engine that runs a lightweight Large Language Model (Llama 3.2 1B GGUF via llama.rn) directly in your device's RAM and CPU. You can download and initialize the model file directly in the app settings to enable offline, semantic classification of transaction logs.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Echo Spend",
            operatingSystem: "Android, iOS",
            applicationCategory: "FinanceApplication",
            offers: {
              "@type": "Offer",
              price: "0.00",
              priceCurrency: "INR",
            },
            description:
              "Echo Spend is an offline-first budget manager that categorizes transaction alerts using an on-device Echo AI model. Zero surveillance.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "142",
            },
          }),
        }}
      />
      {/* Header / Navbar */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContainer}`}>
          <Link href="#" className={styles.logo}>
            <div className={styles.logoWrapper}>
              <Image
                src="/logos/icon.png"
                alt="Echo Spend Logo"
                width={36}
                height={36}
                className={styles.logoImage}
                priority
              />
            </div>
            <span className={styles.brandText}>Echo Spend</span>
          </Link>

          <nav>
            <ul className={styles.navLinks}>
              <li>
                <a href="#features" className={styles.navLink}>
                  Features
                </a>
              </li>
              <li>
                <a href="#trust" className={styles.navLink}>
                  Architecture
                </a>
              </li>
              <li>
                <a href="#faq" className={styles.navLink}>
                  FAQs
                </a>
              </li>
              <li>
                <Link href="/privacy" className={styles.navLink}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className={styles.headerActions}>
            <button
              onClick={handleThemeToggle}
              className={styles.themeToggleBtn}
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: "20px", height: "20px" }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <a href="#download" className={styles.btnDownload}>
              <span>Get the App</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Next-Gen Financial Ownership</span>
            <h1 className={styles.title}>
              Take Back Control of Your <br />
              <span className={styles.titleAccent}>Financial Privacy</span>
            </h1>
            <p className={styles.subtitle}>
              Echo Spend is an offline-first budget manager that categorizes
              transaction alerts using an{" "}
              <strong>on-device Echo AI model</strong>. No server logs, no
              telemetry, and zero surveillance.
            </p>
            <div className={styles.heroCtas}>
              <a
                href="#download"
                className={styles.btnDownload}
                style={{ padding: "14px 28px", fontSize: "1rem" }}
              >
                Download Now
              </a>
              <a href="#features" className={styles.btnSecondary}>
                Explore Features
              </a>
            </div>
          </div>

          {/* Layered Screenshot Stack Showcase */}
          <div className={styles.heroShowcase}>
            <div className={styles.screenshotStack}>
              <div className={`${styles.stackedCard} ${styles.cardLeft}`}>
                <div className={styles.cardFrame}>
                  <Image
                    src="/app-screens/ai-insights.jpg"
                    alt="AI Insights Screen"
                    width={210}
                    height={420}
                    className={styles.screenshotImg}
                    priority
                  />
                </div>
                <div className={styles.glassLabel}>Local Echo AI</div>
              </div>
              <div className={`${styles.stackedCard} ${styles.cardRight}`}>
                <div className={styles.cardFrame}>
                  <Image
                    src="/app-screens/trends.jpg"
                    alt="Trends Screen"
                    width={210}
                    height={420}
                    className={styles.screenshotImg}
                    priority
                  />
                </div>
                <div className={styles.glassLabel}>Analytics & WoW</div>
              </div>
              <div className={`${styles.stackedCard} ${styles.cardCenter}`}>
                <div className={styles.cardFrame}>
                  <Image
                    src="/app-screens/dashboard.jpg"
                    alt="Dashboard Screen"
                    width={230}
                    height={460}
                    className={styles.screenshotImg}
                    priority
                  />
                </div>
                <div className={styles.glassLabelMain}>Smart Dashboard</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Experience Tour Section */}
      <section id="tour" className={styles.tourSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>App Walkthrough</span>
            <h2 className={styles.sectionTitle}>Interactive Feature Tour</h2>
            <p className={styles.sectionSubtitle}>
              Take a look at the official screens of the Echo Spend mobile app
              to see how it operates 100% offline.
            </p>
          </div>

          <div className={styles.tourLayout}>
            <div className={styles.tourTabs}>
              {tourTabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`${styles.tourTab} ${activeTourTab === idx ? styles.tourTabActive : ""}`}
                  onClick={() => {
                    setActiveTourTab(idx);
                    setActiveSubTab(0);
                  }}
                >
                  <span className={styles.tourTabNumber}>0{idx + 1}</span>
                  <div className={styles.tourTabMeta}>
                    <span className={styles.tourTabTitle}>{tab.title}</span>
                    <span className={styles.tourTabSubtitle}>
                      {tab.subtitle}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className={styles.tourShowcase}>
              <div className={styles.tourDetailsCard}>
                <span className={styles.tourCategory}>
                  {tourTabs[activeTourTab].subtitle}
                </span>
                <h3 className={styles.tourTitle}>
                  {tourTabs[activeTourTab].title}
                </h3>
                <p className={styles.tourText}>
                  {tourTabs[activeTourTab].description}
                </p>

                {/* Secondary screen toggle (if exists) */}
                {tourTabs[activeTourTab].image2 && (
                  <div className={styles.subTabContainer}>
                    <button
                      className={`${styles.subTabButton} ${activeSubTab === 0 ? styles.subTabActive : ""}`}
                      onClick={() => setActiveSubTab(0)}
                    >
                      {activeTourTab === 4 ? "Subscriptions" : "Credit Cards"}
                    </button>
                    <button
                      className={`${styles.subTabButton} ${activeSubTab === 1 ? styles.subTabActive : ""}`}
                      onClick={() => setActiveSubTab(1)}
                    >
                      {activeTourTab === 4 ? "Bill Splits" : "Loans Tracker"}
                    </button>
                  </div>
                )}

                <div className={styles.tourBadge}>
                  <span className={styles.badgeDot}></span>
                  {tourTabs[activeTourTab].highlight}
                </div>
              </div>

              <div className={styles.phoneMockupFrame}>
                <div className={styles.phoneMockupCamera}></div>
                <div className={styles.phoneMockupScreen}>
                  <div className={styles.screenWrapper}>
                    <Image
                      src={
                        activeSubTab === 1 && tourTabs[activeTourTab].image2
                          ? tourTabs[activeTourTab].image2
                          : tourTabs[activeTourTab].image
                      }
                      alt={tourTabs[activeTourTab].title}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className={styles.phoneScreenImg}
                      priority={activeTourTab === 0}
                    />
                  </div>
                </div>
                <div className={styles.phoneMockupGlow}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={styles.section}
        style={{
          backgroundColor: "var(--bg-secondary)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}>Security Architecture</span>
            <h2 className={styles.sectionTitle}>
              Built for Complete Financial Agency
            </h2>
            <p className={styles.sectionSubtitle}>
              Every component is designed to guarantee privacy without
              sacrificing automated budgeting features.
            </p>
          </div>

          <div className={styles.bentoGrid}>
            {/* Feature 1 */}
            <div
              className={`${styles.bentoCard} ${styles.bentoCardCol2} ${styles.bentoCardLlama}`}
            >
              <svg
                className={styles.cardIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <h3 className={styles.cardTitle}>On-Device Echo AI Engine</h3>
              <p className={styles.cardText}>
                No network traffic, no server subscriptions. Echo Spend compiles
                and executes a Large Language Model (Llama-3.2-1B GGUF via{" "}
                <code>llama.rn</code>) natively on your device. Named Echo AI,
                it classifies transaction details, detects anomalies, and matches
                budgets entirely in your local system memory.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={styles.bentoCard}>
              <svg
                className={styles.cardIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <h3 className={styles.cardTitle}>SQLite Sandbox</h3>
              <p className={styles.cardText}>
                All financial data—accounts, balances, drafts, budgets—is stored
                securely in your app sandbox via <code>expo-sqlite</code>. No
                external database replication occurs.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={styles.bentoCard}>
              <svg
                className={styles.cardIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <h3 className={styles.cardTitle}>Drive Isolated Sync</h3>
              <p className={styles.cardText}>
                Backup and restore your data using Google Sign-In linked
                directly to the Google Drive <code>appDataFolder</code>. It
                keeps files hidden from other cloud services.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`${styles.bentoCard} ${styles.bentoCardCol2}`}>
              <svg
                className={styles.cardIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <h3 className={styles.cardTitle}>
                Smart Budgets & WoW Analytics
              </h3>
              <p className={styles.cardText}>
                Set multi-period category limits and get deterministic insights.
                Compare week-over-week (WoW) totals, examine daily spending
                thresholds, and receive warning reports when you are approaching
                limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Architecture Section */}
      <section id="trust" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Zero-Cloud Architecture</h2>
            <p className={styles.sectionSubtitle}>
              Here is exactly how transaction processing behaves, illustrating
              why your financial records are inaccessible to third parties.
            </p>
          </div>

          <div className={styles.trustContainer}>
            <div className={styles.archGraphic}>
              <div className={styles.flowItem}>
                <span className={styles.flowTerminal}>
                  1. Incoming bank SMS
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
                >
                  Received locally
                </span>
              </div>
              <div className={styles.flowArrow}>↓</div>
              <div
                className={styles.flowItem}
                style={{
                  borderStyle: "dashed",
                  borderColor: "var(--accent-purple)",
                }}
              >
                <span
                  className={styles.flowTerminal}
                  style={{ color: "var(--accent-purple)" }}
                >
                  2. Echo AI / Regex
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--accent-purple)" }}
                >
                  Processed in RAM
                </span>
              </div>
              <div className={styles.flowArrow}>↓</div>
              <div className={styles.flowItem}>
                <span className={styles.flowTerminal}>
                  3. Sandbox SQLite Database
                </span>
                <span
                  style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}
                >
                  Stored in echospend.db
                </span>
              </div>
              <div className={styles.flowArrow}>↓</div>
              <div
                className={styles.flowItem}
                style={{
                  backgroundColor: "rgba(48, 209, 88, 0.05)",
                  borderColor: "#30d158",
                }}
              >
                <span
                  className={styles.flowTerminal}
                  style={{ color: "#30d158" }}
                >
                  4. Personal Google Drive (Optional)
                </span>
                <span style={{ fontSize: "0.8rem", color: "#30d158" }}>
                  Encrypted appDataFolder
                </span>
              </div>
            </div>

            <div className={styles.trustContent}>
              <div className={styles.trustList}>
                <div className={styles.trustItem}>
                  <div className={styles.trustNumber}>1</div>
                  <div>
                    <h4 className={styles.trustItemTitle}>
                      Zero Telemetry, Zero Logs
                    </h4>
                    <p className={styles.trustItemText}>
                      We don&apos;t use telemetry hooks, crash reporting
                      brokers, or database replication channels. If the app is
                      offline, it works perfectly.
                    </p>
                  </div>
                </div>
                <div className={styles.trustItem}>
                  <div className={styles.trustNumber}>2</div>
                  <div>
                    <h4 className={styles.trustItemTitle}>
                      Private Sandbox Keychain
                    </h4>
                    <p className={styles.trustItemText}>
                      Sensitive tokens, local authentication setups, and
                      encryption keys are stored inside system keychains via{" "}
                      <code>expo-secure-store</code>, isolated from other apps.
                    </p>
                  </div>
                </div>
                <div className={styles.trustItem}>
                  <div className={styles.trustNumber}>3</div>
                  <div>
                    <h4 className={styles.trustItemTitle}>
                      Your Data, Your File
                    </h4>
                    <p className={styles.trustItemText}>
                      Export your transaction ledger as a standard CSV format
                      file instantly. Clear all data, including local backups,
                      with a single tap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section
        id="faq"
        className={styles.section}
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Quick answers regarding permissions, model operations, and
              security standards.
            </p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ""}`}
              >
                <button
                  className={styles.faqTrigger}
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  <span className={styles.faqIcon}>+</span>
                </button>
                <div className={styles.faqContent}>
                  <p className={styles.faqText}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Download / CTA Section */}
      <section id="download" className={styles.downloadSection}>
        <div className={`${styles.container} ${styles.downloadContainer}`}>
          <div className={styles.downloadContent}>
            <span
              className={styles.badge}
              style={{ color: "var(--accent-purple)" }}
            >
              Secure Your Ledger
            </span>
            <h2 className={styles.sectionTitle}>
              Start Budgeting Privately Today
            </h2>
            <p className={styles.sectionSubtitle}>
              Available for Android (iOS coming soon). Download now to track
              assets, budgets, and text alerts with absolute data sovereignty.
            </p>
            <div className={styles.downloadButtons}>
              <a
                href="https://play.google.com/store/apps/details?id=com.adkdinesh.echospend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnDownload}
                style={{
                  padding: "16px 36px",
                  fontSize: "1rem",
                  borderRadius: "40px",
                }}
              >
                Download for Android
              </a>
            </div>
          </div>

          <div className={styles.qrCardContainer}>
            <div className={styles.qrCard}>
              <div className={styles.qrCodeWrapper}>
                <Image
                  src="/qr-playstore.svg"
                  alt="Scan to Download Echo Spend"
                  width={140}
                  height={140}
                  className={styles.qrImage}
                />
                <div className={styles.qrLogoWrapper}>
                  <Image
                    src="/logos/icon.png"
                    alt="Echo Spend Logo"
                    width={28}
                    height={28}
                    className={styles.qrLogo}
                  />
                </div>
                <div className={styles.qrScanLine}></div>
              </div>
              <div className={styles.qrMeta}>
                <svg
                  className={styles.androidIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.52 14.3c-.02-.53-.42-.95-.95-.95-.53 0-.93.42-.95.95v1.4c.02.53.42.95.95.95.53 0 .93-.42.95-.95v-1.4zM8.38 14.3c-.02-.53-.42-.95-.95-.95-.53 0-.93.42-.95.95v1.4c.02.53.42.95.95.95.53 0 .93-.42.95-.95v-1.4zM20.25 10.3h-2.13l1.83-3.17c.18-.32.07-.72-.25-.9-.32-.18-.72-.07-.9.25L17 9.6c-1.39-.77-3.08-1.2-4.9-1.2-1.82 0-3.51.43-4.9 1.2L5.45 6.48c-.18-.32-.58-.43-.9-.25-.32.18-.43.58-.25.9l1.83 3.17H3.95c-.41 0-.75.34-.75.75v5.18c0 .41.34.75.75.75h1.22v2.82c0 .41.34.75.75.75h1.22c.41 0 .75-.34.75-.75v-2.82h3.66v2.82c0 .41.34.75.75.75h1.22c.41 0 .75-.34.75-.75v-2.82h1.22c.41 0 .75-.34.75-.75V11.05c0-.41-.34-.75-.75-.75z" />
                </svg>
                <span className={styles.qrText}>Scan to Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerLogoDesc}>
            <Link href="#" className={styles.footerLogo}>
              <Image
                src="/logos/icon.png"
                alt="Echo Spend Logo"
                width={28}
                height={28}
                className={styles.logoImage}
              />
              <span>Echo Spend</span>
            </Link>
            <p className={styles.footerDesc}>
              A privacy-focused budgeting utility powered by local heuristics
              and on-device Large Language Models.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>App Links</h4>
            <ul className={styles.footerLinks}>
              <li>
                <a href="#features" className={styles.footerLink}>
                  Features
                </a>
              </li>
              <li>
                <a href="#trust" className={styles.footerLink}>
                  Architecture
                </a>
              </li>
              <li>
                <a href="#faq" className={styles.footerLink}>
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Privacy</h4>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/privacy" className={styles.footerLink}>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.container}  ${styles.footerBottom}`}>
          <p>
            &copy; 2026 Echo Spend. All rights reserved. Data belongs strictly
            to you.
          </p>
          <p>Built with absolute privacy.</p>
        </div>
      </footer>
    </>
  );
}
