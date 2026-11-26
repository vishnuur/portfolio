import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const allSkills = {
  tools: [
    "JavaScript",
    "TypeScript",
    "HTML",
    "CSS",
    "SCSS",
    "Redux",
    "Azure",
    "GitLab",
    "GitHub",
  ],
  library: [
    "Next.js",
    "React.js",
    "React Native",
    "MaterialUI",
    "Ant Design",
    "Tailwind CSS",
    "Vite",
    "Vitest",
    "Jest",
  ],
};

const Skills = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: <a href="skills">Skills</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>{"// My Skills"}</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>tools</span> = [
            {allSkills.tools.map((s, i) => (
              <span key={i}>
                <span className={styles.string}>"{s}"</span>
                {i !== allSkills.tools.length - 1 && ", "}
              </span>
            ))}
            ];{"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>frameworks</span> = [
            {allSkills.library.map((s, i) => (
              <span key={i}>
                <span className={styles.string}>"{s}"</span>
                {i !== allSkills.library.length - 1 && ", "}
              </span>
            ))}
            ];{"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Always learning, always growing! 🚀"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            🛠 I'm dedicated to staying current with emerging technologies and
            best practices across{" "}
            <span className={styles.highlight}>frontend</span>,{" "}
            <span className={styles.highlight}>mobile</span>, and{" "}
            <span className={styles.highlight}>DevOps</span> tooling.
          </p>
          <p>
            <span className={styles.highlight}>Languages & Tools:</span>{" "}
            {allSkills.tools.join(", ")}
          </p>
          <p>
            <span className={styles.highlight}>Libraries & Frameworks:</span>{" "}
            {allSkills.library.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Skills;
