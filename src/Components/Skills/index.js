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
import vite from "../../Assets/Images/Vitejs.webp";
import vitest from "../../Assets/Images/vitest.svg";
import jest from "../../Assets/Images/jest.svg";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

import { SiNextdotjs, SiGithub } from "react-icons/si";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);

  const colorCode = dark ? "white" : "black";

  const dataSkills = {
    tools: [
      { id: "javascript", name: "JavaScript", image: javascript },
      { id: "typescript", name: "TypeScript", image: typescript },
      { id: "html", name: "HTML", image: html },
      { id: "css", name: "CSS", image: css },
      { id: "scss", name: "SCSS", image: sass },
      { id: "redux", name: "Redux", image: redux },
      { id: "azure", name: "Azure", image: azure },
      { id: "gitlab", name: "GitLab", image: gitlab },
    ],
    library: [
      { id: "reactjs", name: "ReactJS", image: reactjs },
      { id: "material", name: "MaterialUI", image: material },
      { id: "antd", name: "Ant Design", image: antd },
      { id: "tailwind", name: "Tailwind CSS", image: tailwind },
      { id: "vite", name: "Vite", image: vite },
      { id: "vitest", name: "Vitest", image: vitest },
      { id: "jest", name: "Jest", image: jest },
    ],
  };

  const combinedSkills = [...dataSkills.tools, ...dataSkills.library];

  return (
    <div className="skills-wrap" id="skills-id">
      <h5 className={FloatingClass("", "fly-to-top3")}>My Skills</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        I'm dedicated to staying current with emerging technologies and best
        practices, ensuring that every project I work on is at the forefront of
        modern web development.
      </h6>
      <p
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        LANGUAGE AND TOOLS
      </p>
      <div className="langauges">
        {dataSkills.tools.map((res) => (
          <a
            data-tooltip-id={res.id}
            data-tooltip-content={res.name}
            href={res.id}
          >
            <img
              src={res.image}
              alt={res.id}
              className={FloatingClass("", "fly-to-top3")}
            />
          </a>
        ))}
        <a data-tooltip-id="github" data-tooltip-content="GitHub" href="github">
          <SiGithub
            fill={colorCode}
            className={FloatingClass("", "fly-to-top3")}
          />
        </a>
      </div>
      <p
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top3")}
      >
        LIBRARIES AND FRAMEWORKS
      </p>
      <div className="langauges">
        <a data-tooltip-id="nextjs" data-tooltip-content="NextJS" href="nextjs">
          <SiNextdotjs
            fill={colorCode}
            className={FloatingClass("", "fly-to-top3")}
          />
        </a>
        {dataSkills.library.map((res) => (
          <a
            data-tooltip-id={res.id}
            data-tooltip-content={res.name}
            href={res.id}
          >
            <img
              src={res.image}
              alt={res.id}
              className={FloatingClass("", "fly-to-top3")}
            />
          </a>
        ))}
      </div>
      {combinedSkills?.map((res) => (
        <Tooltip id={res.id} />
      ))}
      <Tooltip id="github" />
      <Tooltip id="nextjs" />
    </div>
  );
};

export default Index;
