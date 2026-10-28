"use client";

import { useState } from "react";
import type { FAQItem } from "@/config/business";

interface FAQSectionProps {
  items: FAQItem[];
}

export function FAQSection({ items }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-list" role="list">
      {items.map((item, i) => (
        <div
          key={i}
          className={`faq-item ${openIndex === i ? "faq-item--open" : ""}`}
          role="listitem"
        >
          <button
            className="faq-item__trigger"
            onClick={() => toggle(i)}
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span className="faq-item__question">{item.question}</span>
            <span className="faq-item__icon" aria-hidden="true">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            className="faq-item__content"
            style={{
              maxHeight: openIndex === i ? "500px" : "0",
              opacity: openIndex === i ? 1 : 0,
            }}
          >
            <p className="faq-item__answer">{item.answer}</p>
          </div>
        </div>
      ))}


    </div>
  );
}
