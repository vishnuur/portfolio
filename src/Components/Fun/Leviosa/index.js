import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../../context/ThemeContext";
import loadGsap from "../../../utils/loadGsap";
import "./index.css";

const restore = (gsap, { el, wasInline }) => {
  gsap.set(el, { clearProps: "transform" });
  if (wasInline) el.style.display = "";
};

/**
 * Wingardium Leviosa: every element marked with the `levitate` class rises
 * into the air one by one, hovers with a gentle bob, and floats back down to
 * its place when the spell is released.
 */
const Leviosa = () => {
  const { animatevalue, harryTheme } = useContext(ThemeContext);
  const gsapRef = useRef(null);
  // Elements currently in the air, with the transform they started from.
  const floatingRef = useRef([]);
  const timelinesRef = useRef([]);
  const landingRef = useRef(null);

  // Start downloading GSAP as soon as the magical world is entered, well
  // before the spell can be cast.
  useEffect(() => {
    if (harryTheme) loadGsap();
  }, [harryTheme]);

  useEffect(() => {
    const floating = floatingRef.current;

    const lift = (gsap) => {
      const { random } = gsap.utils;
      // Cast again mid-landing: settle everything first so the new lift
      // starts from each element's real resting place.
      landingRef.current?.progress(1);
      landingRef.current = null;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const isMobile = window.innerWidth < 768;
      const strength = (reduceMotion ? 0.3 : 1) * (isMobile ? 0.6 : 1);

      document.body.classList.add("leviosa-active");

      gsap.utils.toArray(".levitate").forEach((el) => {
        // Transforms don't apply to plain inline elements.
        const wasInline = getComputedStyle(el).display === "inline";
        if (wasInline) el.style.display = "inline-block";

        // Remember where it started, so it lands exactly back in place.
        const base = {
          x: gsap.getProperty(el, "x"),
          y: gsap.getProperty(el, "y"),
          rotation: gsap.getProperty(el, "rotation"),
        };
        floating.push({ el, base, wasInline });

        // Elements inside another floating element already move with their
        // parent, so they only need a smaller motion of their own.
        const nested = el.parentElement?.closest(".levitate") ? 0.45 : 1;
        const k = strength * nested;
        // Big blocks sway and tilt less than small ones, like heavier objects,
        // which also keeps wide sections from swinging off the screen.
        const width = el.getBoundingClientRect().width || 1;
        const sway = Math.min(1, 160 / width);

        const timeline = gsap.timeline({ delay: random(0, 1.2) });
        timeline
          // Lift off: a slow, slightly wobbly rise.
          .to(el, {
            x: base.x + random(-35, 35) * k * sway,
            y: base.y - random(50, 150) * k,
            rotation: base.rotation + random(-12, 12) * k * sway,
            duration: random(2.4, 3.6),
            ease: "sine.inOut",
          })
          // Hover: a lazy bob that keeps going until the spell is released.
          .to(el, {
            x: `+=${random(-12, 12) * k * sway}`,
            y: `-=${random(10, 24) * k}`,
            rotation: `+=${random(-4, 4) * k * sway}`,
            duration: random(1.8, 3),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        timelinesRef.current.push(timeline);
      });
    };

    const land = (gsap) => {
      // Release: everything drifts gently back down to where it was.
      timelinesRef.current.forEach((timeline) => timeline.kill());
      timelinesRef.current = [];
      const landing = floating.splice(0);
      landingRef.current = gsap.to(
        landing.map(({ el }) => el),
        {
          x: (i) => landing[i].base.x,
          y: (i) => landing[i].base.y,
          rotation: (i) => landing[i].base.rotation,
          duration: () => gsap.utils.random(1.6, 2.4),
          ease: "power2.inOut",
          stagger: { each: 0.015, from: "random" },
          onComplete: () => {
            landing.forEach((item) => restore(gsap, item));
            document.body.classList.remove("leviosa-active");
          },
        }
      );
    };

    if (!animatevalue) {
      // Nothing in the air (e.g. first render): nothing to land, no download.
      if (floating.length && gsapRef.current) land(gsapRef.current);
      return undefined;
    }

    let cancelled = false;
    loadGsap().then((gsap) => {
      // Released before GSAP finished loading: never lift at all.
      if (cancelled) return;
      gsapRef.current = gsap;
      lift(gsap);
    });
    return () => {
      cancelled = true;
    };
  }, [animatevalue]);

  // Put everything back if this component ever unmounts mid-spell.
  useEffect(
    () => () => {
      const gsap = gsapRef.current;
      if (!gsap) return;
      timelinesRef.current.forEach((timeline) => timeline.kill());
      landingRef.current?.kill();
      floatingRef.current.forEach((item) => restore(gsap, item));
      document.body.classList.remove("leviosa-active");
    },
    []
  );

  return null;
};

export default Leviosa;
