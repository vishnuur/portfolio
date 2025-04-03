import React, { lazy, Suspense, useEffect, useState } from "react";
import "./index.scss"; // ✅ Keep styles at the top
import "./modal.scss"; // ✅ Keep styles at the top
import "./newModal.scss"; // ✅ Keep styles at the top

import ThemeContext from "../../context/ThemeContext"; // ✅ Context at the top
import FloatingClass from "../../context/utils"; // ✅ Utility functions at the top
import expList from "./dataFile"; // ✅ Data files at the top

const Modal = lazy(() => import("./modal")); // ✅ Lazy loading after all imports

const Index = () => {
  const { dark } = React.useContext(ThemeContext);
  const [modalClass, setModalClass] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedData, setselectedData] = useState(expList[0]);

  useEffect(() => {
    const handleScroll = (e) => {
      if (isModalActive) {
        e.preventDefault();
      }
    };
    if (isModalActive) {
      document.body.style.overflow = "hidden";
      window.addEventListener("scroll", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("scroll", handleScroll);
    }
    return () => {
      // Clean up event listener when component unmounts
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isModalActive]);

  const handleButtonClick = (e, data, i) => {
    e.preventDefault();
    e.stopPropagation();
    setselectedData({ ...data, indexVal: i });
    const buttonId = e.target.id;
    setModalClass(buttonId);
    setIsModalActive(true);
  };

  const handleModalContainerClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setModalClass("out");
    setIsModalActive(false);
  };

  const colorCode = dark ? "white" : "black";

  const cardElements = [];
  for (let i = 0; i < expList?.length; i++) {
    cardElements.push(
      <div className={FloatingClass("box card", "fly-to-top1")} key={i}>
        <span></span>
        <div className="content">
          <h2>{expList[i].name}</h2>
          <p>{expList[i].content}</p>
          <div
            id="six"
            className="button"
            onClick={(e) => handleButtonClick(e, expList[i], i)}
            style={{ cursor: "pointer" }}
          >
            Know More
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="experience-wrap modal-active"
      id="projects-id"
      // onClick={(e) => handleModalContainerClick(e)}
    >
      <div className="text-wrap">
        <h5 className={FloatingClass("", "fly-to-top2")}>My Projects</h5>
        <h6
          style={{ color: colorCode }}
          className={FloatingClass("", "fly-to-top2")}
        >
          My proficiency in front-end extends beyond coding; I place a strong
          emphasis on creating intuitive, user-friendly interfaces that make a
          lasting impression.
        </h6>
      </div>
      <span className="container">{cardElements}</span>
      {isModalActive && (
        <div id="modal-container" className={modalClass}>
          <Suspense fallback={<div>Loading Modal</div>}>
            <Modal
              selectedData={selectedData}
              setselectedData={setselectedData}
              dataList={expList}
              handleModalContainerClick={handleModalContainerClick}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Index;
