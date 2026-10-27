import Link from "next/link";
import { VehicleCategory } from "@/config/business";

interface VehicleCardProps {
  vehicle: VehicleCategory;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="vehicle-card card">
      {/* Image Illustration */}
      <div className="vehicle-card__image" style={{ overflow: "hidden", padding: "6px" }}>
        {vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={`${vehicle.name} airport transfer taxi`}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
        )}
      </div>

      {/* Content */}
      <h3 className="vehicle-card__name">{vehicle.name}</h3>
      <p className="vehicle-card__desc">{vehicle.description}</p>

      {/* Capacity */}
      <div className="vehicle-card__specs">
        <div className="vehicle-card__spec">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>{vehicle.maxPassengers} passengers</span>
        </div>
        <div className="vehicle-card__spec">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          <span>{vehicle.maxLuggage} luggage</span>
        </div>
      </div>

      {/* Fare */}
      {vehicle.fareAvailable && vehicle.startingFare && (
        <div className="vehicle-card__fare">
          {vehicle.startingFare}
        </div>
      )}

      {/* CTA */}
      <Link
        href={`/booking?vehicle=${vehicle.id}`}
        className="btn btn-primary btn-sm"
        style={{ width: "100%", marginTop: "16px" }}
      >
        Book {vehicle.name}
      </Link>
    </div>
  );
}
