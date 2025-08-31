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

const TYK5THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //UPPER PART OUTLINE (LEFT)
    ULSTO1: { x: 0.48, y: 0.011 }, //UPPER STAIR OUTLINE
    ULSTO2: { x: 0.478, y: 0.064 },
    ULO1: { x: 0.394, y: 0.064 },  //UPPER PART OUTLINE
    ULO2: { x: 0.394, y: 0.253 },
    ULO3: { x: 0.481, y: 0.253 },
    ULO4: { x: 0.481, y: 0.347 },

    ULOP1: { x: 0.481, y: 0.265 }, //UPPER PART OUTLINE POINT
    ULOP2: { x: 0.481, y: 0.284 },
    ULOP3: { x: 0.481, y: 0.291 },
    ULOP4: { x: 0.481, y: 0.311 },
    ULOP5: { x: 0.481, y: 0.33 },

    //MIDLE PART OUTLINE
    MLSTO1: { x: 0.372, y: 0.347 }, //MIDLE STAIR OUTLINE
    MLSTO2: { x: 0.384, y: 0.347 },
    MLSTO3: { x: 0.384, y: 0.357 },
    MLSTO4: { x: 0.368, y: 0.364 },
    MLSTO5: { x: 0.384, y: 0.372 },
    MLSTO6: { x: 0.384, y: 0.38 }, 
    MLSTO7: { x: 0.372, y: 0.38 },
    MLSTO8: { x: 0.434, y: 0.38 },
    MLSTO9: { x: 0.49, y: 0.38 },

    MLO1: { x: 0.434, y: 0.553 }, // MIDLE PART OUTLINE 
    MLO2: { x: 0.516, y: 0.595 },
  
    MLOP1: { x: 0.467, y: 0.38 }, // MIDLE PART OUTLINE POINT
    MLOP2: { x: 0.434, y: 0.457 },
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.434, y: 0.639 }, // LOWER PART OUTLINE
    LLO2: { x: 0.495, y: 0.666 },
    LLO3: { x: 0.434, y: 0.698 },
    LLO4: { x: 0.495, y: 0.725 },
    LLO5: { x: 0.439, y: 0.755 },
    LLO6: { x: 0.502, y: 0.784 },
    LLO7: { x: 0.475, y: 0.798 },
    LLO8: { x: 0.485, y: 0.803 },
    LLO9: { x: 0.271, y: 0.907 }, 

    LLOP1: { x: 0.558, y: 0.755 }, // LOWER PART OUTLINE POINT
    LLOP2: { x: 0.503, y: 0.812 }, 
    LLOP3: { x: 0.534, y: 0.826 }, 
    LLOP: { x: 0.557, y: 0.812 }, 
    LLOP: { x: 0.557, y: 0.812 }, 
    LLOP: { x: 0.557, y: 0.812 }, 
    LLOP: { x: 0.557, y: 0.812 }, 
    LLOP: { x: 0.557, y: 0.812 },

    //RIGHT PART OUTLINE 
    RO1: { x: 0.46, y: 0.996 }, 
    RO2: { x: 0.669, y: 0.899 }, // DUNNO WHAT THIS IS
    RO3: { x: 0.621, y: 0.876 },
    RO4: { x: 0.626, y: 0.874 },
    RO5: { x: 0.645, y: 0.865 },
    RO6: { x: 0.645, y: 0.755 },
    RO7: { x: 0.685, y: 0.755 },
    RO8: { x: 0.685, y: 0.503 },
    RO9: { x: 0.659, y: 0.503 },
    RO10: { x: 0.659, y: 0.488 },
    RO11: { x: 0.685, y: 0.474 },
    RO12: { x: 0.659, y: 0.46 },
    RO13: { x: 0.659, y: 0.443 },
    RO14: { x: 0.687, y: 0.443},
    RO15: { x: 0.686, y: 0.064},
    RO16: { x: 0.6, y: 0.064},
    RO17: { x: 0.6, y: 0.011},

    ROP1: { x: 0.686, y: 0.693 }, // LOWER PART OUTLINE POINT RIGHT
    ROP2: { x: 0.686, y: 0.629 },
    ROP3: { x: 0.686, y: 0.565 },
    ROP4: { x: 0.686, y: 0.521 },
    ROP5: { x: 0.686, y: 0.42 },
    ROP6: { x: 0.686, y: 0.317 },
    ROP7: { x: 0.686, y: 0.253 },
  };

  const mapConnections = [
    ["M1", "M2"],
    ["M2", "M3"],
    ["M3", "M4"],
    ["M4", "M5"],
    ["M5", "M6"],
    ["M6", "M7"],
    ["M7", "M1"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.10, y: 0.25, label: "Room 101" },
    L2: { x: 0.35, y: 0.25, label: "Room 102" },
    L3: { x: 0.6, y: 0.4, label: "Lobby" },
  };

  const stairNodes = [
    "ELEVATOR L",
    "ELEVATOR R",
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
    else if (nextFloor === 6) nextScreen = "TYK1STFLOORScreen";
    else if (nextFloor === 7) nextScreen = "TYK2NDFLOORScreen";
    else if (nextFloor === 8) nextScreen = "TYK3RDFLOORScreen";
    else if (nextFloor === 9) nextScreen = "TYK4THFLOORScreen";
    else if (nextFloor === 10) nextScreen = "TYK5THFLOORScreen";
    else if (nextFloor === 11) nextScreen = "TYK6THFLOORScreen";
    else if (nextFloor === 12) nextScreen = "TYK7THFLOORScreen";
    else if (nextFloor === 13) nextScreen = "TYK8THFLOORScreen";
    else if (nextFloor === 14) nextScreen = "TYK9THFLOORScreen";
    else if (nextFloor === 15) nextScreen = "TYK10THFLOORScreen";

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
        Tan Yan Kee Building - Fifth Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/TYK5THFLR.png")}
          style={{ width: "97%", height: "102%", position: "absolute", resizeMode: "contain" }}
        />

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
              r={1} // CHANGE TO 0 ONCE YOU'RE DONE (Chelsea, Jinjer, Mariel, Jacob)
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

export default TYK5THFLOORScreen;
