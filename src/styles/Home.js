import { StyleSheet } from "react-native";

import { Colors } from "@/styles/colors";

const styles = StyleSheet.create({
  title: {
    backgroundColor: Colors.background,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 65,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  titleText: {
    color: Colors.color,
    fontSize: 20,
    fontWeight: "700",
  },
  titleTextGreen: {
    color: Colors.primary,
  },
  ads: {
    backgroundColor: Colors.secondary,
    position: "relative",
    zIndex: -1,
    top: -50,
    paddingVertical: 50,
    height: 270,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selects: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "relative",
    top: -100,
    height: 500,
    padding: 20,
  },
  selectButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    marginBottom: 20,
  },
  selectButton: {
    borderRadius: 100,
    height: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  selectButtonText: {
    color: Colors.color,
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.5,
  },
  selectButtonTextSelected: {
    opacity: 1,
    color: Colors.background,
  },
  selectButtonBox: {
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: 55,
    width: "50%",
    position: "absolute",
    zIndex: -1,
    top: 0,
    left: 0,
    transform: [{ translateX: 0 }],
  },
  select: {
    marginTop: 20,
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.color,
    opacity: 0.5,
    marginLeft: 10,
    marginBottom: 5,
  },
  selectBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 55,
    height: 55,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  selectText: {
    color: Colors.color,
    fontSize: 16,
    fontWeight: "600",
  },
  selectWhen: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  selectNextButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    height: 55,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  selectNextButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 600,
  },
  selectIcon: {
    marginRight: 10,
  },
});

export default styles;
