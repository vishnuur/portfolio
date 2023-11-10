import React from "react";
import "./index.scss";
import { Fade } from "react-awesome-reveal";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark, harryTheme } = React.useContext(ThemeContext);

  return (
    <div className={FloatingClass("details", "fly-to-top0")}>
      <Fade>
        <h2
          style={{ color: dark ? "white" : "black" }}
          className={FloatingClass(
            `${harryTheme ? "text-background" : ""}`,
            ""
          )}
        >
          Results-driven and innovative ReactJS developer with over four years
          of hands-on experience. Acknowledged for my problem-solving prowess
          and leadership abilities, I excel in high-pressure environments,
          consistently delivering successful outcomes, even in the most
          demanding situations
        </h2>
      </Fade>
    </div>
  );
};

export default Index;
