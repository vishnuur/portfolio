import "./App.css";
import "./stars.css";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import React from "react";
import ThemeContext from "./context/ThemeContext";
import ActionButton from "./Components/Fun/PotterHead";
import Dementors from "./Components/Fun/Dementors";
import "font-awesome/css/font-awesome.min.css"; // This is the path to the FontAwesome CSS file

export const UserContext = React.createContext();
function App() {
  const { dark, petronaOn, engorgio, petronamaLight } =
    React.useContext(ThemeContext);

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
      <Home />
      <ActionButton />
    </div>
  );
}

export default App;
