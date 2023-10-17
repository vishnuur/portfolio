import React, { useEffect, useState } from "react";
import "./index.css";
import ThemeContext from "../../../context/ThemeContext";
import {
  FaWandMagicSparkles,
  FaFeather,
  FaMicrophone,
  FaStop,
  FaFont,
} from "react-icons/fa6";
import { GiDeer } from "react-icons/gi";
import { TbFeatherOff } from "react-icons/tb";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Index = () => {
  const {
    animate,
    animatevalue,
    animatesound,
    animateWrong,
    toggle,
    petronama,
    petronaOn,
    engorigoToggle,
    engorgio,
    harryTheme,
    harryThemetoggle,
    snapeThemetoggle,
    snapeTheme,
    postcardsactive,
    postcardstoggle,
    changeFont,
    harryFont,
    showSpells,
    spellsList,
  } = React.useContext(ThemeContext);
  // const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayinglumos, setIsPlayinglumos] = useState(false);
  const [hideAction, sethideAction] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript === "Wingardium Leviosa") {
      animatesound();
      // setIsPlaying(true);
    } else if (
      (transcript?.toLocaleLowerCase().includes("leviosa") ||
        transcript?.toLocaleLowerCase().includes("wingardium")) &&
      transcript?.length > 13
    ) {
      animateWrong();
    }
    if (transcript.toLocaleLowerCase() === "lumos") {
      setIsPlayinglumos(true);
      setTimeout(() => {
        toggle(false);
        setTimeout(() => {
          setIsPlayinglumos(false);
        }, 1000);
      }, 1000);
    }
    if (transcript.toLocaleLowerCase().includes("nox")) {
      setIsPlayinglumos(true);
      setTimeout(() => {
        toggle(true);
        setTimeout(() => {
          setIsPlayinglumos(false);
        }, 1000);
      }, 1000);
    }
    if (
      transcript.toLocaleLowerCase().includes("expect") ||
      transcript.toLocaleLowerCase().includes("patronum")
    ) {
      petronama({ value: true, full: true });
    }

    if (
      transcript?.toLocaleLowerCase().includes("jio") ||
      transcript?.toLocaleLowerCase().includes("gorgeous")
    ) {
      engorigoToggle(engorgio + 20);
    } else if (transcript?.toLocaleLowerCase().includes("reduc")) {
      engorigoToggle(engorgio - 20);
    }

    if (transcript?.toLocaleLowerCase().includes("all this time")) {
      snapeThemetoggle(true);
    }

    if (
      transcript?.toLocaleLowerCase().includes("you are a wizard") ||
      transcript?.toLocaleLowerCase().includes("you're a wizard") ||
      transcript?.toLocaleLowerCase().includes("are a wizard")
    ) {
      postcardstoggle(true);
    }
    if (
      transcript?.toLocaleLowerCase().includes("reveal") ||
      transcript?.toLocaleLowerCase().includes("revealio")
    ) {
      showSpells(true);
    }
  }, [transcript]);

  useEffect(() => {
    const el = document.getElementById("harryThemesong");
    if (el) {
      if (
        petronaOn ||
        animatevalue ||
        isPlayinglumos ||
        listening ||
        spellsList
      ) {
        el.volume = 0.2;
      } else {
        setTimeout(() => {
          el.volume = 0.8;
        }, 2000);
      }
    }
  }, [petronaOn, animatevalue, listening, isPlayinglumos, spellsList]);

  useEffect(() => {
    if (animatevalue) {
      setTimeout(() => {
        sethideAction(true);
      }, 2000);
      setTimeout(() => {
        sethideAction(false);
      }, 8000);
    }
  }, [animatevalue]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div
      className="adminActions"
      style={{ display: hideAction ? "none" : "inline" }}
    >
      <input
        type="checkbox"
        name="adminToggle"
        className="adminToggle"
        onClick={() => {
          harryThemetoggle(!harryTheme);
          petronama({ value: false, full: false });
          snapeThemetoggle(false);
          postcardstoggle(false);
          resetTranscript();
          animatevalue && animate();
          showSpells(false);
        }}
      />
      <a
        title="Get in to the magical world"
        className="adminButton"
        href="#harryPotter"
      >
        <FaWandMagicSparkles />
      </a>
      <div className="adminButtons">
        <a
          title="Wingardium leviosa"
          className="adminButton"
          onClick={() => animate()}
          href="#wingardium"
        >
          {!animatevalue ? <FaFeather /> : <TbFeatherOff />}
        </a>
        <a
          title="Patronus"
          className="adminButton"
          onClick={() =>
            !petronaOn
              ? petronama({ value: true, full: true })
              : petronama({ value: false, full: false })
          }
          href="#petronas"
        >
          <GiDeer />
        </a>
        <a
          title="Spells (Spell Revelio for list of spells)"
          className="adminButton"
          onClick={
            listening
              ? SpeechRecognition.abortListening
              : SpeechRecognition.startListening
          }
          href="#listen"
        >
          {listening ? <FaStop /> : <FaMicrophone />}
        </a>
        <a
          title="Change Font Theme"
          className="adminButton"
          href="#changefont"
          onClick={() => changeFont(!harryFont)}
        >
          <FaFont />
        </a>
        <a
          title="Spells"
          className="adminButton"
          href="#spells"
          onClick={() => showSpells(!spellsList)}
        >
          <FaWandMagicSparkles />
        </a>
      </div>
      {harryTheme && !snapeTheme && !postcardsactive && (
        <audio id="harryThemesong" autoPlay loop>
          <source src="/harrypotter.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
      {isPlayinglumos && (
        <audio id="music1" autoPlay>
          <source src="/lumos.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default Index;
