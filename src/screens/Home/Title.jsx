import React from "react";
import { Text, View } from "react-native";

import styles from "@/styles/Home";

const Title = () => {
  return (
    <View style={styles.title}>
      <View style={styles.titleView}>
        <Text style={styles.titleText}>Dimi</Text>
        <Text style={[styles.titleText, styles.titleTextGreen]}>GOGO</Text>
      </View>
      <View style={styles.profileView} />
    </View>
  );
};

export default Title;
