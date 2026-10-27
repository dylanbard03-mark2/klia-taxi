import type { Metadata } from "next";
import Link from "next/link";
import {
  fareZones,
  vehicles,
  surcharges,
  hasFaresAvailable,
  bookingPolicies,
  serviceAreas,
} from "@/config/business";

export const metadata: Metadata = {
  title: "Rates & Zones",
  description:
    "View fare zones and pricing for KLIA and KLIA2 airport transfers. Covering Kuala Lumpur, Petaling Jaya, Subang, Putrajaya, and more.",
};

export default function RatesPage() {
  const faresAvailable = hasFaresAvailable();

  return (
    <div style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-badge">Pricing</span>
          <h1 style={{ margin: "12px 0 8px" }}>Rates &amp; Zones</h1>
          <p style={{ maxWidth: 560, margin: "0 auto", fontSize: "1rem" }}>
            Our fares are based on the pickup zone, destination, and vehicle type.
          </p>
        </div>

        {/* Fare Table or Quote CTA */}
        {faresAvailable ? (
          <div className="rates-table-wrapper">
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
                        <span className="rates-areas">
                          {zone.areas.join(", ")}
                        </span>
                      </td>
                      {vehicles.map((v) => (
                        <td key={v.id} className="rates-price">
                          {zone.fares[v.id] || (
                            <span className="rates-quote">Quote</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="card" style={{ textAlign: "center", padding: "48px 32px", maxWidth: 600, margin: "0 auto" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>💬</div>
            <h2 style={{ margin: "0 0 12px", fontSize: "1.3rem" }}>Request a Quote</h2>
            <p style={{ maxWidth: 440, margin: "0 auto 24px" }}>
              Our fare schedule is being finalised. Please contact us or submit a
              booking request for a personalised quote based on your route and
              vehicle preference.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/booking" className="btn btn-primary">
                Request a Booking
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Contact Us
              </Link>
            </div>
          </div>
        )}

        {/* Zone Coverage */}
        <div style={{ maxWidth: 700, margin: "48px auto 0" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: 24 }}>Service Coverage</h2>

          <div className="coverage-grid">
            {fareZones.map((zone) => (
              <div key={zone.id} className="coverage-card">
                <h3 style={{ fontSize: "0.95rem", margin: "0 0 6px" }}>{zone.name}</h3>
                <p style={{ fontSize: "0.85rem", margin: 0, color: "var(--color-text-muted)" }}>
                  {zone.areas.join(" • ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Surcharges */}
        {surcharges.some((s) => s.confirmed) && (
          <div style={{ maxWidth: 700, margin: "48px auto 0" }}>
            <h2 style={{ fontSize: "1.3rem", marginBottom: 24 }}>Additional Surcharges</h2>
            <div className="card" style={{ padding: 0, overflow: "hidden" }}>
              {surcharges
                .filter((s) => s.confirmed)
                .map((s, i) => (
                  <div
                    key={s.id}
                    style={{
                      padding: "16px 24px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: i < surcharges.filter((s) => s.confirmed).length - 1 ? "1px solid var(--color-border-light)" : "none",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.9rem" }}>{s.name}</strong>
                      <p style={{ fontSize: "0.8rem", margin: "2px 0 0", color: "var(--color-text-muted)" }}>
                        {s.description}
                      </p>
                    </div>
                    <span style={{ fontWeight: 600, color: "var(--color-accent-teal)", whiteSpace: "nowrap" }}>
                      {s.amount}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Vehicle Comparison */}
        <div style={{ maxWidth: 700, margin: "48px auto 0" }}>
          <h2 style={{ fontSize: "1.3rem", marginBottom: 24 }}>Vehicle Comparison</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="rates-table" style={{ minWidth: 400 }}>
              <thead>
                <tr>
                  <th>Vehicle</th>
                  <th>Max Passengers</th>
                  <th>Max Luggage</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr key={v.id}>
                    <td><strong>{v.name}</strong></td>
                    <td>{v.maxPassengers}</td>
                    <td>{v.maxLuggage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <Link href="/booking" className="btn btn-primary btn-lg">
            Book Your Transfer
          </Link>
        </div>
      </div>
    </div>
  );
}
