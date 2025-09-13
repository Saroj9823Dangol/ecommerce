import axios from "axios";

// Create a custom Axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000, // 10 seconds
  withCredentials: true, // Important for cookies, authentication
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from wherever you store it (e.g., localStorage, Redux store, etc.)
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    // You can modify the response data here before it's passed to the component
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors (token expired, invalid, etc.)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(
            `${
              import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api"
            }/auth/refresh`,
            { refreshToken }
          );

          const { token } = response.data;
          localStorage.setItem("authToken", token);

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      } catch (error) {
        // If refresh token fails, redirect to login
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

// Helper functions for common HTTP methods
const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
  // Add other methods as needed
};

export default api;
