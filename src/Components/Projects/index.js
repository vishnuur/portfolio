import React, { useState } from "react";
import "./index.scss";
import "./modal.scss";
import ThemeContext from "../../context/ThemeContext";
import educareer from "../../Assets/Images/educareer.jpg";
import cakeshop from "../../Assets/Images/cakeshop.jpg";
import pin360 from "../../Assets/Images/pin360.jpg";
import automoto from "../../Assets/Images/automoto.jpg";
import FloatingClass from "../../context/utils";

function Index() {
  const { dark } = React.useContext(ThemeContext);
  const [modalClass, setModalClass] = useState("");
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedData, setselectedData] = useState({
    name: "",
    image: "",
    content: "",
  });

  const handleButtonClick = (e, data) => {
    e.preventDefault();
    e.stopPropagation();
    setselectedData({
      name: data.name,
      image: data.image,
      content: data.content,
    });
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
  const expList = [
    {
      name: "AutoMoto",
      image: automoto,
      content:
        "This website is an all-in-one platform that offers online booking for vehicle services, accessory purchases, price comparisons, detailed vehicle information, and easy insurance acquisition.",
    },
    {
      name: "Cake World",
      image: cakeshop,
      content:
        "A cake-selling website that allows users to order their favorite cakes directly through WhatsApp for a convenient and delightful experience",
    },
    {
      name: "Pin360",
      image: pin360,
      content:
        "A website tailored for car enthusiasts. It offers a wealth of car reviews, convenient booking for car conventions and programs, and a hub for staying informed about all things automotive",
    },
    {
      name: "EduCareer",
      image: educareer,
      content:
        "A multifunctional educational platform that serves as both a training center for graduates, offering PSC exam courses and exams, and a teaching platform for professors, enabling them to instruct and communicate effectively.",
    },
  ];

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
            onClick={(e) => handleButtonClick(e, expList[i])}
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
      onClick={(e) => handleModalContainerClick(e)}
    >
      <div className="text-wrap">
        <h5 className={FloatingClass("", "fly-to-top2")}>My Projects</h5>
        <h6
          style={{ color: colorCode }}
          className={FloatingClass("", "fly-to-top2")}
        >
          I like to take responsibility to craft aesthetic user experience using
          modern frontend architecture
        </h6>
      </div>
      <span className="container">{cardElements}</span>
      {isModalActive && (
        <div id="modal-container" className={modalClass}>
          <div className="modal-background modal-active">
            <div className="modal modal-styles">
              <img alt="cover" src={selectedData?.image} />
              <div className="details-modal">
                <h3>{selectedData?.name}</h3>
              </div>
              <div className="gradient-blur">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <h5>An website for the training of graduates</h5>
              <svg
                className="modal-svg"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
              >
                <rect
                  x="0"
                  y="0"
                  fill="none"
                  width="720"
                  height="460"
                  rx="3"
                  ry="3"
                ></rect>
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Index;
