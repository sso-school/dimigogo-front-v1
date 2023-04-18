import React from "react";

import * as Icons from "@/assets/icons";

const SvgIcon = React.memo(({ name, fill, style }) => {
  const Comp = Icons[name];
  return (
    <Comp
      style={style}
      // 1.2.3. `.svgrrc` 의 설정 덕분에 `fill` prop 을 이렇게 사용할 수 있다.
      fill={fill}
    />
  );
});

export default SvgIcon;
