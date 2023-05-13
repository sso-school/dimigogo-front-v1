import { StyleSheet } from "react-native";

import { Colors } from "@/styles/colors";

const styles = StyleSheet.create({
  authView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: Colors.background,
  },
  kakaoLogin: {
    backgroundColor: "#FEE502",
    width: "85%",
    height: 48,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
  },
  kakaoLoginText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: 400,
    marginLeft: 10,
  },
});

export default styles;
