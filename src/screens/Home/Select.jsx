import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import SelectDateModal from "./SelectDateModal";
import SelectWhereModal from "./SelectWhereModal";

import { SvgIcon } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { authAtom, findCreateSelectAtom, findDataAtom } from "@/utils/states";

const Select = () => {
  const [isSearch, setIsSearch] = useState(0);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const [position] = useState(new Animated.Value(0));

  useEffect(() => {
    if (position._value === 1) {
      Animated.timing(position, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [position]);

  const handleLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setParentSize({ width, height });
  };
  return (
    <View style={styles.search}>
      <TouchableOpacity
        style={styles.selects}
        onLayout={handleLayout}
        activeOpacity={1}
        onPress={() => {
          Animated.timing(position, {
            toValue: !isSearch,
            duration: 200,
            useNativeDriver: false,
          }).start();
          setIsSearch(!isSearch);
        }}>
        <Animated.View
          style={{
            ...styles.selectedBox,
            transform: [
              {
                translateX: position.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, parentSize.width * 0.5],
                }),
              },
            ],
          }}
        />
        <View style={styles.selectButtonView}>
          <Text style={styles.selectButtonText}>검색하기</Text>
        </View>
        <View style={styles.selectButtonView}>
          <Text style={styles.selectButtonText}>택시 팟 생성하기</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.bottomBorder}>
        <View style={styles.changeIcon}>
          <SvgIcon name="ArrowRange" width={20} height={20} fill={Colors.gray} />
        </View>
        <View style={styles.startEndView}>
          <View style={styles.s}>
            <Text style={styles.sTitle}>출발지</Text>
            <Text style={styles.sWhere}>한국디지털...</Text>
          </View>
          <View style={styles.s}>
            <Text style={styles.sTitle}>도착지</Text>
            <Text style={styles.sWhere}>한미...</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomBorder}>
        <View style={styles.dateView}>
          <SvgIcon name="CalendarToday" />
          <Text style={styles.date}>2023년 13월 32일 25시</Text>
        </View>
      </View>
      <View style={styles.searchView}>
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>택시 팟 조회하기</Text>
        </View>
      </View>
    </View>
  );
};

export default Select;
