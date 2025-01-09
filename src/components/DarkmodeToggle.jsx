import React, { useState, useEffect, useRef } from "react";
import { useDarkMode } from "../context/DarkMode";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { isDarkMode, theme, toggleDarkMode } = useDarkMode();
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleThemeChange = (selectedTheme) => {
    toggleDarkMode(selectedTheme);
    setIsThemeOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setIsThemeOpen((prev) => !prev)}
        className={`px-4 py-2 border rounded focus:outline-none ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {theme === "light" && <Sun />}
        {theme === "dark" && <Moon />}
        {theme === "os" && <LaptopMinimal />}
      </button>

      <div
        ref={dropdownRef}
        className={`absolute right-0 mt-2 ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        } border border-gray-300 rounded shadow-lg transition-all duration-300 ease-in-out
    ${
      isThemeOpen ? "opacity-100 max-h-40" : "opacity-0 max-h-0 overflow-hidden"
    }
    w-auto max-w-max z-50`}
      >
        <ul className="py-2 flex justify-center items-center flex-col">
          <li
            onClick={() => handleThemeChange("light")}
            className="px-4 py-2 cursor-pointer"
          >
            <Sun />
          </li>
          <li
            onClick={() => handleThemeChange("dark")}
            className="px-4 py-2 cursor-pointer"
          >
            <Moon />
          </li>
          <li
            onClick={() => handleThemeChange("os")}
            className="px-4 py-2 cursor-pointer"
          >
            <LaptopMinimal />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DarkModeToggle;
