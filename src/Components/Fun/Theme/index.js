import React from "react";
import hogwarts from "../../../Assets/Images/hogwartsDay.jpg";
import ThemeContext from "../../../context/ThemeContext";

const Index = () => {
  const { dark, harryTheme } = React.useContext(ThemeContext);
  return (
    <>
      {dark ? (
        <>
          <div className="bg-animation">
            <div id="stars"></div>
            <div id="stars2"></div>
            <div id="stars3"></div>
            <div id="stars4"></div>
          </div>
        </>
      ) : (
        <div
          className="bg-animation"
          style={{
            background: !harryTheme && !dark ? "white" : "unset",
            backgroundImage: harryTheme ? `url(${hogwarts})` : "unset",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
          }}
        >
          {" "}
          <div id="stars"></div>
          <div id="stars2"></div>
          <div id="stars3"></div>
          <div id="stars4"></div>
        </div>
      )}
    </>
  );
};

export default Index;
