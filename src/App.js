import React, { useEffect, useLayoutEffect, useState } from "react";
import "./App.css";
import "./stars.css";
import Loading from "./Components/Common/Loader";
import Navbar from "./Components/Common/Navbar";
import Home from "./Pages/Home";
import ThemeContext from "./context/ThemeContext";
import ActionButton from "./Components/Fun/PotterHead";
import Dementors from "./Components/Fun/Dementors";
import Letters from "./Components/Fun/Letters";
import Spells from "./Components/Fun/Spells";
import Petronama from "./Components/Fun/Petronama";
import Theme from "./Components/Fun/Theme";
import HarryBackgroundVideo from "./Components/Fun/HarryBackgroundVideo";

import ReactRain from "react-rain-animation";

import "react-rain-animation/lib/style.css";

export const UserContext = React.createContext();

function App() {
  const { engorgio, harryTheme, snapeTheme, harryFont } =
    React.useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [rainCount, setrainCount] = useState(0);

  useEffect(() => {
    const incrementCount = () => {
      if (snapeTheme) {
        setrainCount((prevCount) => prevCount + 10);
      } else {
        setrainCount(0);
      }
    };
    const intervalId = setInterval(incrementCount, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, [snapeTheme]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loading />;
  return (
    <div
      className={`App ${harryFont ? "custom-font-harrypotter" : ""}`}
      style={{ fontSize: `${engorgio}px` }}
    >
      <Letters />
      <Spells />
      <Navbar />
      <Dementors />
      <Petronama />
      <Theme />
      <div style={{ position: "relative", width: "100vw" }}>
        <HarryBackgroundVideo />
        <Home />
      </div>
      <ActionButton />
      {snapeTheme && harryTheme && (
        <ReactRain numDrops={rainCount.toString()} />
      )}
    </div>
  );
}

export default App;
