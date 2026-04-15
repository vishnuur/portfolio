import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";
import expList from "../../../../Projects/dataFile";

const mobileApps = expList.filter((p) =>
  ["MapHabit", "Rent 2.0", "Stellantis"].includes(p.name)
);

const MobileApps = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: "Projects" },
            { title: <a href="mobileapps">Mobile Apps</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>// Mobile App Projects</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>mobileApps</span> = [{"\n"}
            {mobileApps.map((project, index) => (
              <span key={index}>
                {"  "}
                {`{`}{" "}
                <span className={styles.variable}>name</span>:{" "}
                <span className={styles.string}>"{project.name}"</span>,{" "}
                <span className={styles.variable}>tech</span>: [
                {project.techused.map((t, i) => (
                  <span key={i}>
                    <span className={styles.string}>"{t}"</span>
                    {i !== project.techused.length - 1 && ", "}
                  </span>
                ))}
                ] {"},"}{"\n"}
              </span>
            ))}
            {"];"}
            {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Building for mobile! 📱"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            📱 Mobile applications built with{" "}
            <span className={styles.highlight}>React Native</span>, delivering
            native experiences on iOS and Android.
          </p>
          <ul className={styles.projectList}>
            {mobileApps.map((project, index) => (
              <li key={index}>
                <span className={styles.highlight}>{project.name}:</span>{" "}
                {project.content}
                <br />
                <span className={styles.techStack}>
                  Tech: {project.techused.join(", ")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileApps;
