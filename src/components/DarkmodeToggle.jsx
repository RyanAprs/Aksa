import React from "react";
import { useDarkMode } from "../context/DarkMode";
import { LaptopMinimal, Moon, Sun } from "lucide-react";

const DarkModeToggle = () => {
  const { isDarkMode, theme, toggleDarkMode } = useDarkMode();

  const handleThemeChange = () => {
    const nextTheme =
      theme === "os" ? "dark" : theme === "dark" ? "light" : "os";
    toggleDarkMode(nextTheme);
  };

  return (
    <div className="relative">
      <button
        onClick={handleThemeChange}
        className={`px-4 py-2 rounded focus:outline-none flex items-center justify-center ${
          isDarkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        {theme === "light" && <Sun />}
        {theme === "dark" && <Moon />}
        {theme === "os" && <LaptopMinimal />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
