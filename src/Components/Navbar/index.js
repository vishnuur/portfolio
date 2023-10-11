import React, { useContext } from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";

const Index = () => {
  const { dark, toggle } = useContext(ThemeContext);

  return (
    <div className="navbar-wrap">
      {/* <input type="checkbox" /> */}
      <div className="container">
        <input
          type="checkbox"
          className="toggle-button"
          onChange={() => {
            toggle(!dark);
          }}
          checked={dark}
        />
      </div>
    </div>
  );
};

export default Index;
