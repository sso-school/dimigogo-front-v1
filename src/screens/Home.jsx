import React, { useState } from "react";
import { Animated, Image, Linking, Text, TouchableOpacity, View } from "react-native";

import { useRecoilState } from "recoil";

import SvgIcon from "@/components/SvgIcon";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findCreateSelectAtom } from "@/utils/states";

const Title = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>DIMIGO</Text>
      <Text style={[styles.titleText, styles.titleTextGreen]}>GO</Text>
    </View>
  );
};

const Ads = () => {
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };
  return (
    <View style={styles.ads} onLayout={onLayout}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          Linking.openURL("https://dimipay.io/");
        }}
        activeOpacity={1}>
        <Image
          source={require("@/assets/images/ads.png")}
          style={{
            width: viewSize.width,
            height: viewSize.height,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
      {/* <Text>(BANNER ADs)</Text> */}
    </View>
  );
};

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
      useNativeDriver: true, // 네이티브 드라이버 사용 여부
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
const SelectBox = ({ icon, iconStyle, image, title, text, onClick, style }) => {
  return (
    <View style={{ ...styles.select, ...style }}>
      <Text style={styles.selectTitle}>{title}</Text>
      <TouchableOpacity style={styles.selectBox} onClick={onClick}>
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
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewSize(Number(width * 0.5 - 8));
  };
  return (
    <View style={styles.selects}>
      <SelectButton />
      <SelectBox title="출발지" text="한국디지털미디어고등학교" icon="LineStartCircle" />
      <SelectBox
        title="도착지"
        text="광명역"
        icon="LineStartCircle"
        iconStyle={{
          transform: [{ rotate: "180deg" }],
        }}
      />
      <View style={styles.selectWhen} onLayout={onLayout}>
        <SelectBox title="출발 날짜" text="4월 15일" style={{ width: viewSize, marginRight: 8 }} icon="CalendarToday" />
        <SelectBox title="출발 시간" text="18시 30분" style={{ width: viewSize, marginLeft: 8 }} icon="AvgPace" />
      </View>
      <TouchableOpacity style={styles.selectNextButton}>
        <Text style={styles.selectNextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const Home = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <Title />
      <Ads />
      <Select />
    </>
  );
};

export default Home;
