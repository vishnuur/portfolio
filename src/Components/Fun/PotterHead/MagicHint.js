import React, { useEffect, useState } from "react";

const WAND_KEY = "magic-hint-wand";
const BOOK_KEY = "magic-hint-book";
const WAND_DELAY_MS = 4500;
const BOOK_DELAY_MS = 1200;
const BOOK_SHOW_MS = 9000;

const seen = (key) => {
  try {
    return window.localStorage.getItem(key) === "1";
  } catch {
    return false;
  }
};
const markSeen = (key) => {
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    // Storage unavailable: the hint may show again next visit, which is fine.
  }
};

/**
 * First-visit hints, shown once each:
 *  1. a beckoning wand and "Psst… fancy a little magic?" bubble,
 *  2. after entering the magical world, a pointer to the spell book.
 */
const MagicHint = ({ harryTheme, bookOpen, onBeckon }) => {
  const [step, setStep] = useState(null); // null | "wand" | "book"

  // Step 1: invite the visitor to try the wand.
  useEffect(() => {
    if (harryTheme || seen(WAND_KEY)) return undefined;
    const timer = setTimeout(() => setStep("wand"), WAND_DELAY_MS);
    return () => clearTimeout(timer);
  }, [harryTheme]);

  // Step 2: once inside, point at the spell book.
  useEffect(() => {
    if (!harryTheme) return undefined;
    markSeen(WAND_KEY);
    setStep((current) => (current === "wand" ? null : current));
    if (seen(BOOK_KEY)) return undefined;
    const show = setTimeout(() => setStep("book"), BOOK_DELAY_MS);
    const hide = setTimeout(() => {
      markSeen(BOOK_KEY);
      setStep((current) => (current === "book" ? null : current));
    }, BOOK_DELAY_MS + BOOK_SHOW_MS);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [harryTheme]);

  // Opening the book means the hint has done its job.
  useEffect(() => {
    if (bookOpen && step === "book") {
      markSeen(BOOK_KEY);
      setStep(null);
    }
  }, [bookOpen, step]);

  useEffect(() => onBeckon(step === "wand"), [step, onBeckon]);

  if (!step) return null;

  const dismiss = (e) => {
    e.stopPropagation();
    markSeen(step === "wand" ? WAND_KEY : BOOK_KEY);
    setStep(null);
  };

  return (
    <div className={`magic-hint magic-hint--${step}`} role="note">
      {step === "wand" ? (
        <span>
          Psst… fancy a little magic? <strong>Tap the wand</strong>
        </span>
      ) : (
        <span>
          Every spell is in the <strong>spell book</strong>, or tap the mic and
          say one aloud.
        </span>
      )}
      <button type="button" aria-label="Dismiss hint" onClick={dismiss}>
        ×
      </button>
    </div>
  );
};

export default MagicHint;
