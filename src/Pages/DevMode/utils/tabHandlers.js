import AboutMe from "../../../Components/DevMode/Tabs/Pages/About";
import Projects from "../../../Components/DevMode/Tabs/Pages/Projects/projects";
import UnderConstruction from "../../../Components/DevMode/Tabs/Pages/UnderConstruction";

const tabComponents = {
  About: AboutMe,
  Projects: Projects,
  // Add more tabs here as needed
};

export const onSelectSideBar = (value, setItems, setActiveKey) => {
  const tabKey = value[0];
  const Component = tabComponents[tabKey]; // Get the component based on the key

  setItems((prevItems) => {
    const exists = prevItems.some((item) => item.key === tabKey);

    if (!exists) {
      return [
        ...prevItems,
        {
          label: tabKey,
          children: Component ? <Component /> : <UnderConstruction />, // Render dynamically
          key: tabKey,
        },
      ];
    }
    return prevItems;
  });

  setActiveKey(tabKey);
};

export const removeTab = (targetKey, setItems, setActiveKey, activeKey) => {
  setItems((prevItems) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    prevItems.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = prevItems.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      newActiveKey =
        lastIndex >= 0 ? newPanes[lastIndex].key : newPanes[0]?.key;
    }
    setActiveKey(newActiveKey);
    return newPanes;
  });
};

export const onEdit = (targetKey, action, setItems, newTabIndex, removeTab) => {
  if (action === "add") {
    setItems((prevItems) => {
      const newKey = `newTab${newTabIndex.current++}`;
      return [
        ...prevItems,
        { label: "New Tab", children: "Content of new Tab", key: newKey },
      ];
    });
  } else {
    removeTab(targetKey);
  }
};
