import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
// import MapView, { Marker, Polyline } from "react-native-maps";
import NaverMapView, { Circle, Marker, Path, Polyline, Polygon } from "react-native-nmap";
import { useRecoilState } from "recoil";

import { LeftSideModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom } from "@/utils/states";

const SelectMapModal = ({ visibleState: [visible, setVisible], type, parentsSetVisible }) => {
  const [selected, setSelected] = [visible, setVisible];
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [outPut, setOutPut] = useState({});
  const [dist, setDist] = useState(0);

  useEffect(() => {
    if (selected.name) {
      setOutPut({
        name: selected.name,
        address: selected.address,
        x: selected.x,
        y: selected.y,
      });
    }
  }, [selected]);

  console.log("Home > Select > SelectMapModal");
  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={`${type} 세부 위치 선택`}>
      {selected.name && outPut?.name && (
        <NaverMapView
          style={{
            width: "100%",
            height: "100%",
          }}
          center={{
            latitude: selected.y,
            longitude: selected.x,
            zoom: 16,
          }}
          onMapClick={(e) => {
            const newOutput = {
              ...outPut,
              x: e.longitude,
              y: e.latitude,
            };
            const dists = getDistance({ latitude: newOutput.y, longitude: newOutput.x }, { latitude: selected.y, longitude: selected.x });
            // console.log(dist);
            if (dists > 500) {
              Alert.alert("검색 위치로부터 500m 이내로 선택해주세요.");
              return;
            }
            setDist(dists);
            setOutPut(newOutput);
          }}>
          <Marker
            coordinate={{
              latitude: outPut.y,
              longitude: outPut.x,
            }}
            caption={{
              text: `${type === "출발지" ? "탑승" : "하차"} 위치\n${dist > 1000 ? `${(dist / 1000).toFixed(2)}km` : `${dist}m`}`,
            }}
            image={require("@/assets/images/icons/album.png")}
          />
          <Marker
            coordinate={{
              latitude: selected.y,
              longitude: selected.x,
            }}
            caption={{
              text: "검색 위치",
            }}
            image={require("@/assets/images/icons/launcher_assistant_on.png")}
          />
        </NaverMapView>
      )}

      <View style={styles.detailSelectButton}>
        <TouchableOpacity
          style={styles.detailSelectButtonView}
          onPress={() => {
            const newFindData = { ...findData };
            newFindData[type === "출발지" ? "departure" : "destination"] = {
              displayName: selected.name,
              data: {
                originX: selected.x,
                originY: selected.y,
                x: outPut.x,
                y: outPut.y,
              },
            };
            setFindData(newFindData);
            parentsSetVisible(false);
            setVisible(false);
          }}>
          <Text style={styles.detailSelectButtonText}>선택하기</Text>
        </TouchableOpacity>
      </View>
    </LeftSideModal>
  );
};

export default SelectMapModal;
