import React, { useEffect, useRef, useState } from "react";
import { GiPointyHat } from "react-icons/gi";
import { useMagic } from "../../../magic/MagicContext";
import loadGsap from "../../../utils/loadGsap";
import { chime } from "../../../magic/sfx";
import HOUSES, { pickHouse } from "../../../magic/houses";
import Crest from "./Crest";
import "./index.scss";

const SPARKS = 26;

/**
 * The Sorting Hat drops in, thinks out loud, and calls out a house. The site
 * then takes on that house's colours (remembered for next time).
 */
const SortingHat = () => {
  const { magic, announce } = useMagic();
  const { sorting, setSorting, house, setHouse } = magic;
  const [mounted, setMounted] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [lines, setLines] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const rootRef = useRef(null);
  const ctxRef = useRef(null);

  // Start the ceremony: decide the house and the hat's lines up front.
  useEffect(() => {
    if (!sorting) return;
    const next = pickHouse(house);
    setChosen(next);
    setLines([
      house ? "Back again? Hmm… let's see now." : "Hmm… difficult. Very difficult.",
      HOUSES[next].trait,
      "Better be…",
    ]);
    setRevealed(false);
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  // The performance itself.
  useEffect(() => {
    if (!mounted || !sorting || !chosen) return undefined;
    let cancelled = false;
    loadGsap().then((gsap) => {
      const root = rootRef.current;
      if (cancelled || !root) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      ctxRef.current?.revert();
      ctxRef.current = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(".sorting-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.4 })
          // The hat drops in and settles.
          .fromTo(
            ".sorting-hat",
            { y: "-70vh", rotation: -20, opacity: 0 },
            {
              y: 0,
              rotation: 0,
              opacity: 1,
              duration: reduceMotion ? 0.3 : 1,
              ease: "bounce.out",
            },
            0.1
          );
        // Thinking: it sways and squashes while it mutters.
        if (!reduceMotion) {
          tl.to(
            ".sorting-hat-body",
            {
              rotation: 7,
              scaleY: 0.94,
              duration: 0.5,
              ease: "sine.inOut",
              repeat: 9,
              yoyo: true,
              transformOrigin: "50% 100%",
            },
            1.1
          );
        }
        gsap.utils.toArray(".sorting-line").forEach((line, i) => {
          tl.fromTo(
            line,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.5 },
            1.2 + i * 1.6
          );
        });
        // The announcement.
        tl.call(() => {
          setRevealed(true);
          chime({ base: 784, volume: 0.2 });
        }, null, 1.2 + 3 * 1.6 + 0.2);
      }, root);
    });
    return () => {
      cancelled = true;
    };
  }, [mounted, sorting, chosen]);

  // Once the house is called: crest and sparks, then apply the colours.
  useEffect(() => {
    if (!revealed || !chosen) return;
    setHouse(chosen);
    announce(`${HOUSES[chosen].name}!`, "cast");
    loadGsap().then((gsap) => {
      const ctx = ctxRef.current;
      if (!ctx) return;
      ctx.add(() => {
        const { random } = gsap.utils;
        gsap.fromTo(
          ".sorting-reveal",
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }
        );
        gsap.utils.toArray(".sorting-spark").forEach((spark) => {
          const angle = random(0, Math.PI * 2);
          const dist = random(80, 260);
          gsap.fromTo(
            spark,
            { x: 0, y: 0, opacity: 1, scale: random(0.6, 1.4) },
            {
              x: Math.cos(angle) * dist,
              y: Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.2,
              duration: random(0.9, 1.6),
              ease: "power2.out",
            }
          );
        });
      });
    });
    const timer = setTimeout(() => setSorting(false), 4200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  // Leaving (finished, clicked away, or another spell): fade out.
  useEffect(() => {
    if (sorting || !mounted) return;
    loadGsap().then((gsap) => {
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          ctxRef.current?.revert();
          ctxRef.current = null;
          setMounted(false);
          setRevealed(false);
        },
      });
    });
  }, [sorting, mounted]);

  useEffect(() => () => ctxRef.current?.revert(), []);

  if (!mounted || !chosen) return null;
  const h = HOUSES[chosen];

  return (
    <div
      className="sorting-root"
      ref={rootRef}
      style={{ "--house-primary": h.primary, "--house-secondary": h.secondary }}
      role="dialog"
      aria-modal="true"
      aria-label="The Sorting Hat"
      onClick={() => revealed && setSorting(false)}
    >
      <div className="sorting-backdrop" />
      <div className="sorting-stage">
        <div className="sorting-hat" aria-hidden="true">
          <div className="sorting-hat-body">
            <GiPointyHat />
          </div>
        </div>
        <div className="sorting-speech custom-font-harrypotter" aria-live="polite">
          {!revealed &&
            lines.map((line) => (
              <p key={line} className="sorting-line">
                {line}
              </p>
            ))}
          {revealed && (
            <div className="sorting-reveal">
              <div className="sorting-sparks" aria-hidden="true">
                {Array.from({ length: SPARKS }, (_, i) => (
                  <span key={i} className="sorting-spark" />
                ))}
              </div>
              <Crest house={chosen} size={110} />
              <p className="sorting-house">{h.name.toUpperCase()}!</p>
              <p className="sorting-note">
                The site now wears {h.name} colours. Click anywhere to continue.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SortingHat;
