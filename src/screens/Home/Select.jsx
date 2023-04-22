import React, { useState } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import SelectDateModal from "./SelectDateModal";
import SelectWhereModal from "./SelectWhereModal";

import { SvgIcon } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findCreateSelectAtom, findDataAtom } from "@/utils/states";

const SelectButton = ({ onPress, selected }) => {
  const [select, setSelect] = useRecoilState(findCreateSelectAtom);
  const [locateAnimatedValue] = useState(new Animated.Value(0));

  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };

  const setChange = (num) => {
    setSelect(num);
    Animated.timing(locateAnimatedValue, {
      toValue: Number(`${num * viewSize.width * 0.5}`),
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const checkStyle = (num) => {
    return select === num ? [styles.selectButtonText, styles.selectButtonTextSelected] : [styles.selectButtonText];
  };

  return (
    <View style={styles.selectButtons} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.selectButtonBox,
          {
            transform: [{ translateX: locateAnimatedValue }],
          },
        ]}
      />
      <TouchableOpacity style={styles.selectButton} onPress={() => setChange(0)} activeOpacity={1}>
        <Text style={checkStyle(0)}>찾아보기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectButton} onPress={() => setChange(1)} activeOpacity={1}>
        <Text style={checkStyle(1)}>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const SelectBox = ({ icon, iconStyle, image, title, text, onPress, style }) => {
  return (
    <View style={{ ...styles.select, ...style }}>
      <Text style={styles.selectTitle}>{title}</Text>
      <TouchableOpacity style={styles.selectBox} onPress={onPress}>
        {icon && (
          <View style={styles.selectIcon}>
            <SvgIcon name={icon} fill={Colors.background} style={iconStyle} />
          </View>
        )}
        <Text style={styles.selectText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Select = () => {
  const [viewSize, setViewSize] = useState(0);
  const [startModalVisiable, setStartModalVisiable] = useState(false);
  const [endModalVisiable, setEndModalVisiable] = useState(false);
  const [dateModalVisiable, setDateModalVisiable] = useState(false);
  const [timeModalVisiable, setTimeModalVisiable] = useState(false);
  const [findData, setFindData] = useRecoilState(findDataAtom);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewSize(Number(width * 0.5 - 8));
  };
  return (
    <View style={styles.selects}>
      <SelectWhereModal visible={startModalVisiable} setVisible={setStartModalVisiable} type="departure" />
      <SelectWhereModal visible={endModalVisiable} setVisible={setEndModalVisiable} type="destination" />
      <SelectDateModal visible={dateModalVisiable} setVisible={setDateModalVisiable} type="date" />
      <SelectDateModal visible={timeModalVisiable} setVisible={setTimeModalVisiable} type="time" />
      <SelectButton />
      <ScrollView style={{ height: 10 }}>
        <SelectBox
          title="출발지"
          text={findData.departure.displayName || "출발지를 선택해주세요."}
          icon="LineStartCircle"
          onPress={() => {
            setStartModalVisiable(true);
          }}
        />
        <SelectBox
          title="도착지"
          text={findData.destination.displayName || "도착지를 선택해주세요."}
          icon="LineStartCircle"
          iconStyle={{
            transform: [{ rotate: "180deg" }],
          }}
          onPress={() => {
            setEndModalVisiable(true);
          }}
        />
        <View style={styles.selectWhen} onLayout={onLayout}>
          <SelectBox
            title="출발 날짜"
            text={`${findData.date.month}월 ${findData.date.day}일`}
            style={{ width: viewSize, marginRight: 8 }}
            icon="CalendarToday"
            onPress={() => {
              setDateModalVisiable(true);
            }}
          />
          <SelectBox
            title="출발 시간"
            text={`${findData.date.hour}시 ${findData.date.minute}분`}
            style={{ width: viewSize, marginLeft: 8 }}
            icon="AvgPace"
            onPress={() => {
              setTimeModalVisiable(true);
            }}
          />
        </View>
        <TouchableOpacity style={styles.selectNextButton}>
          <Text style={styles.selectNextButtonText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Select;
