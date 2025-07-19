// src/pages/NotFoundPage.tsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/pages/NotFoundPage.module.css"; // 🔧 CSS module

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1>404</h1>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className={styles.homeLink}>
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
