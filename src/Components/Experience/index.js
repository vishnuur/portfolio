import React, { useEffect, useState } from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";

const Index = () => {
  const { dark } = React.useContext(ThemeContext);
  const word =
    "I like to take responsibility to craft aesthetic user experience using modern frontend architecture";
  const letterArray = word.split("");

  const colorCode = dark ? "white" : "black";

  return (
    <div className="exp-wrap">
      <h5 className={FloatingClass("", "fly-to-top1")}>My Experience</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top1")}
      >
        {letterArray.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </h6>

      <div className="card_wrap">
        <div className="flip-card-container">
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Experion Technologies"
                />
                <figcaption>Experion Technologies</figcaption>
                <h4>2022- Preset</h4>
              </figure>
              <span>
                <h6>Software Developer</h6>
                <ul>
                  <li>ReactJS</li>
                  <li>Typescript</li>
                  <li>ReduxJs</li>
                  <li>Redux Saga</li>
                </ul>
              </span>
            </div>

            <div className="card-back">
              <figure>
                <div className="img-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1486162928267-e6274cb3106f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Brohm Lake"
                />
              </figure>

              <ul>
                <li>Software Developer</li>
                <li>Detail 2</li>
                <li>Detail 3</li>
                <li>Detail 4</li>
                <li>Detail 5</li>
              </ul>
              <div className="design-container">
                <span className="design design--1"></span>
                <span className="design design--2"></span>
                <span className="design design--3"></span>
                <span className="design design--4"></span>
                <span className="design design--5"></span>
                <span className="design design--6"></span>
                <span className="design design--7"></span>
                <span className="design design--8"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-card-container">
          <div className={FloatingClass("flip-card", "fly-to-top1")}>
            <div className="card-front">
              <figure>
                <div className="img-bg"></div>
                <img
                  src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="TechByHeart"
                />
                <figcaption>TechByHeart</figcaption>
                <h4>2019-2022</h4>
              </figure>

              <span>
                <h6>Assosiate Software Developer</h6>
                <ul>
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
                <img
                  src="https://images.unsplash.com/photo-1545436864-cd9bdd1ddebc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  alt="Image 2"
                />
              </figure>

              <ul>
                <li>
                  Assosiate <br />
                  Software Developer
                </li>
                <li>Detail 2</li>
                <li>Detail 3</li>
                <li>Detail 4</li>
                <li>Detail 5</li>
              </ul>
              <div className="design-container">
                <span className="design design--1"></span>
                <span className="design design--2"></span>
                <span className="design design--3"></span>
                <span className="design design--4"></span>
                <span className="design design--5"></span>
                <span className="design design--6"></span>
                <span className="design design--7"></span>
                <span className="design design--8"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
