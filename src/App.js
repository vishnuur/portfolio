import React, { useEffect, useState } from "react";
import "./App.css";
import "./stars.css";
import "./sky.scss";
import Loading from "./Components/Common/Loader";
import Navbar from "./Components/Common/Navbar";
import Home from "./Pages/Home";
import ThemeContext from "./context/ThemeContext";
import ActionButton from "./Components/Fun/PotterHead";
import Letters from "./Components/Fun/Letters";
import Spells from "./Components/Fun/Spells";
import Patronus from "./Components/Fun/Patronus";
import Leviosa from "./Components/Fun/Leviosa";
import ThemeMusic from "./Components/Fun/ThemeMusic";
import WandLight from "./Components/Fun/WandLight";
import Accio from "./Components/Fun/Accio";
import MaraudersMap from "./Components/Fun/MaraudersMap";
import SortingHat from "./Components/Fun/SortingHat";
import PriorIncantato from "./Components/Fun/PriorIncantato";
import "./styles/houses.scss";
import Theme from "./Components/Fun/Theme";
import HarryBackgroundVideo from "./Components/Fun/HarryBackgroundVideo";
// import Festive from "./Components/Common/Festive";

import ReactRain from "react-rain-animation";

import "react-rain-animation/lib/style.css";
import { Analytics } from "@vercel/analytics/react";
import DevMode from "./Pages/DevMode";

export const UserContext = React.createContext();

function App() {
  const { engorgio, harryTheme, snapeTheme, harryFont, devTheme } =
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

  // Hide the loader as soon as the page has loaded (with a short minimum so
  // it doesn't flash), and never keep it longer than the old 2s.
  useEffect(() => {
    const MIN_MS = 400;
    const MAX_MS = 2000;
    const startedAt = Date.now();
    let minTimer;
    const finish = () => {
      const remaining = Math.max(0, MIN_MS - (Date.now() - startedAt));
      minTimer = setTimeout(() => setLoading(false), remaining);
    };
    const maxTimer = setTimeout(() => setLoading(false), MAX_MS);
    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }
    return () => {
      clearTimeout(minTimer);
      clearTimeout(maxTimer);
      window.removeEventListener("load", finish);
    };
  }, []);

  if (loading) return <Loading />;
  return (
    <div
      className={`App ${harryFont ? "custom-font-harrypotter" : ""}`}
      style={{ fontSize: `${engorgio}px` }}
    >
      {devTheme ? (
        <DevMode />
      ) : (
        <>
          {/* <Festive /> */}
          {/* <div className="pyro">
        <div className="before"></div>
        <div className="after"></div>
      </div> */}
          <Navbar />
          <Letters />
          <Spells />
          <Patronus />
          <Leviosa />
          <WandLight />
          <Accio />
          <MaraudersMap />
          <SortingHat />
          <PriorIncantato />

          <Theme />
          <div style={{ position: "relative", width: "100%" }}>
            <HarryBackgroundVideo />
            <Home />
          </div>
          <ActionButton />
          <ThemeMusic />
          {snapeTheme && harryTheme && (
            <ReactRain numDrops={rainCount.toString()} />
          )}
        </>
      )}
      <Analytics />
    </div>
  );
}

export default App;
