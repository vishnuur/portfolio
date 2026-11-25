import {
  FaFeather,
  FaMoon,
  FaSun,
  FaMagnifyingGlassPlus,
  FaMagnifyingGlassMinus,
  FaBan,
  FaHandSparkles,
} from "react-icons/fa6";
import {
  GiDeer,
  GiSpellBook,
  GiEnvelope,
  GiCandleLight,
  GiTreasureMap,
  GiScrollQuill,
  GiPointyHat,
  GiSparkles,
} from "react-icons/gi";
import { BsCloudRainHeavy } from "react-icons/bs";
import { playSound } from "./sfx";
import { normalise, findPhrase, findChoice } from "./fuzzy";

// What Accio can summon, and the words that name each target.
const SUMMON_TARGETS = {
  resume: ["resume", "cv", "curriculum vitae", "resum"],
  projects: ["projects", "project", "work", "portfolio"],
  skills: ["skills", "skill", "tools", "tech stack"],
  experience: ["experience", "career", "jobs", "history", "timeline"],
  contact: ["contact", "owl", "email", "phone"],
  about: ["about", "about me", "bio", "vishnu"],
  home: ["home", "top", "start"],
};
export const SUMMON_LABELS = {
  resume: "résumé",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  contact: "contact",
  about: "about",
  home: "home",
};

/**
 * The spell registry. Every spell is defined once here; the spell book and
 * voice casting are both generated from this list.
 *
 * Each spell:
 *   id           unique key
 *   name         shown in the spell book
 *   incantation  what to say (also shown in the book)
 *   description  one line on what it does
 *   icon         react-icons component for the book
 *   phrases      ways a visitor might say it, matched forgivingly (see
 *                fuzzy.js): mishearings, partial sentences and extra words
 *                are all fine. Defaults to [incantation].
 *   parse(words) optional: arguments from the words spoken after the
 *                incantation (e.g. Accio's target)
 *   scene        true for big effects; only one scene runs at a time
 *   isActive(api)  whether the spell is currently running
 *   cast(api, args, { source })  start it (or toggle it off when running).
 *                May return a short message to show the visitor.
 *   stop(api)    end it (used by Finite Incantatem and when another scene starts)
 *   hidden       true to keep it out of the spell book
 *
 * `api` is { theme, magic, stopAll, stopScenes, ... } from MagicContext.
 */
