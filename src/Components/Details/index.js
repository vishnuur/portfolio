import React from "react";
import "./index.scss";
import Fade from "react-reveal/Fade";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);

  return (
    <div className={FloatingClass("details", "fly-to-top0")}>
      <Fade>
        <h2 style={{ color: dark ? "white" : "black" }}>
          Attentive and creative developer with 4 years' experience in ReactJS.
          Recognized problem solver and team leader. Thrives under pressure,
          driving success even in challenging situations.
        </h2>
      </Fade>
    </div>
  );
};

export default Index;
