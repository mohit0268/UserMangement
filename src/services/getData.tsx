import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from "axios";

if (!axios) {
  throw new Error(
    "Axios is not installed or failed to import. Run: npm install axios"
  );
}

const isDevelopment = import.meta.env.DEV; // Vite env check

let api: AxiosInstance;

if (isDevelopment) {
  console.log("Using mock API for development");

  api = {
    // Mock post method
    post: (url: string, data?: Record<string, unknown>) => {
      console.log("Mock API called with URL:", url, "Data:", data);
      if (url === "/login" || url === "/register") {
        return Promise.resolve({ data: { token: "mock-dev-token-123" } });
      }
      return Promise.reject(
        new Error("Mock not implemented for this endpoint")
      );
    },
    // Mock get method
    get: (url: string) => {
      if (url === "/users") {
        return Promise.resolve({
          data: {
            data: [
              {
                id: 1,
                email: "mock@example.com",
                first_name: "Mock",
                last_name: "User",
                avatar: "",
              },
            ],
          },
        });
      }
      return Promise.reject(
        new Error("Mock not implemented for this endpoint")
      );
    },
    // We add no-op interceptors properties to satisfy AxiosInstance interface
    interceptors: {
      request: { use: () => {} },
      response: { use: () => {} },
    },
    // Add other required AxiosInstance properties as no-op if needed
    defaults: {},
    // ...you can add others if TypeScript complains
  } as unknown as AxiosInstance;
} else {
  console.log("Using real API");
  api = axios.create({
    baseURL: "/api",
  });
}

try {
  api = axios.create({
    baseURL: "https://reqres.in/api",
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const stored = localStorage.getItem("auth-storage");
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
  console.error("Failed to initialize API service:", error);
  throw error; // Re-throw to halt app if critical
}

export const authService = {
  login: (email: string, password: string) =>
    api.post("/login", { email, password }),
  register: (email: string, password: string) =>
    api.post("/register", { email, password }),
};

await authService.login("eve.holt@reqres.in", "cityslicka").catch((error) => {
  if (error.response) {
    // Server responded with a status out of 2xx range
    console.error(
      "API Response error:",
      error.response.status,
      error.response.data
    );
  } else if (error.request) {
    // Request made but no response received
    console.error("Network error: No response received", error.request);
  } else {
    // Something happened setting up the request
    console.error("Axios setup error:", error.message);
  }
});
export const userService = {
  getUsers: () => api.get("/users"),
};

export default api;
