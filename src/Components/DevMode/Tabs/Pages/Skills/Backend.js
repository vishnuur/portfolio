import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const backendSkills = [
  "Firebase",
  "REST APIs",
  "Django",
  "Socket.io",
];

const Backend = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: "Skills" },
            { title: <a href="skills">Backend</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>// Backend & Integrations</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>backend</span> = [{"\n"}
            {backendSkills.map((s, i) => (
              <span key={i}>
                {"  "}
                <span className={styles.string}>"{s}"</span>
                {i !== backendSkills.length - 1 && ","}{"\n"}
              </span>
            ))}
            {"];"}
            {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Powering apps from behind the scenes! ⚙️"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            ⚙️ Experienced working with backend services and APIs, including{" "}
            <span className={styles.highlight}>Firebase</span> for real-time
            data and auth, <span className={styles.highlight}>REST APIs</span>{" "}
            for data integration, and{" "}
            <span className={styles.highlight}>Django</span> for full-stack
            projects.
          </p>
          <p>
            <span className={styles.highlight}>Technologies:</span>{" "}
            {backendSkills.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Backend;
