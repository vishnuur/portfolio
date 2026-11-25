import { useEffect } from "react";
import { useMagic } from "../../../magic/MagicContext";
import loadGsap from "../../../utils/loadGsap";
import { chime } from "../../../magic/sfx";
import "./index.scss";

const STEP_SECONDS = 3.2;

/**
 * Prior Incantato: replays the career timeline as spell echoes, from the
 * first job to the current one. A beam of light climbs the timeline, each
 * job's card glows and its title rises as a ghostly echo.
 */
const PriorIncantato = () => {
  const { magic } = useMagic();
  const { priorIncantato, setPriorIncantato } = magic;

  useEffect(() => {
    if (!priorIncantato) return undefined;
    const timeline = document.querySelector("#experience-id .vertical-timeline");
    if (!timeline) {
      setPriorIncantato(false);
      return undefined;
    }

    let cancelled = false;
    let ctx;
    const layer = document.createElement("div");
    layer.className = "prior-layer";
    timeline.appendChild(layer);

    // The visitor scrolling or pressing a key ends the replay.
    const stop = () => setPriorIncantato(false);
    const interruptions = ["wheel", "touchstart", "keydown"];
    // Added a moment later so the click/keypress that cast it doesn't count.
    const listenTimer = setTimeout(
      () => interruptions.forEach((e) => window.addEventListener(e, stop, { passive: true })),
      400
    );

    loadGsap().then((gsap) => {
      if (cancelled) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      ctx = gsap.context(() => {
        // Oldest job first (the timeline lists the newest at the top).
        const items = [
          ...timeline.querySelectorAll(".vertical-timeline-element"),
        ].reverse();
        const box = () => timeline.getBoundingClientRect();
        const centreOf = (el) => {
          const r = el.getBoundingClientRect();
          const t = box();
          return { x: r.left - t.left + r.width / 2, y: r.top - t.top + r.height / 2 };
        };
        const scrollTo = (y, duration) => {
          const proxy = { y: window.scrollY };
          return gsap.to(proxy, {
            y,
            duration,
            ease: "power2.inOut",
            onUpdate: () => window.scrollTo(0, proxy.y),
          });
        };

        const tl = gsap.timeline({ onComplete: () => setPriorIncantato(false) });
        let previousY = null;

        items.forEach((item, i) => {
          const icon = item.querySelector(".vertical-timeline-element-icon");
          const card = item.querySelector(".vertical-timeline-element-content");
          if (!icon || !card) return;
          const at = i * STEP_SECONDS;

          // Bring the job to the middle of the screen.
          tl.add(() => ctx.add(() => {
            const r = item.getBoundingClientRect();
            const y = window.scrollY + r.top + r.height / 2 - window.innerHeight / 2;
            scrollTo(Math.max(0, y), reduceMotion ? 0.01 : 1.1);
          }), at);

          // The beam climbs from the previous job to this one.
          tl.add(() => ctx.add(() => {
            const c = centreOf(icon);
            const from = previousY ?? c.y + 80;
            previousY = c.y;
            const beam = document.createElement("div");
            beam.className = "prior-beam";
            Object.assign(beam.style, {
              left: `${c.x - 3}px`,
              top: `${c.y}px`,
              height: `${Math.max(0, from - c.y)}px`,
            });
            layer.appendChild(beam);
            gsap.fromTo(beam, { scaleY: 0 }, { scaleY: 1, duration: 0.9, ease: "power2.out" });

            // Echo rings ripple out from the job's icon.
            [0, 0.25, 0.5].forEach((delay) => {
              const ring = document.createElement("div");
              ring.className = "prior-ring";
              Object.assign(ring.style, { left: `${c.x}px`, top: `${c.y}px` });
              layer.appendChild(ring);
              gsap.fromTo(
                ring,
                { scale: 0.3, opacity: 0.95 },
                {
                  scale: 3.2,
                  opacity: 0,
                  duration: 1.4,
                  delay: 0.8 + delay,
                  ease: "power2.out",
                  onComplete: () => ring.remove(),
                }
              );
            });
          }), at + 0.9);

          // The card lights up and its title rises as a ghostly echo.
          tl.add(() => ctx.add(() => {
            chime({ base: 520 + i * 70, volume: 0.13 });
            gsap.to(card, {
              boxShadow:
                "0 0 0 2px rgba(255, 226, 150, 0.95), 0 0 46px 12px rgba(255, 205, 100, 0.55)",
              duration: 0.5,
              ease: "power2.out",
            });
            gsap.to(card, {
              boxShadow:
                "0 0 0 1px rgba(255, 226, 150, 0.6), 0 0 22px 4px rgba(255, 205, 100, 0.28)",
              duration: 1,
              delay: 0.9,
            });
            const title = card.querySelector(".vertical-timeline-element-title")?.textContent;
            const date = item.querySelector(".vertical-timeline-element-date")?.textContent;
            const echo = document.createElement("div");
            echo.className = "prior-echo custom-font-harrypotter";
            echo.textContent = [title, date].filter(Boolean).join(" · ");
            const c = centreOf(card);
            const top = card.getBoundingClientRect().top - box().top;
            Object.assign(echo.style, { left: `${c.x}px`, top: `${top}px` });
            layer.appendChild(echo);
            gsap.fromTo(
              echo,
              { y: 0, opacity: 0, xPercent: -50 },
              {
                keyframes: [
                  { y: -24, opacity: 1, duration: 0.6, ease: "power2.out" },
                  { y: -70, opacity: 0, duration: 1.4, ease: "power1.in", delay: 0.4 },
                ],
                onComplete: () => echo.remove(),
              }
            );
          }), at + 1.3);
        });

        // Let the last echo finish, then fade the beams before ending.
        tl.add(
          () =>
            ctx.add(() =>
              gsap.to(layer.querySelectorAll(".prior-beam"), { opacity: 0, duration: 1.2 })
            ),
          `+=${STEP_SECONDS - 1.3}`
        ).to({}, { duration: 1.3 });
      }, layer);
    });

    return () => {
      cancelled = true;
      clearTimeout(listenTimer);
      interruptions.forEach((e) => window.removeEventListener(e, stop));
      // Stop the replay, clear the glows and remove the light layer.
      ctx?.revert();
      timeline
        .querySelectorAll(".vertical-timeline-element-content")
        .forEach((card) => (card.style.boxShadow = ""));
      layer.remove();
    };
  }, [priorIncantato, setPriorIncantato]);

  return null;
};

export default PriorIncantato;
