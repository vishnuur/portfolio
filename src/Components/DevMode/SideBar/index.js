import React from "react";
import {
  FolderOpenFilled,
  FolderFilled,
  DownOutlined,
} from "@ant-design/icons";
import { Tree } from "antd";
import "./index.scss";

const treeData = [
  {
    title: "Vishnu",
    key: "Vishnu",
    icon: <FolderOpenFilled style={{ color: "#FF9800" }} />,
    children: [
      {
        title: "About",
        key: "About",
        icon: ({ selected }) =>
          selected ? (
            <FolderOpenFilled style={{ color: "#FF9800" }} />
          ) : (
            <FolderFilled style={{ color: "#FF9800" }} />
          ),
      },
      {
        title: "Projects",
        key: "Projects",
        icon: ({ selected }) =>
          selected ? (
            <FolderOpenFilled style={{ color: "#2196F3" }} />
          ) : (
            <FolderFilled style={{ color: "#2196F3" }} />
          ),
        children: [
          {
            title: "Web Apps",
            key: "Web Apps",
            icon: ({ selected }) =>
              selected ? (
                <FolderOpenFilled style={{ color: "#2196F3" }} />
              ) : (
                <FolderFilled style={{ color: "#2196F3" }} />
              ),
          },
          {
            title: "Mobile Apps",
            key: "Mobile Apps",
            icon: ({ selected }) =>
              selected ? (
                <FolderOpenFilled style={{ color: "#2196F3" }} />
              ) : (
                <FolderFilled style={{ color: "#2196F3" }} />
              ),
          },
        ],
      },
      {
        title: "Experience",
        key: "Experience",
        icon: ({ selected }) =>
          selected ? (
            <FolderOpenFilled style={{ color: "#4CAF50" }} />
          ) : (
            <FolderFilled style={{ color: "#4CAF50" }} />
          ),
      },
      {
        title: "Skills",
        key: "Skills",
        icon: ({ selected }) =>
          selected ? (
            <FolderOpenFilled style={{ color: "#9C27B0" }} />
          ) : (
            <FolderFilled style={{ color: "#9C27B0" }} />
          ),
        children: [
          {
            title: "FrontEnd",
            key: "FrontEnd",
            icon: ({ selected }) =>
              selected ? (
                <FolderOpenFilled style={{ color: "#9C27B0" }} />
              ) : (
                <FolderFilled style={{ color: "#9C27B0" }} />
              ),
          },
          {
            title: "Backend",
            key: "Backend",
            icon: ({ selected }) =>
              selected ? (
                <FolderOpenFilled style={{ color: "#9C27B0" }} />
              ) : (
                <FolderFilled style={{ color: "#9C27B0" }} />
              ),
          },
          {
            title: "Devops",
            key: "Devops",
            icon: ({ selected }) =>
              selected ? (
                <FolderOpenFilled style={{ color: "#9C27B0" }} />
              ) : (
                <FolderFilled style={{ color: "#9C27B0" }} />
              ),
          },
        ],
      },
      {
        title: "Contact",
        key: "Contact",
        icon: ({ selected }) =>
          selected ? (
            <FolderOpenFilled style={{ color: "#E91E63" }} />
          ) : (
            <FolderFilled style={{ color: "#E91E63" }} />
          ),
      },
    ],
  },
];
const SideBar = ({ onSelectSideBar }) => {
  return (
    <Tree
      showIcon
      showLine
      defaultExpandAll
      defaultSelectedKeys={["About"]}
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      onSelect={onSelectSideBar}
    />
  );
};
export default SideBar;
