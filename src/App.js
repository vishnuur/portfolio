import "./App.css";
import "./stars.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import ActionButton from "./Components/Fun/PotterHead";
import Dementors from "./Components/Fun/Dementors";
import Loading from "./Components/Loader";
import hogwarts from "./Assets/Images/hogwartsDay.jpg";
import ReactRain from "react-rain-animation";

import "react-rain-animation/lib/style.css";

export const UserContext = React.createContext();
function App() {
  const { dark, petronaOn, engorgio, petronamaLight, harryTheme, snapeTheme } =
    React.useContext(ThemeContext);
  const [loading, setLoading] = useState(true);
  const [removeFlash, setremoveFlash] = useState(true);
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

  useEffect(() => {
    const el = document.getElementById("myVideo");
    if (harryTheme && el) {
      el.play();
      el.loop = true;
    }
  }, [harryTheme]);

  useEffect(() => {
    if (petronaOn) {
      setremoveFlash(false);
    } else {
      setTimeout(() => {
        setremoveFlash(true);
      }, 3000);
    }
  }, [petronaOn]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  console.log(rainCount.toString(), "raincount");
  if (loading) return <Loading />;
  return (
    <div className="App" style={{ fontSize: `${engorgio}px` }}>
      {snapeTheme && <ReactRain numDrops={rainCount.toString()} />}
      <Navbar />
      <Dementors />

      {!removeFlash && (
        <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
          <div className="flashlight-beam"></div>
        </div>
      )}
      {petronaOn && (
        <>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam1"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam2"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam3"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam4"></div>
          </div>
        </>
      )}
      {dark ? (
        <>
          <div className="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </>
      ) : (
        <div
          className="bg-animation"
          style={{
            background: !harryTheme ? "white" : "unset",
            backgroundImage: harryTheme ? `url(${hogwarts})` : "unset",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {" "}
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
      )}
      <div style={{ position: "relative", width: "100vw" }}>
        {harryTheme && dark && (
          <video autoplay id="myVideo" className="harrytheme">
            <source src="/hogwarts.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        )}
        <Home />
      </div>
      <ActionButton />
    </div>
  );
}

export default App;
