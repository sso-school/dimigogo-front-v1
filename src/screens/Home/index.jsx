import axios from "axios";
import proj4 from "proj4";
import React, { useEffect } from "react";
import { View } from "react-native";
import { useRecoilState } from "recoil";

import Ads from "./Ads";
import Select from "./Select";
import Title from "./Title";

import { findDataAtom } from "@/utils/states";

const TaxiCoast = async (departure, destination) => {
  const calculateXY = ({ x: lng, y: lat }) => {
    const EPSG4326 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";
    const EPSG5181 = "+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs";

    const convertedCoords = proj4(EPSG4326, EPSG5181, [lng, lat]);

    return { x: convertedCoords[1], y: convertedCoords[0] };
  };
  const cDeparture = calculateXY(departure);
  const cDestination = calculateXY(destination);
  console.log(cDeparture, cDestination);
};

const Home = () => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  useEffect(() => {
    TaxiCoast(
      {
        x: 127.108212,
        y: 37.402056,
      },
      {
        x: 126.88480397548885,
        y: 37.41645134181114,
      },
    );
  }, []);
  return (
    <View>
      <Title />
      <Ads />
      <Select />
    </View>
  );
};

export default Home;
