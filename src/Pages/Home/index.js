import React from "react";
import "./index.scss";
import Intro from "../../Components/Intro";
import ThemeContext from "../../context/ThemeContext";
import Details from "../../Components/Details";
import Skills from "../../Components/Skills";
import Projects from "../../Components/Projects";
import Experience from "../../Components/Experience";
import Social from "../../Components/Social";

const Index = () => {
  const { dark, spellsList, harryTheme } = React.useContext(ThemeContext);

  const gradient =
    "linear-gradient(120deg, rgba(224, 195, 252, 0.75) 0%, rgba(142, 197, 252, 0.75) 100%)";

  return (
    <div
      className={`home-wrap ${spellsList ? "blur-screen" : ""}`}
      // In Harry Potter light mode the Hogwarts backdrop shows instead.
      style={{ background: dark || harryTheme ? "" : gradient }}
    >
      <div className="header">
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ background: dark ? "white" : "black" }}
            id="myBar"
          ></div>
        </div>
      </div>
      <Intro />
      <Details />
      <Skills />
      <Projects />
      <Experience />
      <Social />
    </div>
  );
};

export default Index;
