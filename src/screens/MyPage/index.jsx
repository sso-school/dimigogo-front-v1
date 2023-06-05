import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRecoilState } from "recoil";

import Menu from "@/components/Menu";
import styles from "@/styles/App";
import { AxiosContext } from "@/utils/AxiosContext";
import { render } from "@/utils/log";
import { authAtom, findDataAtom, findingWayDataAtom, urlAtom } from "@/utils/states";

const MyPage = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    (async () => {
      // setRefreshing(false);
    })();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const [auth, setAuth] = useRecoilState(authAtom);
  const logoutClick = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    setAuth({ accessToken: null, refreshToken: null });
  };

  render("MyPage");

  return (
    <View style={styles.fullscreen}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <TouchableOpacity onPress={logoutClick}>
          <Text>로그아웃</Text>
        </TouchableOpacity>
      </ScrollView>
      <Menu navigation={navigation} />
    </View>
  );
};

export default MyPage;
