import React, { useContext } from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Index = () => {
  const { dark, toggle, harryTheme } = useContext(ThemeContext);

  return (
    <div className="navbar-wrap">
      {/* <input type="checkbox" /> */}
      <div>
        <input type="checkbox" class="checkbox" id="checkbox" />
        <label
          for="checkbox"
          class="checkbox-label"
          onClick={() => {
            if (harryTheme) {
              let audio = new Audio("/lumos.mp3");
              audio.play();
            }
            toggle(!dark);
          }}
        >
          <FaMoon className="fa-moon" />
          <FaSun className="fa-sun" />
          <span class="ball"></span>
        </label>
      </div>
      <div className="container">
        {/* <input
          type="checkbox"
          className="toggle-button"
          onChange={() => {
            if (harryTheme) {
              let audio = new Audio("/lumos.mp3");
              audio.play();
            }
            toggle(!dark);
          }}
          checked={dark}
        /> */}
      </div>
    </div>
  );
};

export default Index;
