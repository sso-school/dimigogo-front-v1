import React, { useState } from "react";
import { Image, Linking, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

import styles from "@/styles/Home";
import openApp from "@/utils/openApp";

const Ads = () => {
  const [viewSize, setViewSize] = useState({ width: 0, height: 0 });

  const imageData = [
    {
      link: "https://dimipay.io/",
      image: require("@/assets/images/ads/dimipay.png"),
    },
    {
      link: "https://luna.codes/",
      image: require("@/assets/images/ads/luna.png"),
    },
    {
      link: "http://fixking.shop/",
      image: require("@/assets/images/ads/seoulfixking.png"),
    },
    {
      link: "https://connect-impact.org/",
      image: require("@/assets/images/ads/impact.png"),
    },
  ];

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setViewSize({ width, height });
  };
  return (
    <View style={styles.ads} onLayout={onLayout}>
      <Swiper autoplay={true} autoplayTimeout={5} showsPagination={false}>
        {imageData.map((data, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                // Linking.openURL(data.link);
                openApp({
                  android: "intent://route?sp=462699.0,1067400.0&sn=출발지&ep=474329.0,1088232.0&en=도착지&by=car&referrer=m.map.kakao.com#Intent;scheme=daummaps;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;package=net.daum.android.map;end",
                  ios: "kakaomap://route?sp=462699.0,1067400.0&sn=출발지&ep=474329.0,1088232.0&en=도착지&by=car&referrer=m.map.kakao.com",
                  iosStore: "http://itunes.apple.com/kr/app/id304608425",
                  androidStore: "https://play.google.com/store/apps/details?id=net.daum.android.map",
                });
              }}
              activeOpacity={1}
              key={index}>
              <Image
                source={data.image}
                style={{
                  width: viewSize.width,
                  height: viewSize.height,
                  resizeMode: "cover",
                }}
              />
            </TouchableOpacity>
          );
        })}
      </Swiper>

      {/* <Text>(BANNER ADs)</Text> */}
    </View>
  );
};

export default Ads;
