import React from "react";
import { View } from "react-native";

import Ads from "./Ads";
import Select from "./Select";
import Title from "./Title";

const Home = () => {
  return (
    <View>
      <Title />
      <Ads />
      <Select />
    </View>
  );
};

export default Home;
