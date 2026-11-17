import axios from "axios";

const defaultApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://autoassist-backend-z6mz.onrender.com/api"
    : "http://localhost:5000/api";

export const API_BASE_URL = (process.env.REACT_APP_API_URL || defaultApiUrl).replace(/\/$/, "");

const API = axios.create({
  baseURL: API_BASE_URL,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }

    return Promise.reject(error);
  }
);

export default API;
