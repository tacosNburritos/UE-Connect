import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Svg, Circle, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const HRMFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //cooking demo lab
    M1: { x: 0.326, y: 0.024 },
    M2: { x: 0.489, y: 0.024 },
    M3: { x: 0.326, y: 0.197 },
    M4: { x: 0.489, y: 0.197 },
    M5: { x: 0.489, y: 0.05 },
    M6: { x: 0.489, y: 0.17 },
    //main kitchen
    M7: { x: 0.326, y: 0.381 },
    M8: { x: 0.489, y: 0.381 },
    M9: { x: 0.489, y: 0.22 },
    M10: { x: 0.489, y: 0.349 },
    //bakery
    M11: { x: 0.326, y: 0.575 },
    M12: { x: 0.489, y: 0.575 },
    M13: { x: 0.48999, y: 0.413 },
    M14: { x: 0.48999, y: 0.546 },
    //bar & beverage
    M15: { x: 0.326, y: 0.941},
    M16: { x: 0.489, y: 0.941 },
    M17: { x: 0.491, y: 0.593},
    M18: { x: 0.491, y: 0.75 },
    M19: { x: 0.491, y: 0.77 },
    M20: { x: 0.491, y: 0.92 },
    //skill lab
    M21: { x: 0.585, y: 0.024},
    M22: { x: 0.678, y: 0.024},
    M23: { x: 0.678, y: 0.267},
    M24: { x: 0.585, y: 0.267},
    M25: { x: 0.585, y: 0.236},
    M26: { x: 0.585, y: 0.052},
    M27: { x: 0.585, y: 0.214},
    //housekeeping room
    M28: { x: 0.678, y: 0.525},
    M29: { x: 0.585, y: 0.525},
    M30: { x: 0.585, y: 0.49},
    M31: { x: 0.585, y: 0.472},
    //dining area
    M32: { x: 0.678, y: 0.941},
    M33: { x: 0.585, y: 0.941},
    M34: { x: 0.585, y: 0.6699},
    M35: { x: 0.585, y: 0.641},
  };

  const mapConnections = [
    //cooking demo lab
    ["M1", "M2"],
    ["M1", "M3"],
    ["M3", "M4"],
    ["M5", "M6"],
    //main kitchen
    ["M3", "M7"],
    ["M7", "M8"],
    ["M9", "M10"],
    //bakery
    ["M7", "M11"],
    ["M11", "M12"],
    ["M13", "M14"],
    //bar & beverage
    ["M11", "M15"],
    ["M15", "M16"],
    ["M17", "M18"],
    ["M19", "M20"],
    //skill lab
    ["M21", "M22"],
    ["M22", "M23"],
    ["M23", "M24"],
    ["M24", "M25"],
    ["M26", "M27"],
    //housekeeping room
    ["M23", "M28"],
    ["M28", "M29"],
    ["M29", "M30"],
    ["M24", "M31"],
    //dining area
    ["M28", "M32"],
    ["M32", "M33"],
    ["M33", "M34"],
    ["M29", "M35"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.33, y: 0.1, label: "Cooking\nDemo Lab" },
    L2: { x: 0.34, y: 0.28, label: "Main\nKitchen" },
    L3: { x: 0.34, y: 0.47, label: "Bakery" },
    L4: { x: 0.34, y: 0.67, label: "Bar & \nBeverage \nRoom" },
    L5: { x: 0.585, y: 0.13, label: "Skills\nLab" },
    L6: { x: 0.61, y: 0.28, label: "H\no\nu\ns\ne\nk\ne\ne\np\ni\nn\ng\n\nR\no\no\nm" },
    L7: { x: 0.58, y: 0.7, label: "Dining \nArea" },
  };

  const stairNodes = [
    "HRM - E",
    "HRM - E2",
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

    if (remainingPath.length > 0) {
      setTimeout(() => setShowNextButton(true), adjustedPath.length * 270);
    }
  }, []);

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  const renderAnimatedLine = (x1, y1, x2, y2, progress, key, color = "red") => {
    const animatedProps = useAnimatedProps(() => ({
      strokeDasharray: [300, 300],
      strokeDashoffset: (1 - progress.value) * 300,
    }));
    return (
      <AnimatedLine
        key={key}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth={3}
        animatedProps={animatedProps}
      />
    );
  };

  const renderAnimatedCircle = (cx, cy, r, color, progress, key) => {
    const animatedProps = useAnimatedProps(() => ({
      opacity: progress ? progress.value : 1,
    }));
    return (
      <AnimatedCircle
        key={key}
        cx={cx}
        cy={cy}
        r={r}
        fill={color}
        animatedProps={animatedProps}
      />
    );
  };

  const getFloorFromNode = (nodeName) => {
    return buildingCoordinates[nodeName]?.floor;
  };

  const handleNextPress = () => {
    const nextNode = remainingPath[0];
    const nextFloor = getFloorFromNode(nextNode);
    let nextScreen = "";

    if (nextFloor === 2) nextScreen = "EN2NDFLOORScreen";
    else if (nextFloor === 3) nextScreen = "EN3RDFLOORScreen";
    else if (nextFloor === 4) nextScreen = "EN4THFLOORScreen";
    else if (nextFloor === 5) nextScreen = "UEScreen";
    else nextScreen = "EN1STFLOORScreen";

    navigation.navigate(nextScreen, {
      path: remainingPath,
      buildingCoordinates,
    });
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* Header */}
      <View
        style={{
          position: "absolute",
          top: 40,
          left: 0,
          right: 0,
          flexDirection: "row",
          justifyContent: "space-between",
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
            onPress={handleNextPress}
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

      <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 50 }}>
        HRM - Mock Hotel Room
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        {/* <Image
          source={require("../images/HRMFLR.png")}
          style={{ width: "100%", height: "100%", position: "absolute", resizeMode: "contain" }}
        /> */}

        <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          {/* MAP CONNECTIONS */}
          {mapConnections.map(([from, to], index) => {
            const start = mapNodes[from];
            const end = mapNodes[to];
            if (!start || !end) return null;
            return (
              <Line
                key={`map-${index}`}
                x1={start.x * containerSize.width}
                y1={start.y * containerSize.height}
                x2={end.x * containerSize.width}
                y2={end.y * containerSize.height}
                stroke="blue"
                strokeWidth={2}
              />
            );
          })}

          {adjustedPath.slice(0, -1).map((node, index) => {
            const nextNode = adjustedPath[index + 1];

            // Skip drawing line if the next node is a stair
            if (stairNodes.includes(nextNode)) return null;

            const start = buildingCoordinates[node];
            const end = buildingCoordinates[nextNode];
            if (!start || !end) return null;

            return renderAnimatedLine(
              start.x * containerSize.width,
              start.y * containerSize.height,
              end.x * containerSize.width,
              end.y * containerSize.height,
              lineProgress[index],
              `line-${index}`
            );
          })}

          {/* Mid path points */}
          {adjustedPath.map((node, index) => {
            if (index === 0 || index === adjustedPath.length - 1) return null;
            const coords = buildingCoordinates[node];
            if (!coords) return null;
            return renderAnimatedCircle(
              coords.x * containerSize.width,
              coords.y * containerSize.height,
              1.5,
              "red",
              lineProgress[index - 1],
              `circle-${index}`
            );
          })}

          {/* Start */}
          {buildingCoordinates[adjustedPath[0]] && (
            renderAnimatedCircle(
              buildingCoordinates[adjustedPath[0]].x * containerSize.width,
              buildingCoordinates[adjustedPath[0]].y * containerSize.height,
              5,
              "blue",
              null,
              "start"
            )
          )}

          {/* End */}
          {buildingCoordinates[adjustedPath[adjustedPath.length - 1]] && (
            renderAnimatedCircle(
              buildingCoordinates[adjustedPath[adjustedPath.length - 1]].x * containerSize.width,
              buildingCoordinates[adjustedPath[adjustedPath.length - 1]].y * containerSize.height,
              5,
              "red",
              lineProgress[lineProgress.length - 1],
              "end"
            )
          )}

