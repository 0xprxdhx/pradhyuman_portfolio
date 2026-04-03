import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const LINES = [
  { prompt: "root@kali:~$", command: " whoami" },
  { prompt: "root@kali:~$", command: " cat about.txt" },
];

const OUTPUT = [
  "pradhyuman-singh-pancholi",
  "> Full Stack Developer",
  "> Open to work · Based in India",
];

const useTypewriter = (text, speed = 45, startDelay = 0) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayed, done };
};

const Cursor = () => (
  <span
    className="inline-block w-2 h-4 ml-0.5 align-middle animate-pulse"
    style={{ backgroundColor: "var(--kali-green)" }}
  />
);

const Welcome = () => {
  const wrapperRef = useRef(null);

  // Line 1: whoami command
  const line1 = useTypewriter(" whoami", 60, 300);
  // Line 2: cat command — starts after line 1 + output delay
  const line2 = useTypewriter(" cat about.txt", 60, 1800);
  // Output lines staggered after line 2 types
  const out1 = useTypewriter(OUTPUT[0], 40, 3200);
  const out2 = useTypewriter(OUTPUT[1], 40, 4400);
  const out3 = useTypewriter(OUTPUT[2], 40, 5000);

  // Fade in the whole block
  useGSAP(() => {
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <section id="welcome">
      <div
        ref={wrapperRef}
        className="font-roboto text-sm lg:text-base space-y-2 w-full max-w-xl px-4"
      >
        {/* Line 1 — whoami */}
        <div className="flex items-center gap-2">
          <span style={{ color: "var(--kali-green)" }}>root@kali</span>
          <span style={{ color: "var(--kali-text-dim)" }}>:</span>
          <span style={{ color: "var(--kali-blue)" }}>~</span>
          <span style={{ color: "var(--kali-text-dim)" }}>$</span>
          <span style={{ color: "var(--kali-text)" }}>
            {line1.displayed}
            {!line1.done && <Cursor />}
          </span>
        </div>

        {/* Output of whoami */}
        {line1.done && (
          <div
            className="pl-1 text-lg lg:text-2xl font-bold tracking-tight"
            style={{ color: "var(--kali-green)" }}
          >
            {out1.displayed}
            {!out1.done && <Cursor />}
          </div>
        )}

        {/* Line 2 — cat about.txt */}
        {out1.done && (
          <div className="flex items-center gap-2 mt-3">
            <span style={{ color: "var(--kali-green)" }}>root@kali</span>
            <span style={{ color: "var(--kali-text-dim)" }}>:</span>
            <span style={{ color: "var(--kali-blue)" }}>~</span>
            <span style={{ color: "var(--kali-text-dim)" }}>$</span>
            <span style={{ color: "var(--kali-text)" }}>
              {line2.displayed}
              {!line2.done && <Cursor />}
            </span>
          </div>
        )}

        {/* Output of cat */}
        {line2.done && (
          <div className="pl-1 space-y-1">
            <p style={{ color: "var(--kali-text-dim)" }}>
              {out2.displayed}
              {!out2.done && <Cursor />}
            </p>
            {out2.done && (
              <p style={{ color: "var(--kali-text-dim)" }}>
                {out3.displayed}
                {!out3.done && <Cursor />}
              </p>
            )}
          </div>
        )}

        {/* Final blinking cursor — idle terminal */}
        {out3.done && (
          <div className="flex items-center gap-2 mt-3">
            <span style={{ color: "var(--kali-green)" }}>root@kali</span>
            <span style={{ color: "var(--kali-text-dim)" }}>:</span>
            <span style={{ color: "var(--kali-blue)" }}>~</span>
            <span style={{ color: "var(--kali-text-dim)" }}>$</span>
            <Cursor />
          </div>
        )}
      </div>

      {/* Small screen warning */}
      <div className="small-screen">
        <p>
          This portfolio is optimized for desktop/tablet screens only.
        </p>
      </div>
    </section>
  );
};

export default Welcome;