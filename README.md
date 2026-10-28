# KLIA/KLIA2 Cab Booking Services Co. — Website

A professional, mobile-first airport transfer booking website for KLIA and KLIA2.
Customers fill a booking form → details are sent to the operator via WhatsApp.
No backend, no database, no paid API required.

---

## Quick Start

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build (Vercel does this automatically)
```

---

## Project Structure

```
klia-taxi/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout, fonts, navbar, footer
│   │   ├── page.tsx             # Single-page homepage (all 7 modules)
│   │   ├── globals.css          # ALL styles (single source of truth)
│   │   ├── booking/page.tsx     # Dedicated booking page (/booking)
│   │   ├── contact/page.tsx     # Contact page
│   │   ├── privacy/page.tsx     # Privacy notice (PDPA 2010)
│   │   └── rates/page.tsx       # Rates & zones page
│   ├── components/
│   │   ├── Navbar.tsx           # Sticky top navigation
│   │   ├── Footer.tsx           # Footer with CTA band
│   │   ├── BookingForm.tsx      # Full multi-step booking form
│   │   ├── QuickBookingForm.tsx # Hero quick-start form
│   │   ├── VehicleCard.tsx      # Fleet vehicle display card
│   │   ├── FAQSection.tsx       # Accordion FAQ
│   │   ├── MobileQuickNav.tsx   # Sticky horizontal pill nav (mobile)
│   │   └── MobileBottomBar.tsx  # Fixed bottom action bar (mobile)
│   └── config/
│       └── business.ts          # ⭐ ALL business settings live here
├── public/images/
│   ├── logo.svg
│   └── vehicles/ (sedan.svg, mpv.svg, van.svg)
├── .env.local                   # Private phone numbers (git-ignored)
└── next.config.ts
```

---

## Configuration

### Phone Numbers (stored privately in .env.local)

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=601139350923
NEXT_PUBLIC_PHONE_NUMBER=+60123456789
```

For Vercel: add these as Environment Variables in the Vercel dashboard.

### Business Details (src/config/business.ts)

All customer-facing text is in one file with OWNER: comments.
Key fields to verify before launch:

| Setting | Status |
|---------|--------|
| Business name | Set |
| WhatsApp number | Set via .env.local |
| Phone number | Set via .env.local |
| Business email | EMPTY — add if available |
| Vehicle types & capacities | Owner must confirm |
| Fare matrix (fareZones) | NOT SET — shows "Quote on WhatsApp" |
| Service coverage areas | Owner must confirm |
| Operating hours | Review wording |

---

## Booking Workflow

1. Customer fills the booking form
2. Customer reviews the summary and clicks "Continue to WhatsApp"
3. WhatsApp opens with a pre-filled, formatted booking message
4. Customer must press Send in WhatsApp to submit the request
5. Operator confirms via WhatsApp reply

Submitting the form does NOT confirm a booking. Confirmation happens through the WhatsApp conversation.

---

## Vercel Deployment (Free)

1. Push to GitHub: git push -u origin main
2. Go to vercel.com/new and import the repository
3. Set Environment Variables in Vercel dashboard:
   - NEXT_PUBLIC_WHATSAPP_NUMBER = 601139350923
   - NEXT_PUBLIC_PHONE_NUMBER = +60123456789
4. Deploy — Vercel builds automatically on every git push.

---

## Pre-Launch Testing Checklist

- [ ] Home page loads without errors
- [ ] All nav links scroll to correct sections
- [ ] Mobile hamburger menu opens and closes
- [ ] Booking form validates required fields
- [ ] Past date is rejected
- [ ] Passenger count exceeding vehicle capacity shows an error
- [ ] Journey direction toggle correctly sets pickup/destination labels
- [ ] Flight number field appears only for "From Airport"
- [ ] Privacy checkbox blocks submission if unchecked
- [ ] Review screen shows all entered values
- [ ] WhatsApp opens with correctly formatted booking message
- [ ] WhatsApp number uses international format (60...)
- [ ] No customer email replaced by business email in message
- [ ] Mobile bottom action bar visible on phones
- [ ] No horizontal overflow on narrow screens

---

## Owner Decisions Required Before Launch

| Item | Action |
|------|--------|
| Fare matrix | Provide approved fares per zone per vehicle |
| Vehicle list | Confirm which vehicles are actually available |
| Operating hours | Confirm 24/7 or specific hours |
| Email contact | Add to .env.local if available |
| Privacy policy | Lawyer review recommended |
| Testimonials | Only add real, verified customer reviews |

---

## Future Enhancements (Out of MVP Scope)

- Email notifications (Web3Forms or Formspree free tier)
- Fare table with real rates
- WhatsApp Business API for automated replies (paid)
- Structured data / sitemap for SEO
