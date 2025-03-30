// UnderConstruction.js
import React from "react";
import styles from "./index.module.scss";
import { FaTools, FaExclamationTriangle } from "react-icons/fa";

const UnderConstruction = () => {
  return (
    <div className={styles.container}>
      <FaTools className={styles.icon} />
      <h1 className={styles.title}>Under Construction</h1>
      <p className={styles.message}>
        <FaExclamationTriangle className={styles.warningIcon} /> This page is
        currently being built. Check back soon!
      </p>
    </div>
  );
};

export default UnderConstruction;