import React from "react";
import Svg, { Path, G, Mask, Rect } from "react-native-svg";

export const Logo = ({ ...props }) => (
  <Svg width="180" height="180" viewBox="0 0 721 563" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M473.156 563C431.849 563 396.487 548.299 367.072 518.898C337.656 489.497 322.948 454.153 322.948 412.867V150.133C322.948 129.49 315.594 111.818 300.886 97.1175C286.178 82.4169 268.497 75.0667 247.844 75.0667C227.19 75.0667 209.509 82.4169 194.801 97.1175C180.094 111.818 172.74 129.49 172.74 150.133V418.497L206.536 384.717C213.421 377.836 222.027 374.395 232.354 374.395C242.68 374.395 251.599 378.148 259.109 385.655C266.62 393.162 270.219 402.232 269.906 412.867C269.593 423.501 265.681 432.572 258.171 440.078L161.474 536.727C157.719 540.48 153.651 543.139 149.27 544.703C144.888 546.266 140.194 547.048 135.188 547.048C130.181 547.048 125.487 546.266 121.105 544.703C116.724 543.139 112.656 540.48 108.901 536.727L11.2656 439.14C3.75521 431.633 0 422.719 0 412.397C0 402.076 3.75521 393.162 11.2656 385.655C18.776 378.148 27.6947 374.395 38.0215 374.395C48.3483 374.395 57.2669 378.148 64.7773 385.655L97.6354 418.497V150.133C97.6354 108.847 112.343 73.5028 141.759 44.1017C171.175 14.7006 206.536 0 247.844 0C289.151 0 324.513 14.7006 353.928 44.1017C383.344 73.5028 398.052 108.847 398.052 150.133V412.867C398.052 433.51 405.406 451.182 420.114 465.883C434.822 480.583 452.503 487.933 473.156 487.933C493.81 487.933 511.491 480.583 526.199 465.883C540.906 451.182 548.26 433.51 548.26 412.867V144.503L514.464 178.283C507.579 185.164 498.973 188.605 488.646 188.605C478.32 188.605 469.401 184.852 461.891 177.345C454.38 169.838 450.781 160.768 451.094 150.133C451.407 139.499 455.319 130.428 462.829 122.922L559.526 26.2733C563.281 22.52 567.349 19.8614 571.73 18.2975C576.112 16.7336 580.806 15.9517 585.812 15.9517C590.819 15.9517 595.513 16.7336 599.895 18.2975C604.276 19.8614 608.344 22.52 612.099 26.2733L709.734 123.86C717.245 131.367 721 140.281 721 150.603C721 160.924 717.245 169.838 709.734 177.345C702.224 184.852 693.305 188.605 682.979 188.605C672.652 188.605 663.733 184.852 656.223 177.345L623.365 144.503V412.867C623.365 454.153 608.657 489.497 579.241 518.898C549.825 548.299 514.464 563 473.156 563Z"
      fill="#A4CB73"
    />
  </Svg>
);

