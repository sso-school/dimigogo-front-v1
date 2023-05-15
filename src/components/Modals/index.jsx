import React from "react";
import { Pressable } from "react-native";
import Modal from "react-native-modal";

export const BlackModal = ({ setVisible, ...props }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      style={{
        margin: 0,
      }}
      {...props}>
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100%",
          width: "100%",
        }}
        onPress={() => {
          setVisible(false);
        }}
      />
      {props.children}
    </Modal>
  );
};

export const TransparentModal = ({ setVisible, ...props }) => {
  return (
    <Modal
      animationType="slide"
      animationIn="slideInRight"
      animationOut="slideOutRight"
      transparent={true}
      style={{
        margin: 0,
      }}
      {...props}>
      <Pressable
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.0)",
          height: "100%",
          width: "100%",
        }}
        onPress={() => {
          setVisible(false);
        }}
      />
      {props.children}
    </Modal>
  );
};

export { default as LeftSideModal } from "./LeftSlideModal";
