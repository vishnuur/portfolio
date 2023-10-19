import React, { useEffect, useState } from "react";
import ThemeContext from "../../../context/ThemeContext";

const Index = () => {
  const { petronaOn, petronamaLight } = React.useContext(ThemeContext);
  const [removeFlash, setremoveFlash] = useState(true);

  useEffect(() => {
    if (petronaOn) {
      setremoveFlash(false);
    } else {
      setTimeout(() => {
        setremoveFlash(true);
      }, 3000);
    }
  }, [petronaOn]);

  return (
    <>
      {!removeFlash && (
        <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
          <div className="flashlight-beam"></div>
        </div>
      )}
      {petronaOn && (
        <>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam1"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam2"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam3"></div>
          </div>
          <div className={`flashlight ${petronamaLight ? "on" : ""}`}>
            <div className="flashlight-beam beam4"></div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
