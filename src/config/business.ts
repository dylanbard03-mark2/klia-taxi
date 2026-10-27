/**
 * KLIA Taxi Booking — Central Business Configuration
 * ====================================================
 * All business-specific values are centralised here.
 * The business owner MUST review and update every field
 * marked with "OWNER:" before public deployment.
 *
 * Do NOT scatter business values across components.
 */

// ─── Brand ───────────────────────────────────────────
export const brand = {
  /** Official registered business name */
  name: "KLIA/KLIA2 Cab Booking Services Co.",
  /** Tagline */
  tagline: "Reliable Airport Transfers to KLIA & KLIA2",
  /** Official logo file in /public/images/ */
  logoUrl: "/images/logo.svg",
  /** Short text-based fallback when logo is unavailable / mobile header */
  logoText: "KLIA/KLIA2 Cab",
};

// ─── Contact ─────────────────────────────────────────
export const contact = {
  /** WhatsApp number in international format (loaded privately from .env.local or fallback) */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "601139350923",
  /** Primary phone number */
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+60123456789",
  /** Business email address */
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "",
  /** Facebook or other social media URL */
  facebook: "",
  /** Instagram URL */
  instagram: "",
};

// ─── Colours (CSS values) ────────────────────────────
export const colors = {
  background: "#FAFAF8",
  textPrimary: "#1B2A4A",
  textSecondary: "#4A5568",
  accentTeal: "#2A7B88",
  accentTealLight: "#E6F4F6",
  accentGold: "#C5A04E",
  white: "#FFFFFF",
  border: "#E2E8F0",
  error: "#DC2626",
  success: "#16A34A",
};

// ─── Service Areas ───────────────────────────────────
export const serviceAreas = {
  airports: [
    { id: "klia", name: "KLIA (Terminal 1)" },
    { id: "klia2", name: "KLIA2 (Terminal 2)" },
  ],
  /** OWNER: Confirm and add/remove coverage areas */
  coverageAreas: [
    "Kuala Lumpur City Centre",
    "Petaling Jaya",
    "Subang Jaya",
    "Shah Alam",
    "Putrajaya",
    "Cyberjaya",
    "Bangsar",
    "Mont Kiara",
    "Damansara",
    "Klang",
    "Nilai",
    "Seremban",
    "Melaka",
    "Genting Highlands",
    "Cameron Highlands",
  ],
};

// ─── Vehicle Categories ──────────────────────────────
export interface VehicleCategory {
  id: string;
  name: string;
  description: string;
  /** Maximum passenger capacity */
  maxPassengers: number;
  /** Maximum luggage capacity */
  maxLuggage: number;
  /** Path to vehicle image in /public/images/ */
  imageUrl: string;
  /** Whether fares are available for display */
  fareAvailable: boolean;
  /** Starting fare text, e.g. "From RM XX" — only shown when fareAvailable is true */
  startingFare: string;
  /** Vehicle features / highlights */
  features: string[];
}

/** OWNER: Confirm each vehicle category, capacity, and fare */
export const vehicles: VehicleCategory[] = [
  {
    id: "budget-taxi",
    name: "Budget Taxi",
    description: "Comfortable sedan for solo travellers or couples with light luggage.",
    maxPassengers: 3,
    maxLuggage: 2,
    imageUrl: "/images/vehicles/sedan.svg",
    fareAvailable: false,
    startingFare: "",
    features: ["Air-conditioned", "Comfortable seating", "Boot space for 2 bags"],
  },
  {
    id: "sedan",
    name: "Sedan",
    description: "Standard sedan with ample space for small groups.",
    maxPassengers: 4,
    maxLuggage: 2,
    imageUrl: "/images/vehicles/sedan.svg",
    fareAvailable: false,
    startingFare: "",
    features: ["Air-conditioned", "Comfortable seating", "Boot space for luggage"],
  },
  {
    id: "mpv",
    name: "MPV",
    description: "Spacious MPV ideal for families or groups with extra luggage.",
    maxPassengers: 5,
    maxLuggage: 4,
    imageUrl: "/images/vehicles/mpv.svg",
    fareAvailable: false,
    startingFare: "",
    features: ["Spacious cabin", "Extra luggage room", "Ideal for families"],
  },
  {
    id: "family-van",
    name: "Family Van",
    description: "Large van for bigger groups or travellers with heavy luggage.",
    maxPassengers: 7,
    maxLuggage: 7,
    imageUrl: "/images/vehicles/van.svg",
    fareAvailable: false,
    startingFare: "",
    features: ["Seats up to 7", "Maximum luggage capacity", "Group-friendly"],
  },
];