{/* EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}
          {/* Map node circles with fixed radius */}
          {Object.entries(mapNodes).map(([key, { x, y }]) => (
            <Circle
              key={`node-${key}`}
              cx={x * containerSize.width}
              cy={y * containerSize.height}
              r={0} // CHANGE TO 0 ONCE YOU'RE DONE (Chelsea, Jinjer, Mariel, Jacob)
              fill="red"
            />
          ))}
        </Svg>

        {/* Label points */}
        {Object.entries(labelNodes).map(([key, { x, y, label }]) => (
          <React.Fragment key={`label-${key}`}>
            <Circle
              cx={x * containerSize.width}
              cy={y * containerSize.height}
              r={3}
              fill="black"
            />
            <Text
              style={{
                position: "absolute",
                left: x * containerSize.width + 6,
                top: y * containerSize.height - 6,
                color: "red", // Change to black if preferred
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {label}
            </Text>
          </React.Fragment>
        ))}

        {/* "You" Label */}
        {buildingCoordinates[adjustedPath[0]] && (
          <Text
            style={{
              position: "absolute",
              left: buildingCoordinates[adjustedPath[0]].x * containerSize.width - 30,
              top: buildingCoordinates[adjustedPath[0]].y * containerSize.height - 25,
              color: "blue",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            You
          </Text>
        )}
      </View>
    </View>
  );
};

export default HRMFLOORScreen;
