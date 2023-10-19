import React, { useEffect } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Index = () => {
  const { dark, harryTheme } = React.useContext(ThemeContext);

  useEffect(() => {
    const el = document.getElementById("myVideo");
    if (harryTheme && el) {
      el.play();
      el.loop = true;
    }
  }, [harryTheme]);

  return (
    <>
      {harryTheme && dark && (
        <video autoPlay id="myVideo" className="harrytheme">
          <source src="/hogwarts.mp4" type="video/mp4" />
          <source src="/hogwarts1.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
      )}
    </>
  );
};

export default Index;
