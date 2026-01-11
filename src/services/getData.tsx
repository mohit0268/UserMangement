import axios from "axios";

const api = axios.create({
  baseURL: "https://reqres.in/api",
});

api.interceptors.request.use((config) => {
  const authStorage = localStorage.getItem("auth-storage");
  const token = authStorage ? JSON.parse(authStorage).token : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  login: (email: string, password: string) =>
    api.post("/signin", { email, password }),
  register: (email: string, password: string) =>
    api.post("/si", { email, password }),
};

export const userService = {
  getUsers: () => api.get("/users"),
};

export default api;
