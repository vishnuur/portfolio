import React from "react";
import { TypeAnimation } from "react-type-animation";
import "./index.scss";
import coverimage from "../../Assets/Images/coverimage.png";
import float1 from "../../Assets/Images/float1.png";
import float2 from "../../Assets/Images/float2.webp";
import float3 from "../../Assets/Images/float3.webp";
import ThemeContext from "../../context/ThemeContext";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);

  const colorCode = dark ? "white" : "black";

  return (
    <div className="intro-wrap">
      <div className="basic-details">
        <p className={FloatingClass("", "fly-to-top")}>Hi, my name is</p>
        <h2
          className={FloatingClass("", "fly-to-top")}
          style={{ color: dark ? "white" : "black" }}
        >
          Vishnu UR
        </h2>
        <span className={FloatingClass("", "fly-to-top")}>
          <TypeAnimation
            sequence={[
              "A pragmatic Frontend Developer",
              1000,
              "I build things for the web",
              1000,
              "I create scalable react apps",
              1000,
            ]}
            speed={10}
            style={{ fontSize: "1.6em", fontFamily: "cursive", color: "grey" }}
            repeat={Infinity}
          />
        </span>
        <div className="social">
          <Link
            to="https://www.linkedin.com/in/vishnu-ur-213165186/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn
              fill={colorCode}
              className={FloatingClass("", "fly-to-top")}
            />
          </Link>
          <Link
            to="https://www.facebook.com/vishnu.cool.526/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF
              fill={colorCode}
              className={FloatingClass("", "fly-to-top")}
            />
          </Link>
          <Link
            to="https://www.instagram.com/vishnu_u_r/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              fill={colorCode}
              className={FloatingClass("", "fly-to-top")}
            />
          </Link>
          <Link
            to="https://www.linkedin.com/in/vishnu-ur-213165186/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaXTwitter
              fill={colorCode}
              className={FloatingClass("", "fly-to-top")}
            />
          </Link>
        </div>
      </div>
      <div className="coverimage">
        <span className={FloatingClass("image-container", "fly-to-top")}>
          <img alt="float1" className="floating-image1" src={float1} />
          <img alt="float2" className="floating-image2" src={float2} />
          <img alt="float3" className="floating-image3" src={float3} />
        </span>
        <img
          className={FloatingClass("", "fly-to-top")}
          src={coverimage}
          alt="coverimage"
        />
      </div>
    </div>
  );
};

export default Index;
