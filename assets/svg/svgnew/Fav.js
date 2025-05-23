import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Fav = ({color}) => (
  <Svg
    width={24}
    height={22}
    viewBox="0 0 24 22"
    fill="none"
    // style={{marginLeft: 12}}
    xmlns="http://www.w3.org/2000/svg"
    // {...props}
  >
    <Path
      id="Vector"
      d="M0 7.47879C0 13.6934 4.824 17.0045 8.3544 19.9694C9.6 21.0147 10.8 22 12 22C13.2 22 14.4 21.016 15.6456 19.9681C19.1772 17.0058 24 13.6934 24 7.48006C24 1.26673 17.4 -3.14344 12 2.8322C6.6 -3.14344 0 1.26417 0 7.47879Z"
      fill={color}
      fillOpacity={0.9}
    />
  </Svg>
);
export default Fav;
