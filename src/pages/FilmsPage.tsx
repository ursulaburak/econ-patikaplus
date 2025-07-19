// src/pages/FilmsPage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFilmList } from "../services/FilmService";

interface Film {
  uid: string;
  name: string;
  url: string;
}

const FilmsPage: React.FC = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFilms = async () => {
      setLoading(true);
      const result = await getFilmList();
      setFilms(result);
      setLoading(false);
    };

    fetchFilms();
  }, []);

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>Films</h2>
      {loading ? (
        <p>Loading films...</p>
      ) : (
        <ul>
          {films.map((film) => (
            <li key={film.uid}>
              <Link to={`/films/${film.uid}`} style={{ color: "#58a6ff" }}>
                {film.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilmsPage;
