import { getDistance } from "geolib";
import React, { useContext, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

import SelectMapModal from "./SelectMapModal";

import { SvgIcon, LeftSideModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { AxiosContext } from "@/utils/AxiosContext";
import { hereAtom } from "@/utils/states";

const SelectWhereModal = ({ visibleState: [visible, setVisible], type }) => {
  const { authAxios } = useContext(AxiosContext);
  const [here, setHere] = useRecoilState(hereAtom);

  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  const getSearch = async () => {
    if (!search) {
      setSearchList([]);
      return;
    }
    try {
      const res = await authAxios.get("/map/search", {
        params: {
          q: search,
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
    } catch (e) {
      console.log(JSON.stringify(e, null, 2));
      setSearchList([]);
    }
  };
  useEffect(() => {
    getSearch();
  }, [search]);

  const [refreshing, setRefreshing] = useState(false);
  const handleRefresh = () => {
    setRefreshing(true);
    (async () => {
      await getSearch();
      setRefreshing(false);
    })();
  };

  const [mapModalVisible, setMapModalVisible] = useState(false);
  console.log("Home > Select > SelectWhereModal");
  return (
    <LeftSideModal visibleState={[visible, setVisible]} title={`${type} 선택`}>
      <SelectMapModal visibleState={[mapModalVisible, setMapModalVisible]} type={type} parentsSetVisible={setVisible} />
      <ScrollView style={styles.selectModalSearchView} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <View style={styles.selectModalSearchViewInner}>
          <TextInput
            placeholder={`${type}를 검색해주세요.`}
            style={styles.selectModalSearchInput}
            placeholderTextColor={Colors.gray}
            value={search}
            onChange={(e) => {
              setSearch(e.nativeEvent.text);
            }}
          />
          <TouchableOpacity>
            <SvgIcon name="Search" style={styles.selectModalSearchViewIcon} />
          </TouchableOpacity>
        </View>

        {searchList.map((_, i) => {
          const m = getDistance({ latitude: _.y, longitude: _.x }, { latitude: here.y, longitude: here.x });

          const onPress = () => {
            setMapModalVisible(_);
          };

          return (
            <View key={i} style={styles.selectModalResultBottom}>
              <TouchableOpacity style={styles.selectModalResult} onPress={onPress}>
                <View>
                  <Text style={styles.selectModalResultTitle}>{_.name}</Text>
                  <Text style={styles.selectModalResultAddr}>{_.address}</Text>
                </View>
                <Text style={styles.selectModalResultKm}>{m > 100000 ? `${Number(m / 1000).toFixed(0)}km` : m >= 1000 ? `${Number(m / 1000).toFixed(1)}km` : `${Number(m).toFixed(0)}m`}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </LeftSideModal>
  );
};

export default SelectWhereModal;
