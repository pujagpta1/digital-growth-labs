"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      setProgress(Math.min(1, Math.max(0, scrolled)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed right-3 top-1/2 z-40 hidden h-[40vh] w-px -translate-y-1/2 bg-black/15 sm:block"
      aria-hidden
    >
      <div
        className="absolute left-0 top-0 w-px bg-tomato"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  );
}
