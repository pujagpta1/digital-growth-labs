"use client";

import { useEffect, useRef, useState } from "react";
import { brand, home } from "@/lib/content";

const form = home.auditForm;

const ENDPOINT =
  (typeof process !== "undefined" &&
    process.env &&
    process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT) ||
  form.endpoint ||
  "";

export default function AuditModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);
  const openerRef = useRef(null);

  // Open on global event; remember what to restore focus to.
  useEffect(() => {
    const onOpen = () => {
      openerRef.current = document.activeElement;
      setSubmitted(false);
      setError(false);
      setSending(false);
      setOpen(true);
    };
    window.addEventListener("open-audit", onOpen);
    return () => window.removeEventListener("open-audit", onOpen);
  }, []);

  // Lock scroll, focus first field, handle Esc + basic focus trap.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => firstFieldRef.current?.focus(), 60);

    const onKey = (e) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll(
          'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
    const opener = openerRef.current;
    if (opener && typeof opener.focus === "function") {
      setTimeout(() => opener.focus(), 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k) => (data.get(k) || "").toString().trim();
    const subject = `Free audit request — ${get("business") || get("name")}`;

    // Preferred: POST to a configured form backend (Formspree etc.)
    if (ENDPOINT) {
      setSending(true);
      setError(false);
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name: get("name"),
            phone: get("phone"),
            email: get("email"),
            business: get("business"),
            google_profiles: get("google") || "—",
            websites: get("website") || "—",
            _subject: subject,
          }),
        });
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setSending(false);
      }
      return;
    }

    // Fallback: hand off to the visitor's mail client.
    const lines = [
      `Name: ${get("name")}`,
      `Phone: ${get("phone")}`,
      `Email: ${get("email")}`,
      `Business name(s): ${get("business")}`,
      `Google Business Profile link(s): ${get("google") || "—"}`,
      `Website link(s): ${get("website") || "—"}`,
    ];
    const mailto = `mailto:${brand.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:p-6"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="audit-title"
        className="audit-panel relative my-8 w-full max-w-[560px] rounded-3xl border border-white/10 bg-ink p-7 text-white shadow-2xl sm:my-0 sm:p-10"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          data-cursor="link"
          aria-label="Close"
          className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-tomato hover:text-tomato"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <span className="kicker">{form.eyebrow}</span>
            <h2 id="audit-title" className="mt-4 text-3xl font-extrabold uppercase tracking-tightest sm:text-4xl">
              {form.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{form.intro}</p>

            <form onSubmit={handleSubmit} className="mt-7 grid gap-5">
              {form.fields.map((f, i) => (
                <label key={f.name} className="block">
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-label text-white/55">
                    {f.label}
                    {f.required && <span className="text-tomato"> *</span>}
                  </span>
                  <input
                    ref={i === 0 ? firstFieldRef : undefined}
                    name={f.name}
                    type={f.type}
                    required={f.required}
                    placeholder={f.placeholder}
                    className="audit-input"
                  />
                </label>
              ))}

              {error && (
                <p className="rounded-xl border border-tomato/40 bg-tomato/10 px-4 py-3 text-sm text-white">
                  {form.errorTitle} {form.errorBody.replace("778-323-1804", brand.phone)}{" "}
                  <a href={`mailto:${brand.email}`} className="underline" data-cursor="link">
                    {brand.email}
                  </a>
                </p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="btn-red mt-2 w-full !py-4 disabled:opacity-60"
              >
                <span>{sending ? form.sendingLabel : form.submitLabel}</span>
              </button>
              <p className="text-center text-xs text-white/40">
                Or call the studio directly at{" "}
                <a href={brand.phoneHref} className="text-tomato hover:underline" data-cursor="link">
                  {brand.phone}
                </a>
                .
              </p>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-positive">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id="audit-title" className="text-3xl font-extrabold uppercase tracking-tightest">
              {form.successTitle}
            </h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-sm leading-relaxed text-white/65">
              {form.successBody}
            </p>
            <button type="button" onClick={close} className="btn-outline mt-8 text-white">
              <span>Close</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
