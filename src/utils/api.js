import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import ENV from "@/utils/env";

const api = axios.create({
  baseURL: ENV.apiUrl,
});

export const authApi = axios.create({
  baseURL: ENV.apiUrl,
});

authApi.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log("Request interceptor error:", error);
    return Promise.reject(error);
  },
);

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      try {
        const {
          data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
        } = await api.post("/auth/token", {
          refreshToken,
        });
        await AsyncStorage.setItem("accessToken", newAccessToken);
        await AsyncStorage.setItem("refreshToken", newRefreshToken);

        let originalRequest = {
          ...error.config,
        };
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return await axios(originalRequest);
      } catch (e) {
        await AsyncStorage.removeItem("accessToken");
        await AsyncStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
