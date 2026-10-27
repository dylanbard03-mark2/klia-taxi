# KLIA & KLIA2 Taxi & Airport Transfer Website

A fast, modern, responsive website and booking workflow for an airport taxi and private transfer business serving **Kuala Lumpur International Airport (KLIA Terminal 1 & KLIA Terminal 2)** and surrounding regions in Malaysia.

Built with **Next.js 15 (App Router)**, **TypeScript**, and **Vanilla CSS tokens** (no Tailwind dependency, 0 heavy third-party UI bloat).

---

## Table of Contents
1. [Features & Architecture](#features--architecture)
2. [Project Structure](#project-structure)
3. [How to Install and Run Locally](#how-to-install-and-run-locally)
4. [Central Business Configuration (`business.ts`)](#central-business-configuration-businessts)
5. [How to Update Vehicle Details & Fare Tables](#how-to-update-vehicle-details--fare-tables)
6. [Booking-Request Workflow & WhatsApp Handoff](#booking-request-workflow--whatsapp-handoff)
7. [What Is and Is Not Functional in the MVP](#what-is-and-is-not-functional-in-the-mvp)
8. [Owner Pre-Launch Checklist](#owner-pre-launch-checklist)
9. [Deployment Guide](#deployment-guide)

---

## 1. Features & Architecture

- **High-Conversion Customer Journey**:
  - **Hero Section with Quick Booking Widget**: Customers select direction (To Airport / From Airport), pickup location, terminal, and date to jumpstart their booking.
  - **Transparent Vehicle Fleet**: Cards detailing passenger capacity, luggage capacity, key features, and starting rates (or quotation requests) for Budget Taxi, Sedan, MPV, and Family Van.
  - **Step-by-Step Flow Explanation**: 4-step guide detailing how to book, how WhatsApp confirmation works, driver meet-and-greet at the terminal, and payment upon arrival.
  - **Comprehensive Rates & Coverage Matrix**: Clear breakdown of key zones (KL City Centre, PJ/Subang, Shah Alam/Klang, Putrajaya/Cyberjaya, Damansara/Mont Kiara, Outstation) and surcharges.
  - **Interactive FAQ Accordion**: Addresses lead times, terminal selection (KLIA vs KLIA2), baggage allowances, midnight surcharges, waiting time, and payment methods.
  - **Multi-Step Booking Form (`/booking`)**: Form with live field validation, review confirmation modal, URL prefilling, and structured WhatsApp message builder.
  - **Contact & Support (`/contact`)**: Instant WhatsApp chat link, telephone hotline, email, and 24/7 operations info.
  - **PDPA Privacy Notice (`/privacy`)**: Full compliance with Malaysia's Personal Data Protection Act 2010.
- **Safety Guards**:
  - Graceful placeholders when contact details or fares haven't yet been confirmed by the owner.
  - No fabricated testimonials, fake accreditations, or fictitious fixed prices.

---

## 2. Project Structure

```
klia-taxi/
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── vehicles/
│   │       ├── sedan.svg
│   │       ├── mpv.svg
│   │       └── van.svg
├── src/
│   ├── app/
│   │   ├── booking/
│   │   │   └── page.tsx       # Booking page wrapper
│   │   ├── contact/
│   │   │   └── page.tsx       # Contact & inquiries page
│   │   ├── privacy/
│   │   │   └── page.tsx       # PDPA 2010 Privacy Notice
│   │   ├── rates/
│   │   │   └── page.tsx       # Rates & coverage zones page
│   │   ├── globals.css        # Central CSS design system & tokens
│   │   ├── layout.tsx         # Root layout with SEO metadata & navbar/footer
│   │   └── page.tsx           # Homepage (Hero, Fleet, How It Works, FAQ)
│   ├── components/
│   │   ├── BookingForm.tsx    # Multi-step booking form + WhatsApp generator
│   │   ├── FAQSection.tsx     # Accessible FAQ accordion component
│   │   ├── Footer.tsx         # Global footer with CTA & quick links
│   │   ├── Navbar.tsx         # Responsive sticky navigation header
│   │   ├── QuickBookingForm.tsx # Hero quick-booking pre-fill widget
│   │   └── VehicleCard.tsx    # Vehicle display card with SVG illustration
│   └── config/
│       └── business.ts        # ⭐ SINGLE SOURCE OF TRUTH FOR ALL BUSINESS DATA
└── README.md
```

---

## 3. How to Install and Run Locally

### Prerequisites
- Node.js (v18.17+ or v20+)
- npm / yarn / pnpm

### Installation
```bash
# Clone the repository and enter the directory
cd klia-taxi

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
# Compile and test production build
npm run build

# Start production server locally
npm start
```

---

## 4. Central Business Configuration (`business.ts`)

All business identity, contact numbers, vehicle categories, pricing tables, policies, and surcharges are strictly centralized in:
👉 `src/config/business.ts`

**Never hardcode phone numbers or prices in individual component files.**

### Key configuration blocks:
```typescript
// 1. Brand Identity
export const brand = {
  name: "KLIA Cab",
  tagline: "Reliable Airport Transfers to KLIA & KLIA2",
  logoUrl: "/images/logo.svg",
  logoText: "KLIA Cab",
};

// 2. Contact Information (REQUIRED BEFORE PRODUCTION)
export const contact = {
  whatsapp: "60123456789", // Format: country code + number without '+' or '-'
  phone: "+60 12-345 6789",
  email: "bookings@kliacab.com",
  facebook: "",
  instagram: "",
};
```

---

## 5. How to Update Vehicle Details & Fare Tables

### Updating Vehicles
In `src/config/business.ts`, modify the `vehicles` array:
```typescript
export const vehicles: VehicleCategory[] = [
  {
    id: "budget-taxi",
    name: "Budget Taxi",
    description: "Comfortable sedan for solo travellers or couples with light luggage.",
    maxPassengers: 3,
    maxLuggage: 2,
    imageUrl: "/images/vehicles/sedan.svg",
    fareAvailable: true,         // Set to true once fares are fixed
    startingFare: "From RM 65",  // Displayed starting rate
    features: ["Air-conditioned", "Comfortable seating", "Boot space for 2 bags"],
  },
  // ... other vehicles: sedan, mpv, family-van
];
```

### Updating Fare Zones
In `src/config/business.ts`, update `fareZones`:
```typescript
export const fareZones: FareZone[] = [
  {
    id: "zone-kl",
    name: "Kuala Lumpur City Centre",
    areas: ["KLCC", "Bukit Bintang", "KL Sentral", "Bangsar", "Mid Valley"],
    fares: {
      "budget-taxi": "RM 65",
      "sedan": "RM 80",
      "mpv": "RM 120",
      "family-van": "RM 160",
    },
  },
  // ...
];
```
*Note: If `fares` is left empty `{}`, the website automatically displays an elegant `"Request Quote"` button that routes customers to WhatsApp/Booking without showing broken or misleading pricing.*

---

## 6. Booking-Request Workflow & WhatsApp Handoff

```
Customer visits website
      │
      ▼
Quick Booking Widget / Navigation
      │
      ▼
Full Booking Form (/booking)
(Direction, Pickup, Terminal, Date/Time, Flight #, Vehicle, Passengers, Luggage, Contact Info)
      │
      ▼
Client Validation & Review Screen
      │
      ▼
Click "Send Booking via WhatsApp"
      │
      ▼
WhatsApp Click-to-Chat Link Opens
(Pre-formatted message with all details sent to operator)
      │
      ▼
Operator confirms availability, final fare, and driver assignment
```

### Generated WhatsApp Message Example:
```
*NEW AIRPORT TRANSFER BOOKING REQUEST*
----------------------------------------
*Customer:* Alex Tan
*Mobile:* +60123456789
*Email:* alex@example.com

*Direction:* To KLIA/KLIA2
*Pickup Location:* The Westin Kuala Lumpur, Bukit Bintang
*Destination / Terminal:* KLIA (Terminal 1)
*Date:* 2026-11-05
*Pickup Time:* 06:30 AM
*Flight Number:* MH123

*Vehicle Selected:* Family MPV
*Passengers:* 4
*Luggage:* 4 bags
*Special Notes:* 2 child passengers, require child booster seat if available.

----------------------------------------
_Sent via KLIA Cab Website Booking Form_
```

---

## 7. What Is and Is Not Functional in the MVP

### ✅ Fully Functional:
- [x] Responsive layout across desktop, tablet, and mobile.
- [x] Quick booking pre-fill widget that seamlessly carries inputs to the full booking form.
- [x] Comprehensive client-side validation (phone numbers, required fields, date boundaries).
- [x] Booking review modal before submission.
- [x] Direct WhatsApp link generation with automatic URL encoding.
- [x] Safety guards: fallback message banners if WhatsApp or phone numbers are unconfigured.
- [x] Fallback quoting state on Rates page when fixed rates are unpopulated.
- [x] SEO meta tags, OpenGraph previews, and semantic HTML5 hierarchy.
- [x] Accessible accordion for FAQ.
- [x] Contact page with direct WhatsApp, phone, email buttons, and coverage summary.
- [x] Privacy policy compliant with Malaysian PDPA 2010.

### ⏳ Not Included in MVP (By Design / Future Enhancements):
- Direct online credit card payment gateway (reference operators collect cash or bank transfer on arrival).
- Automated live flight tracking API integration (the form collects flight numbers for manual driver monitoring).
- Database persistence for booking records (the MVP prioritizes zero-friction WhatsApp dispatch directly to the driver team).

---

## 8. Owner Pre-Launch Checklist

Before deploying this website to a live domain, the business owner must complete the following in `src/config/business.ts`:

- [ ] **Official Business Name**: Update `brand.name` with the registered business name.
- [ ] **WhatsApp Number**: Provide the active dispatch WhatsApp number (in international format, e.g. `60123456789`).
- [ ] **Hotline Phone**: Provide the voice telephone number.
- [ ] **Email Address**: Provide the official customer support email.
- [ ] **Fare Matrix**: Populate actual rates in `fareZones` if fixed prices are desired, or confirm the quote-based model.
- [ ] **Surcharges**: Confirm midnight surcharge hours and percentage (e.g. 50% between 12:00 AM – 6:00 AM), holiday surcharges, and extra stop fees.
- [ ] **Advance Booking Notice**: Confirm minimum lead time in hours (default: 4 hours).
- [ ] **Luggage & Passenger Capacities**: Verify fleet limits for each vehicle model.
- [ ] **High-Resolution Photography** *(Optional)*: Replace default SVG illustrations in `/public/images/vehicles/` with actual fleet photos.

---

## 9. Deployment Guide

### Deploying to Vercel (Recommended)
1. Push this repository to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New Project** and select this repository.
4. Set the Framework Preset to **Next.js**.
5. Set Root Directory to `./` (or `klia-taxi`).
6. Click **Deploy**. Vercel will automatically build and distribute the site globally with free SSL and edge CDN caching.

### Deploying to Netlify / Any Node Server
```bash
npm run build
npm start
```
The application will listen on port `3000`.

---
*Built with care for KLIA & KLIA2 Airport Transfer Services.*
