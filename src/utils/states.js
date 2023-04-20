import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const findCreateSelectAtom = atom({
  key: "findCreateSelectAtom",
  default: 0,
});

const today = new Date();
const todayDate = {
  year: today.getFullYear(),
  month: today.getMonth() + 1,
  day: today.getDate(),
  hour: today.getHours(),
  minute: today.getMinutes(),
};

export const findDataAtom = atom({
  key: "findDataAtom",
  default: {
    departure: {
      displayName: "",
      data: null,
    },
    destination: {
      displayName: "",
      data: null,
    },
    date: todayDate,
  },
});

export const hereAtom = atom({
  key: "hereAtom",
  default: {
    x: 37.34171950000187,
    y: 126.83429287647209,
  },
});