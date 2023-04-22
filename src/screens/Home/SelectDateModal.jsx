import React from "react";
import { Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRecoilState } from "recoil";

import { findDataAtom } from "@/utils/states";

const SelectDateModal = ({ visible, setVisible, type }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const typeOrigin = type;
  const getFullDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return Number(`${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`);
  };
  return (
    <DateTimePickerModal
      isVisible={visible}
      mode={type}
      display={type === "date" ? "inline" : type === "time" ? "spinner" : "inline"}
      cancelTextIOS="취소"
      confirmTextIOS="확인"
      onConfirm={(date) => {
        const newFindData = { ...findData };
        newFindData.date = {
          year: null,
          month: null,
          day: null,
          hour: null,
          minute: null,
        };
        if (typeOrigin === "date" && getFullDate(date) < getFullDate()) {
          Alert.alert("이미 지난 날짜는\n선택할 수 없어요 😢");
          setVisible(false);
          return;
        }
        const ifPastToday = date.getTime() < new Date().getTime() && findData.date.year === new Date().getFullYear() && findData.date.month === new Date().getMonth() + 1 && findData.date.day === new Date().getDate();
        if (typeOrigin === "time" && ifPastToday) {
          Alert.alert("이미 지난 시간은\n선택할 수 없어요 😢");
          setVisible(false);
          return;
        }

        if (typeOrigin === "date" && getFullDate(date) === getFullDate() && ifPastToday) {
          newFindData.date = {
            ...newFindData.date,
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
          };
        }

        newFindData.date = {
          year: newFindData.year || date.getFullYear(),
          month: newFindData.month || date.getMonth() + 1,
          day: newFindData.day || date.getDate(),
          hour: newFindData.hour || date.getHours(),
          minute: newFindData.minute || date.getMinutes(),
        };
        setFindData(newFindData);
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
    />
  );
};

export default SelectDateModal;
