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
    height: 54,
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
    height: 54,
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
    borderRadius: 54,
    height: 54,
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
    height: 54,
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
  searchModal: {
    backgroundColor: Colors.background,
    height: "87%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
  },
  searchModalTop: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    height: 54,
    borderRadius: 100,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchModalClose: {
    marginRight: 10,
  },
  searchModalTopInput: {
    color: Colors.color,
    fontSize: 18,
    fontWeight: "500",
    paddingRight: 25,
  },
  searchSelect: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 54,
    marginVertical: 10,
  },
  searchSelectLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    marginRight: 10,
  },
  searchSelectTitle: {
    color: Colors.color,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  searchSelectAddress: {
    color: Colors.color,
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.5,
  },
  searchSelectM: {
    color: Colors.color,
    fontSize: 14,
    fontWeight: 500,
    opacity: 0.5,
    marginTop: 5,
  },
  mapModal: {
    backgroundColor: Colors.secondary,
    height: "87%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // padding: 20,
  },
  mapModalTop: {
    backgroundColor: Colors.background,
    height: 80,
    width: "100%",
    borderRadius: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  mapModalTopLeftIcon: {
    marginRight: 15,
  },
  mapModalTopRightName: {
    color: Colors.color,
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 5,
  },
  mapModalTopRightAddress: {
    color: Colors.color,
    opacity: 0.5,
    fontSize: 14,
    fontWeight: 500,
  },
  mapModalConfirm: {
    backgroundColor: Colors.background,
    height: 120,
    width: "100%",
    borderRadius: 40,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 20,
  },
  mapModalConfirmButton: {
    backgroundColor: Colors.primary,
    height: 54,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mapModalConfirmButtonText: {
    color: Colors.background,
    fontSize: 18,
    fontWeight: 600,
  },
  dateModal: {
    backgroundColor: Colors.background,
    height: "87%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    // padding: 20,
  },
});

export default styles;
