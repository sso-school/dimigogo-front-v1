import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Children, useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import Auth from "@/screens/Auth";
import { Book } from "@/screens/Book";
import Home from "@/screens/Home";
import MyPage from "@/screens/MyPage";
import styles from "@/styles/App";
import { Colors } from "@/styles/colors";
import { authAtom, fullScreenSizeAtom } from "@/utils/states";

const Stack = createStackNavigator();

const Main = () => {
  if (Platform.OS === "android") {
    StatusBar.setBackgroundColor(Colors.background);
    StatusBar.setBarStyle("dark-content");
  }

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

  return auth.accessToken && auth.refreshToken ? (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: false,
          }}>
          <Stack.Screen name="Book" component={Book} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="MyPage" component={MyPage} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  ) : (
    <Auth />
  );
};

export default Main;
