import React, { useEffect, useRef, useState } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
  animatevalue: false,
  animate: () => {},
  animatesound: () => {},
  animateWrong: () => {},
  petronama: () => {},
  petronamaLight: false,
  petronaOn: false,
  engorigoToggle: () => {},
  engorgio: 16,
  harryThemetoggle: () => {},
  harryTheme: false,
  snapeThemetoggle: () => {},
  snapeTheme: false,
  postcardstoggle: () => {},
  postcardsactive: false,
  changeFont: () => {},
  harryFont: false,
  showSpells: () => {},
  spellsList: false,
});

export default ThemeContext;

const SOUND_FILES = {
  leviosa: "/leviosa.mp3",
  leviosaWrong: "/leviosawrong.mp3",
  dementors: "/dementors.mp3",
  expecto: "/expecto.mp3",
  expectoFull: "/expectoFull.mp3",
  snapeSong: "/snape.mp3",
  snapeSound: "/snapesound.mp3",
  iamwhat: "/iamwhat.mp3",
  harryPost: "/harryPost.mp3",
  spells: "/spell.mp3",
};

export function ThemeProvider(props) {
  const [dark, setDark] = useState(true);
  const [animatevalue, setAnimate] = useState(false);
  const [petronaOn, setpetronaOn] = useState(false);
  const [engorgio, setengorgio] = useState(16);
  const [petronamaLight, setpetronamaLight] = useState(false);
  const [harryTheme, setharryTheme] = useState(false);
  const [snapeTheme, setsnapeTheme] = useState(false);
  const [postcardsactive, setpostcardsactive] = useState(false);
  const [harryFont, setharryFont] = useState(false);
  const [spellsList, setspellsList] = useState(false);
  const [devTheme, setdevTheme] = useState(false);

  // Each sound is created once and reused, so pausing a sound stops the
  // instance that is actually playing.
  const soundsRef = useRef(null);
  const getSound = (name) => {
    if (!soundsRef.current) soundsRef.current = {};
    if (!soundsRef.current[name]) {
      soundsRef.current[name] = new Audio(SOUND_FILES[name]);
    }
    return soundsRef.current[name];
  };
  const play = (name, volume) => {
    const sound = getSound(name);
    if (volume !== undefined) sound.volume = volume;
    sound.play().catch(() => {});
    return sound;
  };
  const stop = (...names) => {
    names.forEach((name) => {
      const sound = soundsRef.current?.[name];
      if (sound) {
        sound.pause();
        sound.currentTime = 0;
      }
    });
  };

  // Pending timers per effect, so turning an effect off cancels them.
  const timersRef = useRef({});
  const addTimer = (group, fn, ms) => {
    const id = setTimeout(fn, ms);
    (timersRef.current[group] ||= []).push(id);
  };
  const clearTimers = (group) => {
    (timersRef.current[group] || []).forEach(clearTimeout);
    timersRef.current[group] = [];
  };

  useEffect(() => {
    const timers = timersRef.current;
    const sounds = soundsRef;
    return () => {
      Object.values(timers).flat().forEach(clearTimeout);
      Object.values(sounds.current || {}).forEach((sound) => sound.pause());
    };
  }, []);

  const toggle = (value) => {
    setDark(value);
  };

  // Wingardium Leviosa: things lift off once the incantation has been said,
  // and land again as soon as the spell is released.
  const castLeviosa = (liftDelayMs) => {
    clearTimers("leviosa");
    if (animatevalue) {
      setAnimate(false);
    } else {
      addTimer("leviosa", () => setAnimate(true), liftDelayMs);
    }
  };

  const animate = () => {
    if (!animatevalue) play("leviosa");
    castLeviosa(3000);
  };

  // Voice-cast: the user has just said the incantation themselves.
  const animatesound = () => castLeviosa(1000);

  const petronama = ({ value, full }) => {
    clearTimers("petronus");
    if (value) {
      setpetronaOn(true);
      play("dementors");
      addTimer(
        "petronus",
        () => {
          play(full ? "expectoFull" : "expecto");
          addTimer("petronus", () => setpetronamaLight(true), 1000);
        },
        7000
      );
      addTimer(
        "petronus",
        () => {
          setpetronaOn(false);
          setpetronamaLight(false);
          stop("dementors", "expecto", "expectoFull");
        },
        22000
      );
    } else {
      setpetronaOn(false);
      setpetronamaLight(false);
      stop("dementors", "expecto", "expectoFull");
    }
  };

  const engorigoToggle = (value) => {
    setengorgio(value);
  };

  const animateWrong = () => {
    play("leviosaWrong");
  };

  const harryThemetoggle = (value) => {
    setharryTheme(value);
  };

  const snapeThemetoggle = (value) => {
    clearTimers("snape");
    if (value) {
      setsnapeTheme(true);
      const song = play("snapeSong", 0.5);
      song.onended = () => {
        setsnapeTheme(false);
        stop("snapeSound");
      };
      addTimer("snape", () => play("snapeSound", 0.9), 70000);
    } else {
      setsnapeTheme(false);
      stop("snapeSong", "snapeSound");
    }
  };

  const postcardstoggle = (value) => {
    clearTimers("postcards");
    if (value) {
      play("iamwhat");
      addTimer(
        "postcards",
        () => {
          setpostcardsactive(true);
          // The letter rain lasts as long as its music (~16s).
          const music = play("harryPost", 0.3);
          music.onended = () => setpostcardsactive(false);
        },
        3000
      );
    } else {
      setpostcardsactive(false);
      stop("harryPost", "iamwhat");
    }
  };

  const changeFont = (value) => {
    setharryFont(value);
  };

  const showSpells = (value) => {
    setspellsList(value);
    if (value) {
      play("spells", 0.5);
    } else {
      stop("spells");
    }
  };

  const changeDevTheme = () => {
    setdevTheme((value) => !value);
  };

  return (
    <ThemeContext.Provider
      value={{
        dark,
        toggle,
        animatevalue,
        animate,
        animatesound,
        animateWrong,
        petronama,
        petronamaLight,
        petronaOn,
        engorigoToggle,
        engorgio,
        harryTheme,
        harryThemetoggle,
        snapeThemetoggle,
        snapeTheme,
        postcardstoggle,
        postcardsactive,
        changeFont,
        harryFont,
        showSpells,
        spellsList,
        devTheme,
        changeDevTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
