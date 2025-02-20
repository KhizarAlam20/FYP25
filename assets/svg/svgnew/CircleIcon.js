import * as React from "react";
import Svg, { Circle } from "react-native-svg";
const CircleIcon = ({left}) => (
  <Svg
    width={10}
    height={10}
    viewBox="0 0 10 10"
    fill="none"
    style={{position: "absolute",top:30,bottom:0,left:left,right:0}}
    xmlns="http://www.w3.org/2000/svg"
    
  >
    <Circle id="Ellipse 1" cx={5} cy={5} r={5} fill="#232222" />
  </Svg>
);
export default CircleIcon;
