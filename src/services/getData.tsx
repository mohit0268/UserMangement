import axios, { type InternalAxiosRequestConfig,type AxiosInstance } from "axios";

if (!axios) {
  throw new Error('Axios is not installed or failed to import. Run: npm install axios');
}
let api: AxiosInstance;

try {
  api = axios.create({
    baseURL: 'https://reqres.in/api',
  });


  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('auth-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  });
} catch (error) {
  console.error('Failed to initialize API service:', error);
  throw error; // Re-throw to halt app if critical
}


export const authService = {
  login: (email: string, password: string) =>
    api.post("/login", { email, password }),
  register: (email: string, password: string) =>
    api.post("/register", { email, password }),
};

export const userService = {
  getUsers: () => api.get("/users"),
};

export default api;
