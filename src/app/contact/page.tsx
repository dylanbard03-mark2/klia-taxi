import type { Metadata } from "next";
import Link from "next/link";
import {
  brand,
  contact,
  getWhatsAppUrl,
  getPhoneUrl,
  isContactConfigured,
  serviceAreas,
  bookingPolicies,
} from "@/config/business";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${brand.name} for reliable airport transfers to KLIA & KLIA2. Reach us via WhatsApp, phone, or email for bookings and inquiries.`,
};

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl(
    "Hello! I have an inquiry regarding your KLIA / KLIA2 airport transfer service."
  );
  const phoneUrl = getPhoneUrl();
  const contactConfigured = isContactConfigured();

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-badge">Get In Touch</span>
          <h1>Contact {brand.name}</h1>
          <p>
            Have a question about our airport transfers, vehicle capacities, or custom routes?
            Reach out through any of our channels below.
          </p>
        </div>

        {/* Unconfigured Notice (Safety Guard) */}
        {!contactConfigured && (
          <div className="notice-banner" style={{ marginBottom: 32 }}>
            <strong>Operator Notice:</strong> Direct phone and WhatsApp lines are currently being
            finalised for online display. You may still prepare and submit a booking request via the{" "}
            <Link href="/booking" style={{ textDecoration: "underline", fontWeight: 600 }}>
              Booking Page
            </Link>
            .
          </div>
        )}

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Channels */}
          <div className="contact-card card">
            <h2 style={{ fontSize: "1.3rem", marginTop: 0, marginBottom: 8 }}>
              Communication Channels
            </h2>
            <p style={{ marginTop: 0, color: "var(--color-text-secondary)" }}>
              For urgent bookings (within 24 hours), we strongly recommend reaching out via WhatsApp for the fastest response.
            </p>

            {/* WhatsApp */}
            <div className="contact-channel">
              <div className="contact-channel__icon contact-channel__icon--whatsapp">
                <WhatsAppIcon />
              </div>
              <div className="contact-channel__details">
                <div className="contact-channel__title">WhatsApp Instant Chat</div>
                <div className="contact-channel__subtitle">
                  Recommended for quick quotes &amp; urgent ride confirmations
                </div>
                {whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-sm"
                    style={{ marginTop: 6 }}
                  >
                    Chat on WhatsApp
                  </a>
                ) : (
                  <span className="rates-quote">Available upon booking submission</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className="contact-channel">
              <div className="contact-channel__icon contact-channel__icon--phone">
                <PhoneIcon />
              </div>
              <div className="contact-channel__details">
                <div className="contact-channel__title">Telephone Hotline</div>
                <div className="contact-channel__subtitle">Direct voice call with operator</div>
                {contact.phone ? (
                  <a href={phoneUrl || "#"} className="contact-channel__value">
                    {contact.phone}
                  </a>
                ) : (
                  <span className="rates-quote">Phone inquiry available</span>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="contact-channel">
              <div className="contact-channel__icon contact-channel__icon--email">
                <EmailIcon />
              </div>
              <div className="contact-channel__details">
                <div className="contact-channel__title">Email Inquiries</div>
                <div className="contact-channel__subtitle">
                  Best for corporate bookings, advance itineraries &amp; receipts
                </div>
                {contact.email ? (
                  <a href={`mailto:${contact.email}`} className="contact-channel__value">
                    {contact.email}
                  </a>
                ) : (
                  <span className="rates-quote">Email support available</span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Service Hours & Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Operating Hours Card */}
            <div className="card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: "1.15rem" }}>Service Hours</h3>
                <span className="hours-badge">24/7 Operations</span>
              </div>
              <p style={{ margin: "0 0 16px", fontSize: "0.95rem", lineHeight: 1.6 }}>
                {bookingPolicies.operatingHours}
              </p>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
                * We recommend booking at least {bookingPolicies.minimumLeadTimeHours} hours ahead to guarantee vehicle availability.
              </div>
            </div>

            {/* Service Coverage Card */}
            <div className="card">
              <h3 style={{ margin: "0 0 12px", fontSize: "1.15rem" }}>Key Coverage Areas</h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.9rem", color: "var(--color-text-secondary)" }}>
                We provide point-to-point transfers to and from both KLIA terminals:
              </p>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.9rem", lineHeight: 1.8, color: "var(--color-text-secondary)" }}>
                <li><strong>KLIA Terminal 1</strong> — Full-service &amp; international airlines</li>
                <li><strong>KLIA Terminal 2</strong> — AirAsia &amp; low-cost carriers</li>
                <li><strong>Kuala Lumpur &amp; Klang Valley</strong> — City Centre, PJ, Subang, Shah Alam</li>
                <li><strong>Government &amp; Tech Hubs</strong> — Putrajaya &amp; Cyberjaya</li>
                <li><strong>Outstation Destinations</strong> — Seremban, Melaka, Genting, Cameron</li>
              </ul>
              <div style={{ marginTop: 20 }}>
                <Link href="/rates" className="btn btn-secondary btn-sm" style={{ width: "100%" }}>
                  Explore Rate Zones
                </Link>
              </div>
            </div>

            {/* Quick Action Card */}
            <div className="card" style={{ background: "var(--color-accent-teal-light)", borderColor: "#B2DFE6" }}>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.1rem", color: "var(--color-accent-teal-dark)" }}>
                Ready to Book?
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: "var(--color-text-primary)" }}>
                Use our streamlined booking form to calculate your itinerary details and initiate confirmation.
              </p>
              <Link href="/booking" className="btn btn-primary btn-sm" style={{ width: "100%" }}>
                Go to Booking Form
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
