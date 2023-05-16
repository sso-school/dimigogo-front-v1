import { StyleSheet } from "react-native";

import { Colors } from "@/styles/colors";

const styles = StyleSheet.create({
  leftSideModal: {
    backgroundColor: Colors.background,
    width: "100%",
    margin: 0,
  },
  leftSideModalInner: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  leftSideModal_header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 15,
    paddingBottom: 20,
    borderColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  leftSideModal_header_text: {
    color: Colors.color,
    fontSize: 20,
    fontWeight: 600,
  },
  leftSideModal_header_svg: {
    position: "absolute",
    left: 25,
    width: 40,
    height: "100%",
    paddingTop: 15,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
});

export default styles;
