import React from "react";
import "./index.scss";
import ThemeContext from "../../context/ThemeContext";
import FloatingClass from "../../context/utils";
import gitlab from "../../Assets/Images/gitlab.png";
import html from "../../Assets/Images/html.png";
import javascript from "../../Assets/Images/javascript.png";
import typescript from "../../Assets/Images/typescript.png";
import css from "../../Assets/Images/css.png";
import reactjs from "../../Assets/Images/reactjs.png";
import reactnative from "../../Assets/Images/react-native.png";
import redux from "../../Assets/Images/redux.png";
import sass from "../../Assets/Images/sass.png";
import expIcon from "../../Assets/Images/expIcon.webp";
import azure from "../../Assets/Images/azure.png";
import vite from "../../Assets/Images/Vitejs.webp";
import vitest from "../../Assets/Images/vitest.svg";
import jest from "../../Assets/Images/jest.svg";
import { SiNextdotjs } from "react-icons/si";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
const Index = () => {
  const { dark } = React.useContext(ThemeContext);
  const colorCode = dark ? "white" : "black";
  const roles = [
    {
      date: "2019/10 - 2021/02",
      title: "Junior Software Engineer",
      company: "Techbyheart Pvt Ltd, Kochi, Kerala",
      description:
        "Developed dynamic admin panels for LMS and CMS applications. Built a Progressive Web Application (PWA) for hotel staff in the Maldives. Led multiple projects with a team of up to 9 members, ensuring timely delivery and high-quality output. Gained experience in frontend technologies like HTML, CSS, and JavaScript.",
      iconSrc: expIcon,
      skills: [reactjs, html, css],
    },
    {
      date: "2021/02 - 2022/05",
      title: "Associate Software Engineer",
      company: "Techbyheart Pvt Ltd, Kochi, Kerala",
      description:
        "Led frontend development for logistics and e-commerce projects. Implemented Redux for state management, enhancing application performance. Developed reusable code libraries, reducing development time and improving consistency. Trained junior developers in core frontend technologies, contributing to team skill enhancement.",
      iconSrc: expIcon,
      skills: [reactjs, SiNextdotjs, html, css, redux],
    },
    {
      date: "2022/05 - 2024/04",
      title: "Software Engineer",
      company: "Experion Technologies, Trivandrum, Kerala",
      description:
        "Spearheaded the integration of Redux-Saga and TypeScript, resulting in a 30% performance boost. Played a key role in developing custom maps and enhancing app functionality. Delivered critical projects under tight deadlines, including an EV car app for Stellantis. Focused on performance optimization and code efficiency, achieving significant improvements.",
      iconSrc: expIcon,
      skills: [reactnative, typescript, redux, sass, jest, azure],
    },
    {
      date: "2024/04 - 2024/08",
      title: "Senior Software Engineer",
      company: "Experion Technologies, Trivandrum, Kerala",
      description:
        "Conducted extensive R&D for converting React Native apps to Android Auto and CarPlay compatibility. Improved API consumption efficiency, reducing data retrieval time by 20%. Mentored junior developers, helping them advance their skills in React Native and related technologies. Developed and executed comprehensive test cases, ensuring high code quality and reliability.",
      iconSrc: expIcon,
      skills: [reactnative, typescript, redux, sass, vite, vitest],
    },
    {
      date: "2024/08 - present",
      title: "Lead Software Engineer",
      company: "Experion Technologies, Trivandrum, Kerala",
      description:
        "Leading the development of an ESG management platform, driving the project's technical vision. Collaborating with stakeholders to align technical implementation with business goals. Mentoring a team of front-end developers, focusing on optimizing and scaling a large Next.js codebase. Ensuring high performance and maintainability across all project deliverables.",
      iconSrc: expIcon,
      skills: [SiNextdotjs, javascript, redux, sass, jest, gitlab],
    },
  ];

  const iconStyle = {
    background: "#2E2E48",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyle = {
    background: dark ? "#1A1A2E" : "#F5F5F5",
    color: "#fff",
  };
  return (
    <div id="experience-id" className="exp-wrap">
      <h5 className={FloatingClass("", "fly-to-top6")}>My Experience</h5>
      <h6
        style={{ color: colorCode }}
        className={FloatingClass("", "fly-to-top6")}
      >
        My passion for clean code and design aesthetics drives me to deliver web
        applications that not only function flawlessly but also captivate users.
      </h6>
      <VerticalTimeline className={FloatingClass("", "fly-to-top6")}>
        {roles.reverse().map((role, index) => (
          <VerticalTimelineElement
            key={index}
            className={FloatingClass(
              "vertical-timeline-element--work",
              "fly-to-top6"
            )}
            contentStyle={contentStyle}
            contentArrowStyle={{
              borderRight: `7px solid ${dark ? "#1A1A2E" : "#F5F5F5"}`,
            }}
            date={role.date}
            dateClassName={"date-style"}
            iconStyle={iconStyle}
            icon={
              <img
                src={role.iconSrc}
                alt={role.title}
                style={{ width: "30px" }}
                className={FloatingClass("skills-icon", "fly-to-top6")}
                loading="lazy"
              />
            }
          >
            <h3
              className="vertical-timeline-element-title"
              style={{
                color: dark ? "#FFD700" : "#0056b3",
                textShadow: dark ? "0 1px 3px rgba(0,0,0,0.3)" : "none",
                fontWeight: "bold",
              }}
            >
              {role.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{
                color: dark ? "#E0E0E0" : "#333333",
                fontStyle: "italic",
              }}
            >
              {role.company}
            </h4>
            <p
              style={{
                color: dark ? "#E0E0E0" : "#333333",
                lineHeight: "1.6",
                paddingLeft: "10px",
                borderLeft: `2px solid ${dark ? "#FFD700" : "#0056b3"}`,
              }}
            >
              {role.description}
            </p>
            <div className="skills-wrap1">
              {role.skills.map((skill, i) => (
                <span
                  key={i}
                  className="skills-icon-border"
                  style={{
                    color: dark ? "#1A1A2E" : "#F5F5F5",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 4px 15px ${
                      dark ? "rgba(255, 215, 0, 0.8)" : "rgba(0, 86, 179, 0.8)"
                    }`;
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 1px 2px rgba(0,0,0,0.2)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  {typeof skill === "string" ? (
                    <img
                      src={skill}
                      alt={skill}
                      className={FloatingClass("skills-icon", "fly-to-top6")}
                      loading="lazy"
                    />
                  ) : (
                    <SiNextdotjs
                      color={colorCode}
                      className={FloatingClass("", "fly-to-top6")}
                    />
                  )}
                </span>
              ))}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
};

export default Index;
