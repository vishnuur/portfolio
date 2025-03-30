import React from "react";
import { Tabs } from "antd";
import "./index.scss";
import "./Pages/index.scss"

const TabsMode = ({ onEdit, onChange, items, activeKey }) => {
  return (
    <Tabs
      type="editable-card"
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={items}
      hideAdd
    />
  );
};
export default TabsMode;
