"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dot = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default"); // default | link | view

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    // Target (mouse) vs rendered (lerped) positions
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf;

    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const render = () => {
      // lerp smoothing (instant if reduced motion) — higher = tracks tighter
      const f = reduce ? 1 : 0.55;
      cx += (tx - cx) * f;
      cy += (ty - cy) * f;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(render);
    };
    const over = (e) => {
      if (e.target.closest('[data-cursor="view"]')) setMode("view");
      else if (e.target.closest('[data-cursor="link"], a, button')) setMode("link");
      else setMode("default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    render();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!enabled) return null;

  const isView = mode === "view";
  const isLink = mode === "link";

  return (
    <div
      ref={dot}
      aria-hidden
      className={`pointer-events-none fixed left-0 top-0 z-[60] flex items-center justify-center rounded-full text-[0.6rem] font-bold uppercase tracking-label text-white transition-[width,height,background-color] duration-300 ${
        isView
          ? "h-20 w-20 bg-tomato"
          : isLink
            ? "h-12 w-12 bg-tomato mix-blend-normal"
            : "h-3 w-3 bg-white mix-blend-difference"
      }`}
    >
      <span className={isView ? "opacity-100" : "opacity-0"}>View</span>
    </div>
  );
}
