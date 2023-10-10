import React, { useState, useLayoutEffect } from "react";

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
});

export default ThemeContext;

export function ThemeProvider(props) {
  // keeps state of the current chosen theme
  const [dark, setDark] = useState(window.localStorage.getItem("darkTheme"));
  const [animatevalue, setAnimate] = useState(false);
  const [petronaOn, setpetronaOn] = useState(false);
  const [engorgio, setengorgio] = useState(16);
  const [petronamaLight, setpetronamaLight] = useState(false);

  let audio = new Audio("/leviosa.mp3");
  let audioWrong = new Audio("/leviosawrong.mp3");
  let dementors = new Audio("/dementors.mp3");
  let expecto = new Audio("/expecto.mp3");
  let expectoFull = new Audio("/expectoFull.mp3");

  const start = () => {
    audio.play();
  };
  const startWrong = () => {
    audioWrong.play();
  };

  // paints the app before it renders elements
  useLayoutEffect(() => {
    const lastTheme = window.localStorage.getItem("darkTheme");

    if (lastTheme === "true") {
      setDark(false);
      applyTheme(lightTheme);
    }

    if (!lastTheme || lastTheme === "false") {
      setDark(true);
      applyTheme(darkTheme);
    }
    // if state changes, repaints the app
  }, [dark]);

  const applyTheme = (theme) => {
    const root = document.getElementsByTagName("html")[0];
    root.style.cssText = theme.join(";");
  };

  const toggle = (value) => {
    if (value) {
      setDark(value);
    } else {
      setDark(!dark);
    }
    window.localStorage.setItem("darkTheme", !dark);
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
    setpetronaOn(!petronaOn);
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
  };

  const engorigoToggle = (value) => {
    setengorgio(value);
  };

  const animateWrong = () => {
    startWrong();
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
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

// styles
const lightTheme = [
  "--border: rgba(0,0,0,.2)",
  "--shadow: #000",
  "--heading: rgba(255,100,0,1)",
  "--main: #1d8f13",
  "--text: #000",
  "--textAlt: #fff",
  "--inactive: rgba(0,0,0,.3)",
  "--background: #fff",
];

const darkTheme = [
  "--border: rgba(255,255,255,.1)",
  "--shadow: #000",
  "--heading: rgba(255,255,5,.9)",
  "--main: #79248f",
  "--text: rgb(255, 255, 255)",
  "--textAlt: #fff",
  "--inactive: rgba(255,255,255,.3)",
  "--background: #2D2D2D",
];
