import { useCallback, useContext, useEffect, useRef } from "react";
import { useSpeechRecognition } from "react-speech-recognition";
import ThemeContext from "../../../context/ThemeContext";
import { useMagic } from "../../../magic/MagicContext";
import { fadeVolume } from "../../../magic/sfx";

const FULL = 0.8;
const DUCKED = 0.2;

/**
 * The Harry Potter soundtrack. It is muted while the microphone is listening
 * (so the visitor's spell isn't drowned out), lowered while a spell plays,
 * and fades smoothly between levels.
 */
const ThemeMusic = () => {
  const { harryTheme, snapeTheme, postcardsactive, spellsList } =
    useContext(ThemeContext);
  const { activeScene } = useMagic();
  const { listening } = useSpeechRecognition();
  const audioRef = useRef(null);
  // Start silent and fade in, rather than blasting at full volume.
  const attachAudio = useCallback((el) => {
    if (el) el.volume = 0;
    audioRef.current = el;
  }, []);

  // Snape's scene and the letters scene bring their own music.
  const playing = harryTheme && !snapeTheme && !postcardsactive;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (listening) {
      fadeVolume(audio, 0, 150);
    } else if (activeScene || spellsList) {
      fadeVolume(audio, DUCKED, 600);
    } else {
      fadeVolume(audio, FULL, 1200);
    }
  }, [playing, listening, activeScene, spellsList]);

  if (!playing) return null;

  return (
    <audio
      ref={attachAudio}
      id="harryThemesong"
      src="/harrypotter.mp3"
      autoPlay
      loop
    />
  );
};

export default ThemeMusic;
