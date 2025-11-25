// import { getToken, removeToken, showErrorToast } from "../utils";
// import { getToken, removeToken } from "@/lib/utils";
import axios from "axios";
import { showErrorToast } from "../utils/toaster";
// import { BASE_URL } from "../config";

// export const baseUrl = "";
const axiosInstance = axios.create({
  baseURL: "https://mixo-fe-backend-task.vercel.app",
});

axiosInstance.interceptors.request.use(
  (config) => {
    // config.headers.Authorization = `Bearer ${getToken() || ""}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
    //   removeToken();
      window.location.reload();
    }
    showErrorToast(
      error?.response?.data?.error?.message || "Something went wrong"
    );

    throw new Error(error?.response?.data?.message);
  }
);

export { axiosInstance };