export const AvgPace = ({ ...props }) => (
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G opacity="0.5">
      <Mask id="mask0_14_1382" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <Rect x="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_14_1382)">
        <Path
          d="M15.75 5.00001C15.4 5.00001 15.1042 4.87918 14.8625 4.63751C14.6208 4.39584 14.5 4.10001 14.5 3.75001C14.5 3.40001 14.6208 3.10418 14.8625 2.86251C15.1042 2.62084 15.4 2.50001 15.75 2.50001C16.1 2.50001 16.3958 2.62084 16.6375 2.86251C16.8792 3.10418 17 3.40001 17 3.75001C17 4.10001 16.8792 4.39584 16.6375 4.63751C16.3958 4.87918 16.1 5.00001 15.75 5.00001ZM15.75 21.5C15.4 21.5 15.1042 21.3792 14.8625 21.1375C14.6208 20.8958 14.5 20.6 14.5 20.25C14.5 19.9 14.6208 19.6042 14.8625 19.3625C15.1042 19.1208 15.4 19 15.75 19C16.1 19 16.3958 19.1208 16.6375 19.3625C16.8792 19.6042 17 19.9 17 20.25C17 20.6 16.8792 20.8958 16.6375 21.1375C16.3958 21.3792 16.1 21.5 15.75 21.5ZM19.75 8.50001C19.4 8.50001 19.1042 8.37918 18.8625 8.13751C18.6208 7.89584 18.5 7.60001 18.5 7.25001C18.5 6.90001 18.6208 6.60418 18.8625 6.36251C19.1042 6.12084 19.4 6.00001 19.75 6.00001C20.1 6.00001 20.3958 6.12084 20.6375 6.36251C20.8792 6.60418 21 6.90001 21 7.25001C21 7.60001 20.8792 7.89584 20.6375 8.13751C20.3958 8.37918 20.1 8.50001 19.75 8.50001ZM19.75 18C19.4 18 19.1042 17.8792 18.8625 17.6375C18.6208 17.3958 18.5 17.1 18.5 16.75C18.5 16.4 18.6208 16.1042 18.8625 15.8625C19.1042 15.6208 19.4 15.5 19.75 15.5C20.1 15.5 20.3958 15.6208 20.6375 15.8625C20.8792 16.1042 21 16.4 21 16.75C21 17.1 20.8792 17.3958 20.6375 17.6375C20.3958 17.8792 20.1 18 19.75 18ZM21.25 13.25C20.9 13.25 20.6042 13.1292 20.3625 12.8875C20.1208 12.6458 20 12.35 20 12C20 11.65 20.1208 11.3542 20.3625 11.1125C20.6042 10.8708 20.9 10.75 21.25 10.75C21.6 10.75 21.8958 10.8708 22.1375 11.1125C22.3792 11.3542 22.5 11.65 22.5 12C22.5 12.35 22.3792 12.6458 22.1375 12.8875C21.8958 13.1292 21.6 13.25 21.25 13.25ZM2.5 12C2.5 9.38334 3.37083 7.13334 5.1125 5.25001C6.85417 3.36668 8.99167 2.30001 11.525 2.05001C11.7917 2.01668 12.0208 2.09584 12.2125 2.28751C12.4042 2.47918 12.5 2.71668 12.5 3.00001C12.5 3.26668 12.4125 3.50001 12.2375 3.70001C12.0625 3.90001 11.8417 4.01668 11.575 4.05001C9.55833 4.28334 7.875 5.15001 6.525 6.65001C5.175 8.15001 4.5 9.93334 4.5 12C4.5 14.0833 5.175 15.8708 6.525 17.3625C7.875 18.8542 9.55833 19.7167 11.575 19.95C11.8417 19.9833 12.0625 20.1 12.2375 20.3C12.4125 20.5 12.5 20.7333 12.5 21C12.5 21.2833 12.4042 21.5208 12.2125 21.7125C12.0208 21.9042 11.7917 21.9833 11.525 21.95C8.975 21.7 6.83333 20.6333 5.1 18.75C3.36667 16.8667 2.5 14.6167 2.5 12ZM12.5 14C11.95 14 11.4792 13.8042 11.0875 13.4125C10.6958 13.0208 10.5 12.55 10.5 12C10.5 11.9167 10.5042 11.8292 10.5125 11.7375C10.5208 11.6458 10.5417 11.5583 10.575 11.475L9.2 10.1C9.01667 9.91668 8.925 9.68334 8.925 9.40001C8.925 9.11668 9.01667 8.88334 9.2 8.70001C9.38333 8.51668 9.61667 8.42501 9.9 8.42501C10.1833 8.42501 10.4167 8.51668 10.6 8.70001L11.975 10.075C12.0417 10.0583 12.2167 10.0333 12.5 10C13.05 10 13.5208 10.1958 13.9125 10.5875C14.3042 10.9792 14.5 11.45 14.5 12C14.5 12.55 14.3042 13.0208 13.9125 13.4125C13.5208 13.8042 13.05 14 12.5 14Z"
          fill="#0C1600"
        />
      </G>
    </G>
  </Svg>
);

export const CalendarToday = ({ ...props }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G opacity="0.5">
      <Mask id="mask0_14_1374" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_14_1374)">
        <Path d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2.975C6 2.69167 6.09583 2.45833 6.2875 2.275C6.47917 2.09167 6.71667 2 7 2C7.28333 2 7.52083 2.09583 7.7125 2.2875C7.90417 2.47917 8 2.71667 8 3V4H16V2.975C16 2.69167 16.0958 2.45833 16.2875 2.275C16.4792 2.09167 16.7167 2 17 2C17.2833 2 17.5208 2.09583 17.7125 2.2875C17.9042 2.47917 18 2.71667 18 3V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20Z" fill="#0C1600" />
      </G>
    </G>
  </Svg>
);

export const LineStartCircle = ({ ...props }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/Svg" {...props}>
    <G opacity="0.5">
      <Mask id="Mask0_14_1358" style="Mask-type:alpha" MaskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G Mask="url(#Mask0_14_1358)">
        <Path d="M8 18C6.33333 18 4.91667 17.4167 3.75 16.25C2.58333 15.0833 2 13.6667 2 12C2 10.3333 2.58333 8.91667 3.75 7.75C4.91667 6.58333 6.33333 6 8 6C9.5 6 10.8042 6.475 11.9125 7.425C13.0208 8.375 13.6917 9.56667 13.925 11H21C21.2833 11 21.5208 11.0958 21.7125 11.2875C21.9042 11.4792 22 11.7167 22 12C22 12.2833 21.9042 12.5208 21.7125 12.7125C21.5208 12.9042 21.2833 13 21 13H13.925C13.6917 14.4333 13.0208 15.625 11.9125 16.575C10.8042 17.525 9.5 18 8 18Z" fill="#0C1600" />
      </G>
    </G>
  </Svg>
);

