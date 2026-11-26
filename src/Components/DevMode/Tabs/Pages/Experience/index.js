import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const roles = [
  {
    date: "2019/10 - 2021/02",
    title: "Junior Software Engineer",
    company: "Techbyheart Pvt Ltd",
    skills: ["React", "HTML", "CSS"],
  },
  {
    date: "2021/02 - 2022/05",
    title: "Associate Software Engineer",
    company: "Techbyheart Pvt Ltd",
    skills: ["React", "Next.js", "HTML", "CSS", "Redux"],
  },
  {
    date: "2022/05 - 2024/04",
    title: "Software Engineer",
    company: "Experion Technologies",
    skills: ["React Native", "TypeScript", "Redux", "SASS", "Jest", "Azure"],
  },
  {
    date: "2024/04 - 2024/08",
    title: "Senior Software Engineer",
    company: "Experion Technologies",
    skills: ["React Native", "TypeScript", "Redux", "SASS", "Vite", "Vitest"],
  },
  {
    date: "2024/08 - present",
    title: "Lead Software Engineer",
    company: "Experion Technologies",
    skills: ["Next.js", "JavaScript", "Redux", "SASS", "Jest", "GitLab"],
  },
];

const Experience = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: <a href="experience">Experience</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>{"// My Experience"}</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>experience</span> = [{"\n"}
            {roles.map((role, index) => (
              <span key={index}>
                {"  "}
                {`{`}{" "}
                <span className={styles.variable}>title</span>:{" "}
                <span className={styles.string}>"{role.title}"</span>,{" "}
                <span className={styles.variable}>company</span>:{" "}
                <span className={styles.string}>"{role.company}"</span>,{" "}
                <span className={styles.variable}>date</span>:{" "}
                <span className={styles.string}>"{role.date}"</span>{" "}
                {"},"}{"\n"}
              </span>
            ))}
            {"];"}
            {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Over 5 years of building great software! 💼"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            💼 I have been working as a software engineer since{" "}
            <span className={styles.highlight}>October 2019</span>, growing from
            a junior developer to a{" "}
            <span className={styles.highlight}>Lead Software Engineer</span>.
          </p>
          <ul className={styles.expList}>
            {[...roles].reverse().map((role, index) => (
              <li key={index}>
                <span className={styles.highlight}>{role.title}</span> @{" "}
                {role.company}
                <br />
                <span className={styles.date}>{role.date}</span>
                <br />
                <span className={styles.techStack}>
                  Stack: {role.skills.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Experience;
