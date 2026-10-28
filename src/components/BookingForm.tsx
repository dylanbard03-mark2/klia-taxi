"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  vehicles,
  serviceAreas,
  contact,
  getWhatsAppUrl,
  brand,
  bookingPolicies,
  isContactConfigured,
} from "@/config/business";

interface BookingData {
  fullName: string;
  mobile: string;
  email: string;
  direction: "to-airport" | "from-airport";
  pickup: string;
  destination: string;
  terminal: string;
  date: string;
  time: string;
  flightNumber: string;
  vehicleType: string;
  passengers: string;
  luggage: string;
  notes: string;
  privacyAccepted: boolean;
}

const initialData: BookingData = {
  fullName: "",
  mobile: "",
  email: "",
  direction: "to-airport",
  pickup: "",
  destination: "",
  terminal: "",
  date: "",
  time: "",
  flightNumber: "",
  vehicleType: "",
  passengers: "1",
  luggage: "1",
  notes: "",
  privacyAccepted: false,
};

function BookingFormInner() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<BookingData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [step, setStep] = useState<"form" | "review" | "submitted">("form");

  // Use local date (not UTC) to avoid off-by-one day in Malaysia (UTC+8)
  const todayLocal = new Date();
  const today = [
    todayLocal.getFullYear(),
    String(todayLocal.getMonth() + 1).padStart(2, "0"),
    String(todayLocal.getDate()).padStart(2, "0"),
  ].join("-");
  const maxDateLocal = new Date();
  maxDateLocal.setDate(maxDateLocal.getDate() + bookingPolicies.maximumAdvanceDays);
  const maxDateStr = [
    maxDateLocal.getFullYear(),
    String(maxDateLocal.getMonth() + 1).padStart(2, "0"),
    String(maxDateLocal.getDate()).padStart(2, "0"),
  ].join("-");

  // Pre-fill from URL parameters
  useEffect(() => {
    const prefill: Partial<BookingData> = {};
    const dir = searchParams.get("direction");
    if (dir === "to-airport" || dir === "from-airport") prefill.direction = dir;
    const pickup = searchParams.get("pickup");
    if (pickup) prefill.pickup = pickup;
    const dest = searchParams.get("destination");
    if (dest) prefill.destination = dest;
    const date = searchParams.get("date");
    if (date) prefill.date = date;
    const vehicle = searchParams.get("vehicle");
    if (vehicle) prefill.vehicleType = vehicle;

    if (Object.keys(prefill).length > 0) {
      setData((prev) => ({ ...prev, ...prefill }));
    }
  }, [searchParams]);

  const updateField = (field: keyof BookingData, value: string | boolean) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!data.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (data.mobile.replace(/[\s\-\(\)]/g, "").length < 8) {
      newErrors.mobile = "Please enter a valid mobile number";
    }
    if (!data.pickup.trim()) newErrors.pickup = "Pickup location is required";
    if (!data.destination.trim()) newErrors.destination = "Destination is required";
    if (!data.terminal) newErrors.terminal = "Please select a terminal";
    if (!data.date) {
      newErrors.date = "Pickup date is required";
    } else if (data.date < today) {
      newErrors.date = "Date cannot be in the past";
    }
    if (!data.time) newErrors.time = "Pickup time is required";
    if (!data.vehicleType) newErrors.vehicleType = "Please select a vehicle type";
    const selectedVehicleForValidation = vehicles.find((v) => v.id === data.vehicleType);
    const paxCount = parseInt(data.passengers);
    if (!data.passengers || paxCount < 1) {
      newErrors.passengers = "At least 1 passenger is required";
    } else if (selectedVehicleForValidation && paxCount > selectedVehicleForValidation.maxPassengers) {
      newErrors.passengers = `${selectedVehicleForValidation.name} holds up to ${selectedVehicleForValidation.maxPassengers} passengers. Please choose a larger vehicle or reduce passenger count.`;
    }
    if (!data.luggage) newErrors.luggage = "Please enter luggage count";
    if (!data.privacyAccepted) {
      newErrors.privacyAccepted = "You must accept the privacy notice to proceed";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setStep("review");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const buildWhatsAppMessage = (): string => {
    const selectedVehicle = vehicles.find((v) => v.id === data.vehicleType);
    const lines = [
      `🚗 *${brand.name} — Booking Request*`,
      "",
      `📋 *Customer Details*`,
      `Name: ${data.fullName}`,
      `Mobile: ${data.mobile}`,
      data.email ? `Email: ${data.email}` : "",
      "",
      `🗺️ *Journey Details*`,
      `Direction: ${data.direction === "to-airport" ? "To Airport" : "From Airport"}`,
      `Pickup: ${data.pickup}`,
      `Destination: ${data.destination}`,
      `Terminal: ${data.terminal}`,
      `Date: ${formatDate(data.date)}`,
      `Time: ${data.time}`,
      data.flightNumber ? `Flight No: ${data.flightNumber}` : "",
      "",
      `🚘 *Vehicle & Passengers*`,
      `Vehicle: ${selectedVehicle?.name || data.vehicleType}`,
      `Passengers: ${data.passengers}`,
      `Luggage: ${data.luggage}`,
      data.notes ? `\n📝 *Notes*\n${data.notes}` : "",
      "",
      "---",
      "Sent via " + brand.name + " website booking form.",
    ];

    return lines.filter(Boolean).join("\n");
  };

  const handleWhatsAppSubmit = () => {
    const message = buildWhatsAppMessage();
    const url = getWhatsAppUrl(message);
    if (url) {
      window.open(url, "_blank");
      setStep("submitted");
    }
  };

  const handleBackToForm = () => {
    setStep("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const hasWhatsApp = !!contact.whatsapp;

  // ─── Submitted State ───────────────────────────
  if (step === "submitted") {
    return (
      <div className="booking-submitted card" style={{ textAlign: "center", padding: "48px 32px" }}>
        <div style={{ fontSize: "3rem", marginBottom: 16 }}>📩</div>
        <h2 style={{ margin: "0 0 12px" }}>Booking Request Sent</h2>
        <p style={{ maxWidth: 480, margin: "0 auto 24px" }}>
          Your booking details are ready in WhatsApp. <strong>Please press Send</strong> in
          WhatsApp to submit your request.
        </p>
        <div
          style={{
            background: "var(--color-accent-gold-light)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: "var(--radius-md)",
            padding: "16px 20px",
            maxWidth: 480,
            margin: "0 auto 24px",
          }}
        >
          <p style={{ fontSize: "0.9rem", margin: 0, fontWeight: 500, color: "var(--color-accent-gold)" }}>
            ⚠️ Your booking is <strong>not confirmed</strong> until our team contacts you.
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => { setData(initialData); setStep("form"); }} className="btn btn-secondary">
            New Booking
          </button>
          {hasWhatsApp && (
            <button onClick={handleWhatsAppSubmit} className="btn btn-whatsapp">
              Reopen WhatsApp
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── Review State ───────────────────────────────
  if (step === "review") {
    const selectedVehicle = vehicles.find((v) => v.id === data.vehicleType);
    return (
      <div className="booking-review card">
        <h2 style={{ margin: "0 0 8px", fontSize: "1.3rem" }}>Review Your Booking</h2>
        <p style={{ margin: "0 0 24px", fontSize: "0.9rem" }}>
          Please check the details below before continuing to WhatsApp.
        </p>

        <div className="review-section">
          <h3 className="review-section__title">Customer Details</h3>
          <dl className="review-dl">
            <dt>Name</dt><dd>{data.fullName}</dd>
            <dt>Mobile</dt><dd>{data.mobile}</dd>
            {data.email && <><dt>Email</dt><dd>{data.email}</dd></>}
          </dl>
        </div>

        <div className="review-section">
          <h3 className="review-section__title">Journey Details</h3>
          <dl className="review-dl">
            <dt>Direction</dt><dd>{data.direction === "to-airport" ? "To Airport" : "From Airport"}</dd>
            <dt>Pickup</dt><dd>{data.pickup}</dd>
            <dt>Destination</dt><dd>{data.destination}</dd>
            <dt>Terminal</dt><dd>{data.terminal}</dd>
            <dt>Date</dt><dd>{formatDate(data.date)}</dd>
            <dt>Time</dt><dd>{data.time}</dd>
            {data.flightNumber && <><dt>Flight No.</dt><dd>{data.flightNumber}</dd></>}
          </dl>
        </div>

        <div className="review-section">
          <h3 className="review-section__title">Vehicle &amp; Passengers</h3>
          <dl className="review-dl">
            <dt>Vehicle</dt><dd>{selectedVehicle?.name || data.vehicleType}</dd>
            <dt>Passengers</dt><dd>{data.passengers}</dd>
            <dt>Luggage</dt><dd>{data.luggage}</dd>
            {data.notes && <><dt>Notes</dt><dd>{data.notes}</dd></>}
          </dl>
        </div>

        <div
          style={{
            background: "var(--color-accent-gold-light)",
            border: "1px solid rgba(245, 158, 11, 0.35)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 24,
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "var(--color-text-primary)",
          }}
        >
          <strong>Important:</strong> Clicking &quot;Continue to WhatsApp&quot; will open WhatsApp with your
          booking details. You must press <strong>Send</strong> in WhatsApp to submit your request.
          Your booking is not confirmed until our team responds.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button onClick={handleBackToForm} className="btn btn-ghost">
            ← Edit Details
          </button>
          {hasWhatsApp ? (
            <button onClick={handleWhatsAppSubmit} className="btn btn-whatsapp btn-lg" style={{ flex: 1 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Continue to WhatsApp
            </button>
          ) : (
            <div
              style={{
                flex: 1,
                background: "var(--color-error-bg)",
                border: "1px solid var(--color-error)",
                borderRadius: "var(--radius-md)",
                padding: "14px 18px",
                fontSize: "0.85rem",
                color: "var(--color-error)",
              }}
            >
              ⚠️ <strong>Configuration needed:</strong> WhatsApp number is not configured.
              Please contact the site administrator.
              {contact.phone && (
                <span> You can call <a href={`tel:${contact.phone}`}>{contact.phone}</a> instead.</span>
              )}
              {contact.email && (
                <span> Or email <a href={`mailto:${contact.email}`}>{contact.email}</a>.</span>
              )}
            </div>
          )}
        </div>


      </div>
    );
  }

  // ─── Form State ─────────────────────────────────
  return (
    <form id="bookingForm" className="booking-form card" onSubmit={handleReview} noValidate>
      {/* No WhatsApp Warning */}
      {!hasWhatsApp && (
        <div
          style={{
            background: "var(--color-error-bg)",
            border: "1px solid var(--color-error)",
            borderRadius: "var(--radius-md)",
            padding: "14px 18px",
            marginBottom: 24,
            fontSize: "0.85rem",
            color: "var(--color-error)",
          }}
        >
          ⚠️ <strong>Development notice:</strong> WhatsApp number is not configured in{" "}
          <code>src/config/business.ts</code>. The booking submission will not work until a
          valid number is set.
        </div>
      )}

      {/* ─── Customer Details ───────────── */}
      <fieldset className="form-fieldset">
        <legend className="form-legend">Customer Details</legend>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="custName" className="form-label">
              Full Name <span className="required">*</span>
            </label>
            <input
              id="custName"
              name="custName"
              type="text"
              className={`form-input ${errors.fullName ? "error" : ""}`}
              value={data.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              required
            />
            {errors.fullName && <div className="form-error">{errors.fullName}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="custPhone" className="form-label">
              Mobile Number <span className="required">*</span>
            </label>
            <input
              id="custPhone"
              name="custPhone"
              type="tel"
              className={`form-input ${errors.mobile ? "error" : ""}`}
              value={data.mobile}
              onChange={(e) => updateField("mobile", e.target.value)}
              placeholder="+60 12-345 6789"
              autoComplete="tel"
              required
            />
            {errors.mobile && <div className="form-error">{errors.mobile}</div>}
            <div className="form-hint">Include country code for international numbers</div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="custEmail" className="form-label">
            Email Address <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <input
            id="custEmail"
            name="custEmail"
            type="email"
            className="form-input"
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="your@email.com"
            autoComplete="email"
          />
        </div>
      </fieldset>

      {/* ─── Journey Details ────────────── */}
      <fieldset className="form-fieldset">
        <legend className="form-legend">Journey Details</legend>

        {/* Direction */}
        <div className="form-group">
          <label className="form-label">Journey Direction <span className="required">*</span></label>
          <div className="direction-toggle" id="tripDirection">
            <button
              type="button"
              className={`direction-btn ${data.direction === "to-airport" ? "active" : ""}`}
              onClick={() => updateField("direction", "to-airport")}
            >
              ✈️ To Airport
            </button>
            <button
              type="button"
              className={`direction-btn ${data.direction === "from-airport" ? "active" : ""}`}
              onClick={() => updateField("direction", "from-airport")}
            >
              🏠 From Airport
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="pickupAddress" className="form-label">
              Pickup Location <span className="required">*</span>
            </label>
            <input
              id="pickupAddress"
              name="pickupAddress"
              type="text"
              className={`form-input ${errors.pickup ? "error" : ""}`}
              value={data.pickup}
              onChange={(e) => updateField("pickup", e.target.value)}
              placeholder={data.direction === "to-airport" ? "e.g. Petaling Jaya, Sunway Hotel" : "e.g. KLIA Terminal 1 Arrival Hall"}
              required
            />
            {errors.pickup && <div className="form-error">{errors.pickup}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="destinationAddress" className="form-label">
              Destination <span className="required">*</span>
            </label>
            <input
              id="destinationAddress"
              name="destinationAddress"
              type="text"
              className={`form-input ${errors.destination ? "error" : ""}`}
              value={data.destination}
              onChange={(e) => updateField("destination", e.target.value)}
              placeholder={data.direction === "to-airport" ? "e.g. KLIA Terminal 2" : "e.g. KL Sentral, Bangsar"}
              required
            />
            {errors.destination && <div className="form-error">{errors.destination}</div>}
          </div>
        </div>

        <div className="form-row form-row--3col">
          <div className="form-group">
            <label htmlFor="terminal" className="form-label">
              Airport Terminal <span className="required">*</span>
            </label>
            <select
              id="terminal"
              name="terminal"
              className={`form-select ${errors.terminal ? "error" : ""}`}
              value={data.terminal}
              onChange={(e) => updateField("terminal", e.target.value)}
              required
            >
              <option value="">Select terminal</option>
              {serviceAreas.airports.map((a) => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
              <option value="Not Sure">Not Sure</option>
            </select>
            {errors.terminal && <div className="form-error">{errors.terminal}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="pickupDate" className="form-label">
              Pickup Date <span className="required">*</span>
            </label>
            <input
              id="pickupDate"
              name="pickupDate"
              type="date"
              className={`form-input ${errors.date ? "error" : ""}`}
              min={today}
              max={maxDateStr}
              value={data.date}
              onChange={(e) => updateField("date", e.target.value)}
              required
            />
            {errors.date && <div className="form-error">{errors.date}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="pickupTime" className="form-label">
              Pickup Time <span className="required">*</span>
            </label>
            <input
              id="pickupTime"
              name="pickupTime"
              type="time"
              className={`form-input ${errors.time ? "error" : ""}`}
              value={data.time}
              onChange={(e) => updateField("time", e.target.value)}
              required
            />
            {errors.time && <div className="form-error">{errors.time}</div>}
          </div>
        </div>

        {data.direction === "from-airport" && (
          <div className="form-group">
            <label htmlFor="flightNumber" className="form-label">
              Flight Number <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="flightNumber"
              name="flightNumber"
              type="text"
              className="form-input"
              value={data.flightNumber}
              onChange={(e) => updateField("flightNumber", e.target.value)}
              placeholder="e.g. AK 123, MH 789"
            />
            <div className="form-hint">Helps us monitor your flight arrival</div>
          </div>
        )}
      </fieldset>

      {/* ─── Vehicle & Passengers ────────── */}
      <fieldset className="form-fieldset">
        <legend className="form-legend">Vehicle &amp; Passengers</legend>

        <div className="form-group">
          <label htmlFor="selectedVehicle" className="form-label">
            Vehicle Type <span className="required">*</span>
          </label>
          <select
            id="selectedVehicle"
            name="selectedVehicle"
            className={`form-select ${errors.vehicleType ? "error" : ""}`}
            value={data.vehicleType}
            onChange={(e) => updateField("vehicleType", e.target.value)}
            required
          >
            <option value="">Select vehicle type</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name} — up to {v.maxPassengers} pax, {v.maxLuggage} luggage
              </option>
            ))}
          </select>
          {errors.vehicleType && <div className="form-error">{errors.vehicleType}</div>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="custPassengers" className="form-label">
              Number of Passengers <span className="required">*</span>
            </label>
            <select
              id="custPassengers"
              name="custPassengers"
              className={`form-select ${errors.passengers ? "error" : ""}`}
              value={data.passengers}
              onChange={(e) => updateField("passengers", e.target.value)}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={String(n)}>{n} {n === 1 ? "passenger" : "passengers"}</option>
              ))}
            </select>
            {errors.passengers && <div className="form-error">{errors.passengers}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="custLuggage" className="form-label">
              Number of Luggage <span className="required">*</span>
            </label>
            <select
              id="custLuggage"
              name="custLuggage"
              className={`form-select ${errors.luggage ? "error" : ""}`}
              value={data.luggage}
              onChange={(e) => updateField("luggage", e.target.value)}
              required
            >
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={String(n)}>{n} {n === 1 ? "piece" : "pieces"}</option>
              ))}
            </select>
            {errors.luggage && <div className="form-error">{errors.luggage}</div>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="bookingNotes" className="form-label">
            Additional Notes <span style={{ color: "var(--color-text-muted)", fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            id="bookingNotes"
            name="bookingNotes"
            className="form-textarea"
            value={data.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Any special requests, child seat, extra stops, etc."
            rows={3}
          />
        </div>
      </fieldset>

      {/* ─── Privacy & Submit ────────────── */}
      <div style={{ marginTop: 8 }}>
        <label
          className="checkbox-label"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            cursor: "pointer",
            fontSize: "0.85rem",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
          }}
        >
          <input
            type="checkbox"
            checked={data.privacyAccepted}
            onChange={(e) => updateField("privacyAccepted", e.target.checked)}
            style={{ marginTop: 4, accentColor: "var(--color-accent-teal)" }}
          />
          <span>
            I acknowledge that my personal information will be shared with the
            operator via WhatsApp to process this booking request. I have read the{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              privacy notice
            </a>.
          </span>
        </label>
        {errors.privacyAccepted && (
          <div className="form-error" style={{ marginLeft: 28 }}>{errors.privacyAccepted}</div>
        )}
      </div>

      <button
        id="submitBookingBtn"
        type="submit"
        className="btn btn-primary btn-lg"
        style={{ width: "100%", marginTop: 24 }}
      >
        Review Booking Details →
      </button>

      <p
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--color-text-muted)",
          marginTop: 12,
          marginBottom: 0,
        }}
      >
        You will be able to review before sending via WhatsApp
      </p>


    </form>
  );
}

// Wrapper with Suspense for useSearchParams
export function BookingForm() {
  return (
    <Suspense fallback={<div className="card" style={{ padding: 48, textAlign: "center" }}>Loading booking form...</div>}>
      <BookingFormInner />
    </Suspense>
  );
}

// ─── Helpers ──────────────────────────────────────
function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-MY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
