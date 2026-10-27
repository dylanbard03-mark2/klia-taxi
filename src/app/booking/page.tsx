import type { Metadata } from "next";
import { brand } from "@/config/business";
import { BookingForm } from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Ride",
  description: `Request an airport transfer booking with ${brand.name}. Fill in your journey details and submit via WhatsApp.`,
};

export default function BookingPage() {
  return (
    <div style={{ paddingTop: 100, paddingBottom: 80 }}>
      <div className="container">
        <div style={{ maxWidth: 740, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span className="section-badge">Booking Request</span>
            <h1 style={{ margin: "12px 0 8px" }}>Book Your Airport Transfer</h1>
            <p style={{ maxWidth: 540, margin: "0 auto", fontSize: "1rem" }}>
              Complete the form below. Your booking details will be sent to our
              team via WhatsApp for confirmation.
            </p>
          </div>
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
