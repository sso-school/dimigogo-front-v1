import React from "react";
import { Text, View } from "react-native";

import styles from "@/styles/Home";

const Title = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>DIMIGO</Text>
      <Text style={[styles.titleText, styles.titleTextGreen]}>GO</Text>
    </View>
  );
};

export default Title;
