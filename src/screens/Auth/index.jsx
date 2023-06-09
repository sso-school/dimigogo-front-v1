import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Alert, View, Text, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";

import { SvgIcon } from "@/components";
import styles from "@/styles/Auth";
import { AxiosContext } from "@/utils/AxiosContext";
import { render } from "@/utils/log";
import { authAtom, urlAtom } from "@/utils/states";

const Auth = () => {
  const { publicAxios } = useContext(AxiosContext);
  const [auth, setAuth] = useRecoilState(authAtom);
  const [url, setUrl] = useRecoilState(urlAtom);

  const buttonClick = async () => {
    const kakaoAuthToken = await login();
    const {
      data: { accessToken, refreshToken },
    } = await publicAxios.post("/auth/login", {
      kakaoAccesstoken: kakaoAuthToken.accessToken,
    });
    setAuth({
      accessToken,
      refreshToken,
    });
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    setUrl("Home");
  };

  render("Auth");
  return (
    <View style={styles.authView}>
      <SvgIcon name="Logo" style={styles.logo} width={200} height={200} />
      <Text style={styles.authTitle}>
        편리하고 값싸게, <Text style={styles.authTitleDimigogo}>디미고고</Text>
      </Text>
      <Text style={styles.authCont}>모여서 택시타고 경제력과 환경 모두 챙기기</Text>
      <TouchableOpacity style={styles.kakaoLogin} onPress={buttonClick}>
        <SvgIcon name="KakaoLogo" style={styles.kakaoLogo} />
        <Text style={styles.kakaoLoginText}>카카오 계정으로 로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Auth;
