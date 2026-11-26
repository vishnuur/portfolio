import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";
import expList from "../../../../Projects/dataFile";

const webApps = expList.filter((p) =>
  ["Mezzo", "ESG Playbook", "IFC", "AutoMoto", "Mali", "Pin360", "EduCareer", "Cake World"].includes(p.name)
);

const WebApps = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: "Projects" },
            { title: <a href="webapps">Web Apps</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>{"// Web App Projects"}</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>webApps</span> = [{"\n"}
            {webApps.map((project, index) => (
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
            <span className={styles.string}>"Building for the web! 🌐"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            🌐 Web applications built with{" "}
            <span className={styles.highlight}>React</span>,{" "}
            <span className={styles.highlight}>Next.js</span>, and modern UI
            frameworks.
          </p>
          <ul className={styles.projectList}>
            {webApps.map((project, index) => (
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

export default WebApps;
