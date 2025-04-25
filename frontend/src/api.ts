import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Replace with your API base URL if needed
  withCredentials: true, // Include cookies in requests
});

// Add a request interceptor to automatically add the token to all requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const logout = async () => {
  return api.post('/logout');
};

export default api;
