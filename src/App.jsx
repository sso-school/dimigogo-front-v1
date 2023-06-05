import React from "react";
import { SafeAreaView } from "react-native";
import { setCustomText } from "react-native-global-props";
import { RecoilRoot } from "recoil";

import Main from "./Main";

import styles from "@/styles/App";
import { AxiosProvider } from "@/utils/AxiosContext";

const App = () => {
  setCustomText({
    style: {
      fontFamily: "SUIT",
    },
  });

  return (
    <RecoilRoot>
      <AxiosProvider>
        <Main />
      </AxiosProvider>
    </RecoilRoot>
  );
};

export default App;
