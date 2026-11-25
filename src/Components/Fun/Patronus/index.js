import React, { useContext, useEffect, useRef, useState } from "react";
import { GiDeer } from "react-icons/gi";
import ThemeContext from "../../../context/ThemeContext";
import loadGsap from "../../../utils/loadGsap";
import dem1 from "../../../Assets/Images/dem1.webp";
import dem2 from "../../../Assets/Images/dem2.webp";
import dem3 from "../../../Assets/Images/dem3.webp";
import "./index.scss";

const DEMENTOR_IMAGES = [dem1, dem2, dem3];
const SPARK_COUNT = 28;

/**
 * Lays dementors out on a jittered grid so they spread across the screen
 * without clumping, keeping the bottom-left corner (where the Patronus
 * appears) clear. Generated once per spell, so nothing moves on re-render.
 */
const createScene = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const isMobile = width < 768;
  const cols = isMobile ? 2 : 4;
  const rows = isMobile ? 4 : 3;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const nearCorner = c === 0 && r === rows - 1;
      if (!nearCorner) cells.push({ r, c });
    }
  }
  const count = isMobile ? 6 : 11;
  const picked = cells.sort(() => Math.random() - 0.5).slice(0, count);

  const dementors = picked.map(({ r, c }, i) => {
    const size = isMobile
      ? 100 + Math.random() * 70
      : 150 + Math.random() * 140;
    // Smaller dementors read as further away: a little fainter and softer.
    const depth = (size - (isMobile ? 100 : 150)) / (isMobile ? 70 : 140);
    return {
      id: i,
      src: DEMENTOR_IMAGES[i % DEMENTOR_IMAGES.length],
      size,
      x: ((c + 0.2 + Math.random() * 0.6) / cols) * width,
      y: ((r + 0.2 + Math.random() * 0.6) / rows) * height,
      flip: Math.random() < 0.5,
      opacity: 0.7 + depth * 0.3,
      blur: depth < 0.3 ? 1.2 : 0,
    };
  });

  return { id: Date.now(), width, height, isMobile, dementors };
};

