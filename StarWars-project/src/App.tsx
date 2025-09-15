// src/App.tsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import StarshipDetailPage from "./pages/StarshipDetailPage";
import PeoplePage from "./pages/PeoplePage";
import PeopleDetailPage from "./pages/PeopleDetailPage";
import PlanetsPage from "./pages/PlanetsPage";
import PlanetDetailPage from "./pages/PlanetDetailPage"; // ✅ Added: Planet detail import
import NotFoundPage from "./pages/NotFoundPage";
import FilmDetailPage from "./pages/FilmDetailPage";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/starships/:id" element={<StarshipDetailPage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/people/:id" element={<PeopleDetailPage />} />
        <Route path="/planets" element={<PlanetsPage />} />
        <Route path="/planets/:id" element={<PlanetDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/films/:id" element={<FilmDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
