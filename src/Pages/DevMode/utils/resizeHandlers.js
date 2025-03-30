export const handleMouseDown = (isResizing, setSidebarWidth) => {
  isResizing.current = true;

  const onMouseMove = (event) => {
    if (!isResizing.current) return;
    const newWidth = (event.clientX / window.innerWidth) * 100;
    if (newWidth >= 20 && newWidth <= 40) {
      setSidebarWidth(newWidth);
    }
  };

  const onMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};
