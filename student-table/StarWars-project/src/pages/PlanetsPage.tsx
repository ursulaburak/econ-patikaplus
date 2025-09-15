// src/pages/PlanetsPage.tsx

import React, { useEffect, useState } from "react";
import { getPlanetsList } from "../services/PlanetsService"; // 🔧 Added: Planet fetch function
import styles from "../styles/pages/PlanetsPage.module.css"; // 🔧 Will be created
import { Link } from "react-router-dom";

interface Planet {
  name: string;
  uid: string;
  url: string;
}

const PlanetsPage: React.FC = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 🔧 Added: Fetch planet list on mount
  useEffect(() => {
    const fetchPlanets = async () => {
      const result = await getPlanetsList();
      setPlanets(result);
      setLoading(false);
    };
    fetchPlanets();
  }, []);

  if (loading) return <p className={styles.loading}>Loading planets...</p>;

  return (
    <div className={styles.pageWrapper}>
      <h2 className={styles.pageTitle}>Star Wars Planets</h2>
      <div className={styles.cardContainer}>
        {planets.map((planet) => (
          <Link
            to={`/planets/${planet.uid}`} // 🔧 Will be linked to detail later
            key={planet.uid}
            className={styles.card}
          >
            <h3>{planet.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlanetsPage;
