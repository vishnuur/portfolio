import React from "react";
import styles from "./index.module.scss";
import { Breadcrumb } from "antd";

const devopsSkills = [
  "Azure DevOps",
  "GitLab CI/CD",
  "GitHub Actions",
  "Jira",
  "Trello",
];

const Devops = () => {
  return (
    <>
      <div className="breadcrumb-wrap">
        <Breadcrumb
          separator=">"
          items={[
            { title: "Vishnu" },
            { title: "Skills" },
            { title: <a href="devops">Devops</a> },
          ]}
        />
      </div>

      <div className={styles.container}>
        <pre className={styles.codeBlock}>
          <code>
            <span className={styles.comment}>// DevOps & Tooling</span>
            {"\n"}
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.variable}>devops</span> = [{"\n"}
            {devopsSkills.map((s, i) => (
              <span key={i}>
                {"  "}
                <span className={styles.string}>"{s}"</span>
                {i !== devopsSkills.length - 1 && ","}{"\n"}
              </span>
            ))}
            {"];"}
            {"\n\n"}
            <span className={styles.function}>console</span>.
            <span className={styles.method}>log</span>(
            <span className={styles.string}>"Shipping with confidence! 🚢"</span>
            );
          </code>
        </pre>

        <div className={styles.details}>
          <p>
            🚢 Proficient with cloud and collaboration tools including{" "}
            <span className={styles.highlight}>Azure DevOps</span> for pipelines
            and sprint management, and{" "}
            <span className={styles.highlight}>GitLab CI/CD</span> for automated
            deployments.
          </p>
          <p>
            <span className={styles.highlight}>Tools:</span>{" "}
            {devopsSkills.join(", ")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Devops;
