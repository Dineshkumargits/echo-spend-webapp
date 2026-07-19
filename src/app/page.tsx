"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

/* ── Tour Tabs (updated features & screenshots) ──────────────────────── */
const tourTabs = [
  {
    title: "Smart Dashboard",
    subtitle: "Net Worth & Spending Pulse",
    description:
      "See your net worth, Safe to Spend budget pacing, linked bank accounts, and pending signals — all at a glance. Powered by a local SQLite database that never leaves your device.",
    image: "/app-screens/01_dashboard.png",
    highlight: "₹1,64,450 Net Worth · 13 days left in cycle",
  },
  {
    title: "Smart Inbox",
    subtitle: "Swipe to Categorize",
    description:
      "Your bank SMS alerts are parsed by on-device AI and presented as swipeable cards. Swipe right to confirm a transaction, left to dismiss. Zero typing required.",
    image: "/app-screens/02_smart_inbox_deck.png",
    image2: "/app-screens/03_smart_inbox_swipe_action.png",
    highlight: "Tinder-style card deck · AI categorization",
  },
  {
    title: "Visual Analytics",
    subtitle: "Charts & Category Breakdown",
    description:
      "Interactive spend trend charts, donut breakdowns by category, and daily/weekly/monthly views. Understand exactly where your money goes.",
    image: "/app-screens/04_analytics_charts.png",
    highlight: "7D / 14D / 30D / 90D spend analysis",
  },
  {
    title: "Budgets & Alerts",
    subtitle: "Stay Ahead of Your Limits",
    description:
      "Set category-level spending caps and get smart notifications when you're approaching your limit. Budget pacing shows if you're ahead or behind.",
    image: "/app-screens/06_budgets_progress.png",
    highlight: "Category budgets with pace tracking",
  },
  {
    title: "Subscriptions & Splits",
    subtitle: "Recurring Bills & Group Expenses",
    description:
      "Track Netflix, Cult.fit, and every recurring bill with monthly burn totals. Split dinner bills and trips with friends — track who owes what and settle up.",
    image: "/app-screens/07_subscriptions.png",
    image2: "/app-screens/08_split_expenses.png",
    highlight: "Monthly burn: ₹2,148 · Split with 3 people",
  },
  {
    title: "Goals & Loans",
    subtitle: "Target Savings & EMI Tracker",
    description:
      "Set savings targets with deadlines and monthly contribution plans. Track loan EMIs, interest rates, and remaining balances — both borrowed and lent.",
    image: "/app-screens/09_goals_and_loans.png",
    highlight: "40% achieved · ₹25,000/mo plan",
  },
];

/* ── Bank marquee items ──────────────────────────────────────────────── */
const banks = [
  "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak", "CRED",
  "Jupiter", "Paytm", "Bank of Baroda", "IndusInd", "Yes Bank", "PNB",
];

