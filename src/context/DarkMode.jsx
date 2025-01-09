import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "os";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      document.documentElement.classList.toggle("dark", prefersDark);
      localStorage.setItem("theme", "os");
    }
  }, [theme]);

  const toggleDarkMode = (selectedTheme) => {
    setTheme(selectedTheme);
    setIsDarkMode(
      selectedTheme === "dark" ||
        (selectedTheme === "os" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, theme, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  return useContext(DarkModeContext);
};
