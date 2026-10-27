import Link from "next/link";
import { brand, contact, navLinks, getWhatsAppUrl, getPhoneUrl } from "@/config/business";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl("Hello, I would like to enquire about your airport transfer service.");
  const phoneUrl = getPhoneUrl();

  return (
    <footer className="footer" role="contentinfo">
      {/* CTA Band */}
      <div className="footer__cta">
        <div className="container">
          <div className="footer__cta-inner">
            <div>
              <h2 className="footer__cta-heading">Ready to Book Your Airport Transfer?</h2>
              <p className="footer__cta-text">
                Submit a booking request and our team will confirm your ride.
              </p>
            </div>
            <div className="footer__cta-actions">
              <Link href="/booking" className="btn btn-primary btn-lg">
                Book a Ride
              </Link>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-lg"
                >
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__col">
              <div className="footer__brand">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="8" fill="#2A7B88" />
                  <path d="M8 22V14L16 8L24 14V22H20V17H12V22H8Z" fill="white" />
                  <circle cx="16" cy="14" r="2" fill="#C5A04E" />
                </svg>
                <span>{brand.logoText}</span>
              </div>
              <p className="footer__about">
                Pre-booked airport transfer service for KLIA &amp; KLIA2. Serving Kuala Lumpur and surrounding areas.
              </p>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h3 className="footer__heading">Quick Links</h3>
              <ul className="footer__links">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/booking">Book a Ride</Link>
                </li>
              </ul>
            </div>

            {/* Pages */}
            <div className="footer__col">
              <h3 className="footer__heading">Information</h3>
              <ul className="footer__links">
                <li><Link href="/rates">Rates &amp; Zones</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h3 className="footer__heading">Contact</h3>
              <ul className="footer__links">
                {contact.phone && (
                  <li>
                    <a href={phoneUrl || "#"}>
                      <PhoneIcon /> {contact.phone}
                    </a>
                  </li>
                )}
                {whatsappUrl && (
                  <li>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                      <WhatsAppIcon /> WhatsApp
                    </a>
                  </li>
                )}
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`}>
                      <EmailIcon /> {contact.email}
                    </a>
                  </li>
                )}
                {!contact.phone && !contact.whatsapp && !contact.email && (
                  <li className="footer__notice">
                    Contact information will be updated soon.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer__bottom">
            <p>&copy; {currentYear} {brand.name}. All rights reserved.</p>
            <p>
              <Link href="/privacy">Privacy Policy</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Inline Icons ───────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
