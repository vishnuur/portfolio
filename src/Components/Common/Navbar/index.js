import React, { useContext, useState } from "react";
import "./index.scss";
import ThemeContext from "../../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useMagic } from "../../../magic/MagicContext";
import HOUSES from "../../../magic/houses";
import Crest from "../../Fun/SortingHat/Crest";
// Developer mode entry is work in progress, hidden for now.
// import DeveloperIcon from "../../../Assets/Images/developerIcon.png";
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
  const { dark, toggle, harryTheme } = useContext(ThemeContext);
  const { magic, cast } = useMagic();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClick = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleThemeChange = () => {
    if (harryTheme) {
      new Audio("/lumos.mp3").play().catch(() => {});
    }
    toggle(!dark);
  };

  return (
    <nav className={`navbar-wrap ${dark ? "navbar-dark" : "navbar-light"}`}>
      {/* <img src={festive} alt="festival" className="festive" /> */}

      <div className="navbar-left">
        <div>
          <input
            type="checkbox"
            className="checkbox"
            id="checkbox"
            checked={!dark}
            onChange={handleThemeChange}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <FaMoon className="fa-moon" />
            <FaSun className="fa-sun" />
            <span className="ball"></span>
          </label>
        </div>
        {harryTheme && magic.house && (
          <button
            type="button"
            className="house-badge"
            title={`${HOUSES[magic.house]?.name}: click to be sorted again`}
            aria-label={`Your house is ${HOUSES[magic.house]?.name}. Be sorted again`}
            onClick={() => cast("sorting")}
          >
            <Crest house={magic.house} size={30} />
          </button>
        )}
        {/* Developer mode entry: work in progress, hidden for now.
        <span className="coder-wrap" onClick={() => changeDevTheme()} title="Developer mode">
          <img src={DeveloperIcon} alt="Developer mode" style={{ width: "120px" }} />
        </span> */}
      </div>
      <button
        type="button"
        className="navbar-menu-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <FaXmark /> : <FaBars />}
      </button>
      <div className={`navbar-content ${menuOpen ? "open" : ""}`}>
        {navbarContent.map((res) => (
          <button
            type="button"
            key={res.id}
            onClick={() => handleClick(res.id)}
          >
            {res.name}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Index;
