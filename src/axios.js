import axios from "axios";
import store from "./store/index.js";

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
})

export default axiosClient;
