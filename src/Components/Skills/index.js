import React from "react";
import "./index.scss";
import gitlab from "../../Assets/Images/gitlab.png";
import html from "../../Assets/Images/html.png";
import javascript from "../../Assets/Images/javascript.png";
import typescript from "../../Assets/Images/typescript.png";
import css from "../../Assets/Images/css.png";
import material from "../../Assets/Images/material.png";
import reactjs from "../../Assets/Images/reactjs.png";
import redux from "../../Assets/Images/redux.png";
import sass from "../../Assets/Images/sass.png";
import tailwind from "../../Assets/Images/tailwind.png";
import azure from "../../Assets/Images/azure.png";
import antd from "../../Assets/Images/antd.svg";
import { SiNextdotjs, SiGithub } from "react-icons/si";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);

  const colorCode = dark ? "white" : "black";

  return (
    <div className="skills-wrap">
      <h5 className={FloatingClass("", "fly-to-top3")}>My Skills</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        I like to take responsibility to craft aesthetic user experience using
        modern frontend architecture
      </h6>
      <p
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        LANGUAGE AND TOOLS
      </p>
      <div className="langauges">
        <img
          src={javascript}
          alt="javascript"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={typescript}
          alt="typescript"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={html}
          alt="html"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img src={css} alt="css" className={FloatingClass("", "fly-to-top3")} />
        <img
          src={sass}
          alt="sass"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={redux}
          alt="redux"
          className={FloatingClass("", "fly-to-top3")}
        />
        <SiGithub
          fill={colorCode}
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={gitlab}
          alt="gitlab"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={azure}
          alt="azure"
          className={FloatingClass("", "fly-to-top3")}
        />
      </div>
      <p
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        LIBRARIES AND FRAMEWORKS
      </p>
      <div className="langauges">
        <img
          src={reactjs}
          alt="reactjs"
          className={FloatingClass("", "fly-to-top3")}
        />
        <SiNextdotjs
          fill={colorCode}
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={material}
          alt="material"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={tailwind}
          alt="tailwind"
          className={FloatingClass("", "fly-to-top3")}
        />
        <img
          src={antd}
          alt="antd"
          className={FloatingClass("", "fly-to-top3")}
        />
      </div>
    </div>
  );
};

export default Index;
