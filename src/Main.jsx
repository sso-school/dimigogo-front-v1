import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";

import Auth from "@/screens/auth";
import Home from "@/screens/Home";
import { authAtom } from "@/utils/states";

const Main = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  useEffect(() => {
    (async () => {
      const accessToken = await AsyncStorage.getItem("accessToken");
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        setAuth({ accessToken, refreshToken });
      }
    })();
  }, []);

  useEffect(() => {
    console.log(JSON.stringify(auth));
  }, [auth]);

  return <>{auth.accessToken && auth.refreshToken ? <Home /> : <Auth />}</>;
};

export default Main;
