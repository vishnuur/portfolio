import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import ThemeContext from "../../../context/ThemeContext";
import { useMagic } from "../../../magic/MagicContext";
import MagicHint from "./MagicHint";
import {
  FaWandMagicSparkles,
  FaFeather,
  FaMicrophone,
  FaStop,
  FaFont,
} from "react-icons/fa6";
import { GiDeer, GiSpellBook } from "react-icons/gi";
import { TbFeatherOff } from "react-icons/tb";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const CAPTION_MS = 2800;

const Index = () => {
  const {
    animatevalue,
    petronaOn,
    harryTheme,
    harryThemetoggle,
    changeFont,
    harryFont,
    showSpells,
    spellsList,
  } = React.useContext(ThemeContext);
  const { cast, castFromSpeech, stopAll, feedback, announce } = useMagic();

  const {
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  // Cast each finished phrase once, then clear it so it can't fire again.
  const heardRef = useRef(false);
  useEffect(() => {
    const phrase = finalTranscript.trim();
    if (!phrase) return;
    heardRef.current = true;
    castFromSpeech(phrase);
    resetTranscript();
  }, [finalTranscript, castFromSpeech, resetTranscript]);

  // Listening ended without catching anything.
  const wasListening = useRef(false);
  useEffect(() => {
    if (wasListening.current && !listening && !heardRef.current) {
      announce(
        isMicrophoneAvailable
          ? "I didn't catch a spell. Try again, or pick one from the spell book"
          : "Microphone is blocked. Pick a spell from the spell book instead",
        "unknown"
      );
    }
    wasListening.current = listening;
  }, [listening, isMicrophoneAvailable, announce]);

  // Caption: what the mic hears while listening, then the result.
  const [caption, setCaption] = useState(null);
  useEffect(() => {
    if (!feedback) return undefined;
    setCaption(feedback);
    const timer = setTimeout(() => setCaption(null), CAPTION_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.abortListening();
      return;
    }
    heardRef.current = false;
    resetTranscript();
    if (spellsList) showSpells(false);
    SpeechRecognition.startListening({ language: "en-GB" });
  };

  // The wand glows to invite first-time visitors (see MagicHint).
  const [beckon, setBeckon] = useState(false);

  // The Harry Potter experience is driven by voice spells, so it is hidden
  // entirely on browsers without speech recognition (e.g. Firefox).
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const captionText = listening
    ? interimTranscript
      ? `“${interimTranscript}”`
      : "Listening… say a spell"
    : caption?.text;
  const captionKind = listening ? "listening" : caption?.kind;

  return (
    <div className={`adminActions ${beckon ? "beckon" : ""}`}>
      <MagicHint
        harryTheme={harryTheme}
        bookOpen={spellsList}
        onBeckon={setBeckon}
      />
      <input
        type="checkbox"
        name="adminToggle"
        className="adminToggle"
        title="Get in to the magical world"
        aria-label="Get in to the magical world"
        onClick={() => {
          stopAll();
          if (listening) SpeechRecognition.abortListening();
          resetTranscript();
          harryThemetoggle(!harryTheme);
        }}
      />
      <div className="adminButton" aria-hidden="true">
        <FaWandMagicSparkles />
      </div>
      <div className="adminButtons">
        <button
          type="button"
          title="Spell book"
          aria-label="Open the spell book"
          className="adminButton"
          onClick={() => showSpells(!spellsList)}
        >
          <GiSpellBook />
        </button>
        <button
          type="button"
          title="Wingardium leviosa"
          aria-label="Wingardium leviosa"
          className="adminButton"
          onClick={() => cast("leviosa")}
        >
          {!animatevalue ? <FaFeather /> : <TbFeatherOff />}
        </button>
        <button
          type="button"
          title="Patronus"
          aria-label="Patronus"
          aria-pressed={petronaOn}
          className="adminButton"
          onClick={() => cast("patronus")}
        >
          <GiDeer />
        </button>
        <button
          type="button"
          title={listening ? "Stop listening" : "Say a spell"}
          aria-label={listening ? "Stop listening" : "Say a spell"}
          aria-pressed={listening}
          className={`adminButton ${listening ? "listening" : ""}`}
          onClick={toggleListening}
        >
          {listening ? <FaStop /> : <FaMicrophone />}
        </button>
        <button
          type="button"
          title="Change Font Theme"
          aria-label="Change Font Theme"
          className="adminButton"
          onClick={() => changeFont(!harryFont)}
        >
          <FaFont />
        </button>
      </div>
      {harryTheme && captionText && (
        <div
          className={`spell-caption spell-caption--${captionKind}`}
          role="status"
          aria-live="polite"
        >
          {captionText}
        </div>
      )}
    </div>
  );
};

export default Index;
