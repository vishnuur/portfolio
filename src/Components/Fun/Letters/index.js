import React, { Suspense, lazy, useEffect, useState } from "react";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";

// Loaded on demand, so the particle engine only downloads when the spell is cast.
const LetterRain = lazy(() => import("./LetterRain"));

// How long to keep the canvas after the spell ends, so letters already in the
// air can finish falling instead of vanishing.
const SETTLE_MS = 7000;

const PostLettersAnimation = () => {
  const { harryTheme, postcardsactive } = React.useContext(ThemeContext);
  const active = harryTheme && postcardsactive;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (active) {
      setMounted(true);
      return undefined;
    }
    // Leaving the magical world clears the screen right away.
    if (!harryTheme) {
      setMounted(false);
      return undefined;
    }
    const timer = setTimeout(() => setMounted(false), SETTLE_MS);
    return () => clearTimeout(timer);
  }, [active, harryTheme]);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <LetterRain emitting={active} />
    </Suspense>
  );
};

export default PostLettersAnimation;
