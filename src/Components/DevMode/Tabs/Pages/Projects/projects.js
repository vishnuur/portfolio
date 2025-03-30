import React from "react";
import styles from "./index.module.scss";
import expList from "../../../../Projects/dataFile";

const Projects = () => {
  return (
    <div className={styles.container}>
      <pre className={styles.codeBlock}>
        <code>
          <span className={styles.comment}>// My Projects</span> {"\n"}
          <span className={styles.keyword}>const</span>{" "}
          <span className={styles.variable}>projects</span> = [ {"\n"}
          {expList?.map((project, index) => (
            <span key={index}>
              {"  "}
              {`{`} <span className={styles.variable}>name</span>:{" "}
              <span className={styles.string}>"{project.name}"</span>,{" "}
              <span className={styles.variable}>tech</span>: [
              {project?.techused.map((t, i) => (
                <span key={i}>
                  <span className={styles.string}>"{t}"</span>
                  {i !== project.techused.length - 1 && ", "}
                </span>
              ))}{" "}
              ] {"},"} {"\n"}
            </span>
          ))}
          {"];"} {"\n\n"}
          <span className={styles.function}>console</span>.
          <span className={styles.method}>log</span>(
          <span className={styles.string}>"Check out my projects! 🚀"</span>);
        </code>
      </pre>

      <div className={styles.details}>
        <p>
          📌 Here are some of my projects where I applied{" "}
          <span className={styles.highlight}>React</span>,{" "}
          <span className={styles.highlight}>Next.js</span>, and{" "}
          <span className={styles.highlight}>modern UI/UX principles</span>.
        </p>
        <ul className={styles.projectList}>
          {expList?.map((project, index) => (
            <li key={index}>
              <span className={styles.highlight}>{project.name}:</span>{" "}
              {project.description} <br />
              <span className={styles.techStack}>
                Tech: {project.techused.join(", ")}
              </span>
              <br />
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  🔗 Visit Project
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
