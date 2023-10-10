import React from "react";
import "./index.scss";
import Intro from "../../Components/Intro";
import ThemeContext from "../../context/ThemeContext";
import Details from "../../Components/Details";
import Skills from "../../Components/Skills";
import Projects from "../../Components/Projects";
import Experience from "../../Components/Experience";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }

  const gradient =
    "linear-gradient(120deg,rgba(#e0c3fc, 0.75) 0%,rgba(#8ec5fc, 0.75) 100%,)";

  return (
    <div className="home-wrap" style={{ background: dark ? "" : gradient }}>
      <div class="header">
        <div class="progress-container">
          <div
            class="progress-bar"
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
    </div>
  );
};

export default Index;
