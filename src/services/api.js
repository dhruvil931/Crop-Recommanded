import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/crop";

export const getRecommendation = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/predict`, data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};
