import axios from "axios";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import SelectMapModal from "./SelectMapModal";

import { SvgIcon, BlackModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { hereAtom } from "@/utils/states";

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
        // const res = await axios.get(`https://search.map.kakao.com/mapsearch/map.daum?q=${search}&msFlag=A&sort=0`);
        const res = await axios.get("https://search.map.kakao.com/mapsearch/map.daum", {
          params: {
            q: search,
            msFlag: "A",
            sort: "0",
          },
          headers: {
            Host: "search.map.kakao.com",
            Referer: "https://map.kakao.com/",
          },
        });
        const list = res.data.place.map((item) => {
          return {
            name: item.name,
            address: item.new_address || item.address,
            x: item.lon,
            y: item.lat,
          };
        });
        list.length > 0 && setSearchList(list);
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

export default SelectWhereModal;
