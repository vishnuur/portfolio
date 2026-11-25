import React, { useEffect, useMemo, useRef, useState } from "react";
import { useMagic } from "../../../magic/MagicContext";
import loadGsap from "../../../utils/loadGsap";
import { SECTIONS } from "../../../data/profile";
import { center, corridorWalls, getLayout } from "./layout";
import "./index.scss";

const STEP = 17; // distance between footprints, in map units
const FOLLOW_SPEED = 150; // "You" hurrying after the pointer, map units/s
const WANDER_SPEED = 48; // "Vishnu U R" strolling, map units/s
const PRINTS_PER_WALKER = 16;

/**
 * "I solemnly swear that I am up to no good": the Marauder's Map of this
 * portfolio. Rooms are the page sections; click one to go there.
 * "Mischief managed" wipes the ink away again.
 */
const MaraudersMap = () => {
  const { magic } = useMagic();
  const { mapOpen, setMapOpen } = magic;
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rootRef = useRef(null);
  const ctxRef = useRef(null);
  const gotoRef = useRef(null); // section to scroll to once the map is closed
  const closingRef = useRef(false);
  const openTlRef = useRef(null);

  // Mount on open; keep mounted while the closing animation plays.
  useEffect(() => {
    if (mapOpen) {
      closingRef.current = false;
      setIsMobile(window.innerWidth < 768);
      setMounted(true);
    }
  }, [mapOpen]);

  const layout = useMemo(() => getLayout(isMobile), [isMobile]);
  const [vw, vh] = layout.viewBox;

  // Opening: unfold, draw the ink, start the walkers.
  useEffect(() => {
    if (!mounted || !mapOpen) return undefined;
    let cancelled = false;
    loadGsap().then((gsap) => {
      const root = rootRef.current;
      if (cancelled || !root) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      ctxRef.current?.revert();
      ctxRef.current = gsap.context(() => {
        const ink = gsap.utils.toArray(".map-ink");
        ink.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        });

        const open = gsap.timeline();
        openTlRef.current = open;
        open
          .fromTo(".map-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo(
            ".map-sheet",
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" },
            0
          )
          .fromTo(
            ".map-fold-left",
            { rotateY: 0 },
            { rotateY: -178, duration: reduceMotion ? 0.01 : 1.1, ease: "power2.inOut" },
            0.35
          )
          .fromTo(
            ".map-fold-right",
            { rotateY: 0 },
            { rotateY: 178, duration: reduceMotion ? 0.01 : 1.1, ease: "power2.inOut" },
            0.45
          )
          .set(".map-fold", { display: "none" })
          // The title writes itself in.
          .fromTo(
            ".map-title > *",
            { opacity: 0, y: 6 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.35 },
            1.2
          )
          // Walls and corridors are inked stroke by stroke.
          .to(
            ink,
            {
              strokeDashoffset: 0,
              duration: reduceMotion ? 0.01 : 1.1,
              ease: "power1.inOut",
              stagger: { each: 0.06, from: "start" },
            },
            1.6
          )
          .fromTo(
            ".map-room-label",
            { opacity: 0 },
            { opacity: 1, duration: 0.8, stagger: 0.12 },
            "-=0.8"
          )
          .fromTo(".map-hint", { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.3")
          .call(() => {
            if (!reduceMotion) startWalkers(gsap);
          });
      }, root);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, mapOpen, isMobile]);

  // Footprints. "You" walks towards the visitor's pointer (or finger);
  // "Vishnu U R" wanders from room to room along the corridors. Every STEP
  // a print appears, alternating left and right, and fades behind them.
  const stopWalkersRef = useRef(null);
  const startWalkers = (gsap) => {
    const root = rootRef.current;
    const svg = root?.querySelector(".map-svg");
    if (!svg) return;
    const { rooms: roomBoxes, corridors } = layout;

    const neighbours = {};
    corridors.forEach(([a, b]) => {
      (neighbours[a] ||= []).push(b);
      (neighbours[b] ||= []).push(a);
    });

    const walkers = layout.walkers.map((walker, w) => ({
      follow: Boolean(walker.follow),
      speed: walker.follow ? FOLLOW_SPEED : WANDER_SPEED,
      room: walker.start,
      pos: center(roomBoxes[walker.start]),
      target: null,
      sinceStep: 0,
      left: false,
      printIndex: 0,
      prints: gsap.utils.toArray(`.map-walker-${w} .map-print`),
      tag: root.querySelector(`.map-tag-${w}`),
    }));

    const wanderOn = (walker) => {
      const options = neighbours[walker.room] || [];
      walker.room = options[Math.floor(Math.random() * options.length)] || walker.room;
      walker.target = center(roomBoxes[walker.room]);
    };
    walkers.forEach((walker) => {
      if (!walker.follow) wanderOn(walker);
      walker.tag?.setAttribute("transform", `translate(${walker.pos.x} ${walker.pos.y - 30})`);
      if (walker.tag) gsap.to(walker.tag, { opacity: 1, duration: 0.6 });
    });

    // The pointer, in map coordinates.
    let pointer = null;
    const onPointer = (e) => {
      const p = e.touches ? e.touches[0] : e;
      const matrix = svg.getScreenCTM();
      if (!p || !matrix) return;
      const point = svg.createSVGPoint();
      point.x = p.clientX;
      point.y = p.clientY;
      const { x, y } = point.matrixTransform(matrix.inverse());
      pointer = {
        x: Math.max(0, Math.min(vw, x)),
        y: Math.max(0, Math.min(vh, y)),
      };
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onPointer, { passive: true });
    window.addEventListener("touchstart", onPointer, { passive: true });

    const placePrint = (walker, angle) => {
      const side = walker.left ? -1 : 1;
      walker.left = !walker.left;
      const x = walker.pos.x + Math.cos(angle + Math.PI / 2) * 5 * side;
      const y = walker.pos.y + Math.sin(angle + Math.PI / 2) * 5 * side;
      const print = walker.prints[walker.printIndex % walker.prints.length];
      walker.printIndex += 1;
      if (!print) return;
      gsap.killTweensOf(print, "opacity");
      print.setAttribute(
        "transform",
        `translate(${x} ${y}) rotate(${(angle * 180) / Math.PI + 90})`
      );
      gsap.set(print, { opacity: 0.85 });
      gsap.to(print, { opacity: 0, duration: 2.6, delay: 0.4, ease: "power1.in" });
    };

    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      walkers.forEach((walker) => {
        const target = walker.follow ? pointer : walker.target;
        if (!target) return;
        const dx = target.x - walker.pos.x;
        const dy = target.y - walker.pos.y;
        const dist = Math.hypot(dx, dy);
        // Close enough: the follower waits; the wanderer picks a new room.
        if (dist < (walker.follow ? 10 : 2)) {
          if (!walker.follow) wanderOn(walker);
          return;
        }
        const move = Math.min(dist, walker.speed * dt);
        walker.pos.x += (dx / dist) * move;
        walker.pos.y += (dy / dist) * move;
        walker.sinceStep += move;
        if (walker.sinceStep >= STEP) {
          walker.sinceStep -= STEP;
          placePrint(walker, Math.atan2(dy, dx));
        }
        walker.tag?.setAttribute(
          "transform",
          `translate(${walker.pos.x} ${walker.pos.y - 30})`
        );
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    stopWalkersRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onPointer);
      window.removeEventListener("touchstart", onPointer);
      stopWalkersRef.current = null;
    };
  };

  // Closing ("Mischief managed", a room click, Escape): wipe the ink, fold up.
  useEffect(() => {
    if (mapOpen || !mounted || closingRef.current) return;
    closingRef.current = true;
    loadGsap().then((gsap) => {
      const root = rootRef.current;
      if (!root) return;
      // Closed before it finished opening: stop the opening where it is.
      openTlRef.current?.kill();
      stopWalkersRef.current?.();
      const ctx = ctxRef.current || gsap.context(() => {}, root);
      ctxRef.current = ctx;
      ctx.add(() => {
        gsap
          .timeline({
            onComplete: () => {
              ctxRef.current?.revert();
              ctxRef.current = null;
              setMounted(false);
              const target = gotoRef.current;
              gotoRef.current = null;
              if (target) {
                document
                  .getElementById(target)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            },
          })
          .to(".map-ink, .map-room-label, .map-title > *, .map-walker, .map-hint", {
            opacity: 0,
            duration: 0.9,
            ease: "power1.in",
            stagger: { each: 0.01, from: "random" },
          })
          .to(".map-sheet", { scale: 0.94, opacity: 0, duration: 0.45, ease: "power2.in" }, "-=0.2")
          .to(".map-backdrop", { opacity: 0, duration: 0.35 }, "-=0.25");
      });
    });
  }, [mapOpen, mounted]);

  // Escape closes the map.
  useEffect(() => {
    if (!mounted) return undefined;
    const onKey = (e) => e.key === "Escape" && setMapOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, setMapOpen]);

  useEffect(
    () => () => {
      stopWalkersRef.current?.();
      ctxRef.current?.revert();
    },
    []
  );

  if (!mounted) return null;

  const goTo = (section) => {
    gotoRef.current = section.id;
    setMapOpen(false);
  };

  const rooms = layout.rooms;
  const titleScale = layout.title.size;

  return (
    <div className="map-root" ref={rootRef}>
      <div
        className="map-backdrop"
        onClick={() => setMapOpen(false)}
        role="presentation"
      />
      <div
        className="map-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="The Marauder's Map"
      >
        <svg
          className="map-svg"
          viewBox={`0 0 ${vw} ${vh}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* A small inked footprint, pointing "up". */}
            <symbol id="map-foot" viewBox="-6 -11 12 22" overflow="visible">
              <ellipse cx="0" cy="3" rx="3.4" ry="6" />
              <circle cx="-2.6" cy="-6" r="1.2" />
              <circle cx="-0.6" cy="-7.4" r="1.3" />
              <circle cx="1.6" cy="-7" r="1.2" />
              <circle cx="3.2" cy="-5.4" r="1" />
            </symbol>
          </defs>

          <g className="map-title" transform={`translate(${vw / 2} ${layout.title.y})`}>
            <text className="map-title-small" fontSize={18 * titleScale}>
              Messrs Moony, Wormtail, Padfoot &amp; Prongs
            </text>
            <text className="map-title-small" y={26 * titleScale} fontSize={16 * titleScale}>
              are proud to present
            </text>
            <text className="map-title-big" y={84 * titleScale} fontSize={56 * titleScale}>
              The Marauder&apos;s Map
            </text>
            <text className="map-title-small" y={132 * titleScale} fontSize={15 * titleScale}>
              of Vishnu U R&apos;s portfolio
            </text>
          </g>

          {/* Corridors */}
          {layout.corridors.map(([a, b]) =>
            corridorWalls(rooms[a], rooms[b]).map((d, i) => (
              <path key={`${a}-${b}-${i}`} className="map-ink map-wall" d={d} />
            ))
          )}

          {/* Footprints sit under the room labels so the names stay readable. */}
          {layout.walkers.map((walker, w) => (
            <g key={walker.name} className={`map-walker map-walker-${w}`}>
              {Array.from({ length: PRINTS_PER_WALKER }, (_, i) => (
                <use
                  key={i}
                  href="#map-foot"
                  className="map-print"
                  width="12"
                  height="22"
                  x="-6"
                  y="-11"
                  opacity="0"
                />
              ))}
            </g>
          ))}

          {/* Rooms: each one is a way into its section. */}
          {SECTIONS.map((section) => {
            const room = rooms[section.key];
            if (!room) return null;
            const c = center(room);
            const inset = 7;
            return (
              <g
                key={section.key}
                className="map-room"
                role="button"
                tabIndex={0}
                aria-label={`${section.room}: go to ${section.label}`}
                onClick={() => goTo(section)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    goTo(section);
                  }
                }}
              >
                <rect
                  className="map-room-floor"
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                />
                <path
                  className="map-ink map-wall"
                  d={`M${room.x} ${room.y} h${room.w} v${room.h} h${-room.w} Z`}
                />
                <path
                  className="map-ink map-wall-inner"
                  d={`M${room.x + inset} ${room.y + inset} h${room.w - inset * 2} v${room.h - inset * 2} h${-(room.w - inset * 2)} Z`}
                />
                <g className="map-room-label">
                  <text
                    className="map-room-name"
                    x={c.x}
                    y={c.y - 4}
                    fontSize={layout.labelSize}
                  >
                    {section.room}
                  </text>
                  <text
                    className="map-room-section"
                    x={c.x}
                    y={c.y + layout.subSize + 8}
                    fontSize={layout.subSize}
                  >
                    {section.label}
                  </text>
                </g>
              </g>
            );
          })}

          {/* Name tags ride on top of everything. */}
          {layout.walkers.map((walker, w) => (
            <g key={walker.name} className="map-walker">
              <g className={`map-tag map-tag-${w}`} opacity="0">
                <rect
                  x={-(walker.name.length * 4.6 + 10)}
                  y="-13"
                  width={walker.name.length * 9.2 + 20}
                  height="22"
                  rx="3"
                />
                <text y="3">{walker.name}</text>
              </g>
            </g>
          ))}
        </svg>

        <div className="map-hint">
          <span>Your footprints follow your pointer · click a room to go there</span>
          <button type="button" onClick={() => setMapOpen(false)}>
            Mischief managed
          </button>
        </div>

        <div className="map-fold map-fold-left" aria-hidden="true" />
        <div className="map-fold map-fold-right" aria-hidden="true" />
      </div>
    </div>
  );
};

export default MaraudersMap;
