import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const AboutMe = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            {
              title: "Vishnu",
            },
            {
              title: <a>About</a>,
            },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>// About Me</span> {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>name</span> ={" "}
            <span className={styles.string}>"Vishnu UR"</span>; {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>role</span> ={" "}
            <span className={styles.string}>"Lead Software Engineer"</span>;{" "}
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>skills</span> = [
            <span className={styles.string}>"React"</span>,{" "}
            <span className={styles.string}>"Next.js"</span>,{" "}
            <span className={styles.string}>"JavaScript"</span>,{" "}
            <span className={styles.string}>"TypeScript"</span>,{" "}
            <span className={styles.string}>"SCSS"</span>]; {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Welcome to my portfolio! 🚀"</span>
            );
          </code>
        </pre>
        <div className={styles.details}>
          <p>
            👋 Hi, I'm <span className={styles.highlight}>Vishnu UR</span>, a
            passionate developer with expertise in modern web technologies.
          </p>
          <p>
            I specialize in <span className={styles.highlight}>React</span> and{" "}
            <span className={styles.highlight}>Next.js</span>, and I'm always
            exploring new tools to improve user experience and performance.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutMe;
