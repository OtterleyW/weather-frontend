import axios from "axios";
const baseUrl = "/api";

const getAllPerceptions = () => {
  const request = axios.get(`${baseUrl}/perceptions`);
  return request.then(response => response.data);
};

const addPerceptionForCity = perceptionObject => {
  const request = axios.post(`${baseUrl}/perceptions`, perceptionObject);
  return request.then(response => response.data);
};

export default {
  getAllPerceptions,
  addPerceptionForCity
};
