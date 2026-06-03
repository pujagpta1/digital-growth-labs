"use client";

/**
 * AuditButton — any CTA that should open the "Book a free audit" modal.
 * Dispatches a global event the AuditModal (mounted in the layout) listens for.
 */
export default function AuditButton({ className = "", children, ...rest }) {
  return (
    <button
      type="button"
      data-cursor="link"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("open-audit"))}
      {...rest}
    >
      {children}
    </button>
  );
}
