import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Platform, StatusBar, View } from "react-native";
import { useRecoilState } from "recoil";

import Auth from "@/screens/auth";
import Home from "@/screens/Home";
import { Colors } from "@/styles/colors";
import { authAtom, fullScreenSizeAtom } from "@/utils/states";

const Main = () => {
  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor(Colors.background);
    StatusBar.setBarStyle("dark-content");
  }

  const [auth, setAuth] = useRecoilState(authAtom);
  const [fullScreenSize, setFullScreenSize] = useRecoilState(fullScreenSizeAtom);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setFullScreenSize({ width, height });
  };
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

  return <View onLayout={onLayout}>{auth.accessToken && auth.refreshToken ? <Home /> : <Auth />}</View>;
};

export default Main;
