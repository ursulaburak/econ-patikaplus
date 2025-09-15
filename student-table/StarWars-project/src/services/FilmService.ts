import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";

export const getFilmList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/films`);
    return response.data.result || [];
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
};

export const getFilmDetail = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/films/${id}`);
    return response.data.result.properties;
  } catch (error) {
    console.error("Error fetching film detail:", error);
    throw error;
  }
};
