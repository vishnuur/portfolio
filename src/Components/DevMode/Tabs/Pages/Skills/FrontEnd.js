import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const frontendSkills = [
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
  "SCSS",
  "React.js",
  "React Native",
  "Next.js",
  "Redux",
  "MaterialUI",
  "Ant Design",
  "Tailwind CSS",
  "Vite",
  "Vitest",
  "Jest",
];

const FrontEnd = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: "Skills" },
            { title: <a href="frontend">FrontEnd</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>// Frontend Skills</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>frontend</span> = [{"\n"}
            {frontendSkills.map((s, i) => (
              <span key={i}>
                {"  "}
                <span className={styles.string}>"{s}"</span>
                {i !== frontendSkills.length - 1 && ","}{"\n"}
              </span>
            ))}
            {"];"}
            {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Crafting beautiful UIs! 🎨"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            🎨 Specializing in modern{" "}
            <span className={styles.highlight}>React</span> and{" "}
            <span className={styles.highlight}>Next.js</span> ecosystems, with
            deep expertise in state management, component architecture, and
            responsive design.
          </p>
          <p>
            <span className={styles.highlight}>Skills:</span>{" "}
            {frontendSkills.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};

export default FrontEnd;