// ─── Fare Zones ──────────────────────────────────────
export interface FareZone {
  id: string;
  name: string;
  areas: string[];
  /** Keyed by vehicle ID → price string */
  fares: Record<string, string>;
}

/**
 * OWNER: Provide the complete fare matrix.
 * Leave the fares object empty or use "Quote" if prices are unconfirmed.
 * Example:
 *   fares: { "budget-taxi": "RM 65", "sedan": "RM 80", "mpv": "RM 120", "family-van": "RM 160" }
 */
export const fareZones: FareZone[] = [
  {
    id: "zone-kl",
    name: "Kuala Lumpur City Centre",
    areas: ["KLCC", "Bukit Bintang", "KL Sentral", "Bangsar", "Mid Valley"],
    fares: {},
  },
  {
    id: "zone-pj",
    name: "Petaling Jaya / Subang",
    areas: ["Petaling Jaya", "Subang Jaya", "USJ", "Sunway"],
    fares: {},
  },
  {
    id: "zone-shah-alam",
    name: "Shah Alam / Klang",
    areas: ["Shah Alam", "Klang", "Setia Alam"],
    fares: {},
  },
  {
    id: "zone-putrajaya",
    name: "Putrajaya / Cyberjaya",
    areas: ["Putrajaya", "Cyberjaya"],
    fares: {},
  },
  {
    id: "zone-damansara",
    name: "Damansara / Mont Kiara",
    areas: ["Damansara", "Mont Kiara", "Sri Hartamas", "Desa ParkCity"],
    fares: {},
  },
  {
    id: "zone-outstation",
    name: "Outstation",
    areas: ["Nilai", "Seremban", "Melaka", "Genting Highlands", "Cameron Highlands"],
    fares: {},
  },
];

// ─── Surcharges ──────────────────────────────────────
export interface Surcharge {
  id: string;
  name: string;
  description: string;
  /** Amount or percentage — OWNER must confirm */
  amount: string;
  /** Whether this surcharge is confirmed by the owner */
  confirmed: boolean;
}

/** OWNER: Confirm each surcharge before showing on the live site */
export const surcharges: Surcharge[] = [
  {
    id: "midnight",
    name: "Midnight Surcharge",
    description: "Applicable for pickups between 12:00 AM – 6:00 AM",
    amount: "To be confirmed",
    confirmed: false,
  },
  {
    id: "peak-hour",
    name: "Peak Hour Surcharge",
    description: "Applicable during peak travel times",
    amount: "To be confirmed",
    confirmed: false,
  },
  {
    id: "public-holiday",
    name: "Public Holiday Surcharge",
    description: "Applicable on Malaysian public holidays",
    amount: "To be confirmed",
    confirmed: false,
  },
  {
    id: "extra-stop",
    name: "Extra Stop",
    description: "Additional charge for each extra stop along the route",
    amount: "To be confirmed",
    confirmed: false,
  },
];

