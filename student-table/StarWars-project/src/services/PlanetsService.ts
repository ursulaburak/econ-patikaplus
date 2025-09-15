// src/services/PlanetsService.ts

import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";

export const getPlanetsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/planets`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching planets:", error);
    return [];
  }
};

// 🔧 Added: Fetches details of a specific planet
export const getPlanetDetail = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/planets/${id}`);
    return response.data.result.properties;
  } catch (error) {
    console.error("Error fetching planet detail:", error);
    throw error;
  }
};
