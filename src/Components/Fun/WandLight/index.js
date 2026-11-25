import React, { useContext, useEffect, useRef, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";
import { useMagic } from "../../../magic/MagicContext";
import "./index.scss";

const FADE_MS = 700;

/**
 * Lumos: darkness everywhere except a soft, flickering pool of wand-light
 * that follows the pointer (or finger), trailing slightly behind it.
 */
const WandLight = () => {
  const { harryTheme, dark } = useContext(ThemeContext);
  const { magic, cast } = useMagic();
  const lit = magic.wandLight && harryTheme && dark;

  // Escape puts the light out too.
  useEffect(() => {
    if (!lit) return undefined;
    const onKey = (e) => e.key === "Escape" && cast("nox");
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lit, cast]);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const layerRef = useRef(null);

  // Fade in when lit; fade out before unmounting when put out.
  useEffect(() => {
    if (lit) {
      setMounted(true);
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
    const timer = setTimeout(() => setMounted(false), FADE_MS);
    return () => clearTimeout(timer);
  }, [lit]);

  // Follow the pointer, easing towards it, with a gentle flicker.
  useEffect(() => {
    if (!mounted) return undefined;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.45 };
    const pos = { ...target };
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const onMove = (e) => {
      const point = e.touches ? e.touches[0] : e;
      if (!point) return;
      target.x = point.clientX;
      target.y = point.clientY;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchstart", onMove, { passive: true });

    let raf;
    const base = Math.max(150, Math.min(window.innerWidth, window.innerHeight) * 0.2);
    const tick = (time) => {
      pos.x += (target.x - pos.x) * 0.16;
      pos.y += (target.y - pos.y) * 0.16;
      const flicker = reduceMotion
        ? 1
        : 1 + Math.sin(time / 90) * 0.012 + Math.sin(time / 37) * 0.008;
      const el = layerRef.current;
      if (el) {
        el.style.setProperty("--x", `${pos.x}px`);
        el.style.setProperty("--y", `${pos.y}px`);
        el.style.setProperty("--r", `${base * flicker}px`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchstart", onMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      <div
        ref={layerRef}
        className={`wand-light ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="wand-light-tip" />
      </div>
      {lit && (
        <button
          type="button"
          className="wand-light-off"
          onClick={() => cast("nox")}
        >
          <span className="custom-font-harrypotter">Nox</span> · put out the
          light
        </button>
      )}
    </>
  );
};

export default WandLight;
