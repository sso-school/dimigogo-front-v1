import React from "react";
import { SafeAreaView } from "react-native";
import { setCustomText } from "react-native-global-props";
import { RecoilRoot } from "recoil";

import Home from "@/screens/Home";
import styles from "@/styles/App";

const App = () => {
  setCustomText({
    style: {
      fontFamily: "SUIT",
    },
  });

  return (
    <RecoilRoot>
      <SafeAreaView style={styles.background}>
        <Home />
      </SafeAreaView>
    </RecoilRoot>
  );
};

export default App;
