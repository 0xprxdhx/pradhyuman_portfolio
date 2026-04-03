import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { techStack } from "#constants/index.js";
import { Check, Flag, Terminal as TerminalIcon } from "lucide-react";
import WindowControls from "#components/WindowControls";

const Terminal = () => {
  return (
    <>
      {/* Window Header */}
      <div id="window-header">
        <WindowControls target="terminal" />

        <div className="flex items-center gap-2 flex-1 justify-center">
          <TerminalIcon size={12} style={{ color: "var(--kali-green)" }} />
          <h2 className="font-roboto" style={{ color: "var(--kali-text)" }}>
            root@kali: ~/skills
          </h2>
        </div>

        {/* Spacer to balance the controls on the left */}
        <div className="w-12" />
      </div>

      {/* Terminal Body */}
      <div className="techstack">

        {/* Command prompt line */}
        <div className="flex items-center gap-2 mb-4">
          <span style={{ color: "var(--kali-green)" }}>root@kali</span>
          <span style={{ color: "var(--kali-text-dim)" }}>:</span>
          <span style={{ color: "var(--kali-blue)" }}>~/skills</span>
          <span style={{ color: "var(--kali-text-dim)" }}>$</span>
          <span style={{ color: "var(--kali-text)" }}>
            cat tech-stack.txt
          </span>
        </div>

        {/* Column labels */}
        <div className="label">
          <span
            className="w-32"
            style={{ color: "var(--kali-text-dim)" }}
          >
            CATEGORY
          </span>
          <span style={{ color: "var(--kali-text-dim)" }}>
            TECHNOLOGIES
          </span>
        </div>

        {/* Tech stack list */}
        <ul className="content">
          {techStack.map(({ items, category }) => (
            <li
              key={category}
              className="flex items-center"
            >
              <Check
                className="check"
                size={16}
              />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li
                    key={`${i}-${category}`}
                    className="font-roboto"
                    style={{ color: "var(--kali-text)" }}
                  >
                    {item}
                    {i < items.length - 1 && (
                      <span style={{ color: "var(--kali-text-dim)" }}>
                        ,
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footer / footnote */}
        <div className="footnote">
          <p style={{ color: "var(--kali-text)" }}>
            <Flag
              size={13}
              fill="var(--kali-text)"
              style={{ marginRight: "1.25rem" }}
            />
            render time: 6ms
          </p>

          <p>
            <Check size={16} />
            {techStack.length} of {techStack.length} stacks loaded
            successfully (100%)
          </p>
        </div>

        {/* Idle prompt after output */}
        <div className="flex items-center gap-2 mt-5">
          <span style={{ color: "var(--kali-green)" }}>root@kali</span>
          <span style={{ color: "var(--kali-text-dim)" }}>:</span>
          <span style={{ color: "var(--kali-blue)" }}>~/skills</span>
          <span style={{ color: "var(--kali-text-dim)" }}>$</span>
          <span
            className="inline-block w-2 h-4 ml-0.5 animate-pulse"
            style={{ backgroundColor: "var(--kali-green)" }}
          />
        </div>
      </div>
    </>
  );
};

// ✅ Fix: define TerminalWindow BEFORE exporting it
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;