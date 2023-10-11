import React, { useContext } from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";

const Index = () => {
  const { dark, toggle, harryTheme } = useContext(ThemeContext);

  return (
    <div className="navbar-wrap">
      {/* <input type="checkbox" /> */}
      <div className="container">
        <input
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
        />
      </div>
    </div>
  );
};

export default Index;
