"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { brand, navLinks } from "@/config/business";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="banner"
    >
      <div className="navbar__inner container">
        {/* Logo */}
        <Link href="/" className="navbar__logo" aria-label={`${brand.name} — Home`}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect width="32" height="32" rx="8" fill="#2A7B88" />
            <path
              d="M8 22V14L16 8L24 14V22H20V17H12V22H8Z"
              fill="white"
            />
            <circle cx="16" cy="14" r="2" fill="#C5A04E" />
          </svg>
          <span className="navbar__logo-text">{brand.logoText}</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__nav hide-mobile" aria-label="Main navigation">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="navbar__link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <Link href="/booking" className="btn btn-primary btn-sm hide-mobile">
          Book a Ride
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle hide-desktop"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span className={`navbar__hamburger ${mobileOpen ? "navbar__hamburger--open" : ""}`}>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile" id="mobile-menu" role="navigation" aria-label="Mobile navigation">
          <ul className="navbar__mobile-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="navbar__mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/booking"
                className="btn btn-primary"
                onClick={() => setMobileOpen(false)}
                style={{ width: "100%", marginTop: "8px" }}
              >
                Book a Ride
              </Link>
            </li>
          </ul>
        </div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(250, 250, 248, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-base);
        }

        .navbar--scrolled {
          background: rgba(255, 255, 255, 0.95);
          border-bottom-color: var(--color-border-light);
          box-shadow: var(--shadow-sm);
        }

        .navbar__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 72px;
        }

        .navbar__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--color-text-primary);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: -0.02em;
        }

        .navbar__logo-text {
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .navbar__links {
          display: flex;
          list-style: none;
          gap: 8px;
          margin: 0;
          padding: 0;
        }

        .navbar__link {
          display: block;
          padding: 8px 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--color-text-secondary);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .navbar__link:hover {
          color: var(--color-accent-teal);
          background: var(--color-accent-teal-light);
        }

        .navbar__toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .navbar__hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 22px;
        }

        .navbar__hamburger span {
          display: block;
          height: 2px;
          background: var(--color-text-primary);
          border-radius: 2px;
          transition: all var(--transition-fast);
        }

        .navbar__hamburger--open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .navbar__hamburger--open span:nth-child(2) {
          opacity: 0;
        }

        .navbar__hamburger--open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .navbar__mobile {
          position: fixed;
          top: 72px;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--color-white);
          padding: 24px;
          overflow-y: auto;
          animation: slideDown 200ms ease;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .navbar__mobile-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .navbar__mobile-link {
          display: block;
          padding: 16px 0;
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--color-text-primary);
          text-decoration: none;
          border-bottom: 1px solid var(--color-border-light);
        }

        .navbar__mobile-link:hover {
          color: var(--color-accent-teal);
        }
      `}</style>
    </header>
  );
}
