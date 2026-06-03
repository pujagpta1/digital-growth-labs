"use client";

/**
 * ScrollAnimations — the single GSAP engine for the whole site.
 *
 * It scans the DOM for `data-anim="..."` markers and wires up every
 * scroll-driven / load animation in ONE gsap.context(), then cleans the
 * whole thing up on route change / unmount (safe for Next.js SPA nav).
 *
 * Markers it understands:
 *   hero-word | hero-sub | hero-card | hero-parallax | hero-bg
 *   label (with [data-label-dot] + [data-label-text])
 *   words-scrub (contains [data-word] spans)
 *   reveal  (+ data-anim-x, data-anim-y, data-anim-delay)
 *   parallax (+ data-anim-speed)
 *   lines   (contains [data-line])
 *   stagger (contains [data-stagger])
 *   project (contains [data-role="num|title|desc|btn"])
 *   panel-left | panel-right
 *   faq-row (with [data-faq-divider])
 *   cta-scale
 *
 * Everything respects prefers-reduced-motion.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const $$ = (sel, root = document) => gsap.utils.toArray(sel, root);
const num = (el, attr, fallback) => {
  const v = parseFloat(el.getAttribute(attr));
  return Number.isNaN(v) ? fallback : v;
};

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Reduced motion: reveal everything statically, no movement ──
    if (reduce) {
      document.documentElement.classList.add("reduce-motion");
      gsap.set(
        "[data-anim], [data-word], [data-line], [data-stagger], [data-role], [data-label-text], [data-label-dot], [data-faq-divider]",
        { clearProps: "transform,filter,clipPath", opacity: 1 }
      );
      // The hero overlay is purely decorative scroll motion — keep it hidden.
      gsap.set("[data-anim='hero-bg']", { opacity: 0 });
      // Show final values for any count-up numbers.
      document.querySelectorAll("[data-anim='count']").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count")) || 0;
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        el.textContent =
          (el.getAttribute("data-prefix") || "") +
          target.toFixed(decimals) +
          (el.getAttribute("data-suffix") || "");
      });
      return () => {
        document.documentElement.classList.remove("reduce-motion");
      };
    }

    const mediaQueries = [];

    const ctx = gsap.context(() => {
      // ════════════════ HERO (on load) ════════════════
      const heroWords = $$("[data-anim='hero-word']");
      const loadTl = gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.1,
      });

      if (heroWords.length) {
        gsap.set(heroWords, { willChange: "transform, opacity" });
        loadTl.fromTo(
          heroWords,
          { yPercent: 120, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.1, stagger: 0.15 },
          0
        );
      }

      const heroCards = $$("[data-anim='hero-card']");
      if (heroCards.length) {
        loadTl.fromTo(
          heroCards,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power3.out" },
          0.1
        );
      }

      const heroSubs = $$("[data-anim='hero-sub']");
      if (heroSubs.length) {
        loadTl.fromTo(
          heroSubs,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: "power3.out" },
          0.4
        );
      }

      // Hero headline parallax (moves up faster than scroll)
      $$("[data-anim='hero-parallax']").forEach((el) => {
        const section = el.closest("section") || el.parentElement;
        gsap.to(el, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // Hero gradient intensifies as the section exits
      $$("[data-anim='hero-bg']").forEach((el) => {
        const section = el.closest("section") || el.parentElement;
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      });

      // ════════════════ SECTION LABELS (clip reveal + dot pulse) ════════════════
      $$("[data-anim='label']").forEach((el) => {
        const dot = el.querySelector("[data-label-dot]");
        const text = el.querySelector("[data-label-text]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
        if (text) {
          tl.fromTo(
            text,
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.out" },
            0
          );
        }
        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(3)" },
            0
          ).to(dot, { scale: 1.6, duration: 0.35, yoyo: true, repeat: 1, ease: "sine.inOut" }, 0.15);
        }
      });

      // ════════════════ WORD-BY-WORD SCRUB (What We Do heading) ════════════════
      $$("[data-anim='words-scrub']").forEach((el) => {
        const words = el.querySelectorAll("[data-word]");
        gsap.fromTo(
          words,
          { opacity: 0.18 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.4,
            scrollTrigger: {
              trigger: el,
              start: "top 75%",
              end: "bottom 60%",
              scrub: true,
            },
          }
        );
      });

      // ════════════════ GENERIC REVEALS ════════════════
      $$("[data-anim='reveal']").forEach((el) => {
        const x = el.getAttribute("data-anim-x");
        const fromVars = {
          opacity: 0,
          y: num(el, "data-anim-y", 30),
          x: x === "left" ? -60 : x === "right" ? 60 : 0,
        };
        gsap.fromTo(el, fromVars, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: num(el, "data-anim-delay", 0),
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // ════════════════ PARALLAX (depth blocks) ════════════════
      $$("[data-anim='parallax']").forEach((el) => {
        const speed = num(el, "data-anim-speed", 120);
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ════════════════ LINE-BY-LINE (about teaser) ════════════════
      $$("[data-anim='lines']").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-line]"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // ════════════════ STAGGERED CASCADE (testimonials etc.) ════════════════
      $$("[data-anim='stagger']").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-stagger]"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          }
        );
      });

      // ════════════════ PORTFOLIO PROJECTS ════════════════
      $$("[data-anim='project']").forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 75%" },
        });
        const q = (s) => el.querySelector(s);
        const numEl = q("[data-role='num']");
        const titleEl = q("[data-role='title']");
        const descEl = q("[data-role='desc']");
        const btnEl = q("[data-role='btn']");

        if (numEl)
          tl.fromTo(numEl, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 0);
        if (titleEl)
          tl.fromTo(
            titleEl,
            { x: -40, opacity: 0, letterSpacing: "0.15em" },
            { x: 0, opacity: 1, letterSpacing: "-0.02em", duration: 0.8, ease: "power3.out" },
            0.1
          );
        if (descEl)
          tl.fromTo(descEl, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, 0.25);
        if (btnEl)
          tl.fromTo(btnEl, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }, 0.35);
      });

      // Panels slide in from opposite sides, then drift at different speeds
      $$("[data-anim='panel-left']").forEach((el) => {
        gsap.fromTo(
          el,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
        gsap.to(el, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-anim='project']") || el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
      $$("[data-anim='panel-right']").forEach((el) => {
        gsap.fromTo(
          el,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
        gsap.to(el, {
          y: 30,
          ease: "none",
          scrollTrigger: {
            trigger: el.closest("[data-anim='project']") || el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // ════════════════ FAQ ROWS (slide in + divider draw) ════════════════
      $$("[data-anim='faq-row']").forEach((el, i) => {
        const divider = el.querySelector("[data-faq-divider]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 92%" },
        });
        if (divider)
          tl.fromTo(
            divider,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "power3.out", transformOrigin: "left center" },
            0
          );
        tl.fromTo(
          el,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          0.05
        );
      });

      // ════════════════ CTA DRAMATIC SCALE ════════════════
      $$("[data-anim='cta-scale']").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });

      // ════════════════ COUNT-UP NUMBERS ════════════════
      $$("[data-anim='count']").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count")) || 0;
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { v: 0 };
        el.textContent = prefix + (0).toFixed(decimals) + suffix;
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate: () => {
            el.textContent = prefix + obj.v.toFixed(decimals) + suffix;
          },
        });
      });

      // ════════════════ HORIZONTAL-SCROLL SERVICES ROW ════════════════
      // On desktop, pin the section and translate the card row sideways as the
      // user scrolls vertically. On mobile / reduced-motion it stays a native
      // horizontal swipe (CSS overflow-x: auto).
      $$("[data-anim='hscroll']").forEach((scroller) => {
        const track = scroller.querySelector("[data-hscroll-track]");
        if (!track) return;
        const mm = gsap.matchMedia();
        mediaQueries.push(mm);
        mm.add(
          "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          () => {
            scroller.classList.add("is-pinned");
            const distance = () => Math.max(0, track.scrollWidth - scroller.clientWidth);
            const tween = gsap.to(track, {
              x: () => -distance(),
              ease: "none",
              scrollTrigger: {
                trigger: scroller,
                start: "center center",
                end: () => "+=" + distance(),
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });
            return () => {
              scroller.classList.remove("is-pinned");
              gsap.set(track, { x: 0 });
              if (tween.scrollTrigger) tween.scrollTrigger.kill();
              tween.kill();
            };
          }
        );
      });

      // Keep triggers accurate once fonts/images settle
      ScrollTrigger.refresh();
    });

    // Refresh after full load + font swap (display type shifts metrics)
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }

    // Direct anchor navigation (e.g. /#work) — settle, then jump to target
    const hashTimer = window.setTimeout(() => {
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          ScrollTrigger.refresh();
          target.scrollIntoView({ behavior: "auto", block: "start" });
        }
      }
    }, 200);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(hashTimer);
      mediaQueries.forEach((m) => m.revert());
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
