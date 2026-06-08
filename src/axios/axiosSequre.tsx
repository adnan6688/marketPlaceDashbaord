
import axios from "axios"

// Axios instance
const sequreApi = axios.create({
  baseURL: 'http://localhost:5000/api/v1'
});

console.log(import.meta.env.VITE_BASE_URL)

// Request interceptor to attach token
sequreApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");

  if (token) {
    config.headers.Authorization = `${token}`;
  }

  return config;
});

export default sequreApi