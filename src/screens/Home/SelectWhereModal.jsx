import axios from "axios";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useRecoilState } from "recoil";

import { SvgIcon, BlackModal, TransparentModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findDataAtom, hereAtom } from "@/utils/states";

const SelectWhereModal = ({ visible, setVisible, type }) => {
  const [here, setHere] = useRecoilState(hereAtom);
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    if (!search) {
      setSearchList([]);
      return;
    }
    (async () => {
      try {
        const res = await axios.get(`https://map.naver.com/v5/api/instantSearch?lang=ko&caller=pcweb&types=place,address&coords=${here.y},${here.x}&query=${search}`);
        const list = res.data.place.map((item) => {
          return {
            name: item.title,
            address: item.roadAddress || item.jibunAddress,
            x: item.x,
            y: item.y,
            m: item.dist * 1000,
          };
        });
        setSearchList(list);
      } catch {
        console.log("error");
        setSearchList([]);
      }
    })();
  }, [search]);

  const what = type === "departure" ? "출발지" : "도착지";
  return (
    <BlackModal visible={visible} setVisible={setVisible}>
      <View style={styles.searchModal}>
        <SelectMapModal visible={mapModalVisible} setVisible={setMapModalVisible} selected={selected} setSelected={setSelected} parentsSetVisible={setVisible} type={type} />
        <View style={styles.searchModalTop}>
          <TouchableOpacity
            onPress={() => {
              if (search) {
                setSearch("");
              } else {
                setVisible(false);
              }
            }}>
            <SvgIcon name="Close" fill={Colors.background} style={styles.searchModalClose} />
          </TouchableOpacity>
          <TextInput
            placeholder={`${what} 검색`}
            style={styles.searchModalTopInput}
            value={search}
            onChange={(e) => {
              setSearch(e.nativeEvent.text);
            }}
          />
        </View>
        <ScrollView>
          {searchList.length > 0 ? (
            searchList.map((item, index) => {
              return (
                <SearchSelect
                  title={item.name}
                  address={item.address}
                  // m={distance(item.x, item.y, here.x, here.y)}
                  m={getDistance({ latitude: item.y, longitude: item.x }, { latitude: here.y, longitude: here.x })}
                  // m={item.m}
                  onPress={() => {
                    setSelected(item);
                    setMapModalVisible(true);
                  }}
                  key={index}
                />
              );
            })
          ) : (
            <View style={styles.putSearch}>
              <Text style={styles.putSearchText}>검색어를 입력해주세요.</Text>
            </View>
          )}
        </ScrollView>
      </View>
    </BlackModal>
  );
};
const SearchSelect = ({ onPress, title, address, m }) => {
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };
  return (
    <TouchableOpacity style={styles.searchSelect} onPress={onPress} onLayout={onLayout}>
      <View style={styles.searchSelectLeft}>
        <SvgIcon name="LocationOn" fill={Colors.background} style={styles.searchSelectIcon} width={24} height={24} />
        <Text style={styles.searchSelectM}>{m > 100000 ? `${Number(m / 1000).toFixed(0)}km` : m >= 1000 ? `${Number(m / 1000).toFixed(1)}km` : `${Number(m).toFixed(0)}m`}</Text>
      </View>
      <View
        style={[
          styles.searchSelectTitleAddress,
          {
            width: viewSize.width - 80,
          },
        ]}>
        <Text style={styles.searchSelectTitle}>{title}</Text>
        <Text style={styles.searchSelectAddress} lineBreakStrategyIOS="standard">
          {address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
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

export default SelectWhereModal;