const SPELLS = [
  {
    id: "revelio",
    name: "Revelio",
    incantation: "Revelio",
    description: "Opens this spell book.",
    icon: GiSpellBook,
    phrases: ["revelio", "reveal", "alohomora", "spell book", "show me the spells", "open the book"],
    hidden: true,
    cast: ({ theme }) => theme.showSpells(true),
  },
  {
    id: "finite",
    name: "Finite Incantatem",
    incantation: "Finite Incantatem",
    description: "Ends every spell that's running.",
    icon: FaBan,
    phrases: ["finite incantatem", "finite", "obliviate", "stop all spells", "stop everything", "stop the magic"],
    cast: ({ stopAll }) => {
      stopAll();
      return "All spells ended";
    },
  },
  {
    id: "lumosMaxima",
    name: "Lumos Maxima",
    incantation: "Lumos Maxima",
    description: "Floods the whole page with daylight.",
    icon: FaSun,
    phrases: ["lumos maxima", "lumos maximum", "lights on"],
    cast: ({ theme, magic }) => {
      playSound("/lumos.mp3");
      magic.setWandLight(false);
      theme.toggle(false);
    },
  },
  {
    id: "lumos",
    name: "Lumos",
    incantation: "Lumos",
    description: "Lights the tip of your wand. Move around to explore the dark.",
    icon: GiCandleLight,
    phrases: ["lumos", "loomis", "lumen", "light my wand"],
    isActive: ({ magic }) => magic.wandLight,
    cast: ({ theme, magic }, args, { source }) => {
      if (!theme.dark) return "It's already bright here. Say “Nox” first";
      // Saying it again keeps the light on; clicking it in the book toggles.
      if (magic.wandLight && source === "voice") {
        return "Your wand is already lit. Say “Nox” to put it out";
      }
      playSound("/lumos.mp3");
      magic.setWandLight(!magic.wandLight);
      return magic.wandLight ? "Your wand-light goes out" : "Lumos";
    },
    stop: ({ magic }) => magic.setWandLight(false),
  },
  {
    id: "nox",
    name: "Nox",
    incantation: "Nox",
    description: "Puts your wand-light out, or turns the page dark again.",
    icon: FaMoon,
    phrases: [
      "nox",
      "knox",
      "close the torch",
      "close the lumos torch",
      "put out the light",
      "turn off the light",
      "lights off",
      "stop lumos",
      "close lumos",
    ],
    cast: ({ theme, magic }) => {
      playSound("/lumos.mp3");
      if (magic.wandLight) magic.setWandLight(false);
      else theme.toggle(true);
    },
  },
  {
    id: "leviosa",
    name: "Wingardium Leviosa",
    incantation: "Wingardium Leviosa",
    description: "Makes everything on the page float. Cast again to land it.",
    icon: FaFeather,
    phrases: ["wingardium leviosa", "leviosa", "wingardium", "levitate"],
    scene: true,
    isActive: ({ theme }) => theme.animatevalue,
    // Said aloud, the visitor has just spoken the incantation themselves, so
    // skip the recorded one and lift off sooner.
    cast: ({ theme }, args, { source }) =>
      source === "voice" ? theme.animatesound() : theme.animate(),
    stop: ({ theme }) => theme.animatevalue && theme.animate(),
  },
  {
    // Only for a clearly mispronounced "Levio-SAR" (see matchSpell).
    id: "leviosaWrong",
    name: "Leviosar",
    hidden: true,
    cast: ({ theme }) => {
      theme.animateWrong();
      return "It's Levi-O-sa, not Levio-SAR!";
    },
  },
  {
    id: "patronus",
    name: "Expecto Patronum",
    incantation: "Expecto Patronum",
    description: "Dementors close in… until your Patronus drives them away.",
    icon: GiDeer,
    phrases: ["expecto patronum", "expecto", "patronum", "patronus", "expect a patronum"],
    scene: true,
    isActive: ({ theme }) => theme.petronaOn,
    cast: ({ theme }) =>
      theme.petronama({ value: !theme.petronaOn, full: true }),
    stop: ({ theme }) => theme.petronama({ value: false, full: false }),
  },
  {
    id: "engorgio",
    name: "Engorgio",
    incantation: "Engorgio",
    description: "Makes the text bigger.",
    icon: FaMagnifyingGlassPlus,
    phrases: ["engorgio", "gorgeous", "bigger text", "make it bigger"],
    cast: ({ theme }) => theme.engorigoToggle(Math.min(theme.engorgio + 4, 28)),
  },
  {
    id: "reducio",
    name: "Reducio",
    incantation: "Reducio",
    description: "Makes the text smaller.",
    icon: FaMagnifyingGlassMinus,
    phrases: ["reducio", "reduce", "smaller text", "make it smaller"],
    cast: ({ theme }) => theme.engorigoToggle(Math.max(theme.engorgio - 4, 12)),
  },
  {
    id: "always",
    name: "After all this time?",
    incantation: "After all this time?",
    description: "“Always.” A rainy moment for Severus Snape.",
    icon: BsCloudRainHeavy,
    phrases: ["after all this time", "all this time", "always"],
    scene: true,
    isActive: ({ theme }) => theme.snapeTheme,
    cast: ({ theme }) => theme.snapeThemetoggle(!theme.snapeTheme),
    stop: ({ theme }) => theme.snapeThemetoggle(false),
  },
  {
    id: "wizard",
    name: "You're a wizard, Harry",
    incantation: "You're a wizard, Harry",
    description: "Hogwarts letters pour in through every gap.",
    icon: GiEnvelope,
    phrases: ["youre a wizard harry", "you are a wizard", "youre a wizard", "a wizard harry"],
    scene: true,
    isActive: ({ theme }) => theme.postcardsactive,
    cast: ({ theme }) => theme.postcardstoggle(!theme.postcardsactive),
    stop: ({ theme }) => theme.postcardstoggle(false),
  },
  {
    id: "accio",
    name: "Accio",
    incantation: "Accio projects",
    description:
      "Summons a part of the portfolio to you. Try “Accio résumé” for a letter.",
    icon: FaHandSparkles,
    phrases: ["accio", "akio", "axio", "asio", "achio", "aggio", "actio", "summon"],
    parse: (words) => ({ target: findChoice(words, SUMMON_TARGETS) }),
    options: [
      { label: "About", args: { target: "about" } },
      { label: "Skills", args: { target: "skills" } },
      { label: "Projects", args: { target: "projects" } },
      { label: "Experience", args: { target: "experience" } },
      { label: "Contact", args: { target: "contact" } },
      { label: "Résumé", args: { target: "resume" } },
    ],
    cast: ({ magic, stopScenes }, args) => {
      const target = args?.target;
      if (!target) return "Accio what? Try “Accio projects” or “Accio résumé”";
      stopScenes();
      magic.setMapOpen(false);
      magic.setSummon({ target, id: Date.now() });
      return `Accio ${SUMMON_LABELS[target]}!`;
    },
  },
  {
    id: "map",
    name: "The Marauder's Map",
    incantation: "I solemnly swear that I am up to no good",
    description: "Reveals a map of this portfolio. Click a room to go there.",
    icon: GiTreasureMap,
    phrases: [
      "i solemnly swear that i am up to no good",
      "i solemnly swear",
      "solemnly swear",
      "i solemnly",
      "solemnly",
      "up to no good",
      "marauders map",
      "show me the map",
      "open the map",
    ],
    scene: true,
    isActive: ({ magic }) => magic.mapOpen,
    cast: ({ magic }) => magic.setMapOpen(true),
    stop: ({ magic }) => magic.setMapOpen(false),
  },
  {
    id: "mischief",
    name: "Mischief Managed",
    incantation: "Mischief managed",
    description: "Wipes the Marauder's Map blank again.",
    icon: GiScrollQuill,
    phrases: ["mischief managed", "mischief", "close the map"],
    cast: ({ magic }) => {
      if (!magic.mapOpen) return "The map is already blank";
      magic.setMapOpen(false);
    },
  },
  {
    id: "sorting",
    name: "The Sorting Hat",
    incantation: "Sorting Hat",
    description:
      "Puts on the Sorting Hat, then recolours the site for your house.",
    icon: GiPointyHat,
    phrases: ["sorting hat", "sort me", "which house", "sorting"],
    scene: true,
    isActive: ({ magic }) => magic.sorting,
    cast: ({ magic }) => magic.setSorting(true),
    stop: ({ magic }) => magic.setSorting(false),
  },
  {
    id: "prior",
    name: "Prior Incantato",
    incantation: "Prior Incantato",
    description: "Replays Vishnu's career, one job after another.",
    icon: GiSparkles,
    phrases: ["prior incantato", "priori incantatem", "prior incantatem", "replay career"],
    scene: true,
    isActive: ({ magic }) => magic.priorIncantato,
    cast: ({ magic }) => magic.setPriorIncantato(!magic.priorIncantato),
    stop: ({ magic }) => magic.setPriorIncantato(false),
  },
];

