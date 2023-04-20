import React, { useEffect, useState } from "react";
import { Animated, Image, Linking, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRecoilState } from "recoil";

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

  const [findData, setFindData] = useRecoilState(findDataAtom);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewSize(Number(width * 0.5 - 8));
  };
  return (
    <View style={styles.selects}>
      <SelectWhereModals visible={startModalVisiable} setVisible={setStartModalVisiable} type="departure" />
      <SelectWhereModals visible={endModalVisiable} setVisible={setEndModalVisiable} type="destination" />
      <SelectDateModals visible={dateModalVisiable} setVisible={setDateModalVisiable} />
      <SelectButton />
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
            setDateModalVisiable(true);
          }}
        />
      </View>
      <TouchableOpacity style={styles.selectNextButton}>
        <Text style={styles.selectNextButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};
const SelectWhereModals = ({ visible, setVisible, type }) => {
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([
    {
      name: "한국디지털미디어고등학교",
      address: "경기도 광명시 광명로 1",
      m: 0,
    },
    {
      name: "중앙역 4호선",
      address: "경기 안산시 단원구 중앙대로 918 중앙역",
      m: 2900,
    },
    {
      name: "광명역 경부선(고속철도)",
      address: "경기 광명시 광명역로 21",
      m: 1242,
    },
  ]);
  useEffect(() => {
    console.log(search);
  }, [search]);

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
        {searchList.length &&
          searchList.map((item, index) => {
            return (
              <SearchSelect
                title={item.name}
                address={item.address}
                m={item.m}
                onPress={() => {
                  console.log(item.name);
                  setSelected(item);
                  setMapModalVisible(true);
                }}
                key={index}
              />
            );
          })}
      </View>
    </BlackModal>
  );
};
const SelectMapModal = ({ visible, setVisible, selected, parentsSetVisible, type }) => {
  const [findData, setFindData] = useRecoilState(findDataAtom);
  return (
    <TransparentModal visible={visible} setVisible={setVisible}>
      <View style={styles.mapModal}>
        <View style={styles.mapModalTop}>
          <View styles={styles.mapModalTopLeft}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
              }}>
              <SvgIcon name="ArrowBack" style={styles.mapModalTopLeftIcon} />
            </TouchableOpacity>
          </View>
          <View styles={styles.mapModalTopRight}>
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
const SelectDateModals = ({ visible, setVisible }) => {
  return (
    <BlackModal visible={visible} setVisible={setVisible}>
      <View style={styles.dateModal}>
        <></>
      </View>
    </BlackModal>
  );
};

const SearchSelect = ({ onPress, title, address, m }) => {
  return (
    <TouchableOpacity style={styles.searchSelect} onPress={onPress}>
      <View style={styles.searchSelectLeft}>
        <SvgIcon name="LocationOn" fill={Colors.background} style={styles.searchSelectIcon} width={24} height={24} />
        <Text style={styles.searchSelectM}>{m >= 1000 ? `${Number(m / 1000).toFixed(1)}km` : `${m}m`}</Text>
      </View>
      <View>
        <Text style={styles.searchSelectTitle}>{title}</Text>
        <Text style={styles.searchSelectAddress}>{address}</Text>
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
