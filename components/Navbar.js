"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { brand, nav } from "@/lib/content";
import AuditButton from "@/components/AuditButton";
import Logo from "@/components/Logo";
import ServiceIcon from "@/components/ServiceIcon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(null);
  const [darkHero, setDarkHero] = useState(false);
  const pathname = usePathname();

  // Background goes frosted past 80px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect whether the current page opens on a dark section (so the
  // transparent nav at the top can switch to light text/logo).
  useEffect(() => {
    setDarkHero(!!document.querySelector("[data-nav-dark]"));
  }, [pathname]);

  // Light text/logo only while transparent over a dark hero.
  const lightText = !scrolled && darkHero;

  // Scroll-spy: highlight the nav link whose in-page section is in view
  useEffect(() => {
    const ids = nav.links
      .filter((l) => l.href.includes("#"))
      .map((l) => l.href.split("#")[1]);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!els.length) return;

    const visible = new Set();
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // Highlight the last section to enter the centre band, or clear.
        setActive([...visible].pop() || null);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  const isActive = (href) =>
    href.includes("#") ? active && href.endsWith(`#${active}`) : pathname === href;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-parchment/90 py-3 shadow-[0_1px_0_rgba(0,0,0,0.08)] backdrop-blur-md"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 sm:px-8">
        {/* Brand lockup */}
        <Link href="/" data-cursor="link" className="flex items-center gap-3">
          <Logo className={`h-9 w-9 shrink-0 ${lightText ? "text-white" : "text-ink"}`} />
          <span className="leading-none">
            <b
              className={`block text-base font-extrabold tracking-tightest ${
                lightText ? "text-white" : "text-black"
              }`}
            >
              {brand.name}
            </b>
            <span
              className={`label mt-1 block text-[0.6rem] ${
                lightText ? "text-white/55" : "text-black/45"
              }`}
            >
              {brand.location}
            </span>
          </span>
        </Link>

        {/* Center links with active dot */}
        <div className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => {
            const activeLink = isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                data-cursor="link"
                className={`label relative transition-colors hover:text-[#2D5BFF] ${
                  activeLink
                    ? "text-[#2D5BFF]"
                    : lightText
                      ? "text-white/85"
                      : "text-black/80"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-[#2D5BFF] transition-all duration-300 ${
                    activeLink ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  }`}
                  aria-hidden
                />
              </Link>
            );
          })}
        </div>

        {/* CTA pill with audit icon */}
        <AuditButton className="btn-pill">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-lime" aria-hidden>
            <ServiceIcon name="search" size={14} />
          </span>
          <span>{nav.cta.label}</span>
        </AuditButton>
      </nav>
    </header>
  );
}
