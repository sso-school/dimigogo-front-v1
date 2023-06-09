import React, { useEffect, useRef, useState } from "react";
import { Alert, Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Swiper from "react-native-swiper";
import { atom, useRecoilState } from "recoil";

import { LeftSideModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { render } from "@/utils/log";
import { findDataAtom } from "@/utils/states";

LocaleConfig.locales.ko = {
  monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  dayNames: ["일", "월", "화", "수", "목", "금", "토"],
  dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
  today: "오늘",
};

LocaleConfig.defaultLocale = "ko";

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

  render("Home > Select > SelectDateModal > CalendarComp");
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
  useEffect(() => {
    console.log(`${selectDate.getFullYear()}-${String(selectDate.getMonth() + 1).padStart(2, "0")}-${String(selectDate.getDate()).padStart(2, "0")}`);
  }, [selectDate]);

  const today = new Date();
  const [calendarInner, setCalendarInner] = useState([<CalendarComp year={today.getFullYear()} month={today.getMonth() + 1} key="0" />, <CalendarComp year={today.getFullYear()} month={today.getMonth() + 2} key="1" />]);
  const [selectTime, setSelectTime] = useState(today.getHours());
  const [selectMin, setSelectMin] = useState(today.getMinutes());

  render("Home > Select > SelectDateModal");
  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={"출발 날짜 및 시간 선택"}>
      <View style={styles.dateModalInner}>
        <Text style={[styles.dateModalT, styles.dateModalTimeT]}>출발 날짜 선택</Text>
        <Calendar
          customHeaderTitle={<></>}
          headerStyle={{
            color: Colors.color,
            opacity: 0.3,
            paddingBottom: 5,
            borderBottomColor: Colors.secondary,
            borderBottomWidth: 2,
          }}
          enableSwipeMonths={true}
          onDayPress={(day) => {
            setSelectDate(new Date(day.timestamp));
          }}
          current={`${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`}
          markedDates={{
            [`${selectDate.getFullYear()}-${String(selectDate.getMonth() + 1).padStart(2, "0")}-${String(selectDate.getDate()).padStart(2, "0")}`]: {
              selected: true,
            },
          }}
          theme={{
            backgroundColor: Colors.background,
            calendarBackground: Colors.background,
            textSectionTitleColor: Colors.color,
            textSectionTitleDisabledColor: Colors.color,
            selectedDayBackgroundColor: Colors.primary,
            selectedDayTextColor: Colors.background,
            todayTextColor: Colors.primary,
            dayTextColor: Colors.color,
            textDisabledColor: `${Colors.color}30`,
            dotColor: Colors.primary,
            selectedDotColor: Colors.background,
            arrowColor: Colors.primary,
            disabledArrowColor: Colors.color,
            monthTextColor: Colors.color,
            indicatorColor: Colors.primary,
            textDayFontFamily: "SUIT",
            textMonthFontFamily: "SUIT",
            textDayHeaderFontFamily: "SUIT",
            textDayFontWeight: "600",
            textMonthFontWeight: "600",
            textDayHeaderFontWeight: "600",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            weekVerticalMargin: 10,
          }}
        />
        {/* </View> */}
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
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timeScroll}>
          {[...Array(12).keys()].map((min, i) => {
            const isThis = Math.floor(selectMin / 5) * 5 === min * 5;
            return (
              <TouchableOpacity
                style={[styles.timeView, isThis && styles.timeViewSelect]}
                onPress={() => {
                  setSelectMin(min * 5);
                }}
                key={i}>
                <Text style={[styles.timeText, isThis && styles.timeTextSelect]}>{min * 5}분</Text>
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
            minute: selectMin,
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
