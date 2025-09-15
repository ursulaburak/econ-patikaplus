// src/pages/StarshipDetailPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./StarshipDetailPage.module.css";
import { getStarshipDetail } from "../services/starshipService";

interface StarshipDetail {
  name: string;
  model: string;
  manufacturer: string;
  crew: string;
  starship_class: string;
  passengers: string;
  cost_in_credits: string;
  hyperdrive_rating: string;
  max_atmosphering_speed: string;
  length: string;
  cargo_capacity: string;
  [key: string]: any;
}

const StarshipDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [starship, setStarship] = useState<StarshipDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const detail = await getStarshipDetail(id);
        setStarship(detail);
      } catch (err) {
        setError("Failed to fetch starship detail.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className={styles.detailWrapper}>
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.detailWrapper}>
        <p>{error}</p>
      </div>
    );
  if (!starship) return null;

  return (
    <div className={styles.detailWrapper}>
      <div className={styles.detailCard}>
        <h2>{starship.name}</h2>
        <p>
          <strong>Model:</strong> {starship.model}
        </p>
        <p>
          <strong>Class:</strong> {starship.starship_class}
        </p>
        <p>
          <strong>Manufacturer:</strong> {starship.manufacturer}
        </p>
        <p>
          <strong>Cost:</strong> {starship.cost_in_credits} credits
        </p>
        <p>
          <strong>Crew:</strong> {starship.crew}
        </p>
        <p>
          <strong>Passengers:</strong> {starship.passengers}
        </p>
        <p>
          <strong>Speed:</strong> {starship.max_atmosphering_speed}
        </p>
        <p>
          <strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}
        </p>
        <p>
          <strong>Length:</strong> {starship.length} meters
        </p>
        <p>
          <strong>Cargo Capacity:</strong> {starship.cargo_capacity} kg
        </p>
      </div>
    </div>
  );
};

export default StarshipDetailPage;
