import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, RefreshControl, SafeAreaView, ScrollView, Text, View } from "react-native";
import { useRecoilState } from "recoil";

import Menu from "@/components/Menu";
import styles from "@/styles/App";
import { AxiosContext } from "@/utils/AxiosContext";
import { authAtom, findDataAtom, findingWayDataAtom } from "@/utils/states";

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

  return (
    <View style={styles.fullscreen}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <Text>MyPage</Text>
      </ScrollView>
      <Menu navigation={navigation} />
    </View>
  );
};

export default MyPage;
