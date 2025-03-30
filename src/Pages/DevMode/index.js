import React, { useState, useRef } from "react";
import SideBar from "../../Components/DevMode/SideBar";
import "./index.scss";
import TabsMode from "../../Components/DevMode/Tabs";
import { onEdit, onSelectSideBar, removeTab } from "./utils/tabHandlers";
import { handleMouseDown } from "./utils/resizeHandlers";
import AboutMe from "../../Components/DevMode/Tabs/Pages/About";
import IDEOpen from "../../Components/DevMode/IDE";
import { FaCode } from "react-icons/fa6";

const initialItems = [{ label: "About", children: <AboutMe />, key: "About" }];

export default function DevMode() {
  const [sidebarWidth, setSidebarWidth] = useState(20);
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);
  const [isIDEOpen, setisIDEOpen] = useState(false);

  const openIDE = () => {
    setisIDEOpen(true);
  };

  const closeIDE = () => {
    setisIDEOpen(false);
  };

  return (
    <div className="devWrap">
      <div
        className="sidebar"
        ref={sidebarRef}
        style={{ width: `${sidebarWidth}%` }}
      >
        <SideBar
          onSelectSideBar={(value) =>
            onSelectSideBar(value, setItems, setActiveKey)
          }
        />
        <div
          className="resize-handle"
          onMouseDown={() => handleMouseDown(isResizing, setSidebarWidth)}
        />
      </div>
      <div className="tabs-wrap">
        <TabsMode
          onEdit={(targetKey, action) =>
            onEdit(targetKey, action, setItems, newTabIndex, (key) =>
              removeTab(key, setItems, setActiveKey, activeKey)
            )
          }
          onChange={setActiveKey}
          activeKey={activeKey}
          items={items}
        />
      </div>
      <button className="noselect modal-button" onClick={openIDE}>
        <span className="text">IDE</span>
        <span className="icon">
          <FaCode />
        </span>
      </button>

      {/* <button>
        
      </button> */}
      <IDEOpen
        isModalOpen={isIDEOpen}
        handleOk={openIDE}
        handleCancel={closeIDE}
      />
    </div>
  );
}
