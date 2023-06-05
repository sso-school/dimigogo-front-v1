import React from "react";
import { Text, TouchableOpacity, Vibration, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useRecoilState } from "recoil";

import { SvgIcon } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Menu";
import { urlAtom } from "@/utils/states";

const Menu = ({ navigation }) => {
  const [url, setUrl] = useRecoilState(urlAtom);

  const menuList = [
    { title: "내 예약", name: "AirplaneTicket", url: "Book" },
    { title: "홈", name: "SensorDoor", url: "Home" },
    { title: "마이페이지", name: "Person", url: "MyPage" },
  ];
  return (
    <View style={styles.menu}>
      {menuList.map((_, index) => {
        const isFilled = url === _.url;

        const handlePress = () => {
          // Vibration.vibrate(10);
          //navigation.navigate(_.url);
          navigation.replace(_.url);
          setUrl(_.url);
        };

        return (
          <TouchableOpacity style={styles.iconView} onPress={handlePress} key={index}>
            <SvgIcon name={`${_.name}${isFilled ? "Fill" : ""}`} styles={styles.iconSvg} />
            <Text style={[styles.iconText, isFilled && styles.iconTextFilled]}>{_.title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Menu;
