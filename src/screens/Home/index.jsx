import React, { useEffect } from "react";
import { Alert, View } from "react-native";
import { useRecoilState } from "recoil";

import Ads from "./Ads";
import Select from "./Select";
import Title from "./Title";

import api from "@/utils/api";
import { findDataAtom, findingWayDataAtom } from "@/utils/states";

const FindingWay = async (departure, destination) => {
  try {
    const urlDeparture = await api.get("/map/position", {
      params: departure,
    });
    const urlDestination = await api.get("/map/position", {
      params: destination,
    });
    const res = await api.get("/map/carinfo", {
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
    console.log(`${JSON.stringify(e, null, 2)}\n${new Date()}`);
  }
};

const Home = () => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [findingWayData, setFindingWayData] = useRecoilState(findingWayDataAtom);

  useEffect(() => {
    if (!findData?.departure.data.x || !findData?.destination.data.x) {
      return;
    }
    (async () => {
      const findingWay = await FindingWay(
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

  // useEffect(() => {
  //   if (!findingWayData?.data) {
  //     return;
  //   }
  //   console.log(JSON.stringify(findingWayData, null, 2));
  // }, [findingWayData]);

  return (
    <View>
      <Title />
      <Ads />
      <Select />
    </View>
  );
};

export default Home;
