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

      <style jsx>{`
        .faq-list {
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: var(--color-white);
        }

        .faq-item {
          border-bottom: 1px solid var(--color-border-light);
        }

        .faq-item:last-child {
          border-bottom: none;
        }

        .faq-item__trigger {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 24px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          text-align: left;
        }

        .faq-item__trigger:hover {
          background: var(--color-bg-alt);
        }

        .faq-item__question {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-primary);
          line-height: 1.5;
        }

        .faq-item__icon {
          flex-shrink: 0;
          color: var(--color-text-muted);
        }

        .faq-item--open .faq-item__icon {
          color: var(--color-accent-teal);
        }

        .faq-item__content {
          overflow: hidden;
          transition: max-height 300ms ease, opacity 200ms ease;
        }

        .faq-item__answer {
          padding: 0 24px 20px;
          font-size: 0.9rem;
          line-height: 1.7;
          margin: 0;
          color: var(--color-text-secondary);
        }
      `}</style>
    </div>
  );
}
