import useWindowStore from "#store/windows.js";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div
        className="close"
        onClick={() => closeWindow(target)}
        title="Close"
      />
      <div
        className="minimize"
        onClick={() => minimizeWindow(target)}
        title="Minimize"
      />
      <div
        className="maximize"
        title="Maximize"
      />
    </div>
  );
};

export default WindowControls;