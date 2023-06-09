import React, { useEffect } from "react";
import { Alert, BackHandler, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import SvgIcon from "@/components/SvgIcon";
import styles from "@/styles/Modals";

const LeftSideModal = ({ visibleState: [visible, setVisible], title, children }) => {
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
