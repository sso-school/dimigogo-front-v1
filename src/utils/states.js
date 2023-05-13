import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

export const authAtom = atom({
  key: "authAtom",
  default: {
    accessToken: null,
    refreshToken: null,
  },
});

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
      data: {
        originX: null,
        originY: null,
        x: null,
        y: null,
      },
    },
    destination: {
      displayName: "",
      data: {
        originX: null,
        originY: null,
        x: null,
        y: null,
      },
    },
    date: todayDate,
  },
});

export const findingWayDataAtom = atom({
  key: "findingWayDataAtom",
  default: {},
});

export const hereAtom = atom({
  key: "hereAtom",
  default: {
    x: 126.83429287647209,
    y: 37.34171950000187,
  },
});

export const fullScreenSizeAtom = atom({
  key: "fullScreenAtom",
  default: {
    width: 0,
    height: 0,
  },
});
