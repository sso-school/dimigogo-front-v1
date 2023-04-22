import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRecoilState } from "recoil";

import { SvgIcon, TransparentModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom } from "@/utils/states";

const SelectMapModal = ({ visible, setVisible, selected, setSelected, parentsSetVisible, type }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });
  const [mapViewSize, setMapViewSize] = useState({ width: 0, height: 0 });
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

  const onLayout = (event, setSize) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  };
  return (
    <TransparentModal visible={visible} setVisible={setVisible}>
      <View style={styles.mapModal}>
        <View style={styles.mapModalTop} onLayout={(e) => onLayout(e, setViewSize)}>
          <View styles={styles.mapModalTopLeft}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}>
              <SvgIcon name="ArrowBack" style={styles.mapModalTopLeftIcon} />
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.mapModalTopRight,
              {
                width: viewSize.width - 100,
              },
            ]}>
            <Text style={styles.mapModalTopRightName}>{selected.name}</Text>
            <Text style={styles.mapModalTopRightAddress}>{selected.address}</Text>
          </View>
        </View>
        <View style={styles.mapModalMap} onLayout={(e) => onLayout(e, setMapViewSize)}>
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
              position: "relative",
              top: -50,
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
          </MapView>
        </View>
        <View style={styles.mapModalConfirm}>
          <TouchableOpacity
            style={styles.mapModalConfirmButton}
            onPress={() => {
              const newFindData = { ...findData };
              newFindData[type] = {
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
            <Text style={styles.mapModalConfirmButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TransparentModal>
  );
};

export default SelectMapModal;
