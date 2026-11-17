import axios from "axios";

const configuredApiUrl = process.env.REACT_APP_API_URL;

if (process.env.NODE_ENV === "production" && !configuredApiUrl) {
  throw new Error("REACT_APP_API_URL must be configured for production.");
}

export const API_BASE_URL = (configuredApiUrl || "http://localhost:5000/api").replace(/\/$/, "");

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
