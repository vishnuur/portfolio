import React, { useState } from "react";
import "./index.css";
import { FaPhone } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import Icons from "./icons";
import FloatingClass from "../../context/utils";

const Index = () => {
  const [inputs, setInputs] = useState({
    subject: "",
    message: "",
  });

  const handleChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };
  return (
    <div className="socialwrap">
      <section>
        <div className="section-header">
          <div className="container">
            <h2 className={FloatingClass("", "fly-to-top6")}>Contact Me</h2>
            <p className={FloatingClass("", "fly-to-top6")}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="contact-info">
              <div className="contact-info-item">
                <div
                  className={FloatingClass("contact-info-icon", "fly-to-top6")}
                >
                  <FaPhone />
                </div>

                <div className="contact-info-content">
                  <h4 className={FloatingClass("", "fly-to-top6")}>Phone</h4>
                  <p className={FloatingClass("", "fly-to-top6")}>
                    +91 6282443764
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div
                  className={FloatingClass("contact-info-icon", "fly-to-top6")}
                >
                  <MdOutlineMailOutline />
                </div>

                <div className="contact-info-content">
                  <h4 className={FloatingClass("", "fly-to-top6")}>Email</h4>
                  <p className={FloatingClass("", "fly-to-top6")}>
                    vishnuur@gmail.com
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form action="" id="contact-form">
                <h2 className={FloatingClass("", "fly-to-top6")}>
                  Send Message
                </h2>
                <div className={FloatingClass("input-box", "fly-to-top6")}>
                  <input
                    type="text"
                    name="subject"
                    onChange={(e) => handleChange(e.target.value, "subject")}
                    value={inputs.subject}
                  />
                  {inputs.subject === "" && <span>Subject</span>}
                </div>

                <div className={FloatingClass("input-box", "fly-to-top6")}>
                  <textarea
                    name="message"
                    onChange={(e) => handleChange(e.target.value, "message")}
                    value={inputs.message}
                  ></textarea>
                  {inputs.message === "" && <span>Type your Message...</span>}
                </div>

                <div className={FloatingClass("input-box", "fly-to-top6")}>
                  <a
                    href={`mailto:vishnuur77@gmail.com?subject=${inputs.subject}&body=${inputs.message}`}
                    type="submit"
                    value="Send"
                    name=""
                    className="submit-btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Submit
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Icons />
      </section>
    </div>
  );
};

export default Index;
