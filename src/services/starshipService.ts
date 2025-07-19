// src/services/StarshipService.ts
import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";

export const getStarshipList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/starships`);
    return response.data.results; // Array of starships
  } catch (error) {
    console.error("Error fetching starships:", error);
    return [];
  }
};

// 🔽 Bu kısmı yeni ekle
export const getStarshipDetail = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/starships/${id}`);
    return response.data.result.properties;
  } catch (error) {
    console.error("Error fetching starship detail:", error);
    throw error;
  }
};
