import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your API base URL if needed
  withCredentials: true // Include cookies in requests
});

export default api;
