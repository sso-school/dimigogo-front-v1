import axios from "axios";
import { getDistance } from "geolib";
import React, { useEffect, useState } from "react";
import { Alert, Animated, Image, Linking, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRecoilState } from "recoil";

import { hereAtom } from "../utils/states";

import { SvgIcon, BlackModal, TransparentModal } from "@/components";
import { Colors } from "@/styles/colors";
import styles from "@/styles/Home";
import { findCreateSelectAtom, findDataAtom } from "@/utils/states";

const Title = () => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleText}>DIMIGO</Text>
      <Text style={[styles.titleText, styles.titleTextGreen]}>GO</Text>
    </View>
  );
};

const Ads = () => {
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };
  return (
    <View style={styles.ads} onLayout={onLayout}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => {
          Linking.openURL("https://dimipay.io/");
        }}
        activeOpacity={1}>
        <Image
          source={require("@/assets/images/ads.png")}
          style={{
            width: viewSize.width,
            height: viewSize.height,
            resizeMode: "cover",
          }}
        />
      </TouchableOpacity>
      {/* <Text>(BANNER ADs)</Text> */}
    </View>
  );
};

const SelectButton = ({ onPress, selected }) => {
  const [select, setSelect] = useRecoilState(findCreateSelectAtom);
  const [locateAnimatedValue] = useState(new Animated.Value(0));

  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };

  const setChange = (num) => {
    setSelect(num);
    Animated.timing(locateAnimatedValue, {
      toValue: Number(`${num * viewSize.width * 0.5}`),
      duration: 250,
      useNativeDriver: true,
    }).start();
  };
  const checkStyle = (num) => {
    return select === num ? [styles.selectButtonText, styles.selectButtonTextSelected] : [styles.selectButtonText];
  };

  return (
    <View style={styles.selectButtons} onLayout={onLayout}>
      <Animated.View
        style={[
          styles.selectButtonBox,
          {
            transform: [{ translateX: locateAnimatedValue }],
          },
        ]}
      />
      <TouchableOpacity style={styles.selectButton} onPress={() => setChange(0)} activeOpacity={1}>
        <Text style={checkStyle(0)}>찾아보기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.selectButton} onPress={() => setChange(1)} activeOpacity={1}>
        <Text style={checkStyle(1)}>생성하기</Text>
      </TouchableOpacity>
    </View>
  );
};
const SelectBox = ({ icon, iconStyle, image, title, text, onPress, style }) => {
  return (
    <View style={{ ...styles.select, ...style }}>
      <Text style={styles.selectTitle}>{title}</Text>
      <TouchableOpacity style={styles.selectBox} onPress={onPress}>
        {icon && (
          <View style={styles.selectIcon}>
            <SvgIcon name={icon} fill={Colors.background} style={iconStyle} />
          </View>
        )}
        <Text style={styles.selectText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const Select = () => {
  const [viewSize, setViewSize] = useState(0);
  const [startModalVisiable, setStartModalVisiable] = useState(false);
  const [endModalVisiable, setEndModalVisiable] = useState(false);
  const [dateModalVisiable, setDateModalVisiable] = useState(false);
  const [timeModalVisiable, setTimeModalVisiable] = useState(false);
  const [findData, setFindData] = useRecoilState(findDataAtom);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewSize(Number(width * 0.5 - 8));
  };
  return (
    <View style={styles.selects}>
      <SelectWhereModals visible={startModalVisiable} setVisible={setStartModalVisiable} type="departure" />
      <SelectWhereModals visible={endModalVisiable} setVisible={setEndModalVisiable} type="destination" />
      <SelectDateModals visible={dateModalVisiable} setVisible={setDateModalVisiable} type="date" />
      <SelectDateModals visible={timeModalVisiable} setVisible={setTimeModalVisiable} type="time" />
      <SelectButton />
      <ScrollView style={{ height: 10 }}>
        <SelectBox
          title="출발지"
          text={findData.departure.displayName || "출발지를 선택해주세요."}
          icon="LineStartCircle"
          onPress={() => {
            setStartModalVisiable(true);
          }}
        />
        <SelectBox
          title="도착지"
          text={findData.destination.displayName || "도착지를 선택해주세요."}
          icon="LineStartCircle"
          iconStyle={{
            transform: [{ rotate: "180deg" }],
          }}
          onPress={() => {
            setEndModalVisiable(true);
          }}
        />
        <View style={styles.selectWhen} onLayout={onLayout}>
          <SelectBox
            title="출발 날짜"
            text={`${findData.date.month}월 ${findData.date.day}일`}
            style={{ width: viewSize, marginRight: 8 }}
            icon="CalendarToday"
            onPress={() => {
              setDateModalVisiable(true);
            }}
          />
          <SelectBox
            title="출발 시간"
            text={`${findData.date.hour}시 ${findData.date.minute}분`}
            style={{ width: viewSize, marginLeft: 8 }}
            icon="AvgPace"
            onPress={() => {
              setTimeModalVisiable(true);
            }}
          />
        </View>
        <TouchableOpacity style={styles.selectNextButton}>
          <Text style={styles.selectNextButtonText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const SelectWhereModals = ({ visible, setVisible, type }) => {
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
        const res = await axios.get(`https://map.naver.com/v5/api/instantSearch?lang=ko&caller=pcweb&types=place,address&coords=${here.x},${here.y}&query=${search}`);
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

  const distance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // 지구 반지름(m)
    const phi1 = (lat1 * Math.PI) / 180; // 위도1
    const phi2 = (lat2 * Math.PI) / 180; // 위도2
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180; // 위도 차이
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180; // 경도 차이

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) + Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // 두 지점 사이의 거리(m)

    return d;
  };

  const what = type === "departure" ? "출발지" : "도착지";
  return (
    <BlackModal visible={visible} setVisible={setVisible}>
      <View style={styles.searchModal}>
        <SelectMapModal visible={mapModalVisible} setVisible={setMapModalVisible} selected={selected} parentsSetVisible={setVisible} type={type} />
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
                  m={getDistance({ latitude: item.x, longitude: item.y }, { latitude: here.x, longitude: here.y })}
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
const SelectMapModal = ({ visible, setVisible, selected, parentsSetVisible, type }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };
  return (
    <TransparentModal visible={visible} setVisible={setVisible}>
      <View style={styles.mapModal}>
        <View style={styles.mapModalTop} onLayout={onLayout}>
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

        <View style={styles.mapModalConfirm}>
          <TouchableOpacity
            style={styles.mapModalConfirmButton}
            onPress={() => {
              const newFindData = { ...findData };
              newFindData[type] = {
                displayName: selected.name,
                data: null,
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
const SelectDateModals = ({ visible, setVisible, type }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  const typeOrigin = type;
  const getFullDate = (date = new Date()) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return Number(`${year}${month < 10 ? `0${month}` : month}${day < 10 ? `0${day}` : day}`);
  };
  return (
    <DateTimePickerModal
      isVisible={visible}
      mode={type}
      display={type === "date" ? "inline" : type === "time" ? "spinner" : "inline"}
      cancelTextIOS="취소"
      confirmTextIOS="확인"
      onConfirm={(date) => {
        const newFindData = { ...findData };
        newFindData.date = {
          year: null,
          month: null,
          day: null,
          hour: null,
          minute: null,
        };
        if (typeOrigin === "date" && getFullDate(date) < getFullDate()) {
          Alert.alert("이미 지난 날짜는\n선택할 수 없어요 😢");
          setVisible(false);
          return;
        }
        const ifPastToday = date.getTime() < new Date().getTime() && findData.date.year === new Date().getFullYear() && findData.date.month === new Date().getMonth() + 1 && findData.date.day === new Date().getDate();
        if (typeOrigin === "time" && ifPastToday) {
          Alert.alert("이미 지난 시간은\n선택할 수 없어요 😢");
          setVisible(false);
          return;
        }

        if (typeOrigin === "date" && getFullDate(date) === getFullDate() && ifPastToday) {
          newFindData.date = {
            ...newFindData.date,
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
          };
        }

        newFindData.date = {
          year: newFindData.year || date.getFullYear(),
          month: newFindData.month || date.getMonth() + 1,
          day: newFindData.day || date.getDate(),
          hour: newFindData.hour || date.getHours(),
          minute: newFindData.minute || date.getMinutes(),
        };
        setFindData(newFindData);
        setVisible(false);
      }}
      onCancel={() => {
        setVisible(false);
      }}
    />
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

const Home = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <>
      <Title />
      <Ads />
      <Select />
    </>
  );
};

export default Home;
