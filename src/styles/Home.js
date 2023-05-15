import { Platform, StyleSheet } from "react-native";

import { Colors } from "@/styles/colors";

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 65,
    paddingHorizontal: 25,
    marginBottom: 5,
  },
  titleView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    color: Colors.color,
    fontSize: 20,
    fontWeight: 700,
  },
  titleTextGreen: {
    color: Colors.primary,
  },
  profileView: {
    backgroundColor: Colors.secondary,
    height: 36,
    width: 36,
    borderRadius: 100,
  },
  ads: {
    height: 110,
    width: "100%",
    paddingHorizontal: 25,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  adsInner: {
    backgroundColor: Colors.secondary,
    width: "100%",
    height: "100%",
    borderRadius: 14,
    overflow: "hidden",
  },
  adsImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  search: {
    marginHorizontal: 25,
    width: "auto",
    backgroundColor: Colors.background,
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 14,
    marginTop: 15,
  },
  selects: {
    backgroundColor: Colors.secondary,
    paddingVertical: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
  },
  selectButtonView: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  selectButtonText: {
    color: Colors.color,
    fontSize: 14,
    fontWeight: 700,
  },
  startEndView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 35,
  },
  sTitle: {
    color: Colors.color,
    fontSize: 12,
    fontWeight: 400,
    opacity: 0.5,
  },
  sWhere: {
    color: Colors.color,
    fontSize: 16,
    fontWeight: 600,
    marginTop: 5,
  },
  s: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
  },
  changeIcon: {
    resizeMode: "contain",
    position: "relative",
    top: "40%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
  },
  bottomBorder: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  dateView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
  },
  date: {
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 6,
  },
  searchView: {
    padding: 10,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    width: "100%",
    height: 45,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: 500,
  },
  selectedBox: {
    backgroundColor: Colors.background,
    width: "50%",
    height: 45,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: Colors.secondary,
    borderWidth: 0.4,
    borderTopWidth: 1,
    borderBottomWidth: 0,
    position: "absolute",
    top: 0,
  },
  selectModalSearchView: {
    paddingHorizontal: 25,
    marginTop: 15,
    width: "100%",
  },
  selectModalSearchViewInner: {
    borderColor: Colors.secondary,
    borderWidth: 2,
    borderRadius: 5,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  selectModalSearchInput: {
    color: Colors.color,
    paddingVertical: Platform.OS === "ios" ? 11 : 8,
    width: "auto",
    fontSize: 14,
    fontWeight: "500",
  },
  selectModalSearchViewIcon: {
    width: 30,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  selectModalResult: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 8,
  },
  selectModalResultBottom: {
    borderBottomColor: Colors.secondary,
    borderBottomWidth: 2,
  },
  selectModalResultTitle: {
    color: Colors.color,
    fontSize: 14,
    fontWeight: 500,
  },
  selectModalResultAddr: {
    color: Colors.color,
    fontSize: 12,
    fontWeight: 500,
    opacity: 0.5,
    marginTop: 3,
  },
  selectModalResultKm: {
    color: Colors.color,
    fontSize: 12,
    fontWeight: 500,
    opacity: 0.5,
  },
  detailSelectButton: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 25,
  },
  detailSelectButtonView: {
    width: "100%",
    backgroundColor: Colors.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 17,
    borderRadius: 7,
  },
  detailSelectButtonText: {
    color: Colors.background,
    fontSize: 14,
    fontWeight: 500,
  },
});

export default styles;
