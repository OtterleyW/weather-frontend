import axios from "axios";
const baseUrl = "/api";

const getPerceptionsOfCity = id => {
  const request = axios.get(`${baseUrl}/cities/${id}/perceptions`);
  return request.then(response => response.data);
};

const addPerceptionForCity = perceptionObject => {
  console.log("Lisää havainto")
  const request = axios.post(`${baseUrl}/perceptions`, perceptionObject);
  return request.then(response => response.data);
};

export default {getPerceptionsOfCity, addPerceptionForCity};
