import { navLinks, navIcons } from "../constants";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [time, setTime] = useState(dayjs().format("HH:mm:ss"));

  // Live clock — Kali shows seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(dayjs().format("ddd DD MMM  HH:mm:ss"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav>
      {/* Left side — Logo + App Menu */}
      <div>
        <img
          src="/images/logo.svg"
          alt="logo"
          className="w-5 h-5 mx-1 invert"
        />

        <p
          className="font-roboto font-bold text-xs px-2 py-1 cursor-pointer"
          style={{ color: "var(--kali-blue)" }}
        >
          Pradhyuman
        </p>

        <ul>
          {navLinks.map(({ id, name }) => (
            <li key={id}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Right side — System Tray + Clock */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img
                src={img}
                className="icon w-4 h-4 invert opacity-70 hover:opacity-100 transition-opacity"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul>

        <time className="font-roboto">{time}</time>
      </div>
    </nav>
  );
};

export default Navbar;