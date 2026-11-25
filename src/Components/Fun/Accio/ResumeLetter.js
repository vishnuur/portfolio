import React, { useEffect, useRef, useState } from "react";
import { GiWaxSeal } from "react-icons/gi";
import loadGsap from "../../../utils/loadGsap";
import { whoosh, chime } from "../../../magic/sfx";
import {
  PROFILE,
  EXPERIENCE,
  SKILL_NAMES,
  yearsOfExperience,
} from "../../../data/profile";

/**
 * "Accio résumé": a sealed letter flies in, the wax seal breaks, the flap
 * opens and the letter unfolds into Vishnu's CV.
 */
const ResumeLetter = ({ onClose }) => {
  const rootRef = useRef(null);
  const closeRef = useRef(null);
  const [opened, setOpened] = useState(false);
  const closingRef = useRef(false);

  // The arrival: fly in, break the seal, open the flap, unfold the letter.
  useEffect(() => {
    let ctx;
    loadGsap().then((gsap) => {
      const root = rootRef.current;
      if (!root) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(".letter-envelope", { display: "none" });
          gsap.set(".letter-backdrop", { opacity: 1 });
          gsap.fromTo(".letter-sheet", { opacity: 0 }, { opacity: 1, duration: 0.4 });
          setOpened(true);
          return;
        }
        whoosh({ duration: 0.9, volume: 0.28 });
        // The letter starts folded small, tucked behind the envelope.
        gsap.set(".letter-sheet", { scale: 0.55, opacity: 0 });
        gsap
          .timeline({ onComplete: () => setOpened(true) })
          .fromTo(".letter-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.4 })
          .fromTo(
            ".letter-envelope",
            { x: "45vw", y: "-60vh", scale: 0.08, rotation: 540, opacity: 0 },
            {
              x: 0,
              y: 0,
              scale: 1,
              rotation: -4,
              opacity: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            0.1
          )
          .to(".letter-envelope", { rotation: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
          // The seal cracks and falls away.
          .to(".letter-seal", { scale: 1.25, duration: 0.15, ease: "power2.out" }, "+=0.15")
          .call(() => chime({ base: 660, volume: 0.14 }))
          .to(".letter-seal", {
            scale: 0.6,
            y: 120,
            rotation: 60,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
          })
          // The flap swings open.
          .to(".letter-flap", { rotateX: 180, duration: 0.5, ease: "power2.inOut" }, "-=0.25")
          .set(".letter-flap", { zIndex: 0 })
          // The letter rises out as the envelope drops away, then unfolds.
          // (immediateRender: false so these don't show the letter early.)
          .fromTo(
            ".letter-sheet",
            { y: "15%", scale: 0.45, opacity: 0 },
            {
              y: "-30%",
              scale: 0.5,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              immediateRender: false,
            }
          )
          .to(
            ".letter-envelope",
            { y: "70vh", opacity: 0, duration: 0.6, ease: "power2.in" },
            "<0.1"
          )
          // In front of the envelope once it's clear.
          .set(".letter-sheet", { zIndex: 3 })
          .fromTo(
            ".letter-sheet",
            { y: "-30%", scale: 0.5 },
            {
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.2)",
              immediateRender: false,
            }
          )
          .fromTo(
            ".letter-content > *",
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.35, stagger: 0.06 },
            "-=0.2"
          );
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  // Escape closes it; focus the close button once open.
  useEffect(() => {
    if (opened) closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened]);

  const close = (afterClose) => {
    if (closingRef.current) return;
    closingRef.current = true;
    loadGsap().then((gsap) => {
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.35,
        onComplete: () => {
          onClose();
          afterClose?.();
        },
      });
    });
  };

  const sendOwl = () =>
    close(() =>
      document
        .getElementById("contact-id")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    );

  const years = yearsOfExperience();
  const roles = [...EXPERIENCE].reverse();

  return (
    <div className="letter-root" ref={rootRef}>
      <div className="letter-backdrop" onClick={() => close()} role="presentation" />
      <div className="letter-stage">
        <div className="letter-envelope" aria-hidden="true">
          <div className="letter-envelope-body">
            <span className="letter-address custom-font-harrypotter">
              To the Curious Visitor,
              <br />
              The Screen in Front of You
            </span>
          </div>
          <div className="letter-flap" />
          <div className="letter-seal">
            <GiWaxSeal />
          </div>
        </div>

        <article
          className="letter-sheet"
          role="dialog"
          aria-modal="true"
          aria-labelledby="letter-title"
        >
          <button
            ref={closeRef}
            type="button"
            className="letter-close"
            aria-label="Close the letter"
            onClick={() => close()}
          >
            ×
          </button>
          <div className="letter-content">
            <p className="letter-greeting">Dear Visitor,</p>
            <p className="letter-intro">
              We are pleased to inform you that <strong>{PROFILE.name}</strong>{" "}
              has been accepted as a candidate for your team. Please find
              enclosed a list of all necessary experience.
            </p>
            <header className="letter-header">
              <h2 id="letter-title" className="custom-font-harrypotter">
                {PROFILE.name}
              </h2>
              <p>
                {PROFILE.title} · {years}+ years · {PROFILE.location}
              </p>
            </header>

            <section>
              <h3 className="custom-font-harrypotter">Experience</h3>
              <ol className="letter-roles">
                {roles.map((role) => (
                  <li key={role.date}>
                    <div className="letter-role-head">
                      <strong>{role.title}</strong>
                      <span>{role.date}</span>
                    </div>
                    <div className="letter-role-company">{role.company}</div>
                    <p>{role.description}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h3 className="custom-font-harrypotter">Skills</h3>
              <ul className="letter-skills">
                {SKILL_NAMES.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="custom-font-harrypotter">Owl Post</h3>
              <ul className="letter-contact">
                <li>
                  Email: <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
                </li>
                <li>Phone: {PROFILE.phone}</li>
                <li>
                  <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn profile
                  </a>
                </li>
              </ul>
            </section>

            <div className="letter-actions">
              <button type="button" onClick={sendOwl}>
                Send an owl
              </button>
              {PROFILE.resumePdf && (
                <a href={PROFILE.resumePdf} download>
                  Download PDF
                </a>
              )}
            </div>
            <p className="letter-signoff">
              Yours sincerely,
              <br />
              <span className="custom-font-harrypotter">The Portfolio</span>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ResumeLetter;
