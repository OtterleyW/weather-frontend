import axios from "axios";
const baseUrl = "http://localhost:3001/api/cities";

const getPerceptionsOfCity = id => {
  const request = axios.get(`${baseUrl}/${id}/perceptions`);
  return request.then(response => response.data);
};

const addPerceptionsOfCity = id => {
  const request = axios.put(`${baseUrl}/${id}/perceptions`);
  return request.then(response => response.data);
};

export default {getPerceptionsOfCity, addPerceptionsOfCity};
