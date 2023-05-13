import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import { authAtom } from "./utils/states";

import Auth from "@/screens/auth";
import Home from "@/screens/Home";

const Main = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        setAuth({
          accessToken,
          refreshToken,
        });
      }
    })();
  }, []);

  return <>{auth.accessToken && auth.refreshToken ? <Home /> : <Auth />}</>;
};

export default Main;
