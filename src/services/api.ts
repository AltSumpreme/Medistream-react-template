import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // change to your EC2 backend URL later
  withCredentials: true,
});

export default api;
