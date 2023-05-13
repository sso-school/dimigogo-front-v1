import AsyncStorage from "@react-native-async-storage/async-storage";
import { login, logout, getProfile as getKakaoProfile, unlink } from "@react-native-seoul/kakao-login";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import { SvgIcon } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Menu";
import { authAtom, findCreateSelectAtom, findDataAtom } from "@/utils/states";

const IconView = ({ title, name, isFilled }) => {
  const styleFill = isFilled ? "Fill" : "";
  return (
    <TouchableOpacity style={styles.iconView}>
      <SvgIcon name={`${name}${styleFill}`} styles={styles.iconSvg} />
      <Text style={[styles.iconText, isFilled && styles.iconTextFilled]}>{title}</Text>
    </TouchableOpacity>
  );
};

const Menu = () => {
  return (
    <View style={styles.menu}>
      <IconView title="내 예약" name="AirplaneTicket" isFilled={false} />
      <IconView title="홈" name="SensorDoor" isFilled={true} />
      <IconView title="마이페이지" name="Person" isFilled={false} />
    </View>
  );
};

export default Menu;