/* ── FAQ data ────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "How is Echo Spend different from other budgeting apps?",
    a: "Most finance apps require linking your bank credentials or uploading statements to their servers. Echo Spend is 100% local-first — all data is stored in a SQLite database on your phone. No cloud servers exist to hack. Your money is your business.",
  },
  {
    q: "Does Echo Spend read my banking SMS messages?",
    a: "Only with your explicit permission (Android only). The app reads incoming bank transaction alerts and parses them using a combination of regex patterns and an on-device AI model (Qwen 2.5 1.5B). No SMS text is ever sent to any server.",
  },
  {
    q: "How does the Google Drive backup work?",
    a: "Echo Spend uses Google Sign-In to upload your encrypted database to a hidden, app-specific sandbox in your personal Google Drive (appDataFolder). Even the developers cannot access this folder. You can also export as CSV anytime.",
  },
  {
    q: "What is the on-device AI model?",
    a: "Echo Spend includes a fine-tuned Qwen 2.5 1.5B language model (GGUF format, ~940MB) that runs entirely on your phone's CPU via llama.rn. It classifies merchants, categorizes transactions, detects spend anomalies, and generates financial tips — all offline.",
  },
  {
    q: "Is Echo Spend free?",
    a: "The core app is free to download and use. Premium features like multiple themes, advanced analytics, and the AI financial advisor are available through an optional subscription.",
  },
];

export default function Home() {
  const [isDark, setIsDark] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTourTab, setActiveTourTab] = useState(0);
  const [activeSubTab, setActiveSubTab] = useState(0);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll-triggered reveal animation
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addRevealRef = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("echo-spend-theme");
    const body = document.body;
    let dark = true;
    if (savedTheme) {
      body.className = savedTheme + "-theme";
      dark = savedTheme === "dark";
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      body.className = prefersDark ? "dark-theme" : "light-theme";
      dark = prefersDark;
    }
    setTimeout(() => setIsDark(dark), 0);
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

  return (
    <>
      {/* ── Schema.org Structured Data ──────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MobileApplication",
            name: "Echo Spend",
            operatingSystem: "Android",
            applicationCategory: "FinanceApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
            description:
              "India's most private finance app. On-device AI reads bank SMS offline, auto-categorizes spending, tracks budgets, subscriptions & split expenses — all 100% on your phone.",
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "142",
            },
            featureList:
              "SMS Auto-Parsing, On-Device AI, Budget Tracking, Subscription Management, Split Expenses, Google Drive Backup, Biometric Lock",
            softwareVersion: "1.1.0",
          }),
        }}
      />

      {/* ══════════════════════════════════════════════════════════════
          HEADER / NAVIGATION
          ══════════════════════════════════════════════════════════════ */}
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerContainer}`}>
          {/* Logo */}
          <Link href="#" className={styles.logo}>
            <div className={styles.logoWrapper}>
              <Image
                src="/app-screens/app_logo.png"
                alt="Echo Spend Logo"
                width={34}
                height={34}
                className={styles.logoImage}
                priority
              />
            </div>
            <span className={styles.brandText}>Echo Spend</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navLinks}>
              <li><a href="#features" className={styles.navLink}>Features</a></li>
              <li><a href="#privacy" className={styles.navLink}>Privacy</a></li>
              <li><a href="#ai-advisor" className={styles.navLink}>AI Advisor</a></li>
              <li><a href="#themes" className={styles.navLink}>Themes</a></li>
              <li><a href="#faq" className={styles.navLink}>FAQs</a></li>
            </ul>
          </nav>

          {/* Right Header Controls */}
          <div className={styles.headerActions}>
            <button onClick={handleThemeToggle} className={styles.themeToggleBtn} aria-label="Toggle Theme">
              {isDark ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                  <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <a href="https://play.google.com/store/apps/details?id=com.adkdinesh.echospend" className={styles.headerCta} target="_blank" rel="noopener noreferrer">
              <span>Download Free</span>
            </a>

            <button
              className={`${styles.hamburger} ${mobileNavOpen ? styles.hamburgerActive : ""}`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Drawer */}
        <div className={`${styles.mobileMenu} ${mobileNavOpen ? styles.mobileMenuOpen : ""}`}>
          <nav className={styles.mobileNav}>
            <a href="#features" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>App Features</span> <span className={styles.chevron}>→</span>
            </a>
            <a href="#privacy" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>Privacy Guarantee</span> <span className={styles.chevron}>→</span>
            </a>
            <a href="#ai-advisor" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>On-Device AI</span> <span className={styles.chevron}>→</span>
            </a>
            <a href="#themes" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>Curated Themes</span> <span className={styles.chevron}>→</span>
            </a>
            <a href="#faq" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>FAQs</span> <span className={styles.chevron}>→</span>
            </a>
            <Link href="/privacy" className={styles.mobileNavLink} onClick={() => setMobileNavOpen(false)}>
              <span>Privacy Policy</span> <span className={styles.chevron}>→</span>
            </Link>

            <div className={styles.mobileMenuCtaWrap}>
              <a
                href="https://play.google.com/store/apps/details?id=com.adkdinesh.echospend"
                className={styles.mobileMenuCta}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 3.467l10.937 6.333-2.302 2.302L5.864 3.467z" /></svg>
                Download for Android — Free
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════════════
          HERO SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section className={styles.hero} id="hero" aria-labelledby="hero-heading">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} /> 100% Private · On-Device AI
            </span>
            <h1 id="hero-heading" className={styles.title}>
              Automate Your Budget. <br />
              <span className={styles.titleAccent}>Keep Your Data Private.</span>
            </h1>
            <p className={styles.subtitle}>
              EchoSpend reads your bank SMS alerts with a local AI model — completely
              offline. No cloud servers, no bank linking, no data leaks.
              Your finances stay on <em>your</em> phone.
            </p>
            <div className={styles.heroCtas}>
              <a
                href="#download"
                className={styles.btnPrimary}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 3.467l10.937 6.333-2.302 2.302L5.864 3.467z" /></svg>
                Download for Android
              </a>
            </div>
          </div>

          <div className={styles.heroShowcase}>
            <div className={styles.phoneGlow}>
              <div className={styles.phoneMockup}>
                <Image
                  src="/app-screens/01_dashboard.png"
                  alt="Echo Spend dashboard showing ₹1,64,450 net worth, linked HDFC and ICICI accounts, Safe to Spend tracker"
                  width={300}
                  height={650}
                  priority
                  className={styles.phoneScreenImg}
                />
              </div>
            </div>
            {/* Floating badges */}
            <div className={`${styles.floatingBadge} ${styles.floatingLeft}`}>
              <span className={styles.floatingIcon}>🛡️</span>
              <div><strong>100% Private</strong><span>Zero cloud servers</span></div>
            </div>
            <div className={`${styles.floatingBadge} ${styles.floatingRight}`}>
              <span className={styles.floatingIcon}>🤖</span>
              <div><strong>On-Device AI</strong><span>Offline SMS parsing</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          BANK MARQUEE
          ══════════════════════════════════════════════════════════════ */}
      <section className={styles.bankSection} aria-label="Supported Indian banks">
        <p className={styles.bankTitle}>Works with every major Indian bank</p>
        <div className={styles.marquee} aria-hidden="true">
          {[...banks, ...banks].map((name, i) => (
            <div key={i} className={styles.marqueeItem}>🏦 {name}</div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          INTERACTIVE FEATURE TOUR
          ══════════════════════════════════════════════════════════════ */}
      <section id="features" className={styles.tourSection} ref={addRevealRef}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}><span className={styles.badgeDot} /> App Walkthrough</span>
            <h2 className={styles.sectionTitle}>See Every Feature in Action</h2>
            <p className={styles.sectionSubtitle}>
              Tap through the feature tabs to explore the official app screens.
              Everything runs 100% on your device.
            </p>
          </div>

          <div className={styles.tourLayout}>
            {/* Column 1: Tabs */}
            <div className={styles.tourTabs}>
              {tourTabs.map((tab, idx) => (
                <button
                  key={idx}
                  className={`${styles.tourTab} ${activeTourTab === idx ? styles.tourTabActive : ""}`}
                  onClick={() => { setActiveTourTab(idx); setActiveSubTab(0); }}
                >
                  <span className={styles.tourTabNumber}>0{idx + 1}</span>
                  <div className={styles.tourTabMeta}>
                    <span className={styles.tourTabTitle}>{tab.title}</span>
                    <span className={styles.tourTabSubtitle}>{tab.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Column 2: Details */}
            <div className={styles.tourDetailsCard}>
              <span className={styles.tourCategory}>{tourTabs[activeTourTab].subtitle}</span>
              <h3 className={styles.tourTitle}>{tourTabs[activeTourTab].title}</h3>
              <p className={styles.tourText}>{tourTabs[activeTourTab].description}</p>

              {tourTabs[activeTourTab].image2 && (
                <div className={styles.subTabContainer}>
                  <button className={`${styles.subTabButton} ${activeSubTab === 0 ? styles.subTabActive : ""}`} onClick={() => setActiveSubTab(0)}>
                    {activeTourTab === 1 ? "Inbox Deck" : activeTourTab === 4 ? "Subscriptions" : "Primary"}
                  </button>
                  <button className={`${styles.subTabButton} ${activeSubTab === 1 ? styles.subTabActive : ""}`} onClick={() => setActiveSubTab(1)}>
                    {activeTourTab === 1 ? "Swipe Action" : activeTourTab === 4 ? "Split Expenses" : "Secondary"}
                  </button>
                </div>
              )}

              <div className={styles.tourBadge}>
                <span className={styles.badgeDot} />
                {tourTabs[activeTourTab].highlight}
              </div>
            </div>

            {/* Column 3: Phone Image */}
            <div className={styles.phoneMockupFrame}>
              <div className={styles.phoneMockupScreen}>
                <div className={styles.screenWrapper}>
                  <Image
                    src={activeSubTab === 1 && tourTabs[activeTourTab].image2
                      ? tourTabs[activeTourTab].image2!
                      : tourTabs[activeTourTab].image}
                    alt={tourTabs[activeTourTab].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className={styles.phoneScreenImg}
                    priority={activeTourTab === 0}
                  />
                </div>
              </div>
              <div className={styles.phoneMockupGlow} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PRIVACY SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="privacy" className={styles.section} style={{ backgroundColor: "var(--bg-secondary)" }} ref={addRevealRef}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}><span className={styles.badgeDot} /> Absolute Privacy</span>
            <h2 className={styles.sectionTitle}>Your Financial Data Deserves Absolute Protection</h2>
            <p className={styles.sectionSubtitle}>
              EchoSpend has zero-trust architecture. No remote servers. No third-party APIs. No bank credentials. Everything stays encrypted on your device.
            </p>
          </div>

          <div className={styles.privacyGrid}>
            <div className={styles.privacyCard}>
              <div className={`${styles.privacyIcon} ${styles.iconGreen}`}>🔒</div>
              <h3 className={styles.cardTitle}>Zero Cloud Servers</h3>
              <p className={styles.cardText}>No data ever leaves your phone. There is no backend server to hack. Your transactions, categories, and budgets exist only in a local SQLite database on your device.</p>
            </div>
            <div className={styles.privacyCard}>
              <div className={`${styles.privacyIcon} ${styles.iconAmber}`}>🏦</div>
              <h3 className={styles.cardTitle}>No Bank Account Linking</h3>
              <p className={styles.cardText}>We never ask for bank logins or account aggregation credentials. EchoSpend reads standard text SMS alerts — the same messages your bank already sends you.</p>
            </div>
            <div className={styles.privacyCard}>
              <div className={`${styles.privacyIcon} ${styles.iconViolet}`}>☁️</div>
              <h3 className={styles.cardTitle}>Private Google Drive Backup</h3>
              <p className={styles.cardText}>When you choose to back up, data goes to <em>your personal</em> Google Drive&apos;s hidden app folder. Even the developers can&apos;t access it. Secured with biometric lock.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          AI ADVISOR SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="ai-advisor" className={styles.aiSection} ref={addRevealRef}>
        <div className={`${styles.container} ${styles.aiGrid}`}>
          <div className={styles.aiVisual}>
            <div className={styles.aiOrb}>
              <div className={styles.aiOrbDot} />
              <div className={styles.aiOrbDot} />
              <div className={styles.aiOrbDot} />
              <div className={styles.aiOrbInner}>
                <span className={styles.aiOrbIcon}>✨</span>
                <span className={styles.aiOrbLabel}>On-Device AI</span>
              </div>
            </div>
          </div>

          <div className={styles.aiContent}>
            <span className={styles.badge}><span className={styles.badgeDot} /> Pocket Financial Advisor</span>
            <h2 className={styles.sectionTitle}>AI that runs on your phone, not in a data center.</h2>
            <p className={styles.sectionSubtitle} style={{ textAlign: "left", maxWidth: 500 }}>
              EchoSpend ships a fine-tuned <strong>Qwen 2.5 1.5B</strong> language model
              that runs entirely on your phone&apos;s CPU. It parses bank SMS, categorizes
              merchants, detects spend anomalies, and generates personalized financial tips —
              without ever sending a byte to the internet.
            </p>
            <div className={styles.aiChips}>
              <span className={styles.chip}>🔎 Spend Anomaly Detection</span>
              <span className={styles.chip}>💡 Personalized Tips</span>
              <span className={styles.chip}>📱 100% Offline</span>
              <span className={styles.chip}>📊 Smart Categorization</span>
              <span className={styles.chip}>🏦 50+ Bank Formats</span>
              <span className={styles.chip}>⚡ Real-time SMS Parsing</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          THEME SHOWCASE
          ══════════════════════════════════════════════════════════════ */}
      <section id="themes" className={styles.section} ref={addRevealRef}>
        <div className={styles.container} style={{ textAlign: "center" }}>
          <div className={styles.sectionHeader}>
            <span className={styles.badge}><span className={styles.badgeDot} /> Curated Themes</span>
            <h2 className={styles.sectionTitle}>Make it yours.</h2>
            <p className={styles.sectionSubtitle}>
              Five handcrafted color palettes — Echo, Ember, Rose, Midnight, and Mono —
              each with light and dark mode.
            </p>
          </div>
          <div className={styles.themePhones}>
            <div className={styles.phoneMockup} style={{ width: 200 }}>
              <Image src="/app-screens/11_theme_echo.png" alt="Echo theme" width={200} height={434} className={styles.phoneScreenImg} loading="lazy" />
            </div>
            <div className={styles.phoneMockup} style={{ width: 200 }}>
              <Image src="/app-screens/12_theme_ember.png" alt="Ember theme" width={200} height={434} className={styles.phoneScreenImg} loading="lazy" />
            </div>
            <div className={styles.phoneMockup} style={{ width: 200 }}>
              <Image src="/app-screens/13_theme_rose.png" alt="Rose theme" width={200} height={434} className={styles.phoneScreenImg} loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FAQ SECTION
          ══════════════════════════════════════════════════════════════ */}
      <section id="faq" className={styles.section} style={{ backgroundColor: "var(--bg-secondary)" }} ref={addRevealRef}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>Quick answers about permissions, AI model, and privacy.</p>
          </div>

          <div className={styles.faqContainer}>
            {faqs.map((faq, idx) => (
              <div key={idx} className={`${styles.faqItem} ${openFaq === idx ? styles.faqItemOpen : ""}`}>
                <button className={styles.faqTrigger} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
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

      {/* ══════════════════════════════════════════════════════════════
          DOWNLOAD CTA
          ══════════════════════════════════════════════════════════════ */}
      <section id="download" className={styles.downloadSection} ref={addRevealRef}>
        <div className={`${styles.container} ${styles.downloadContainer}`}>
          <div className={styles.downloadContent}>
            <span className={styles.badge}><span className={styles.badgeDot} /> Free Download</span>
            <h2 className={styles.sectionTitle}>Ready to take control of your money?</h2>
            <p className={styles.sectionSubtitle}>
              Join thousands of Indians who budget smarter with EchoSpend.
              Free download. No sign-up required. No data leaves your phone.
            </p>
            <div className={styles.downloadButtons}>
              <a
                href="https://play.google.com/store/apps/details?id=com.adkdinesh.echospend"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnPrimary}
                style={{ padding: "16px 36px", fontSize: "1rem", borderRadius: 40 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 0 1 0 1.38l-2.302 2.302L15.396 12l2.302-2.492zM5.864 3.467l10.937 6.333-2.302 2.302L5.864 3.467z" /></svg>
                Download for Android — Free
              </a>
            </div>
          </div>

          <div className={styles.qrCardContainer}>
            <div className={styles.qrCard}>
              <div className={styles.qrCodeWrapper}>
                <Image src="/qr-playstore.svg" alt="Scan to Download Echo Spend" width={140} height={140} className={styles.qrImage} />
                <div className={styles.qrLogoWrapper}>
                  <Image src="/app-screens/app_logo.png" alt="" width={28} height={28} className={styles.qrLogo} />
                </div>
                <div className={styles.qrScanLine} />
              </div>
              <div className={styles.qrMeta}>
                <span className={styles.qrText}>Scan to Download</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerLogoDesc}>
            <Link href="#" className={styles.footerLogo}>
              <Image src="/app-screens/app_logo.png" alt="" width={28} height={28} className={styles.logoImage} />
              <span>Echo Spend</span>
            </Link>
            <p className={styles.footerDesc}>
              India&apos;s most private finance app. Powered by on-device AI and your personal Google Drive.
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#features" className={styles.footerLink}>Features</a></li>
              <li><a href="#privacy" className={styles.footerLink}>Privacy</a></li>
              <li><a href="#ai-advisor" className={styles.footerLink}>AI Advisor</a></li>
              <li><a href="#faq" className={styles.footerLink}>FAQs</a></li>
            </ul>
          </div>

          <div className={styles.footerCol}>
            <h4>Legal</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><a href="mailto:hello@echospend.app" className={styles.footerLink}>Contact</a></li>
              <li><a href="https://github.com/Dineshkumargits/echo-spend" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className={`${styles.container} ${styles.footerBottom}`}>
          <p>&copy; 2026 Echo Spend. Built with 💚 in India. Your data stays on your device. Always.</p>
        </div>
      </footer>
    </>
  );
}
