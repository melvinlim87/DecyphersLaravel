import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Replace with your API base URL if needed
  withCredentials: true // Include cookies in requests
});

export default api;
