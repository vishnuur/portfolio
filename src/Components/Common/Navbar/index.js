import React, { useContext } from "react";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { CodeFilled } from "@ant-design/icons";
// import festive from "../../../Assets/Images/festive.png";

const navbarContent = [
  {
    name: "Home",
    id: "home-id",
  },
  {
    name: "About",
    id: "about-id",
  },
  {
    name: "Skills",
    id: "skills-id",
  },
  {
    name: "Projects",
    id: "projects-id",
  },
  {
    name: "Experience",
    id: "experience-id",
  },
  {
    name: "Contact",
    id: "contact-id",
  },
];
const Index = () => {
  const { dark, toggle, harryTheme, changeDevTheme } = useContext(ThemeContext);

  const handleClick = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="navbar-wrap">
      {/* <img src={festive} alt="festival" className="festive" /> */}

      <div className="navbar-left">
        <div>
          <input type="checkbox" className="checkbox" id="checkbox" />
          <label
            htmlFor="checkbox"
            className="checkbox-label"
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
            <span className="ball"></span>
          </label>
        </div>
        <span className="coder-wrap" onClick={() => changeDevTheme()} title="Developer mode">
          <CodeFilled />
        </span>
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
      <div className="navbar-content">
        {navbarContent?.map((res) => (
          <button
            style={{ color: dark ? "white" : "black" }}
            onClick={() => handleClick(res.id)}
          >
            {res.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Index;
