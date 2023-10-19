import React from "react";
import letterpad from "../../../Assets/Images/letterpad.webp";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";
import Sparks from "./sparks";

const Index = () => {
  const { spellsList, harryTheme, showSpells } = React.useContext(ThemeContext);

  return (
    <div
      className={`letterpad-wrap ${spellsList && harryTheme ? "active" : ""}`}
      onClick={() => showSpells(false)}
    >
      <img
        src={letterpad}
        alt="letterpad"
        className={`letterpad ${spellsList && harryTheme ? "active" : ""}`}
      />
      <ul
        className={`custom-font-harrypotter listofspells ${
          spellsList && harryTheme ? "active" : ""
        }`}
      >
        <li>Wingardium Leviosa</li>
        <li>Expecto petronam</li>
        <li>Lumos</li>
        <li>Knox</li>
        <li>After all this time</li>
        <li>You're a wizard Harry</li>
      </ul>
      <Sparks />
    </div>
  );
};

export default Index;
