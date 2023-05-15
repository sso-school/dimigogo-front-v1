import React, { useEffect, useState } from "react";
import { BackHandler, PanResponder, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import SvgIcon from "@/components/SvgIcon";
import styles from "@/styles/Modals";

const LeftSideModal = ({ visibleState: [visible, setVisible], title, children, ...props }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackPress);

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleBackPress = () => {
    if (visible) {
      setVisible(false);
      return true; // 이벤트를 소비하여 기본 동작(앱 종료)을 막음
    }

    return false; // 이벤트를 처리하지 않고 기본 동작 수행
  };

  return (
    <Modal
      isVisible={visible}
      style={[
        styles.leftSideModal,
        {
          margin: 0,
        },
      ]}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropOpacity={0}
      animationDuration={1000}>
      <SafeAreaView>
        <View style={styles.leftSideModalInner}>
          <View style={styles.leftSideModal_header}>
            <TouchableOpacity onPress={() => setVisible(false)} style={styles.leftSideModal_header_svg}>
              <SvgIcon name="ArrowBackIosNew" size={24} />
            </TouchableOpacity>
            <Text style={styles.leftSideModal_header_text}>{title}</Text>
          </View>
          {children}
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default LeftSideModal;
