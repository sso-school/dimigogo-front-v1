import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { useRecoilState } from "recoil";

import Ads from "./Ads";
import Select from "./Select";
import Title from "./Title";

import Menu from "@/components/Menu";
import styles from "@/styles/App";
import { AxiosContext } from "@/utils/AxiosContext";
import { error, render } from "@/utils/log";
import { findDataAtom, findingWayDataAtom } from "@/utils/states";

const FindingWay = async (authAxios, departure, destination) => {
  try {
    const urlDeparture = await authAxios.get("/map/position", {
      params: departure,
    });
    const urlDestination = await authAxios.get("/map/position", {
      params: destination,
    });
    const res = await authAxios.get("/map/carinfo", {
      params: {
        x1: urlDeparture.data.urlX,
        y1: urlDeparture.data.urlY,
        x2: urlDestination.data.urlX,
        y2: urlDestination.data.urlY,
      },
    });
    const nodes = res.data.list[0].sections[0].links
      .map((item) => item.points)
      .join(",")
      .split(",")
      .map((item) => item.split(" "));
    return {
      taxiCoast: res.data.list[0].expectedTaxiCost,
      time: res.data.list[0].expectedTime,
      nodes: nodes,
      data: true,
    };
  } catch (e) {
    error(`${JSON.stringify(e, null, 2)}\n${new Date()}`);
  }
};

const Home = ({ navigation }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [findingWayData, setFindingWayData] = useRecoilState(findingWayDataAtom);
  const { authAxios } = useContext(AxiosContext);

  useEffect(() => {
    if (!findData?.departure.data.x || !findData?.destination.data.x) {
      return;
    }
    (async () => {
      const findingWay = await FindingWay(
        authAxios,
        {
          x: findData.departure.data.x,
          y: findData.departure.data.y,
        },
        {
          x: findData.destination.data.x,
          y: findData.destination.data.y,
        },
      );
      setFindingWayData(findingWay);
    })();
  }, [findData, setFindingWayData]);

  useEffect(() => {
    if (!findingWayData?.data) {
      return;
    }
    Alert.alert(`${Math.round(findingWayData.time / 60)}분 ${findingWayData.taxiCoast.toLocaleString()}원`);
  }, [findingWayData]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    (async () => {
      // setRefreshing(false);
    })();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  render("Home");
  return (
    <View style={styles.fullscreen}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <Title />
        <Ads />
        <Select />
      </ScrollView>
      <Menu navigation={navigation} />
    </View>
  );
};

export default Home;
