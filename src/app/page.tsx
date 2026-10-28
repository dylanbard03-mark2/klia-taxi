import Link from "next/link";
import {
  brand,
  vehicles,
  faqItems,
  contact,
  getWhatsAppUrl,
  getPhoneUrl,
  bookingPolicies,
  fareZones,
  surcharges,
  hasFaresAvailable,
  serviceAreas,
} from "@/config/business";
import { QuickBookingForm } from "@/components/QuickBookingForm";
import { VehicleCard } from "@/components/VehicleCard";
import { FAQSection } from "@/components/FAQSection";
import { BookingForm } from "@/components/BookingForm";
import { MobileQuickNav } from "@/components/MobileQuickNav";

export default function HomePage() {
  const whatsappUrl = getWhatsAppUrl("Hello, I'd like to book an airport transfer.");
  const phoneUrl = getPhoneUrl();
  const faresAvailable = hasFaresAvailable();

  return (
    <>
      {/* ─── Mobile Sticky Module Navigator ───────────── */}
      <MobileQuickNav />

      {/* ─── Module 1: Hero & Quick Booking ────────────── */}
      <section className="hero" id="quick-book">
        <div className="container">
          <div className="hero__grid">
            <div className="hero__content">
              <span className="section-badge">KLIA &amp; KLIA2 Airport Transfers</span>
              <h1 className="hero__heading">
                Airport Transfers to KLIA &amp; KLIA2, Made Simple
              </h1>
              <p className="hero__text">
                Pre-book your ride to or from Kuala Lumpur International Airport.
                Comfortable vehicles, straightforward booking, and a team that
                confirms every detail before your trip.
              </p>
              <div className="hero__actions">
                <Link href="#booking" className="btn btn-primary btn-lg">
                  Request a Booking
                </Link>
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp btn-lg"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero__image-wrapper">
                <div className="hero__image-placeholder">
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#2A7B88" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                    <circle cx="7" cy="17" r="2" />
                    <path d="M9 17h6" />
                    <circle cx="17" cy="17" r="2" />
                  </svg>
                  <p style={{ color: "var(--color-text-muted)", fontSize: "0.85rem", marginTop: 8 }}>
                    Fast Airport Pickup
                  </p>
                </div>
                <div className="hero__stats">
                  <div className="hero__stat">
                    <span className="hero__stat-icon">✈️</span>
                    <span>KLIA &amp; KLIA2</span>
                  </div>
                  <div className="hero__stat">
                    <span className="hero__stat-icon">🕐</span>
                    <span>Pre-booked Service</span>
                  </div>
                  <div className="hero__stat">
                    <span className="hero__stat-icon">🚗</span>
                    <span>Multiple Vehicle Types</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Booking Bar ──────────────────────── */}
      <section className="section" style={{ paddingTop: 0, marginTop: -32, position: "relative", zIndex: 10 }}>
        <div className="container">
          <QuickBookingForm />
        </div>
      </section>

      {/* ─── Module 2: Fleet ────────────────────────── */}
      <section className="section" id="vehicles">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Our Fleet</span>
            <h2>Choose Your Vehicle</h2>
            <p>
              Select from our range of vehicles to match your group size and luggage needs.
            </p>
          </div>
          <div className="vehicles-grid">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Module 3: Rates & Coverage Zones ───────── */}
      <section className="section section-alt" id="rates">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Transparent Pricing</span>
            <h2>Rates &amp; Service Zones</h2>
            <p>
              Standard fares covering Greater Kuala Lumpur, Selangor, and outstation destinations.
            </p>
          </div>

          {faresAvailable ? (
            <div className="rates-table-wrapper" style={{ marginBottom: 32 }}>
              <div style={{ overflowX: "auto" }}>
                <table className="rates-table">
                  <thead>
                    <tr>
                      <th>Zone / Area</th>
                      {vehicles.map((v) => (
                        <th key={v.id}>{v.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fareZones.map((zone) => (
                      <tr key={zone.id}>
                        <td>
                          <strong>{zone.name}</strong>
                          <br />
                          <span className="rates-areas">{zone.areas.join(", ")}</span>
                        </td>
                        {vehicles.map((v) => (
                          <td key={v.id} className="rates-price">
                            {zone.fares[v.id] || <span className="rates-quote">Quote</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="card" style={{ maxWidth: 720, margin: "0 auto 32px", textAlign: "center", padding: "28px 20px" }}>
              <div style={{ fontSize: "2rem", marginBottom: 12 }}>💬</div>
              <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem" }}>Fare to be Confirmed via WhatsApp</h3>
              <p style={{ margin: "0 auto 16px", maxWidth: 540, fontSize: "0.95rem", color: "var(--color-text-secondary)" }}>
                Official flat-rate fares are currently subject to operator confirmation.
                Submitting a booking request does not constitute a confirmed booking or guaranteed fare.
                Our team will verify route availability and quote your exact fare directly on WhatsApp.
              </p>
              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="#booking" className="btn btn-primary btn-sm">
                  Fill Booking Form
                </Link>
                {whatsappUrl && (
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                    Request Quote on WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Coverage Summary Badges */}
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <h4 style={{ textAlign: "center", margin: "0 0 16px", fontSize: "1rem", color: "var(--color-text-secondary)" }}>
              Covered Pick-up &amp; Drop-off Zones
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
              {serviceAreas.coverageAreas.map((area) => (
                <span
                  key={area}
                  style={{
                    background: "var(--color-card-bg)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "100px",
                    padding: "6px 14px",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: "var(--color-text-primary)",
                  }}
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Module 4: Full Booking Form ────────────── */}
      <section className="section" id="booking" style={{ scrollMarginTop: "80px" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Booking Request</span>
            <h2>Book Your Transfer</h2>
            <p>
              Complete the details below to prepare your booking request for WhatsApp. Submitting does not confirm your ride until accepted by our team.
            </p>
          </div>
          <div className="container-narrow" style={{ padding: 0 }}>
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ─── Module 5: How It Works ─────────────────── */}
      <section className="section section-alt" id="how-it-works">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Simple Process</span>
            <h2>How It Works</h2>
            <p>Booking your airport transfer takes just a few steps.</p>
          </div>
          <div className="steps-grid">
            {[
              {
                step: "1",
                title: "Submit a Request",
                desc: "Fill in your journey details. Your request is formatted and sent directly to our team via WhatsApp.",
                icon: "📝",
              },
              {
                step: "2",
                title: "Get Confirmation",
                desc: "Our dispatch team reviews vehicle availability and confirms your booking details and pickup time.",
                icon: "✅",
              },
              {
                step: "3",
                title: "Meet Your Driver",
                desc: "Your driver arrives punctually at the agreed terminal meeting point or pickup address.",
                icon: "🤝",
              },
              {
                step: "4",
                title: "Enjoy Your Ride",
                desc: "Sit back and travel comfortably. Fare payment is settled directly upon arrival.",
                icon: "🚗",
              },
            ].map((item) => (
              <div className="step-card card" key={item.step}>
                <div className="step-card__number">{item.step}</div>
                <div className="step-card__icon">{item.icon}</div>
                <h3 className="step-card__title">{item.title}</h3>
                <p className="step-card__desc">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="steps-notice">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            <p>
              <strong>Notice:</strong> All bookings are confirmed directly via our dispatch WhatsApp or telephone before pickup.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Module 6: Direct Contact & Hours ───────── */}
      <section className="section" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Direct Communication</span>
            <h2>Contact &amp; Assistance</h2>
            <p>Have questions or urgent trip adjustments? We are here to help.</p>
          </div>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div className="contact-grid" style={{ marginTop: 0 }}>
              <div className="contact-channel" style={{ background: "var(--color-card-bg)", border: "1px solid var(--color-border)" }}>
                <div className="contact-channel__icon contact-channel__icon--whatsapp">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="contact-channel__details">
                  <div className="contact-channel__title">WhatsApp Instant Dispatch</div>
                  <div className="contact-channel__subtitle">Fastest response for urgent rides &amp; quotes</div>
                  {whatsappUrl && (
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp btn-sm">
                      Chat on WhatsApp
                    </a>
                  )}
                </div>
              </div>

              <div className="contact-channel" style={{ background: "var(--color-card-bg)", border: "1px solid var(--color-border)" }}>
                <div className="contact-channel__icon contact-channel__icon--phone">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="contact-channel__details">
                  <div className="contact-channel__title">Hotline Calling</div>
                  <div className="contact-channel__subtitle">Direct phone line with dispatch operator</div>
                  {contact.phone && (
                    <a href={phoneUrl || "#"} className="contact-channel__value">
                      {contact.phone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 24, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              🕒 {bookingPolicies.operatingHours}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Module 7: FAQ ──────────────────────────── */}
      <section className="section section-alt" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Questions?</span>
            <h2>Frequently Asked Questions</h2>
            <p>Find answers to common questions about our airport transfer service.</p>
          </div>
          <div className="container-narrow" style={{ padding: 0 }}>
            <FAQSection items={faqItems} />
          </div>
        </div>
      </section>
    </>
  );
}
