import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";

const CircularProgress = ({ percentage, color }) => {
  const radius = 10;
  const strokeWidth = 2;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <Svg height={radius * 2} width={radius * 2}>
      <Circle
        stroke="#e6e6e6"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <Circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference + " " + circumference}
        strokeDashoffset={strokeDashoffset}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <Text style={styles.percentageText}>{percentage}%</Text>
    </Svg>
  );
};

const styles = StyleSheet.create({
  percentageText: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -7 }, { translateY: -7 }],
    fontSize: 10,
    fontWeight: "bold",
    color: "black",
  },
});

export default CircularProgress;
