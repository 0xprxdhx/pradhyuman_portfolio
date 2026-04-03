import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import { dockApps } from "#constants/index.js";
import useWindowStore from "#store/windows.js";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const win = windows[app.id];
    if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">

        {/* App Separator after first icon (like Kali's app menu pin) */}
        <div
          className="h-6 w-px mx-1 self-center"
          style={{ backgroundColor: "var(--kali-border)" }}
        />

        {dockApps.map(({ id, name, icon, canOpen }) => {
          const isOpen = windows[id]?.isOpen;

          return (
            <div key={id} className="relative flex flex-col items-center">
              <button
                type="button"
                className="dock-icon relative"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                disabled={!canOpen}
                onClick={() => toggleApp({ id, canOpen })}
                style={{
                  backgroundColor: isOpen
                    ? "var(--kali-surface-2)"
                    : "transparent",
                  borderTop: isOpen
                    ? "2px solid var(--kali-blue)"
                    : "2px solid transparent",
                  opacity: canOpen ? 1 : 0.4,
                }}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  className="w-full h-full object-contain"
                  style={{
                    filter: canOpen ? "none" : "grayscale(100%)",
                  }}
                />
              </button>

              {/* Active dot indicator */}
              {isOpen && (
                <span
                  className="absolute -bottom-0 w-1 h-1 rounded-full"
                  style={{ backgroundColor: "var(--kali-blue)" }}
                />
              )}
            </div>
          );
        })}

        {/* Right side clock mirror / spacer — Kali taskbar fills full width */}
        <div className="ml-auto flex items-center px-3 gap-3">
          <span
            className="text-xs font-roboto"
            style={{ color: "var(--kali-text-dim)" }}
          >
            {dockApps.filter(({ id }) => windows[id]?.isOpen).length} window(s) open
          </span>
        </div>

        <Tooltip
          id="dock-tooltip"
          place="top"
          className="tooltip"
        />
      </div>
    </section>
  );
};

export default Dock;