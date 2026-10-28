"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function QuickBookingForm() {
  const router = useRouter();
  const [direction, setDirection] = useState<"to-airport" | "from-airport">("to-airport");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Use local date to avoid off-by-one day in Malaysia (UTC+8)
  const todayLocal = new Date();
  const today = [
    todayLocal.getFullYear(),
    String(todayLocal.getMonth() + 1).padStart(2, "0"),
    String(todayLocal.getDate()).padStart(2, "0"),
  ].join("-");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!pickup.trim()) newErrors.pickup = "Pickup location is required";
    if (!destination.trim()) newErrors.destination = "Destination is required";
    if (!date) newErrors.date = "Travel date is required";
    else if (date < today) newErrors.date = "Date cannot be in the past";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const params = new URLSearchParams({
      direction,
      pickup,
      destination,
      date,
    });

    router.push(`/booking?${params.toString()}`);
  };

  return (
    <form className="quick-form card" onSubmit={handleSubmit} noValidate>
      <div className="quick-form__header">
        <h3 style={{ margin: 0, fontSize: "1.1rem" }}>Quick Booking</h3>
        <p style={{ margin: "4px 0 0", fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          Start your booking request here
        </p>
      </div>

      <div className="quick-form__body">
        {/* Direction Toggle */}
        <div className="quick-form__direction">
          <button
            type="button"
            className={`quick-form__dir-btn ${direction === "to-airport" ? "active" : ""}`}
            onClick={() => setDirection("to-airport")}
          >
            ✈️ To Airport
          </button>
          <button
            type="button"
            className={`quick-form__dir-btn ${direction === "from-airport" ? "active" : ""}`}
            onClick={() => setDirection("from-airport")}
          >
            🏠 From Airport
          </button>
        </div>

        {/* Fields */}
        <div className="quick-form__fields">
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="qb-pickup" className="sr-only">Pickup Location</label>
            <input
              id="qb-pickup"
              type="text"
              className={`form-input ${errors.pickup ? "error" : ""}`}
              placeholder={direction === "to-airport" ? "Pickup location (e.g. Petaling Jaya)" : "Airport terminal"}
              value={pickup}
              onChange={(e) => { setPickup(e.target.value); setErrors((prev) => ({ ...prev, pickup: "" })); }}
            />
            {errors.pickup && <div className="form-error">{errors.pickup}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="qb-destination" className="sr-only">Destination</label>
            <input
              id="qb-destination"
              type="text"
              className={`form-input ${errors.destination ? "error" : ""}`}
              placeholder={direction === "to-airport" ? "Airport terminal" : "Destination (e.g. KL Sentral)"}
              value={destination}
              onChange={(e) => { setDestination(e.target.value); setErrors((prev) => ({ ...prev, destination: "" })); }}
            />
            {errors.destination && <div className="form-error">{errors.destination}</div>}
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label htmlFor="qb-date" className="sr-only">Travel Date</label>
            <input
              id="qb-date"
              type="date"
              className={`form-input ${errors.date ? "error" : ""}`}
              min={today}
              value={date}
              onChange={(e) => { setDate(e.target.value); setErrors((prev) => ({ ...prev, date: "" })); }}
            />
            {errors.date && <div className="form-error">{errors.date}</div>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
            Continue to Booking →
          </button>
        </div>
      </div>

    </form>
  );
}
