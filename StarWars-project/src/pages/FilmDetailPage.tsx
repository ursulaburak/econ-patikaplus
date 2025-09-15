import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilmDetail } from "../services/FilmService";

interface FilmDetail {
  title: string;
  director: string;
  producer: string;
  release_date: string;
  opening_crawl: string;
  [key: string]: any;
}

const FilmDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<FilmDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        setLoading(true);
        const detail = await getFilmDetail(id);
        setFilm(detail);
      } catch (err) {
        setError("Failed to fetch film detail.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchFilm();
  }, [id]);

  if (loading)
    return <p style={{ padding: "2rem", color: "white" }}>Loading...</p>;
  if (error) return <p style={{ padding: "2rem", color: "red" }}>{error}</p>;
  if (!film) return null;

  return (
    <div style={{ padding: "2rem", color: "white" }}>
      <h2>{film.title}</h2>
      <p>
        <strong>Director:</strong> {film.director}
      </p>
      <p>
        <strong>Producer:</strong> {film.producer}
      </p>
      <p>
        <strong>Release Date:</strong> {film.release_date}
      </p>
      <p>
        <strong>Opening Crawl:</strong>
        <br />
        {film.opening_crawl}
      </p>
    </div>
  );
};

export default FilmDetailPage;
