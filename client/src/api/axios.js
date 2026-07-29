import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL:import.meta.env.VITE_API_URL
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default API;