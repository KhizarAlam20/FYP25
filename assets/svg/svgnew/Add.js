import * as React from "react";
import Svg, { G, Circle, Line } from "react-native-svg";

const Add = (props) => (
  <Svg
    width={62}
    height={62}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="Frame 5">
      {/* Circle background */}
      <Circle cx={31} cy={31} r={29} fill="#232222" />
      {/* Circle border */}
      <Circle cx={31} cy={31} r={29} stroke="#B4ABAB90" strokeWidth={6} />
      <G id="Group 1">
        {/* Vertical line */}
        <Line
          id="Line 1"
          x1={31.5}
          y1={19}
          x2={31.5}
          y2={43}
          stroke="white"
          strokeWidth={3}
        />
        {/* Horizontal line */}
        <Line
          id="Line 2"
          x1={19}
          y1={30.5}
          x2={43}
          y2={30.5}
          stroke="white"
          strokeWidth={3}
        />
      </G>
    </G>
  </Svg>
);

export default Add;
