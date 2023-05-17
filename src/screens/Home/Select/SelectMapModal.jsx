import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRecoilState } from "recoil";

import { LeftSideModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom } from "@/utils/states";

const SelectMapModal = ({ visibleState: [visible, setVisible], type, parentsSetVisible }) => {
  const [selected, setSelected] = [visible, setVisible];
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [outPut, setOutPut] = useState({});

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

  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={`${type} 세부 위치 선택`}>
      <MapView
        initialRegion={{
          latitude: selected.y,
          longitude: selected.x,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        onPress={(e) => {
          const newOutput = {
            ...outPut,
            x: e.nativeEvent.coordinate.longitude,
            y: e.nativeEvent.coordinate.latitude,
          };
          const dist = getDistance({ latitude: newOutput.y, longitude: newOutput.x }, { latitude: selected.y, longitude: selected.x });
          // console.log(dist);
          if (dist > 500) {
            Alert.alert(`500m 이내로 선택해주세요.\n현재 거리: ${dist > 1000 ? `${(dist / 1000).toFixed(2)}km` : `${dist}m`}`);
            return;
          }
          setOutPut(newOutput);
        }}>
        {outPut.x && outPut.y && selected.x && selected.y && (
          <>
            <Marker
              coordinate={{
                latitude: outPut.y,
                longitude: outPut.x,
              }}
            />
            <Polyline
              coordinates={[
                {
                  latitude: outPut.y,
                  longitude: outPut.x,
                },
                {
                  latitude: selected.y,
                  longitude: selected.x,
                },
              ]}
              strokeColor={Colors.primary}
              strokeWidth={3}
            />
            <Marker
              coordinate={{
                latitude: selected.y,
                longitude: selected.x,
              }}
              title={selected.name}
              description={selected.address}
            />
          </>
        )}
      </MapView>
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
