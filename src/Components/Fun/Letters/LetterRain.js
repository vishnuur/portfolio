import React, { useEffect, useMemo, useRef, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadEmittersShapeSquare } from "@tsparticles/plugin-emitters-shape-square";
import { loadWobbleUpdater } from "@tsparticles/updater-wobble";
import { loadTiltUpdater } from "@tsparticles/updater-tilt";
import { loadRollUpdater } from "@tsparticles/updater-roll";
import postcard from "../../../Assets/Images/postcard.webp";

// The engine only needs to be initialised once for the whole app.
let enginePromise;
const initEngine = () => {
  enginePromise ||= initParticlesEngine(async (engine) => {
    await loadSlim(engine);
    await loadEmittersPlugin(engine);
    await loadEmittersShapeSquare(engine);
    await loadWobbleUpdater(engine);
    await loadTiltUpdater(engine);
    await loadRollUpdater(engine);
  });
  return enginePromise;
};

const EMITTERS = ["letters-drizzle", "letters-storm"];

const buildOptions = (isMobile) => {
  const scale = isMobile ? 0.6 : 1;
  // Emitters sit just above the top edge and are wider than the screen, so
  // letters also drift in from the sides.
  const emitter = (name, quantity, delay, startDelay) => ({
    name,
    direction: "bottom",
    position: { x: 50, y: -8 },
    // Spawn anywhere along a strip wider than the screen.
    shape: { type: "square" },
    size: { width: 120, height: 0, mode: "percent" },
    rate: { quantity, delay },
    life: { count: 0, delay: startDelay },
  });

  return {
    fullScreen: { enable: true, zIndex: 1001 },
    background: { color: "transparent" },
    detectRetina: true,
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: { enable: false },
        onHover: { enable: false },
        resize: { enable: true },
      },
    },
    particles: {
      number: { value: 0 },
      shape: {
        type: "image",
        options: {
          image: { src: postcard, width: 1080, height: 762 },
        },
      },
      // Size is the radius, so letters are roughly 44-96px wide on desktop.
      size: { value: { min: 22 * scale, max: 48 * scale } },
      opacity: { value: { min: 0.85, max: 1 } },
      move: {
        enable: true,
        direction: "bottom",
        speed: { min: 1.5, max: 3.5 },
        // Paper speeds up briefly, then settles at a slow terminal velocity.
        gravity: { enable: true, acceleration: 1.2, maxSpeed: 4.5 },
        drift: { min: -1.2, max: 1.2 },
        outModes: { default: "destroy", top: "none" },
      },
      // Spin in the plane of the screen.
      rotate: {
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: { min: 2, max: 9 } },
      },
      // 3D tumble: tilt skews the card, roll flips it over.
      tilt: {
        enable: true,
        value: { min: 0, max: 360 },
        direction: "random",
        animation: { enable: true, speed: { min: 4, max: 14 } },
      },
      roll: {
        enable: true,
        speed: { min: 4, max: 12 },
      },
      // Side-to-side flutter like a falling leaf.
      wobble: {
        enable: true,
        distance: { min: 10, max: 30 },
        speed: { angle: { min: -6, max: 6 }, move: 8 },
      },
    },
    emitters: [
      // A light shower that starts right away...
      emitter(EMITTERS[0], 1, isMobile ? 0.35 : 0.18, 0),
      // ...then the storm builds after a couple of seconds.
      emitter(EMITTERS[1], isMobile ? 1 : 2, isMobile ? 0.3 : 0.15, 2.5),
    ],
  };
};

/**
 * Canvas-based rain of Hogwarts letters.
 * While `emitting` is true new letters keep spawning; when it turns false
 * spawning stops and the letters already in the air finish falling.
 */
const LetterRain = ({ emitting }) => {
  const [ready, setReady] = useState(false);
  const containerRef = useRef(null);
  const options = useMemo(() => buildOptions(window.innerWidth < 768), []);

  useEffect(() => {
    let cancelled = false;
    initEngine().then(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    EMITTERS.forEach((name) =>
      emitting ? container.playEmitter?.(name) : container.pauseEmitter?.(name)
    );
  }, [emitting]);

  if (!ready) return null;

  return (
    <Particles
      id="letter-rain"
      className="letter-rain"
      options={options}
      particlesLoaded={async (container) => {
        containerRef.current = container;
      }}
    />
  );
};

export default LetterRain;
