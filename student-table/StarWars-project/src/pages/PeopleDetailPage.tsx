// src/pages/PeopleDetailPage.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonDetail } from "../services/PeopleService"; // 🔧 Added: Fetches individual character data

// 📌 Info: Define the shape of the person detail response
interface PersonDetail {
  name: string;
  height: string;
  mass: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  [key: string]: any;
}

const PeopleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // 📌 Info: Extract UID from route
  const [person, setPerson] = useState<PersonDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🔧 Added: Fetch character detail on mount
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const data = await getPersonDetail(id);
        setPerson(data);
      } catch (err) {
        setError("Failed to fetch character details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetail();
  }, [id]);

  if (loading)
    return <p style={{ color: "white", padding: "2rem" }}>Loading...</p>;
  if (error) return <p style={{ color: "red", padding: "2rem" }}>{error}</p>;
  if (!person) return null;

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>{person.name}</h2>
      <p>
        <strong>Gender:</strong> {person.gender}
      </p>
      <p>
        <strong>Birth Year:</strong> {person.birth_year}
      </p>
      <p>
        <strong>Height:</strong> {person.height} cm
      </p>
      <p>
        <strong>Mass:</strong> {person.mass} kg
      </p>
      <p>
        <strong>Hair Color:</strong> {person.hair_color}
      </p>
      <p>
        <strong>Eye Color:</strong> {person.eye_color}
      </p>
      <p>
        <strong>Skin Color:</strong> {person.skin_color}
      </p>
    </div>
  );
};

export default PeopleDetailPage;
