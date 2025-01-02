import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.url.endsWith("/login") && !config.url.endsWith("/register/")) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Token ${token}`;
      }
    }
    return config;
  },
  (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default instance;
