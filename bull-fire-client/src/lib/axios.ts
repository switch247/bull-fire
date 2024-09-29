// src/lib/axios.ts
import Axios from "axios";

const axios = Axios.create({
  baseURL: import.meta.env.PROD ? "/api" : "http://localhost:5000/api",
  timeout: 10000,
});

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    config.headers["X-Requested-With"] = "XMLHttpRequest";
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axios.interceptors.response.use(
  (res) => res.data,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axios;
