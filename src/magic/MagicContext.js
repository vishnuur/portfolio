import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ThemeContext from "../context/ThemeContext";
import SPELLS, { matchSpell } from "./spells";

const MagicContext = createContext(null);

export const useMagic = () => useContext(MagicContext);

/**
 * Runs the spells in ./spells.js:
 *  - only one "scene" spell runs at a time (casting one ends the others),
 *  - Finite Incantatem ends everything,
 *  - every cast (or unrecognised phrase) produces feedback for the visitor.
 *
 * State for spells that don't belong in ThemeContext lives here as well.
 */
const HOUSE_KEY = "hogwarts-house";
const readHouse = () => {
  try {
    return window.localStorage.getItem(HOUSE_KEY);
  } catch {
    return null;
  }
};

export function MagicProvider({ children }) {
  const theme = useContext(ThemeContext);
  const [feedback, setFeedback] = useState(null);

  // State for the spells that live outside ThemeContext.
  const [wandLight, setWandLight] = useState(false); // Lumos
  const [mapOpen, setMapOpen] = useState(false); // Marauder's Map
  const [summon, setSummon] = useState(null); // Accio: { target, id }
  const [sorting, setSorting] = useState(false); // Sorting Hat ceremony
  const [priorIncantato, setPriorIncantato] = useState(false);
  const [house, setHouseState] = useState(readHouse);
  const setHouse = useCallback((value) => {
    setHouseState(value);
    try {
      if (value) window.localStorage.setItem(HOUSE_KEY, value);
      else window.localStorage.removeItem(HOUSE_KEY);
    } catch {
      // Storage unavailable (private mode): the house just won't persist.
    }
  }, []);

  // Hooks for CSS: house colours (only inside the magical world) and mode.
  useEffect(() => {
    const root = document.documentElement;
    if (house && theme.harryTheme) root.dataset.house = house;
    else delete root.dataset.house;
    root.classList.toggle("theme-light", !theme.dark);
  }, [house, theme.harryTheme, theme.dark]);

  // Leaving the magical world (or the dark) puts the wand-light out.
  useEffect(() => {
    if (!theme.harryTheme || !theme.dark) setWandLight(false);
  }, [theme.harryTheme, theme.dark]);

  // Always read the latest state, even from async callbacks (voice results).
  const apiRef = useRef(null);

  const announce = useCallback((text, kind = "info") => {
    setFeedback({ id: Date.now() + Math.random(), text, kind });
  }, []);

  const stopAll = useCallback(() => {
    const api = apiRef.current;
    SPELLS.forEach((spell) => {
      if (spell.stop && spell.isActive?.(api)) spell.stop(api);
    });
    api.theme.showSpells(false);
    api.theme.engorigoToggle(16);
    api.magic.setWandLight(false);
  }, []);

  /** Ends whichever scene is running (e.g. before Accio pulls a section in). */
  const stopScenes = useCallback(() => {
    const api = apiRef.current;
    SPELLS.forEach((spell) => {
      if (spell.scene && spell.stop && spell.isActive?.(api)) spell.stop(api);
    });
  }, []);

  const cast = useCallback(
    (id, args, { source = "click" } = {}) => {
      const api = apiRef.current;
      const spell = SPELLS.find((s) => s.id === id);
      if (!spell) return;
      if (spell.scene && !spell.isActive?.(api)) {
        // Starting a new scene ends whichever one is running.
        SPELLS.forEach((other) => {
          if (other.scene && other.id !== id && other.isActive?.(api)) {
            other.stop?.(api);
          }
        });
      }
      const message = spell.cast(api, args, { source });
      announce(message || spell.name, "cast");
    },
    [announce]
  );

  /** Casts whatever spell a spoken phrase names. Returns true on a match. */
  const castFromSpeech = useCallback(
    (text) => {
      const match = matchSpell(text);
      if (!match) {
        announce(`“${text}” isn't a spell I know`, "unknown");
        return false;
      }
      cast(match.spell.id, match.args, { source: "voice" });
      return true;
    },
    [announce, cast]
  );

  const magic = {
    wandLight,
    setWandLight,
    mapOpen,
    setMapOpen,
    summon,
    setSummon,
    sorting,
    setSorting,
    priorIncantato,
    setPriorIncantato,
    house,
    setHouse,
  };
  const api = { theme, magic, stopAll, stopScenes, cast, announce };
  apiRef.current = api;

  const activeScene =
    SPELLS.find((spell) => spell.scene && spell.isActive?.(api))?.id || null;
  const isActive = (id) =>
    Boolean(SPELLS.find((s) => s.id === id)?.isActive?.(api));

  return (
    <MagicContext.Provider
      value={{
        spells: SPELLS,
        cast,
        castFromSpeech,
        stopAll,
        isActive,
        activeScene,
        feedback,
        announce,
        magic,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
}

export default MagicContext;
