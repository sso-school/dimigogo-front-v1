import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, View, TouchableOpacity, ScrollView } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Swiper from "react-native-swiper";
import { atom, useRecoilState } from "recoil";

import { LeftSideModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom } from "@/utils/states";

const selectDateAtom = atom({
  key: "selectDateAtom",
  default: new Date(),
});

const CalendarComp = ({ year, month }) => {
  const [date, setDate] = useRecoilState(selectDateAtom);
  // const year = date.getFullYear();
  // const month = date.getMonth() + 1;
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0);

  const weeks = [];
  let week = [];
  for (let i = 0; i < start.getDay(); i++) {
    //지난 달 것 넣기
    week.push({
      day: new Date(year, month - 2, new Date(year, month - 1, 0).getDate() - start.getDay() + i + 1).getDate(),
      isNotThisMonth: -1,
    });
  }
  for (let i = 1; i <= end.getDate(); i++) {
    week.push({
      day: i,
    });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length !== 0) {
    let j = 1;
    for (let i = week.length; i < 7; i++) {
      week.push({
        day: j++,
        isNotThisMonth: 1,
      });
    }
    weeks.push(week);
  }

  return (
    <>
      <View style={[styles.dateModalDay]}>
        <Text style={styles.dateModalDayMonth}>
          {year}년 {month}월
        </Text>
      </View>
      {weeks.map((week, i) => {
        return (
          <View style={[styles.dateModalDay]} key={i}>
            {week.map(({ day, isNotThisMonth }, j) => {
              const selected = Number(date.getFullYear()) === Number(year) && Number(date.getMonth() + 1) === Number(month) && Number(date.getDate()) === Number(day);

              return isNotThisMonth ? (
                <View style={[styles.dateModalDayTouch]} delayPressIn={0} key={j}>
                  <Text style={[styles.dateModalDayDate, isNotThisMonth && styles.dateModalDayDateGray]}>{day}</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={[styles.dateModalDayTouch, selected && styles.dateModalDayTouchSelected]}
                  key={j}
                  delayPressIn={0}
                  onPress={() => {
                    setDate(new Date(year, month - 1, day));
                  }}>
                  <Text style={[styles.dateModalDayDate, j === 0 && styles.dateModalDayDateRed, j === 6 && styles.dateModalDayDateBlue, selected && styles.dateModalDayDateWhite]}>{day}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}
    </>
  );
};

const SelectDateModal = ({ visibleState: [visible, setVisible] }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [selectDate, setSelectDate] = useRecoilState(selectDateAtom);

  const today = new Date();
  const [calendarInner, setCalendarInner] = useState([<CalendarComp year={today.getFullYear()} month={today.getMonth() + 1} key="0" />, <CalendarComp year={today.getFullYear()} month={today.getMonth() + 2} key="1" />]);
  const [selectTime, setSelectTime] = useState(today.getHours());

  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={"출발 날짜 및 시간 선택"}>
      <View style={styles.dateModalInner}>
        <View style={[styles.dateModalDay, styles.dateModalDayTop]}>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>일</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>월</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>화</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>수</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>목</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>금</Text>
          </View>
          <View style={styles.dateModalDayTouch}>
            <Text style={styles.dateModalDayText}>토</Text>
          </View>
        </View>
        <View style={styles.calendarSwiper}>
          <Swiper
            horizontal={false}
            showsPagination={false}
            loop={false}
            onIndexChanged={(newIndex) => {
              if (newIndex === calendarInner.length - 1) {
                const newMax = new Date(today.getFullYear(), today.getMonth() + newIndex + 1, today.getDate());
                setCalendarInner([...calendarInner, <CalendarComp year={newMax.getFullYear()} month={newMax.getMonth() + 1} key={calendarInner.length} />]);
              }
            }}>
            {calendarInner.map((calendar, i) => calendar)}
          </Swiper>
        </View>
        <Text style={[styles.dateModalT, styles.dateModalTimeT]}>출발 시간 선택</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {[...Array(24).keys()].map((hour, i) => {
            const isThis = selectTime === hour;
            return (
              <TouchableOpacity
                style={[styles.timeView, isThis && styles.timeViewSelect]}
                onPress={() => {
                  setSelectTime(hour);
                }}
                key={i}>
                <Text style={[styles.timeText, isThis && styles.timeTextSelect]}>{hour}시</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <TouchableOpacity
        onPress={() => {
          const newFindData = { ...findData };
          newFindData.date = {
            year: selectDate.getFullYear(),
            month: selectDate.getMonth() + 1,
            day: selectDate.getDate(),
            hour: selectTime,
          };
          setFindData(newFindData);
          setVisible(false);
        }}
        style={styles.dateModalBtn}>
        <View style={styles.dateModalBtnInner}>
          <Text style={styles.dateModalBtnText}>확인</Text>
        </View>
      </TouchableOpacity>
    </LeftSideModal>
  );
};

export default SelectDateModal;
