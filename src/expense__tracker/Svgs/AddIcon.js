import * as React from "react";
import { moderateScale } from "react-native-size-matters";
import Svg, { Defs, G, Rect, Circle, LinearGradient, Stop } from "react-native-svg";

export default ({}) => {
  return (
    <Svg
      width={moderateScale(94)}
      height={moderateScale(94)}
      viewBox="0 0 94 94"
    >
      <Defs></Defs>
      <G data-name="Add transaction">
      <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#5275c1" stopOpacity="1" />
          <Stop offset="1" stopColor="#134698" stopOpacity="1" />
        </LinearGradient>
        <G filter="url(#prefix__a)">
          <Circle
            data-name="Ellipse 2"
            cx={32}
            cy={32}
            r={32}
            transform="translate(0 0)"
            fill="url(#grad)"
          />
        </G>
        <G data-name="Group 5" fill="#fff" transform="translate(-292 -681)">
          <Rect
            data-name="Rectangle 5"
            width={3}
            height={17}
            rx={1.5}
            transform="translate(322 704)"
          />
          <Rect
            data-name="Rectangle 6"
            width={3}
            height={17}
            rx={1.5}
            transform="rotate(90 -189.5 521.5)"
          />
        </G>
      </G>
    </Svg>
  );
};