// ─── Booking Policies ────────────────────────────────
export const bookingPolicies = {
  /** OWNER: Minimum advance booking time in hours */
  minimumLeadTimeHours: 4,
  /** OWNER: Maximum advance booking time in days */
  maximumAdvanceDays: 90,
  /** OWNER: Waiting time policy text */
  waitingTimePolicy:
    "Please confirm the waiting-time policy with the operator when your booking is confirmed.",
  /** OWNER: Cancellation policy text */
  cancellationPolicy:
    "Please contact the operator to discuss changes or cancellations to your booking.",
  /** OWNER: Accepted payment methods */
  paymentMethods: ["Cash", "Online Bank Transfer"],
  /** OWNER: Airport pickup instructions */
  airportPickupInstructions:
    "Pickup arrangements will be confirmed by the operator after your booking is accepted.",
  /** Operating hours text */
  operatingHours: "Available 24 hours, 7 days a week (subject to driver availability)",
};

// ─── FAQ ─────────────────────────────────────────────
export interface FAQItem {
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  {
    question: "How far in advance should I book?",
    answer: `We recommend booking at least ${bookingPolicies.minimumLeadTimeHours} hours in advance to ensure availability. For peak travel periods, holidays, or early morning flights, booking 24 hours ahead is advisable.`,
  },
  {
    question: "Which terminal should I select — KLIA or KLIA2?",
    answer:
      "KLIA (Terminal 1) is used mainly by Malaysia Airlines and full-service carriers. KLIA2 is the terminal for AirAsia and other low-cost airlines. Please check your airline and flight details to confirm your terminal.",
  },
  {
    question: "What vehicle types are available?",
    answer:
      "We offer several vehicle categories to suit different group sizes and luggage needs. Please visit our Vehicles section or the booking form to see the current options and their capacities.",
  },
  {
    question: "How is the fare calculated?",
    answer:
      "Fares are based on the pickup and destination zones and the vehicle type selected. Contact us for a quotation if your route is not listed in our standard zone table.",
  },
  {
    question: "Is there a waiting-time charge?",
    answer: bookingPolicies.waitingTimePolicy,
  },
  {
    question: "How will I find my driver at the airport?",
    answer: bookingPolicies.airportPickupInstructions,
  },
  {
    question: "What payment methods are accepted?",
    answer: `We currently accept: ${bookingPolicies.paymentMethods.join(", ")}. Payment is typically made directly to the driver upon arrival.`,
  },
  {
    question: "Can I change or cancel my booking?",
    answer: bookingPolicies.cancellationPolicy,
  },
  {
    question: "Is this a confirmed booking when I submit the form?",
    answer:
      "No. Submitting the form sends a booking request to our team via WhatsApp. Your booking is only confirmed once our operator responds and confirms the arrangements with you.",
  },
  {
    question: "Do you offer return trips?",
    answer:
      "Yes, you can arrange a return trip by submitting a separate booking request for the return journey, or by mentioning it in the notes field of your booking.",
  },
];

// ─── Navigation ──────────────────────────────────────
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Vehicles", href: "/#vehicles" },
  { label: "Rates & Zones", href: "/rates" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

// ─── WhatsApp Helper ─────────────────────────────────
/**
 * Returns a WhatsApp click-to-chat URL with the given message.
 * Returns null if no WhatsApp number is configured.
 */
export function getWhatsAppUrl(message: string): string | null {
  const number = contact.whatsapp.replace(/\D/g, "");
  if (!number) return null;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

/**
 * Returns a tel: link for the configured phone number.
 * Returns null if no phone number is configured.
 */
export function getPhoneUrl(): string | null {
  const number = contact.phone.replace(/\D/g, "");
  if (!number) return null;
  return `tel:+${number}`;
}

/**
 * Check whether essential contact information is configured.
 */
export function isContactConfigured(): boolean {
  return !!(contact.whatsapp || contact.phone || contact.email);
}

/**
 * Check whether any fares are available for display.
 */
export function hasFaresAvailable(): boolean {
  return fareZones.some(
    (zone) => Object.keys(zone.fares).length > 0
  );
}
