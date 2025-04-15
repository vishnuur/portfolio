import React, { useState } from "react";

const ThemeContext = React.createContext({
  dark: false,
  toggle: () => {},
  animatevalue: false,
  animate: () => {},
  animatesound: () => {},
  animateWrong: () => {},
  castRictusempra: () => {},
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

  let audio = new Audio("/leviosa.mp3");
  let audioWrong = new Audio("/leviosawrong.mp3");
  let dementors = new Audio("/dementors.mp3");
  let expecto = new Audio("/expecto.mp3");
  let expectoFull = new Audio("/expectoFull.mp3");
  let snapeSong = new Audio("/snape.mp3");
  let snapeSound = new Audio("/snapesound.mp3");
  let iamwhat = new Audio("/iamwhat.mp3");
  let harryPost = new Audio("/harryPost.mp3");
  let spellsSound = new Audio("/spell.mp3");
  // let harrypottertheme = new Audio("/harrypotter.mp3");

  const start = () => {
    audio.play();
  };
  const startWrong = () => {
    audioWrong.play();
  };

  const toggle = (value) => {
    setDark(value);
  };

  const animate = () => {
    !animatevalue && start();
    setTimeout(() => {
      setAnimate(!animatevalue);
    }, 3000);
  };

  const animatesound = () => {
    setTimeout(() => {
      setAnimate(!animatevalue);
    }, 1000);
  };

  const petronama = ({ value, full }) => {
    setpetronaOn(value);
    if (value) {
      dementors.play();
      setTimeout(() => {
        !full ? expecto.play() : expectoFull.play();
        setTimeout(() => {
          setpetronamaLight(true);
        }, 1000);
      }, 7000);
      setTimeout(() => {
        setpetronaOn(false);
        dementors.pause();
        setpetronamaLight(false);
        value ? expecto.pause() : expectoFull.pause();
      }, 22000);
    } else {
      setpetronamaLight(false);
      dementors.pause();
      expectoFull.pause();
    }
  };

  const engorigoToggle = (value) => {
    setengorgio(value);
  };

  const animateWrong = () => {
    startWrong();
  };

  const castRictusempra = () => {
    const textElements = document.querySelectorAll(
      "p, h1, h2, h3, h4, h5, h6, span, li, a"
    );

    textElements.forEach((element) => {
      element.classList.add("wiggle-text");
    });

    // Stop wiggling after 3 seconds
    setTimeout(() => {
      textElements.forEach((element) => {
        element.classList.remove("wiggle-text");
      });
    }, 3000);
  };

  const harryThemetoggle = (value) => {
    setharryTheme(value);
  };

  const snapeThemetoggle = (value) => {
    if (value) {
      setsnapeTheme(true);
      snapeSong.play();
      snapeSong.volume = 0.5;
      setTimeout(() => {
        snapeSound.play();
        snapeSound.volume = 0.9;
      }, 70000);
      snapeSong.addEventListener("ended", function () {
        setsnapeTheme(false);
      });
    } else {
      snapeSong.pause();
      setsnapeTheme(false);
      snapeSound.pause();
    }
  };

  const postcardstoggle = (value) => {
    if (value) {
      iamwhat.play();
      setTimeout(() => {
        setpostcardsactive(value);
        harryPost.play();
        harryPost.volume = 0.3;
      }, 3000);
      iamwhat.addEventListener("ended", function () {
        setpostcardsactive(false);
      });
    } else {
      setpostcardsactive(false);
      harryPost.pause();
      iamwhat.pause();
    }
  };

  const changeFont = (value) => {
    setharryFont(value);
  };

  const showSpells = (value) => {
    setspellsList(value);
    if (value) {
      spellsSound.play();
      spellsSound.volume = 0.5;
    } else {
      spellsSound.pause();
    }
  };

  const changeDevTheme = (value) => {
    setdevTheme(!devTheme);
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
        castRictusempra,
        devTheme,
        changeDevTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
