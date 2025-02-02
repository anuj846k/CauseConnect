// src/api/axiosConfig.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://causeconnect-dgu1.onrender.com/', // Set your backend URL
  withCredentials: true, // Allows cookies to be sent for authentication
});

export default api;
