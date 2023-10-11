import React from "react";
import "./icons.css";
import { FaFacebookF, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import FloatingClass from "../../context/utils";

const Icons = () => {
  return (
    <div className="wrapper">
      <a
        href="https://www.facebook.com/vishnu.cool.526/"
        target="_blank"
        rel="noreferrer"
        className={FloatingClass("", "fly-to-top6")}
      >
        <div className="bg-ico" id="facebook">
          <FaFacebookF className="fab fa-facebook social  facebook fa-3x" />
        </div>
      </a>
      <a href="twitter" className={FloatingClass("", "fly-to-top6")}>
        <div className="bg-ico" id="twitter">
          <FaTwitter className="fab fa-twitter social  twitter fa-3x" />
        </div>
      </a>
      <a
        href="https://www.instagram.com/vishnu_u_r/"
        target="_blank"
        rel="noreferrer"
        className={FloatingClass("", "fly-to-top6")}
      >
        <div className="bg-ico" id="instagram">
          <PiInstagramLogoFill className="fab fa-instagram social  instagram fa-3x" />
        </div>
      </a>
      <a
        href="https://wa.me/916282443764"
        target="_blank"
        rel="noreferrer"
        className={FloatingClass("", "fly-to-top6")}
      >
        <div className="bg-ico" id="whatsapp">
          <FaWhatsapp className="fab fa-whatsapp social  whatsapp fa-3x" />
        </div>
      </a>
    </div>
  );
};

export default Icons;
