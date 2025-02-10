import React from "react";
import "./index.scss";
import { Fade } from "react-awesome-reveal";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark, harryTheme } = React.useContext(ThemeContext);

  const startDate = new Date(2019, 9); // October 2019 (Month is 0-indexed)
  const currentDate = new Date();
  const experienceYears = currentDate.getFullYear() - startDate.getFullYear();
  const isBeforeOctober = currentDate.getMonth() < startDate.getMonth();
  const totalExperience = isBeforeOctober ? experienceYears - 1 : experienceYears;

  return (
    <div id="about-id" className={FloatingClass("details", "fly-to-top0")}>
      <Fade>
        <h2
          style={{ color: dark ? "white" : "black" }}
          className={FloatingClass(
            `${harryTheme ? "text-background" : ""}`,
            ""
          )}
        >
          Results-driven and innovative ReactJS developer with over {totalExperience} years
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
