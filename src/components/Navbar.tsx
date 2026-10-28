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


    </header>
  );
}