export default SPELLS;
export { normalise };

// A clearly mispronounced "Levio-SAR" gets Hermione's correction.
const LEVIOSAR = /\blevio ?s(aa+|ar|er)\b/;

/**
 * Finds the spell a spoken phrase names, forgivingly: every spell's phrases
 * are compared by sound against the words spoken, and the closest match
 * wins (longer phrases win ties, so "lumos maxima" beats "lumos").
 */
export const matchSpell = (text) => {
  const phrase = normalise(text);
  if (!phrase) return null;
  if (LEVIOSAR.test(phrase)) {
    return { spell: SPELLS.find((s) => s.id === "leviosaWrong"), phrase };
  }
  const words = phrase.split(" ");
  let best = null;
  SPELLS.forEach((spell) => {
    (spell.phrases || [spell.incantation]).filter(Boolean).forEach((target) => {
      const hit = findPhrase(words, normalise(target));
      if (!hit) return;
      const better =
        !best ||
        hit.score > best.score + 0.001 ||
        (Math.abs(hit.score - best.score) <= 0.001 && hit.length > best.length);
      if (better) best = { spell, ...hit };
    });
  });
  if (!best) return null;
  const args = best.spell.parse?.(words.slice(best.end));
  return { spell: best.spell, args, phrase, score: best.score };
};
