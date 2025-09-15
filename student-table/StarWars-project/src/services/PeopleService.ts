// src/services/PeopleService.ts
import axios from "axios";

const BASE_URL = "https://www.swapi.tech/api";

export const getPeopleList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/people`);
    return response.data.results; // Array of people (name, uid, url)
  } catch (error) {
    console.error("Error fetching people:", error);
    return [];
  }
};


export const getPersonDetail = async (id: string | undefined) => {
  try {
    const response = await axios.get(`${BASE_URL}/people/${id}`);
    return response.data.result.properties;
  } catch (error) {
    console.error("Error fetching person detail:", error);
    throw error;
  }
};
