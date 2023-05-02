import { Platform, Linking } from "react-native";

const openApp = ({ android, ios, androidStore, iosStore }) => {
  const address = Platform.OS === "android" ? android : ios;
  const store = Platform.OS === "android" ? androidStore : iosStore;

  try {
    Linking.openURL(address);
  } catch {
    Linking.openURL(store);
  }
  // if (Linking.canOpenURL(address)) {
  //   Linking.openURL(address);
  // } else {
  //   Linking.openURL(store);
  // }
};

export default openApp;
