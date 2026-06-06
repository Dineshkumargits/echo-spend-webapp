"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const [isDark, setIsDark] = useState(true);

  // Initialize theme from localStorage or system preference
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

  // Theme toggle handler
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

  // Scrollspy for highlighting active TOC section
  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`);

    const observerOptions = {
      root: null,
      rootMargin: "-15% 0px -75% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Smooth scroll handler with offset for header
  const handleTocClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setActiveSection(targetId);
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  const sectionsList = [
    { id: "introduction", label: "1. Introduction" },
    { id: "data-collection", label: "2. Data Collection & Use" },
    { id: "sms-processing", label: "3. Local SMS & AI Processing" },
    { id: "google-drive-sync", label: "4. Google Drive Backup" },
    { id: "third-party-services", label: "5. Third-Party Disclosures" },
    { id: "data-security", label: "6. Data Security" },
    { id: "user-rights", label: "7. Your Rights & Control" },
    { id: "policy-changes", label: "8. Changes to Policy" },
    { id: "contact", label: "9. Contact Us" },
  ];

  return (
    <>
      {/* Header Bar */}
      <header
        className="main-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottom: "1px solid var(--header-border)",
          backgroundColor: "var(--header-bg)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "var(--text-primary)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              fontSize: "1.25rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                padding: "2px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--card-border)",
              }}
            >
              <Image
                src="/logos/icon.png"
                alt="Echo Spend Logo"
                width={36}
                height={36}
                style={{ borderRadius: "8px", display: "block" }}
                priority
              />
            </div>
            <span
              className="brand-text"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Echo Spend
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "var(--text-secondary)",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
            >
              Home
            </Link>

            <button
              onClick={handleThemeToggle}
              className="theme-toggle-btn"
              aria-label="Toggle Theme"
              style={{
                background: "none",
                border: "1px solid var(--card-border)",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--text-primary)",
                cursor: "pointer",
                backgroundColor: "var(--card-bg)",
              }}
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

            <button
              onClick={handlePrint}
              className="btn-print"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                border: "none",
                borderRadius: "30px",
                padding: "10px 20px",
                color: "#ffffff",
                fontFamily: "var(--font-heading)",
                fontWeight: 600,
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(var(--accent-blue-rgb), 0.3)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ width: "16px", height: "16px" }}
              >
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              <span>Print Policy</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className={styles.pageContainer}>
        {/* Hero title block */}
        <section className={styles.hero}>
          <span className={styles.badge}>Effective Date: June 5, 2026</span>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.subtitle}>
            Learn how Echo Spend secures your budget data, processes alerts
            offline, and guarantees complete device ownership over your personal
            finances.
          </p>
        </section>

        {/* Content Section Grid */}
        <div className={styles.grid}>
          {/* Table of contents aside navigation */}
          <aside className={styles.aside}>
            <nav className={styles.tocNav} aria-label="Table of Contents">
              <div className={styles.tocHeader}>SECTIONS</div>
              <ul className={styles.tocList}>
                {sectionsList.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className={`${styles.tocLink} ${activeSection === sec.id ? styles.tocLinkActive : ""}`}
                      onClick={(e) => handleTocClick(e, sec.id)}
                    >
                      {sec.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Privacy details sheet */}
          <article className={styles.documentCard}>
            {/* Section 1 */}
            <section id="introduction" className={styles.section}>
              <h2>1. Introduction</h2>
              <p>
                Welcome to <strong>Echo Spend</strong>. We respect your privacy
                and are committed to protecting it. Echo Spend is designed from
                the ground up on a &ldquo;Privacy First&rdquo; principle. Unlike
                typical personal finance applications that upload your bank
                statements and income data to cloud database hubs, Echo Spend
                runs almost entirely offline, utilizing local computing
                capabilities to keep your sensitive financial profiles private
                and under your direct physical control.
              </p>
              <p>
                This Privacy Policy outlines the specific permissions our mobile
                application requests, what data is processed, how we process it,
                and the control mechanisms you retain over your information. By
                installing and using Echo Spend, you consent to the operations
                described in this policy.
              </p>
            </section>

            <hr className={styles.divider} />

            {/* Section 2 */}
            <section id="data-collection" className={styles.section}>
              <h2>2. Data Collection & Use</h2>
              <p>
                Echo Spend acts as a manager and organizer for your transaction
                logs. Below is a comprehensive breakdown of the types of data
                collected and processed locally by the app:
              </p>

              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <h3>Transaction & Budget Entries</h3>
                  <p>
                    All bank accounts, cash balances, credit card limits,
                    transactions (amounts, categories, merchants, notes),
                    subscription schedules, goals, and budgets you register in
                    the app are stored exclusively on your device in a private
                    SQLite database. The developers of Echo Spend do not
                    collect, view, or store this data on any server.
                  </p>
                </div>

                <div className={styles.infoCard}>
                  <h3>Biometric Authentication</h3>
                  <p>
                    If you enable app protection via biometrics (Fingerprint or
                    Face ID), authentication is handled natively by your
                    device&apos;s operating system. Echo Spend never accesses,
                    collects, or stores your biometric credentials.
                  </p>
                </div>

                <div className={styles.infoCard}>
                  <h3>Camera & Photos</h3>
                  <p>
                    If you choose to attach receipt images to your transactions,
                    the app requests camera and photo library access. Receipts
                    captured are saved locally in the app&apos;s sandboxed
                    directory and are not shared with any external parties.
                  </p>
                </div>
              </div>
            </section>

            <hr className={styles.divider} />

            {/* Section 3 */}
            <section id="sms-processing" className={styles.section}>
              <h2>3. Local SMS & AI Processing</h2>
              <p>
                Echo Spend features a smart notification reader that scans
                incoming transaction alerts to build draft records, removing the
                friction of manual bookkeeping. To provide this utility, the app
                requests the <strong>READ_SMS</strong> permission on Android.
              </p>

              <div className={styles.calloutBox}>
                <h4>
                  <span className={styles.badgePurple}>
                    Zero-Cloud AI Architecture
                  </span>{" "}
                  100% Private SMS Parsing
                </h4>
                <p>
                  Unlike financial apps that upload your text alerts to external
                  web servers, Echo Spend performs SMS classification and
                  information extraction entirely on your physical device. We do
                  not transmit your SMS text strings, phone numbers, or account
                  details to our servers.
                </p>
                <ul>
                  <li>
                    <strong>Local AI Model:</strong> The app utilizes a local,
                    on-device Large Language Model (Llama 3.2 1B Instruct via
                    the <code>llama.rn</code> library) compiled to run locally.
                    Once you download the model file within the app settings,
                    all text parsing runs directly in your device&apos;s RAM and
                    CPU/DSP.
                  </li>
                  <li>
                    <strong>Local Heuristics:</strong> If you choose not to
                    download the local AI model, or if the model file is not
                    initialized, the app falls back onto a strict on-device
                    pattern-matching regex script to parse SMS content locally.
                  </li>
                  <li>
                    <strong>AI Insights:</strong> The app generates weekly
                    averages, category warnings, and savings suggestions. This
                    engine operates purely on deterministic local math
                    heuristics without external API requests.
                  </li>
                </ul>
              </div>
            </section>

            <hr className={styles.divider} />

            {/* Section 4 */}
            <section id="google-drive-sync" className={styles.section}>
              <h2>4. Google Drive Backup</h2>
              <p>
                To prevent data loss in the event of device failure or
                migration, Echo Spend provides an optional cloud backup feature.
                This feature requires Google Sign-In authentication.
              </p>
              <p>
                <strong>Strict Sandbox Isolation:</strong> The app requests
                permission to connect to your Google Drive via the restricted{" "}
                <code>appDataFolder</code> scope. This means:
              </p>
              <ul>
                <li>
                  Your database backup is uploaded to a hidden,
                  application-specific directory inside your personal Google
                  Drive storage.
                </li>
                <li>
                  Echo Spend has <strong>zero access</strong> to your standard
                  Google Drive folders, files, photos, or documents.
                </li>
                <li>
                  Other apps, users, and the developers of Echo Spend cannot
                  view or read the database file stored in this hidden folder.
                </li>
                <li>
                  All data sync occurs directly between the Echo Spend app on
                  your device and Google&apos;s secure APIs. No intermediate
                  developer-hosted servers are utilized.
                </li>
              </ul>
            </section>

            <hr className={styles.divider} />

            {/* Section 5 */}
            <section id="third-party-services" className={styles.section}>
              <h2>5. Third-Party Disclosures & Tracking</h2>
              <p>
                We believe that personal financial tracking must be free of
                surveillance. To guarantee this, Echo Spend implements the
                following policies:
              </p>
              <ul>
                <li>
                  <strong>No Advertising:</strong> The app contains no
                  third-party advertisements or trackers.
                </li>
                <li>
                  <strong>No Analytics SDKs:</strong> We do not integrate
                  telemetry software, analytics hooks (such as Google Analytics
                  or Firebase Analytics), or user behavior trackers. We do not
                  monitor how you click, scroll, or budget.
                </li>
                <li>
                  <strong>No Crash Reporting Telemetry:</strong> We do not
                  automatically send stack traces, system logs, or device info
                  to external servers.
                </li>
                <li>
                  <strong>No Data Brokering:</strong> We do not sell, trade, or
                  share your financial data, SMS records, or Google account
                  details with data brokers, advertisers, or insurance firms.
                </li>
              </ul>
            </section>

            <hr className={styles.divider} />

            {/* Section 6 */}
            <section id="data-security" className={styles.section}>
              <h2>6. Data Security</h2>
              <p>
                Your local database file is protected by the default sandboxing
                protections of the Android and iOS operating systems, preventing
                unauthorized applications on your device from accessing Echo
                Spend&apos;s folders. Sensitive keys, such as OAuth tokens and
                local security configurations, are stored in the device&apos;s
                secure keychain or hardware-backed store via{" "}
                <code>expo-secure-store</code>.
              </p>
              <p>
                While we implement native operating system isolation, the
                absolute security of your offline database depends on you
                securing your physical device. We strongly recommend setting up
                device passwords, biometric locks, and enabling remote erase
                features in case of theft.
              </p>
            </section>

            <hr className={styles.divider} />

            {/* Section 7 */}
            <section id="user-rights" className={styles.section}>
              <h2>7. Your Rights & Control</h2>
              <p>
                Because your data is strictly yours and remains local, you
                possess absolute authority over it:
              </p>
              <ul>
                <li>
                  <strong>Data Portability:</strong> You can export your entire
                  transaction list at any time into a standard Comma-Separated
                  Values (CSV) file directly from the Settings screen.
                </li>
                <li>
                  <strong>Data Deletion:</strong> You can purge all transaction
                  drafts, accounts, and budgets from your phone by clicking
                  &ldquo;Clear All Data&rdquo; in the Settings menu, or by
                  performing a standard &ldquo;Clear Storage&rdquo; inside
                  Android/iOS Settings.
                </li>
                <li>
                  <strong>Cloud Backup Management:</strong> You can delete your
                  Google Drive backup database file directly by resetting the
                  backup settings in the app or removing Echo Spend&apos;s
                  authorization from your Google Account settings page.
                </li>
              </ul>
            </section>

            <hr className={styles.divider} />

            {/* Section 8 */}
            <section id="policy-changes" className={styles.section}>
              <h2>8. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our app&apos;s capabilities, SDK integrations, or
                legal compliance. Any changes will be posted on this page with
                an updated &ldquo;Effective Date&rdquo;. We encourage you to
                review this policy periodically to stay informed about how we
                safeguard your financial privacy.
              </p>
            </section>

            <hr className={styles.divider} />

            {/* Section 9 */}
            <section id="contact" className={styles.section}>
              <h2>9. Contact Us</h2>
              <p>
                If you have any questions, security concerns, or feedback
                regarding our privacy practices, please contact us at:
              </p>
              <div className={styles.contactDetails}>
                <p className={styles.contactItem}>
                  <span className={styles.contactIcon}>✉</span>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:info@adkdev.in">info@adkdev.in</a>
                </p>
              </div>
            </section>
          </article>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="main-footer"
        style={{
          borderTop: "1px solid var(--header-border)",
          backgroundColor: "var(--bg-secondary)",
          padding: "40px 24px",
          marginTop: "80px",
          textAlign: "center",
          color: "var(--text-muted)",
          fontSize: "0.9rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <p>&copy; 2026 Echo Spend. Built with absolute privacy in mind.</p>
          <p>
            <Link
              href="/"
              style={{ color: "var(--text-secondary)", textDecoration: "none" }}
            >
              Home
            </Link>
          </p>
        </div>
      </footer>
    </>
  );
}
