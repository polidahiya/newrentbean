"use client";
import { useEffect, useState } from "react";
import { FaSun, FaMoon, FaAdjust } from "react-icons/fa";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("auto");

  // Apply the theme based on the current theme setting (dark, light, auto)
  const applyTheme = (currentTheme) => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else if (currentTheme === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      // Auto mode: Detect system preference
      const isDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("theme", "auto");
    }
  };

  // Initialize the theme based on stored value or system preferences
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "auto";
    setTheme(storedTheme);
    applyTheme(storedTheme);
  }, []);

  // Handle theme changes
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Add event listener for changes in system preference when in auto mode
  useEffect(() => {
    if (theme === "auto") {
      const systemThemeChangeHandler = (e) => {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };

      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      darkModeMediaQuery.addEventListener("change", systemThemeChangeHandler);

      return () => {
        darkModeMediaQuery.removeEventListener(
          "change",
          systemThemeChangeHandler
        );
      };
    }
  }, [theme]);

  return (
    <div className="flex">
      <button
        onClick={() => handleThemeChange("light")}
        className={`p-2 ${
          theme === "light" ? "text-yellow-500" : "text-gray-500"
        }`}
        aria-label="Set Light Mode"
      >
        <FaSun />
      </button>
      <button
        onClick={() => handleThemeChange("dark")}
        className={`p-2 ${
          theme === "dark" ? "text-blue-500" : "text-gray-500"
        }`}
        aria-label="Set Dark Mode"
      >
        <FaMoon />
      </button>
      <button
        onClick={() => handleThemeChange("auto")}
        className={`p-2 ${theme === "auto" ? "text-white" : "text-gray-500"}`}
        aria-label="Set Auto Mode"
      >
        <FaAdjust />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
