import "./App.css";
import "./stars.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import React, { useEffect, useLayoutEffect, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import ActionButton from "./Components/Fun/PotterHead";
import Dementors from "./Components/Fun/Dementors";
import Loading from "./Components/Loader";
export const UserContext = React.createContext();
function App() {
  const { dark, petronaOn, engorgio, petronamaLight, harryTheme } =
    React.useContext(ThemeContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const el = document.getElementById("myVideo");
    if (harryTheme && el) {
      el.play();
      el.loop = true;
    }
  }, [harryTheme]);

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="App" style={{ fontSize: `${engorgio}px` }}>
      <Navbar />

      <Dementors />

      {/*{petronaOn && (*/}
      <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
        <div className="flashlight-beam"></div>
      </div>
      {/*)}*/}
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
      {dark && (
        <>
          <div className="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </>
      )}
      <div style={{ position: "relative", width: "100vw" }}>
        {harryTheme && (
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
