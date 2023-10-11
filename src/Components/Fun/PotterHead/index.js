import React, { useEffect, useState } from "react";
import "./index.css";
import ThemeContext from "../../../context/ThemeContext";
import { FaWandMagicSparkles, FaFeather, FaMicrophone } from "react-icons/fa6";
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
    engorigoToggle,
    engorgio,
  } = React.useContext(ThemeContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayinglumos, setIsPlayinglumos] = useState(false);

  const {
    transcript,
    // listening,
    // resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript === "Wingardium Leviosa") {
      animatesound();
      setIsPlaying(true);
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
        toggle(false);
        setTimeout(() => {
          setIsPlayinglumos(false);
        }, 1000);
      }, 1000);
    }
    if (
      transcript.toLocaleLowerCase().includes("expect") ||
      transcript.toLocaleLowerCase().includes("patronum")
    ) {
      petronama(true);
    }

    if (
      transcript?.toLocaleLowerCase().includes("jio") ||
      transcript?.toLocaleLowerCase().includes("gorgeous")
    ) {
      engorigoToggle(engorgio + 10);
    } else if (transcript?.toLocaleLowerCase().includes("reduc")) {
      engorigoToggle(engorgio - 10);
    }
  }, [transcript]);

  const decreaseVolume = () => {
    const audioElement = document.getElementById("music");
    if (audioElement) {
      audioElement.volume = 0.2; // Adjust the volume as needed (0.5 = 50% volume)
    }
  };

  const playMusic = () => {
    setIsPlaying(true);
    decreaseVolume();
  };

  const stopMusic = () => {
    setIsPlaying(false);
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="adminActions">
      <input
        type="checkbox"
        name="adminToggle"
        className="adminToggle"
        onMouseEnter={playMusic}
        onMouseLeave={stopMusic}
      />
      <a className="adminButton" href="#harryPotter">
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
          onClick={() => petronama(false)}
          href="#petronas"
        >
          <GiDeer />
        </a>
        <a
          title="Spells (Lumos,Nox,Wingardium,Patronus)"
          className="adminButton"
          onClick={SpeechRecognition.startListening}
          href="#listen"
        >
          <FaMicrophone />
        </a>
        {/* <a title="Edit User">
          <i className="fa fa-user-edit"></i>
        </a> */}
      </div>
      {isPlaying && (
        <audio id="music" autoPlay loop>
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
