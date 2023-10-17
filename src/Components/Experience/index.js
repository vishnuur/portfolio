import React from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";
import expDev from "../../Assets/Images/expdev.webp";
import expComp from "../../Assets/Images/expcomp.jpg";
import expJunior from "../../Assets/Images/expJunior.webp";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);
  const colorCode = dark ? "white" : "black";

  return (
    <div className="exp-wrap">
      <h5 className={FloatingClass("", "fly-to-top1")}>My Experience</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top1")}
      >
        My passion for clean code and design aesthetics drives me to deliver web
        applications that not only function flawlessly but also captivate users.
      </h6>

      <div className="card_wrap">
        <div className="flip-card-container">
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img src={expDev} alt="Experion Technologies" />
                <figcaption>Experion Technologies</figcaption>
                <h4>2022- Preset</h4>
              </figure>
              <span>
                <h6>Software Developer</h6>
                <ul className="experience-ul">
                  <li>ReactJS</li>
                  <li>Typescript</li>
                  <li>ReduxJs</li>
                  <li>Redux Saga</li>
                  <li>Sass</li>
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
        <div className="flip-card-container">
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
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
              {/* <div className="design-container">
                <span className="design design--1"></span>
                <span className="design design--2"></span>
                <span className="design design--3"></span>
                <span className="design design--4"></span>
                <span className="design design--5"></span>
                <span className="design design--6"></span>
                <span className="design design--7"></span>
                <span className="design design--8"></span>
              </div> */}
            </div>
          </div>
        </div>
        <div className="flip-card-container">
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
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
