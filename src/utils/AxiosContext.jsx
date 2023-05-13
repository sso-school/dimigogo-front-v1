import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useContext, useEffect } from "react";

import ENV from "@/utils/env";

const AxiosContext = createContext();
const { Provider } = AxiosContext;

const AxiosProvider = ({ children }) => {
  const publicAxios = axios.create({
    baseURL: ENV.apiUrl,
  });

  const authAxios = axios.create({
    baseURL: ENV.apiUrl,
  });

  authAxios.interceptors.request.use(
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

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response && error.response.status === 401) {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        try {
          const {
            data: { accessToken: newAccessToken, refreshToken: newRefreshToken },
          } = await publicAxios.post("/auth/token", {
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

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export { AxiosProvider, AxiosContext };
