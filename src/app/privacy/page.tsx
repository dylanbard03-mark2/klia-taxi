import type { Metadata } from "next";
import Link from "next/link";
import { brand, contact } from "@/config/business";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: `Privacy Notice and personal data handling policy for ${brand.name}. Compliant with Malaysia's Personal Data Protection Act 2010 (PDPA).`,
};

export default function PrivacyPage() {
  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Data Protection</span>
          <h1>Privacy Notice</h1>
          <p>
            How {brand.name} collects, protects, and handles your personal data in compliance with Malaysia&apos;s Personal Data Protection Act 2010 (PDPA).
          </p>
        </div>

        {/* Content Box */}
        <div className="privacy-wrapper">
          {/* Section 1 */}
          <div className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              {brand.name} (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates airport taxi, private car transfer, and chauffeured transport services between Kuala Lumpur International Airport (KLIA Terminal 1 &amp; Terminal 2) and surrounding areas in Malaysia.
            </p>
            <p>
              We are committed to safeguarding the privacy and personal information of our customers. This Privacy Notice outlines our practices regarding the collection, use, disclosure, and protection of personal data provided through our website and booking channels.
            </p>
          </div>

          {/* Section 2 */}
          <div className="privacy-section">
            <h2>2. Personal Data We Collect</h2>
            <p>
              When you submit an airport transfer booking request or contact our team, we may collect the following personal information:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Full name, mobile telephone number, WhatsApp contact number, and email address.</li>
              <li><strong>Travel Details:</strong> Pick-up address/hotel/residence, destination terminal (KLIA Terminal 1 or KLIA Terminal 2), travel date, requested pickup time, and flight details (flight number / airline).</li>
              <li><strong>Trip Specifications:</strong> Preferred vehicle category, passenger count, luggage count, and optional travel notes (e.g. child seats, return journey preferences).</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="privacy-section">
            <h2>3. Purpose of Processing Personal Data</h2>
            <p>
              Your personal data is collected and processed exclusively for legitimate operational purposes, including:
            </p>
            <ul>
              <li>Facilitating, organizing, and executing your scheduled airport transfer.</li>
              <li>Assigning and dispatching the appropriate vehicle and driver.</li>
              <li>Monitoring incoming flight schedules to coordinate timely meet-and-greet pickups.</li>
              <li>Communicating booking confirmations, quotes, operational updates, and driver contact details via WhatsApp, phone, or email.</li>
              <li>Resolving customer inquiries, feedback, lost-and-found reports, or billing queries.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="privacy-section">
            <h2>4. Transmission via WhatsApp &amp; Electronic Channels</h2>
            <p>
              Our website facilitates booking requests via direct electronic handoff to WhatsApp (operated by Meta Platforms, Inc.). When you initiate a booking request via WhatsApp, your formatted journey summary is populated into a direct chat message sent to our dispatch team.
            </p>
            <p>
              Please note that communications conducted over WhatsApp are governed by WhatsApp&apos;s own terms of service and privacy policies. We do not store credit card or financial credentials on this website.
            </p>
          </div>

          {/* Section 5 */}
          <div className="privacy-section">
            <h2>5. Disclosure of Personal Data</h2>
            <p>
              We treat your personal information with strict confidentiality. We do not sell, rent, trade, or distribute your personal details to commercial third parties or advertisers.
            </p>
            <p>
              Personal details (such as passenger name, pickup location, contact number, and flight number) are shared only with the assigned transport driver solely for the purpose of executing your journey.
            </p>
          </div>

          {/* Section 6 */}
          <div className="privacy-section">
            <h2>6. Data Security &amp; Retention</h2>
            <p>
              We implement reasonable administrative and operational safeguards to protect your personal information against unauthorised access, alteration, or disclosure. Personal booking records are retained only for as long as necessary to fulfill the transportation service and comply with standard Malaysian business accounting and legal obligations.
            </p>
          </div>

          {/* Section 7 */}
          <div className="privacy-section">
            <h2>7. Your Rights Under PDPA 2010</h2>
            <p>
              Under the Malaysian Personal Data Protection Act 2010, you have the right to:
            </p>
            <ul>
              <li>Request access to your personal data held in our records.</li>
              <li>Request correction or updating of any inaccurate, incomplete, or outdated data.</li>
              <li>Withdraw consent for future communications by notifying our dispatch team.</li>
            </ul>
          </div>

          {/* Section 8 */}
          <div className="privacy-section">
            <h2>8. Inquiries &amp; Contact Information</h2>
            <p>
              If you have any questions or concerns regarding this Privacy Notice or wish to exercise your rights regarding your personal data, please contact our operator through our official channels:
            </p>
            <div style={{ background: "var(--color-bg)", padding: "16px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", marginTop: 12 }}>
              <p style={{ margin: "0 0 6px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                {brand.name} Operations
              </p>
              {contact.email && (
                <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>
                  Email: <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              )}
              {contact.phone && (
                <p style={{ margin: "0 0 4px", fontSize: "0.9rem" }}>
                  Phone: <a href={`tel:+${contact.phone.replace(/\D/g, "")}`}>{contact.phone}</a>
                </p>
              )}
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                Or reach us via our <Link href="/contact" style={{ textDecoration: "underline" }}>Contact Page</Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/" className="btn btn-secondary btn-sm">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
