import React, { useState } from "react";

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

  let audio = new Audio("/leviosa.mp3");
  let audioWrong = new Audio("/leviosawrong.mp3");
  let dementors = new Audio("/dementors.mp3");
  let expecto = new Audio("/expecto.mp3");
  let expectoFull = new Audio("/expectoFull.mp3");
  let snapeSong = new Audio("/snape.mp3");
  let snapeSound = new Audio("/snapesound.mp3");
  let iamwhat = new Audio("/iamwhat.mp3");
  let harryPost = new Audio("/harryPost.mp3");
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

  const petronama = (value) => {
    setpetronaOn(value);
    if (value) {
      dementors.play();
      setTimeout(() => {
        value ? expecto.play() : expectoFull.play();
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

  const harryThemetoggle = (value) => {
    setharryTheme(value);
  };

  const snapeThemetoggle = (value) => {
    setsnapeTheme(value);
    if (value) {
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
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
