import { useEffect, useState } from "react";
import "./ThemeSwitch.style.css";

const ThemeSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Varsayılan olarak dark mode

  useEffect(() => {
    // Check saved theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || !savedTheme) {
      // Varsayılan dark veya kayıtlı "dark"
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark-mode");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-mode", !isDarkMode);
  };

  return (
    <div className="theme-switch">
      <label className="switch">
        <input
          id="switch"
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider"></span>
        <span className="decoration"></span>
      </label>
    </div>
  );
};

export default ThemeSwitch;