const Patronus = () => {
  const { petronaOn, petronamaLight, harryTheme } = useContext(ThemeContext);
  const [scene, setScene] = useState(null);
  const rootRef = useRef(null);
  const ctxRef = useRef(null); // gsap.context holding every tween of the scene
  const castRef = useRef(false);
  const fadingRef = useRef(false);

  // Fetch GSAP early, as soon as the magical world is entered.
  useEffect(() => {
    if (harryTheme) loadGsap();
  }, [harryTheme]);

  // Start or end the whole encounter.
  useEffect(() => {
    if (petronaOn) {
      ctxRef.current?.revert();
      ctxRef.current = null;
      castRef.current = false;
      fadingRef.current = false;
      setScene(createScene());
      return undefined;
    }
    if (!scene || fadingRef.current) return undefined;

    // Spell over (or cancelled): let the whole scene fade instead of vanishing.
    fadingRef.current = true;
    const fadingId = scene.id;
    loadGsap().then((gsap) => {
      if (!rootRef.current) return;
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: castRef.current ? 1.6 : 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // A new spell may have started meanwhile; only clear this one.
          setScene((current) => {
            if (current?.id !== fadingId) return current;
            ctxRef.current?.revert();
            ctxRef.current = null;
            return null;
          });
        },
      });
    });
    return undefined;
    // `scene` is read only to know whether something is on screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petronaOn]);

  // Phase 1: the dementors drift in and hover menacingly.
  useEffect(() => {
    if (!scene) return undefined;
    let cancelled = false;
    loadGsap().then((gsap) => {
      if (cancelled || !rootRef.current) return;
      const { random } = gsap.utils;
      ctxRef.current = gsap.context(() => {
        gsap.to(".patronus-chill", { opacity: 1, duration: 4, ease: "sine.inOut" });

        gsap.utils.toArray(".patronus-dementor").forEach((el, i) => {
          const { opacity } = scene.dementors[i];
          gsap.set(el, { xPercent: -50, yPercent: -50 });
          gsap
            .timeline({ delay: random(0, 3.5) })
            // Swoop down into place.
            .fromTo(
              el,
              {
                x: random(-260, 260),
                y: random(-320, -180),
                rotation: random(-14, 14),
                scale: 0.75,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotation: random(-4, 4),
                scale: 1,
                opacity,
                duration: random(4, 6),
                ease: "power2.out",
              }
            )
            // Then hover, swaying and breathing.
            .to(el, {
              x: `+=${random(-24, 24)}`,
              y: `+=${random(-20, 20)}`,
              rotation: `+=${random(-5, 5)}`,
              scaleY: random(1.02, 1.06),
              duration: random(2.2, 3.6),
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
        });
      }, rootRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [scene]);

  // Phase 2: Expecto Patronum! Light floods in from the bottom-left corner,
  // the stag charges, and the dementors are driven off the screen.
  useEffect(() => {
    if (!scene || !petronamaLight || castRef.current) return undefined;
    castRef.current = true;
    let cancelled = false;
    loadGsap().then((gsap) => {
      const ctx = ctxRef.current;
      if (cancelled || !ctx) return;
      const { random } = gsap.utils;
      const { width, height, isMobile } = scene;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      ctx.add(() => {
        const light = gsap.timeline();
        light
          // A white-hot core flares in the corner, with a brief bloom.
          .fromTo(
            ".patronus-core",
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(2)" }
          )
          .fromTo(
            ".patronus-flash",
            { opacity: 0 },
            { opacity: 0.55, duration: 0.18, ease: "power2.out" },
            0.1
          )
          .to(".patronus-flash", { opacity: 0, duration: 1.4, ease: "power2.out" }, 0.3)
          // The silvery light sweeps out across the screen.
          .fromTo(
            ".patronus-glow",
            { scale: 0.04, opacity: 0 },
            { scale: 1, opacity: 1, duration: 3.4, ease: "power2.out" },
            0.15
          )
          .fromTo(
            ".patronus-rays",
            { scale: 0.1, opacity: 0, rotation: -8 },
            { scale: 1, opacity: 0.85, duration: 3, ease: "power2.out" },
            0.35
          )
          .to(".patronus-chill", { opacity: 0, duration: 2, ease: "sine.out" }, 0.4)
          // Once the dementors are gone the light settles into a soft glow.
          .to(".patronus-glow", { opacity: 0.7, duration: 3, ease: "sine.inOut" }, 6)
          .to(".patronus-rays", { opacity: 0.45, duration: 3, ease: "sine.inOut" }, 6);

        // Slow turning rays and a pulsing core while the spell holds.
        gsap.to(".patronus-rays", {
          rotation: 10,
          duration: 14,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 3.3,
        });
        gsap.to(".patronus-core", {
          scale: 1.12,
          duration: 1.1,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 0.8,
        });

        // Silver sparks streaming out of the light.
        const reach = Math.hypot(width, height);
        gsap.utils.toArray(".patronus-spark").forEach((el) => {
          const angle = random(-8, 92) * (Math.PI / 180);
          const dist = random(0.35, 0.95) * reach;
          gsap
            .timeline({ repeat: -1, delay: random(0.2, 3) })
            .fromTo(
              el,
              { x: 0, y: 0, opacity: 0, scale: random(0.5, 1.4) },
              { opacity: 1, duration: 0.25 }
            )
            .to(el, {
              x: Math.cos(angle) * dist,
              y: -Math.sin(angle) * dist,
              opacity: 0,
              scale: 0.2,
              duration: random(1.8, 3.2),
              ease: "power1.out",
            });
        });

        // The stag bursts out of the light and charges up across the screen.
        const stag = document.querySelector(".patronus-stag");
        const stagSize = stag.offsetWidth;
        const charge = isMobile ? 4.5 : 6;
        gsap
          .timeline({ delay: 0.6 })
          .fromTo(
            stag,
            { x: -stagSize, y: stagSize * 0.3, opacity: 0 },
            {
              x: width + stagSize * 0.2,
              y: -height * 0.62,
              duration: charge,
              ease: "power1.inOut",
            }
          )
          .to(stag, { opacity: 0.95, duration: 0.6, ease: "power1.out" }, 0)
          // Dissolves back into the light as it leaves.
          .to(stag, { opacity: 0, duration: 1.4, ease: "power1.in" }, charge - 1.5);
        if (!reduceMotion) {
          // Galloping bob.
          gsap.to(".patronus-stag-body", {
            y: -14,
            rotation: -5,
            duration: 0.28,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }

        // Each dementor is hit when the wave of light reaches it: it recoils,
        // shudders, then is blasted away from the corner, tumbling as it fades.
        const maxDist = Math.hypot(width, height);
        gsap.utils.toArray(".patronus-dementor").forEach((el, i) => {
          const d = scene.dementors[i];
          const dx = d.x;
          const dy = d.y - height;
          const dist = Math.hypot(dx, dy) || 1;
          const dirX = dx / dist;
          const dirY = dy / dist;
          const hitAt = 0.5 + (dist / maxDist) * 2.4;
          const throwDist = maxDist * random(0.8, 1.1);

          gsap.killTweensOf(el);
          gsap
            .timeline({ delay: hitAt })
            .to(el, {
              x: `+=${dirX * 30}`,
              y: `+=${dirY * 30}`,
              filter: "brightness(1.6) blur(0.5px)",
              duration: 0.25,
              ease: "power2.out",
            })
            .to(el, {
              x: `+=${random(-6, 6)}`,
              duration: 0.05,
              repeat: 5,
              yoyo: true,
              ease: "none",
            })
            .to(el, {
              x: `+=${dirX * throwDist}`,
              y: `+=${dirY * throwDist}`,
              rotation: `+=${random(25, 70) * (Math.random() < 0.5 ? -1 : 1)}`,
              scale: 0.55,
              opacity: 0,
              filter: "brightness(2.2) blur(6px)",
              duration: random(1.4, 2),
              ease: "power2.in",
            });
        });
      });
    });
    return () => {
      cancelled = true;
    };
  }, [scene, petronamaLight]);

  // Clean up if the component unmounts mid-spell.
  useEffect(() => () => ctxRef.current?.revert(), []);

  if (!scene) return null;

  return (
    <div className="patronus-scene" ref={rootRef} key={scene.id} aria-hidden="true">
      <div className="patronus-chill" />
      {scene.dementors.map((d) => (
        <div
          key={d.id}
          className="patronus-dementor"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            filter: d.blur ? `blur(${d.blur}px)` : undefined,
          }}
        >
          {/* Mirrored on the inner image so GSAP's scale tweens keep the flip. */}
          <img
            src={d.src}
            alt=""
            draggable="false"
            style={d.flip ? { transform: "scaleX(-1)" } : undefined}
          />
        </div>
      ))}
      <div className="patronus-glow" />
      <div className="patronus-rays" />
      <div className="patronus-sparks">
        {Array.from({ length: SPARK_COUNT }, (_, i) => (
          <span key={i} className="patronus-spark" />
        ))}
      </div>
      <div className="patronus-stag">
        <div className="patronus-stag-body">
          <GiDeer />
        </div>
      </div>
      <div className="patronus-core" />
      <div className="patronus-flash" />
    </div>
  );
};

export default Patronus;
