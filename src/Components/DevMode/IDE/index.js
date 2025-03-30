import React, { useState } from "react";
import { Modal } from "antd";
import "./index.module.scss";
import styles from "./index.module.scss";
import "./index.module.scss";
import { CloseOutlined } from "@ant-design/icons";

const IDEOpen = ({ isModalOpen, handleOk, handleCancel }) => {
  const [output, setOutput] = useState([
    "Welcome to Vishnu UR's Portfolio CLI 🚀",
    "Type 'npm run help' to see available commands.",
  ]);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const commands = {
    "npm run help": [
      "Available commands:",
      "npm run about - Show information about me",
      "npm run projects - Display my latest projects",
      "npm run skills - List my tech stack",
      "npm run contact - Show ways to connect with me",
      "npm run install - Fun fake installation script",
      "npm run clear - Clear the terminal",
    ],
    "npm run about": [
      "👨‍💻 Name: Vishnu UR",
      "💼 Role: Lead Software Engineer",
      "🛠 Tech Stack: React, Next.js, React Native, TypeScript, Node.js, Firebase",
    ],
    "npm run projects": [
      "📁 Carbon Reporter - Automated reporting tool for sustainability data.",
      "📁 LMS Platform - Learning management system for online courses.",
      "📁 E-Commerce App - High-performance store with seamless UX.",
    ],
    "npm run skills": [
      "🚀 React, Next.js, TypeScript, SCSS, Firebase, AWS, Node.js",
    ],
    "npm run contact": [
      "📧 Email: vishnu@example.com",
      "🔗 GitHub: github.com/vishnuUR",
      "🔗 LinkedIn: linkedin.com/in/vishnuUR",
    ],
    "npm run install": [
      "Installing Vishnu UR's Portfolio CLI...",
      "[===========           ]  50% Complete",
      "[====================] 100% Installed! 🚀",
      "Run 'npm run about' to get started.",
    ],
    "npm run clear": [],
  };

  const handleCommand = (e) => {
    if (e.key === "Enter" && input.trim()) {
      if (input.trim() === "npm run clear") {
        setOutput([]);
      } else {
        const response = commands[input] || [
          `Command not found: ${input}`,
          "Type 'npm run help' for available commands.",
        ];
        setOutput((prev) => [...prev, `$ ${input}`, ...response]);
      }

      setHistory((prev) => [...prev, input]); // Store in history
      setHistoryIndex(-1); // Reset index
      setInput("");
    } else if (e.key === "ArrowUp") {
      // Navigate up in history
      if (history.length > 0) {
        const newIndex = Math.max(historyIndex + 1, 0);
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      // Navigate down in history
      if (historyIndex > -1) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      } else {
        setInput("");
      }
    }
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <div className={styles.terminal}>
        <div className={styles.terminalHeader}>
          <div className={styles.terminalButtons}>
            <span className={styles.close} onClick={handleCancel}>
              <CloseOutlined />
            </span>
            <span className={styles.minimize} onClick={handleCancel}></span>
            <span className={styles.maximize}></span>
          </div>
        </div>
        <div className={styles.terminalBody}>
          {output.map((line, index) => (
            <div key={index} className={styles[getStyleType(line)]}>
              {line}
            </div>
          ))}
          <div className={styles.inputLine}>
            <span className={styles.prompt}>$</span>
            <input
              type="text"
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand} // Using onKeyDown for arrow keys
              autoFocus
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};
// Determine style based on command type
const getStyleType = (text) => {
  if (text.startsWith("$")) return "command";
  if (text.includes("Error") || text.includes("not found")) return "error";
  if (text.includes("Installing") || text.includes("Complete")) return "info";
  return "output";
};
export default IDEOpen;
