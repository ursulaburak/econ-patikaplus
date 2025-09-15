// src/components/Navbar.tsx

import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/components/Navbar.module.css";

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Starships
        </NavLink>
        <NavLink
          to="/people"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Characters
        </NavLink>
        <NavLink
          to="/planets"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Planets
        </NavLink>{" "}
        {/* 🔧 Added: Link to planets page */}
      </div>
    </nav>
  );
};

export default Navbar;
