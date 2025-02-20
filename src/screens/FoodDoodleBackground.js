import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Circle } from 'react-native-maps';
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg';

const FoodDoodleBackground = () => {
  return (
    <View style={[StyleSheet.absoluteFill, { opacity: 0.05, zIndex: -1 }]}>
      <Svg height="100%" width="100%" viewBox="0 0 300 300" style={{ position: 'absolute' }}>
        <Defs>
          <Pattern id="foodPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Pizza */}
            <Path
              d="M20 20 L35 15 L40 30 Z"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
            
            {/* Ice Cream Cone */}
            <Path
              d="M60 25 Q65 15 70 25 L65 40 Z"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
            
            {/* Coffee Cup */}
            <Path
              d="M15 60 Q15 70 25 70 L35 70 Q45 70 45 60 M20 55 L40 55"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
            
            {/* Burger */}
            <Path
              d="M65 60 Q65 65 75 65 Q85 65 85 60 Q85 55 75 55 Q65 55 65 60"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
            
            {/* Fork */}
            <Path
              d="M15 85 L15 95 M20 85 L20 95 M25 85 L25 95 M20 95 L20 105"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
            
            {/* Plate */}
            <Circle
              cx="75"
              cy="85"
              r="10"
              fill="none"
              stroke="#666"
              strokeWidth="1"
            />
          </Pattern>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#foodPattern)" />
      </Svg>

      {/* Circle from react-native-maps with correct styling */}
      <Circle
        center={{ latitude: 37.78825, longitude: -122.4324 }}
        radius={20}
        strokeColor="#666"
        fillColor="transparent"
        strokeWidth={1}
      />
    </View>
  );
};

export default FoodDoodleBackground;
