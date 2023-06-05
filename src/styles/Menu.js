import { Platform, StyleSheet } from "react-native";

import { Colors } from "@/styles/colors";

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    paddingVertical: Platform.OS === "ios" ? 10 : 12,
    borderTopColor: Colors.secondary,
    borderTopWidth: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  iconText: {
    fontSize: 12,
    fontWeight: 500,
    color: Colors.icon,
    marginTop: 8,
  },
  iconTextFilled: {
    color: Colors.primary,
  },
});

export default styles;
