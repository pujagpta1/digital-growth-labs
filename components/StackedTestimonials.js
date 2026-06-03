"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { home } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger);

// Resting (entry) rotation per card, and the near-flat angle each settles at.
const REST = [-3, 12, -6, 7];
const SETTLED = [-1.5, 3, -2, 2];

function QuoteMark() {
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M10 7H6.5A3.5 3.5 0 0 0 3 10.5V17h6v-6H6.2A1.2 1.2 0 0 1 7.4 9.8H10V7Zm11 0h-3.5A3.5 3.5 0 0 0 14 10.5V17h6v-6h-2.8a1.2 1.2 0 0 1 1.2-1.2H21V7Z" />
    </svg>
  );
}

export default function StackedTestimonials() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    // Desktop, motion-allowed: scroll-jacked stacking. Otherwise a readable column.
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
      () => {
        section.classList.add("is-jacked");
        const cards = gsap.utils.toArray(".stack-card", section);

        cards.forEach((c, i) => {
          gsap.set(c, { zIndex: i + 1, transformOrigin: "50% 50%" });
          if (i === 0) {
            gsap.set(c, { yPercent: 0, rotation: SETTLED[0] });
          } else {
            gsap.set(c, { yPercent: 130, rotation: REST[i % REST.length] });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => "+=" + Math.max(1, cards.length - 1) * window.innerHeight,
            pin,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((c, i) => {
          if (i === 0) return;
          tl.to(
            c,
            {
              yPercent: 0,
              rotation: SETTLED[i % SETTLED.length],
              ease: "power2.out",
              duration: 1,
            },
            i - 1
          );
        });

        return () => {
          section.classList.remove("is-jacked");
          gsap.set(cards, { clearProps: "all" });
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="stack-section">
      <div ref={pinRef} className="stack-pin">
        <div className="stack-head">
          <p className="kicker">{home.reviewsHeading.kicker}</p>
          <h2 className="stack-title">{home.reviewsHeading.title}</h2>
        </div>
        <div className="stack-cards">
          {home.reviews.map((r, i) => (
            <article key={i} className="stack-card">
            <div className="sc-quote">
              <h3 className="sc-headline">{r.headline}</h3>
              <p className="sc-body">{r.body}</p>
            </div>
            <div className="sc-client">
              <span className="sc-avatar">
                <QuoteMark />
              </span>
              <span className="sc-meta">
                <span className="sc-name">{r.role}</span>
                <span className="sc-role">{r.org}</span>
              </span>
            </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
