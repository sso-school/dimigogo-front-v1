import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import styles from "@/styles/Home";
import { render } from "@/utils/log";
import { authAtom } from "@/utils/states";

const Title = () => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const buttonClick = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setAuth({ accessToken: null, refreshToken: null });
  };

  render("Home > Title");
  return (
    <View style={styles.title}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Dimi</Text>
        <Text style={[styles.titleText, styles.titleTextGreen]}>GOGO</Text>
      </View>
      <TouchableOpacity style={styles.profileView} onPress={buttonClick} />
    </View>
  );
};

export default Title;
