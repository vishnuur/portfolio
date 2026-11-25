import React, { useEffect, useRef } from "react";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";
import { useMagic } from "../../../magic/MagicContext";
import Sparks from "./sparks";

// Let the book close before the spell's effect starts.
const CAST_DELAY_MS = 250;

// The order spells appear in the book: showpieces first, utilities last.
// (The registry's own order is for voice matching.) Unlisted spells go last.
const BOOK_ORDER = [
  "map",
  "accio",
  "sorting",
  "patronus",
  "prior",
  "leviosa",
  "lumos",
  "nox",
  "lumosMaxima",
  "wizard",
  "always",
  "engorgio",
  "reducio",
  "mischief",
  "finite",
];
const bookRank = (id) => {
  const i = BOOK_ORDER.indexOf(id);
  return i === -1 ? BOOK_ORDER.length : i;
};

/**
 * The spell book: every spell in the registry, clickable to cast, with the
 * incantation to say aloud.
 */
const SpellBook = () => {
  const { spellsList, harryTheme, showSpells } = React.useContext(ThemeContext);
  const { spells, cast, isActive } = useMagic();
  const closeRef = useRef(null);
  const open = spellsList && harryTheme;

  useEffect(() => {
    if (!open) return undefined;
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && showSpells(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, showSpells]);

  if (!open) return null;

  const castFromBook = (id, args) => {
    showSpells(false);
    setTimeout(() => cast(id, args), CAST_DELAY_MS);
  };

  return (
    <div
      className="spellbook-backdrop"
      onClick={() => showSpells(false)}
      role="presentation"
    >
      <Sparks />
      <section
        className="spellbook"
        role="dialog"
        aria-modal="true"
        aria-labelledby="spellbook-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="spellbook-close"
          aria-label="Close the spell book"
          onClick={() => showSpells(false)}
        >
          ×
        </button>
        <header className="spellbook-header">
          <h2 id="spellbook-title" className="custom-font-harrypotter">
            The Standard Book of Spells
          </h2>
          <p>
            Click a spell to cast it, or tap the microphone and say the
            incantation aloud.
          </p>
        </header>
        <ul className="spellbook-list">
          {spells
            .filter((spell) => !spell.hidden)
            .sort((a, b) => bookRank(a.id) - bookRank(b.id))
            .map((spell, i) => {
              const Icon = spell.icon;
              const active = isActive(spell.id);
              return (
                <li
                  key={spell.id}
                  className={`spellbook-entry ${active ? "is-active" : ""}`}
                  style={{ animationDelay: `${i * 35}ms` }}
                >
                  <button
                    type="button"
                    className="spellbook-cast"
                    onClick={() => castFromBook(spell.id)}
                    aria-label={`${active ? "End" : "Cast"} ${spell.name}`}
                    disabled={Boolean(spell.options)}
                  >
                    <span className="spellbook-icon" aria-hidden="true">
                      {Icon && <Icon />}
                    </span>
                    <span className="spellbook-text">
                      <span className="spellbook-name custom-font-harrypotter">
                        {spell.name}
                      </span>
                      <span className="spellbook-say">
                        Say: “{spell.incantation}”
                      </span>
                      <span className="spellbook-desc">
                        {spell.description}
                      </span>
                      {active && (
                        <span className="spellbook-active">
                          Active · click to end
                        </span>
                      )}
                    </span>
                  </button>
                  {spell.options && (
                    <div className="spellbook-options">
                      {spell.options.map((option) => (
                        <button
                          key={option.label}
                          type="button"
                          onClick={() => castFromBook(spell.id, option.args)}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
};

export default SpellBook;
