import axios from "axios";
import { getHeaders } from "../utils/GetHeaders";

const link = import.meta.env.VITE_API_URL || "http://localhost:8080";

export const getSuggestions = async (value: string) => {
  try {
    let url = `${link}/api/v1/map/suggestions?input=${value}`;
    const response = await axios.get(url, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
