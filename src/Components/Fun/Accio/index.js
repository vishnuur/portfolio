import React, { useEffect, useRef, useState } from "react";
import { useMagic } from "../../../magic/MagicContext";
import loadGsap from "../../../utils/loadGsap";
import { whoosh } from "../../../magic/sfx";
import { SECTIONS } from "../../../data/profile";
import ResumeLetter from "./ResumeLetter";
import "./index.scss";

const NAVBAR_HEIGHT = 72;

/**
 * Accio: the named section comes flying at the visitor out of the distance,
 * spinning in from a blur, with light streaks rushing past. "Accio résumé"
 * summons a sealed letter instead.
 */
const Accio = () => {
  const { magic } = useMagic();
  const { summon } = magic;
  const [letterOpen, setLetterOpen] = useState(false);
  const streaksRef = useRef(null);

  useEffect(() => {
    if (!summon) return;
    if (summon.target === "resume") {
      setLetterOpen(true);
      return;
    }
    const section = SECTIONS.find((s) => s.key === summon.target);
    const el = section && document.getElementById(section.id);
    if (!el) return;

    whoosh({ duration: 0.8, volume: 0.3 });
    // Jump there instantly; the flight itself is the transition.
    const top =
      section.key === "home"
        ? 0
        : el.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
    window.scrollTo({ top, behavior: "instant" });

    let tween;
    loadGsap().then((gsap) => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduceMotion) {
        tween = gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.4, clearProps: "opacity" });
        return;
      }
      tween = gsap.fromTo(
        el,
        {
          scale: 0.12,
          y: window.innerHeight * 0.35,
          rotation: gsap.utils.random(-14, 14),
          opacity: 0,
          filter: "blur(14px)",
          transformOrigin: "50% 30%",
        },
        {
          scale: 1,
          y: 0,
          rotation: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.15,
          ease: "back.out(1.25)",
          clearProps: "transform,opacity,filter,transformOrigin",
        }
      );
      if (streaksRef.current) {
        gsap.fromTo(
          streaksRef.current,
          { scale: 0.3, opacity: 0 },
          {
            keyframes: [
              { scale: 1.1, opacity: 0.9, duration: 0.35, ease: "power2.out" },
              { scale: 2.2, opacity: 0, duration: 0.6, ease: "power1.in" },
            ],
          }
        );
      }
    });
    return () => tween?.progress(1);
  }, [summon]);

  return (
    <>
      <div className="accio-streaks" ref={streaksRef} aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span key={i} style={{ "--angle": `${i * 20}deg` }} />
        ))}
      </div>
      {letterOpen && <ResumeLetter onClose={() => setLetterOpen(false)} />}
    </>
  );
};

export default Accio;
