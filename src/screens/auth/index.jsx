import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import axios from "axios";
import React, { useEffect } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";

import { SvgIcon } from "@/components";
import styles from "@/styles/Auth";
import api from "@/utils/api";
import { authAtom } from "@/utils/states";

const Auth = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const buttonClick = async () => {
    const kakaoAuthToken = await login();
    console.log(JSON.stringify(kakaoAuthToken, null, 2));
    const {
      data: { accessToken, refreshToken },
    } = await api.post("/auth/login", {
      kakaoAccesstoken: kakaoAuthToken.accessToken,
    });
    setAuth({ accessToken, refreshToken });
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
  };

  return (
    <View style={styles.authView}>
      <Text style={styles.authTitle}>편리하고 값싸게, 디미고고</Text>
      {/* <View style={styles.kakaoLogin}></View> */}
      <TouchableOpacity style={styles.kakaoLogin} onPress={buttonClick}>
        <SvgIcon name="KakaoLogo" style={styles.kakaoLogo} />
        <Text style={styles.kakaoLoginText}>카카오 계정으로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
