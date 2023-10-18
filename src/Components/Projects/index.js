import React, { useEffect, useState } from "react";
import "./index.scss";
import "./modal.scss";
import "./newModal.scss";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";
import Modal from "./modal";
import expList from "./dataFile";

function Index() {
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

  console.log(selectedData, "selectedDataselectedData");

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
      <div className={FloatingClass("box card", "fly-to-top2")} key={i}>
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
          <Modal
            selectedData={selectedData}
            setselectedData={setselectedData}
            dataList={expList}
            handleModalContainerClick={handleModalContainerClick}
          />
        </div>
      )}
    </div>
  );
}

export default Index;
