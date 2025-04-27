import React, { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Svg, Circle, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const EN3RDFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);
  const getFloorFromNode = (nodeName) => {
    return buildingCoordinates[nodeName]?.floor;
  };
  

  const stairNodes = [
    "EN - STAIRS RIGHT WING1",
    "EN - STAIRS LEFT WING1",
    "EN - STAIRS RIGHT WING2",
    "EN - STAIRS LEFT WING2",
    "EN - ENT LEFT WING",
    "EN - EX LEFT WING",
  ];

  const stairsIndex = path.findIndex((node) => stairNodes.includes(node));
  const adjustedPath =
    stairsIndex !== -1 && stairsIndex < path.length - 1
      ? path.slice(0, stairsIndex + 1)
      : path;
  const remainingPath =
    stairsIndex !== -1 && stairsIndex < path.length - 1
      ? path.slice(stairsIndex + 1)
      : [];

  const lineProgress = adjustedPath.slice(0, -1).map(() => useSharedValue(0));

  useEffect(() => {
    adjustedPath.forEach((_, index) => {
      if (index === 0) return;
      setTimeout(() => {
        lineProgress[index - 1].value = withTiming(1, {
          duration: 270,
          easing: Easing.linear,
        });
      }, index * 270);
    });

   if (stairsIndex !== -1) {
      setTimeout(() => setShowNextButton(true), adjustedPath.length * 270);
    }
  if (remainingPath.length > 0) {
    setTimeout(() => setShowNextButton(true), adjustedPath.length * 270);
  }
  }, []);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Buttons */}
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          zIndex: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
        </TouchableOpacity>

        {showNextButton && (
          <TouchableOpacity
          onPress={() => {
            const nextNode = remainingPath[0];
            const nextFloor = getFloorFromNode(nextNode);
          
            let nextScreen = "";
          
            if (nextFloor === 2) nextScreen = "EN2NDFLOORScreen";
            else if (nextFloor === 3) nextScreen = "EN3RDFLOORScreen";
            else if (nextFloor === 4) nextScreen = "EN4THFLOORScreen";
            else if (nextFloor === 5) nextScreen = "UEScreen";
            else nextScreen = "EN1STFLOORScreen"; // fallback or stay
          
            navigation.navigate(nextScreen, {
              path: remainingPath,
              buildingCoordinates,
            });
          }}
          
            style={{
              backgroundColor: "#007bff",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Title */}
      <Text style={{ color: "black", fontSize: 16, marginTop: 50, fontWeight: "bold" }}>
        Engineering Building - Third Floor
      </Text>

      {/* Map & Path */}
      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        <Image
          source={require("../images/EN3RDFLR.png")}
          style={{ width: "100%", height: "106%", resizeMode: "contain" }}
        />

        <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          {/* Lines */}
          {adjustedPath.slice(0, -1).map((node, index) => {
            const startCoords = buildingCoordinates[node];
            const endCoords = buildingCoordinates[adjustedPath[index + 1]];
            if (!startCoords || !endCoords) return null;

            const x1 = startCoords.x * containerSize.width;
            const y1 = startCoords.y * containerSize.height;
            const x2 = endCoords.x * containerSize.width;
            const y2 = endCoords.y * containerSize.height;

            const animatedProps = useAnimatedProps(() => ({
              strokeDasharray: [300, 300],
              strokeDashoffset: (1 - lineProgress[index].value) * 300,
            }));

            return (
              <AnimatedLine
                key={`line-${index}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="red"
                strokeWidth={3}
                animatedProps={animatedProps}
              />
            );
          })}

          {/* Intermediate Nodes */}
          {adjustedPath.map((node, index) => {
            if (index === 0 || index === adjustedPath.length - 1) return null;
            const coords = buildingCoordinates[node];
            if (!coords) return null;

            const cx = coords.x * containerSize.width;
            const cy = coords.y * containerSize.height;

            const animatedProps = useAnimatedProps(() => ({
              opacity: lineProgress[index - 1].value,
            }));

            return (
              <AnimatedCircle
                key={`node-${index}`}
                cx={cx}
                cy={cy}
                r={5}
                fill="red"
                animatedProps={animatedProps}
              />
            );
          })}

          {/* Start Node */}
          {buildingCoordinates[adjustedPath[0]] && (
            <>
              <AnimatedCircle
                cx={buildingCoordinates[adjustedPath[0]].x * containerSize.width}
                cy={buildingCoordinates[adjustedPath[0]].y * containerSize.height}
                r={5}
                fill="blue"
                animatedProps={useAnimatedProps(() => ({ opacity: 1 }))}
              />
              <Text
                style={{
                  position: "absolute",
                  left:
                    buildingCoordinates[adjustedPath[0]].x * containerSize.width - 30,
                  top:
                    buildingCoordinates[adjustedPath[0]].y * containerSize.height - 25,
                  color: "blue",
                  paddingHorizontal: 37,
                  paddingVertical: 16,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                You
              </Text>
            </>
          )}

          {/* End Node */}
          {buildingCoordinates[adjustedPath[adjustedPath.length - 1]] && (
            <AnimatedCircle
              cx={
                buildingCoordinates[adjustedPath[adjustedPath.length - 1]].x *
                containerSize.width
              }
              cy={
                buildingCoordinates[adjustedPath[adjustedPath.length - 1]].y *
                containerSize.height
              }
              r={5}
              fill="red"
              animatedProps={useAnimatedProps(() => ({
                opacity: lineProgress[lineProgress.length - 1].value,
              }))}
            />
          )}
        </Svg>

       {/* Second SVG (Animated Path up to Stairs) */}
              <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                {adjustedPath.slice(0, -1).map((node, index) => {
                  const startCoords = buildingCoordinates[node];
                  const endCoords = buildingCoordinates[adjustedPath[index + 1]];
                  if (!startCoords || !endCoords) return null;
      
                  const x1 = startCoords.x * containerSize.width;
                  const y1 = startCoords.y * containerSize.height;
                  const x2 = endCoords.x * containerSize.width;
                  const y2 = endCoords.y * containerSize.height;
      
                  const animatedProps = useAnimatedProps(() => ({
                    strokeDasharray: [300, 300],
                    strokeDashoffset: (1 - lineProgress[index]?.value) * 300,
                  }));
      
                  return (
                    <AnimatedLine
                      key={`adj-line-${index}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="red"
                      strokeWidth={3}
                      animatedProps={animatedProps}
                    />
                  );
                })}
      
                {adjustedPath.map((node, index) => {
                  if (index === 0 || index === adjustedPath.length - 1) return null;
      
                  const coords = buildingCoordinates[node];
                  if (!coords) return null;
      
                  const cx = coords.x * containerSize.width;
                  const cy = coords.y * containerSize.height;
      
                  const animatedProps = useAnimatedProps(() => ({
                    opacity: lineProgress[index - 1]?.value,
                  }));
      
                  return (
                    <AnimatedCircle
                      key={`adj-node-${index}`}
                      cx={cx}
                      cy={cy}
                      r={1.5}
                      fill="red"
                      animatedProps={animatedProps}
                    />
                  );
                })}
      
                {buildingCoordinates[adjustedPath[0]] && (
                  <>
                    <AnimatedCircle
                      cx={buildingCoordinates[adjustedPath[0]].x * containerSize.width}
                      cy={buildingCoordinates[adjustedPath[0]].y * containerSize.height}
                      r={5}
                      fill="blue"
                      animatedProps={useAnimatedProps(() => ({
                        opacity: 1,
                      }))}
                    />
                    <Text
                      style={{
                        position: "absolute",
                        left: buildingCoordinates[adjustedPath[0]].x * containerSize.width - 30,
                        top: buildingCoordinates[adjustedPath[0]].y * containerSize.height - 25,
                        color: "blue",
                        paddingHorizontal: 37,
                        paddingVertical: 16,
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      You
                    </Text>
                  </>
                )}
      
                {buildingCoordinates[adjustedPath[adjustedPath.length - 1]] && (
                  <AnimatedCircle
                    cx={buildingCoordinates[adjustedPath[adjustedPath.length - 1]].x * containerSize.width}
                    cy={buildingCoordinates[adjustedPath[adjustedPath.length - 1]].y * containerSize.height}
                    r={5}
                    fill="red"
                    animatedProps={useAnimatedProps(() => ({
                      opacity: lineProgress[lineProgress.length - 1]?.value,
                    }))}
                  />
                )}
              </Svg>
            </View>
          </View>
  );
};

export default EN3RDFLOORScreen;