export const Close = ({ ...props }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G opacity="0.5">
      <Mask id="mask0_39_561" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_39_561)">
        <Path d="M12 13.4L7.1 18.3C6.91667 18.4833 6.68334 18.575 6.4 18.575C6.11667 18.575 5.88334 18.4833 5.7 18.3C5.51667 18.1167 5.425 17.8833 5.425 17.6C5.425 17.3167 5.51667 17.0833 5.7 16.9L10.6 12L5.7 7.09999C5.51667 6.91665 5.425 6.68332 5.425 6.39999C5.425 6.11665 5.51667 5.88332 5.7 5.69999C5.88334 5.51665 6.11667 5.42499 6.4 5.42499C6.68334 5.42499 6.91667 5.51665 7.1 5.69999L12 10.6L16.9 5.69999C17.0833 5.51665 17.3167 5.42499 17.6 5.42499C17.8833 5.42499 18.1167 5.51665 18.3 5.69999C18.4833 5.88332 18.575 6.11665 18.575 6.39999C18.575 6.68332 18.4833 6.91665 18.3 7.09999L13.4 12L18.3 16.9C18.4833 17.0833 18.575 17.3167 18.575 17.6C18.575 17.8833 18.4833 18.1167 18.3 18.3C18.1167 18.4833 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4833 16.9 18.3L12 13.4Z" fill="#0C1600" />
      </G>
    </G>
  </Svg>
);

export const LocationOn = ({ ...props }) => (
  <Svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G opacity="0.5">
      <Mask id="mask0_14_1532" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
        <Rect y="0.5" width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_14_1532)">
        <Path d="M12 12.5C12.55 12.5 13.0208 12.3042 13.4125 11.9125C13.8042 11.5208 14 11.05 14 10.5C14 9.95 13.8042 9.47917 13.4125 9.0875C13.0208 8.69583 12.55 8.5 12 8.5C11.45 8.5 10.9792 8.69583 10.5875 9.0875C10.1958 9.47917 10 9.95 10 10.5C10 11.05 10.1958 11.5208 10.5875 11.9125C10.9792 12.3042 11.45 12.5 12 12.5ZM12 22.125C11.8667 22.125 11.7333 22.1 11.6 22.05C11.4667 22 11.35 21.9333 11.25 21.85C8.81667 19.7 7 17.7042 5.8 15.8625C4.6 14.0208 4 12.3 4 10.7C4 8.2 4.80417 6.20833 6.4125 4.725C8.02083 3.24167 9.88333 2.5 12 2.5C14.1167 2.5 15.9792 3.24167 17.5875 4.725C19.1958 6.20833 20 8.2 20 10.7C20 12.3 19.4 14.0208 18.2 15.8625C17 17.7042 15.1833 19.7 12.75 21.85C12.65 21.9333 12.5333 22 12.4 22.05C12.2667 22.1 12.1333 22.125 12 22.125Z" fill="#0C1600" />
      </G>
    </G>
  </Svg>
);

export const ArrowBack = ({ ...props }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <G opacity="0.5">
      <Mask id="mask0_77_718" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_77_718)">
        <Path d="M10.875 19.3L4.275 12.7C4.175 12.6 4.10417 12.4917 4.0625 12.375C4.02083 12.2583 4 12.1333 4 12C4 11.8667 4.02083 11.7417 4.0625 11.625C4.10417 11.5083 4.175 11.4 4.275 11.3L10.875 4.69999C11.0583 4.51665 11.2875 4.42082 11.5625 4.41249C11.8375 4.40415 12.075 4.49999 12.275 4.69999C12.475 4.88332 12.5792 5.11249 12.5875 5.38749C12.5958 5.66249 12.5 5.89999 12.3 6.09999L7.4 11H18.575C18.8583 11 19.0958 11.0958 19.2875 11.2875C19.4792 11.4792 19.575 11.7167 19.575 12C19.575 12.2833 19.4792 12.5208 19.2875 12.7125C19.0958 12.9042 18.8583 13 18.575 13H7.4L12.3 17.9C12.4833 18.0833 12.5792 18.3167 12.5875 18.6C12.5958 18.8833 12.5 19.1167 12.3 19.3C12.1167 19.5 11.8833 19.6 11.6 19.6C11.3167 19.6 11.075 19.5 10.875 19.3Z" fill="#0C1600" />
      </G>
    </G>
  </Svg>
);

export const KakaoLogo = ({ ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 256 256" {...props}>
    <Path d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" />
  </Svg>
);
