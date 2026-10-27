"use client";

import { useState, useEffect } from "react";

const NAV_MODULES = [
  { id: "quick-book", label: "Quick Ride", icon: "⚡" },
  { id: "vehicles", label: "Fleet", icon: "🚗" },
  { id: "rates", label: "Rates & Zones", icon: "💰" },
  { id: "booking", label: "Book Form", icon: "📝" },
  { id: "how-it-works", label: "Process", icon: "ℹ️" },
  { id: "contact", label: "Contact", icon: "📞" },
  { id: "faq", label: "FAQ", icon: "❓" },
];

export function MobileQuickNav() {
  const [activeId, setActiveId] = useState("quick-book");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = NAV_MODULES.length - 1; i >= 0; i--) {
        const item = NAV_MODULES[i];
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToModule = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <div className="mobile-quick-nav hide-desktop" role="navigation" aria-label="Module Quick Links">
      <div className="mobile-quick-nav__scroller">
        {NAV_MODULES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`mobile-quick-nav__pill ${activeId === item.id ? "active" : ""}`}
            onClick={() => scrollToModule(item.id)}
            aria-label={`Jump to ${item.label}`}
          >
            <span className="mobile-quick-nav__icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
