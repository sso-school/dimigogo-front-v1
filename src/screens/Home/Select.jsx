import React, { useEffect, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import SelectWhereModal from "./SelectWhereModal";

import { SvgIcon } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom } from "@/utils/states";

const Select = () => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  useEffect(() => {
    console.log(findData);
  }, [findData]);

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

  const [modalStartVisible, setModalStartVisible] = useState(false);
  const [modalEndVisible, setModalEndVisible] = useState(false);

  const startEndPress = (type) => {
    if (type === "출발지") {
      setModalStartVisible(true);
    } else {
      setModalEndVisible(true);
    }
  };

  const cutPoem = (poem) => (poem.length >= 8 ? `${poem.substring(0, 8)}...` : poem);

  return (
    <>
      <SelectWhereModal visibleState={[modalStartVisible, setModalStartVisible]} type="출발지" />
      <SelectWhereModal visibleState={[modalEndVisible, setModalEndVisible]} type="도착지" />
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
            <TouchableOpacity style={styles.s} onPress={() => startEndPress("출발지")}>
              <Text style={styles.sTitle}>출발지</Text>
              <Text style={styles.sWhere}>{cutPoem(findData.departure.displayName) || "출발지 선택"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.s} onPress={() => startEndPress("도착지")}>
              <Text style={styles.sTitle}>도착지</Text>
              <Text style={styles.sWhere}>{cutPoem(findData.destination.displayName) || "도착지 선택"}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomBorder}>
          <TouchableOpacity style={styles.dateView}>
            <SvgIcon name="CalendarToday" />
            <Text style={styles.date}>2023년 13월 32일 25시</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchView}>
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>택시 팟 조회하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Select;
