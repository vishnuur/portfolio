import React from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";
import expDev from "../../Assets/Images/expdev.webp";
import expComp from "../../Assets/Images/expcomp.webp";
import expJunior from "../../Assets/Images/expJunior.webp";
import expSenior from "../../Assets/Images/expSenior.webp";
import { useState } from "react";
import { FaRotate } from "react-icons/fa6";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);
  const colorCode = dark ? "white" : "black";
  const [flipCard, setflipCard] = useState({ index: 0, value: false });

  return (
    <div id="experience-id" className="exp-wrap">
      <h5 className={FloatingClass("", "fly-to-top1")}>My Experience</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top1")}
      >
        My passion for clean code and design aesthetics drives me to deliver web
        applications that not only function flawlessly but also captivate users.
      </h6>

      <div className="card_wrap">
        <div
          className={`flip-card-container ${
            flipCard.value && flipCard.index === 4 ? "hovered-state" : ""
          }`}
          onMouseEnter={() => setflipCard({ index: 4, value: true })}
          onClick={() =>
            setflipCard({
              index: 4,
              value: flipCard.index === 4 ? !flipCard.value : true,
            })
          }
          onMouseLeave={() => setflipCard({ index: 4, value: false })}
        >
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <FaRotate className="rotate-card-mobile" />
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img src={expSenior} alt="Experion Technologies" />
                <figcaption>Experion Technologies</figcaption>
                <h4>2024- Present</h4>
              </figure>
              <span>
                <h6>Senior Software Developer</h6>
                <ul className="experience-ul">
                  <li>React Native</li>
                  <li>Typescript</li>
                  <li>ReduxJs</li>
                  <li>Sass</li>
                  <li>Jest</li>
                  <li>FireBase</li>
                </ul>
              </span>
            </div>

            <div className="card-back">
              <figure>
                <div className="img-bg"></div>
                <img src={expSenior} alt="Brohm Lake" />
              </figure>

              <ul className="experience-ul">
                <li>
                  Conducted R&D to convert a React Native app to Android Auto
                  and CarPlay apps for Stellantis, expanding the app's usability
                  and accessibility for automotive applications
                </li>
                <li>
                  Enhanced API consumption efficiency by collaborating with
                  backend teams, leading to a 20% improvement in data retrieval
                  speed.
                </li>
                <li>
                  Rapidly learned React Native and Firebase, contributing to a
                  high-pressure project for Stellantis. Delivered key features
                  and fixed bugs for their EV car app, leading to a successful
                  production release.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`flip-card-container ${
            flipCard.value && flipCard.index === 0 ? "hovered-state" : ""
          }`}
          onMouseEnter={() => setflipCard({ index: 0, value: true })}
          onClick={() =>
            setflipCard({
              index: 0,
              value: flipCard.index === 0 ? !flipCard.value : true,
            })
          }
          onMouseLeave={() => setflipCard({ index: 0, value: false })}
        >
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <FaRotate className="rotate-card-mobile" />
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img src={expDev} alt="Experion Technologies" />
                <figcaption>Experion Technologies</figcaption>
                <h4>2022- 2024</h4>
              </figure>
              <span>
                <h6>Software Developer</h6>
                <ul className="experience-ul">
                  <li>ReactJS</li>
                  <li>Typescript</li>
                  <li>ReduxJs</li>
                  <li>Redux Saga</li>
                  <li>Sass</li>
                  <li>Jest</li>
                </ul>
              </span>
            </div>

            <div className="card-back">
              <figure>
                <div className="img-bg"></div>
                <img src={expDev} alt="Brohm Lake" />
              </figure>

              <ul className="experience-ul">
                <li>
                  Recognized and awarded for surpassing expectations, accelating
                  team efforts and deliveries
                </li>
                <li>
                  Swiftly embraced Typescript, establishing foundational
                  structure.
                </li>
                <li>
                  Skillfully implemented Redux-Saga, enhancing project
                  functionality
                </li>
                <li>Conducted code reviews and mentored junior developers</li>
                <li>Implemented Redux and code splitting strategies</li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`flip-card-container ${
            flipCard.value && flipCard.index === 1 ? "hovered-state" : ""
          }`}
          onMouseEnter={() => setflipCard({ index: 1, value: true })}
          onMouseLeave={() => setflipCard({ index: 1, value: false })}
          onClick={() =>
            setflipCard({
              index: 1,
              value: flipCard.index === 1 ? !flipCard.value : true,
            })
          }
        >
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <FaRotate className="rotate-card-mobile" />
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img src={expComp} alt="TechByHeart" />
                <figcaption>TechByHeart</figcaption>
                <h4>2019-2022</h4>
              </figure>

              <span>
                <h6>Assosiate Software Developer</h6>
                <ul className="experience-ul">
                  <li>ReactJS</li>
                  <li>NextJS</li>
                  <li>HTML</li>
                  <li>CSS</li>
                  <li>Redux</li>
                </ul>
              </span>
            </div>

            <div className="card-back">
              <figure>
                <div className="img-bg"></div>
                <img src={expComp} alt="bgComp" />
              </figure>

              <ul className="experience-ul">
                <li>
                  Build and installed reusable codes libraries for future
                  reference
                </li>
                <li>
                  Optimized app components and improved the product's
                  performance
                </li>
                <li>
                  Provided training for freshers on HTML, CSS, Javscript and
                  ReactJS
                </li>
                <li>
                  Worked as a team lead for 3 projects and managed to deliver on
                  time
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`flip-card-container ${
            flipCard.value && flipCard.index === 2 ? "hovered-state" : ""
          }`}
          onMouseEnter={() => setflipCard({ index: 2, value: true })}
          onMouseLeave={() => setflipCard({ index: 2, value: false })}
          onClick={() =>
            setflipCard({
              index: 2,
              value: flipCard.index === 2 ? !flipCard.value : true,
            })
          }
        >
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <FaRotate className="rotate-card-mobile" />
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img src={expJunior} alt="TechByHeart" />
                <figcaption>TechByHeart</figcaption>
                <h4>2019-2022</h4>
              </figure>

              <span>
                <h6>Junior Software Developer</h6>
                <ul className="experience-ul">
                  <li>ReactJS</li>
                  <li>HTML</li>
                  <li>CSS</li>
                </ul>
              </span>
            </div>

            <div className="card-back">
              <figure>
                <div className="img-bg"></div>
                <img src={expJunior} alt="expJun" />
              </figure>

              <ul className="experience-ul">
                <li>
                  Developed an LMS web application and later converted to PWA.
                </li>
                <li>Developed a Whatsapp based e-commerce application</li>
                <li>
                  Created an e-commerce application for art product dealers
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
