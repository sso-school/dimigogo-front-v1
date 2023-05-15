import React from "react";
import { Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRecoilState } from "recoil";

import { LeftSideModal } from "@/components";
import { findDataAtom } from "@/utils/states";

const SelectDateModal = ({ visibleState: [visible, setVisible] }) => {
  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={"출발 시간 선택"}>
      <></>
    </LeftSideModal>
  );
};

export default SelectDateModal;
