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

const TYK3RDFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //UPPER PART OUTLINE (LEFT)
    ULSTO1: { x: 0.48, y: 0.015 }, //UPPER STAIR OUTLINE
    ULSTO2: { x: 0.478, y: 0.069 },
    ULO1: { x: 0.394, y: 0.069 },
    ULO2: { x: 0.39,  y: 0.257},
    ULO3: { x: 0.475,  y: 0.257},
    ULO4: { x: 0.475,  y: 0.352},

    ULOP1: { x: 0.391, y: 0.164 }, //UPPER PART OUTLINE POINT
    ULOP2: { x: 0.475, y: 0.2692 },
    ULOP3: { x: 0.475, y: 0.2879 },
    ULOP4: { x: 0.475, y: 0.296 },
    ULOP5: { x: 0.475, y: 0.3152 },
    ULOP6: { x: 0.475, y: 0.334 },

    //MIDLE PART OUTLINE
    MLSTO1: { x: 0.51, y: 0.352 }, //MIDDLE STAIR OUTLINE
    MLSTO2: { x: 0.365, y: 0.352 },
    MLSTO3: { x: 0.3765, y: 0.352 },
    MLSTO4: { x: 0.3765, y: 0.361 },
    MLSTO5: { x: 0.359, y: 0.368 },
    MLSTO6: { x: 0.3765, y: 0.375 },
    MLSTO7: { x: 0.3765, y: 0.384 },
    MLSTO8: { x: 0.365, y: 0.384 },
    MLSTO9: { x: 0.482, y: 0.384 },
    MLSTO10: { x: 0.427, y: 0.384 },

    MLO1:  { x: 0.427, y: 0.557 }, // MIDDLE PART OUTLINE 
    MLO2: { x: 0.505, y: 0.598 },  
  
    MLOP1: { x: 0.46, y: 0.384 }, // MIDDLE PART OUTLINE POINT
    MLOP2: { x: 0.427, y: 0.461},
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.42, y: 0.643 }, // LOWER PART OUTLINE
    LLO2: { x: 0.479, y: 0.672 }, 
    LLO3: { x: 0.42, y: 0.701 }, 
    LLO4: { x: 0.479, y: 0.729 }, 
    LLO5: { x: 0.425, y: 0.759 },
    LLO6: { x: 0.485, y: 0.788 },
    LLO7: { x: 0.459, y: 0.8025 },
    LLO8: { x: 0.467, y: 0.806 },  
    LLO9: { x: 0.54, y: 0.8435 }, 
    LLO10: { x: 0.25, y: 0.9095 }, 

    LLOP1: { x: 0.54, y: 0.759 }, // LOWER PART OUTLINE POINT
    LLOP2: { x: 0.486, y: 0.815 },
    LLOP3: { x: 0.515, y: 0.83 },
    LLOP4: { x: 0.467, y: 0.806 }, 
    LLOP5: { x: 0.392, y: 0.842 },
    LLOP6: { x: 0.32, y: 0.877 },
    LLOP7: { x: 0.302, y: 0.934 },
    LLOP8: { x: 0.393, y: 0.977 },
 
 
    //RIGHT PART OUTLINE 
    RO1: { x: 0.441, y: 0.999 }, 
    RO2: { x: 0.65, y: 0.903 }, 
    RO3: { x: 0.602, y: 0.88 }, 
    RO4: { x: 0.627, y: 0.869 }, 
    RO5: { x: 0.627, y: 0.759 }, 
    RO6: { x: 0.67, y: 0.759 }, 
    RO7: { x: 0.675, y: 0.508 }, 
    RO8: { x: 0.647, y: 0.508 }, 
    RO9: { x: 0.647, y: 0.493 }, 
    RO10: { x: 0.675, y: 0.479 }, 
    RO11: { x: 0.647, y: 0.464 }, 
    RO12: { x: 0.647, y: 0.448 }, 
    RO13: { x: 0.675, y: 0.448 }, 
    RO14: { x: 0.681, y: 0.069 },
    RO15: { x: 0.6, y: 0.069 },
    RO16: { x: 0.6, y: 0.015 },

    ROP1: { x: 0.5105, y: 0.9665 }, // LOWER PART OUTLINE POINT RIGHT
    ROP2: { x: 0.583, y: 0.934 },
    ROP3: { x: 0.675, y: 0.666 },
    ROP4: { x: 0.675, y: 0.57 },
    ROP5: { x: 0.675, y: 0.525 },
    ROP6: { x: 0.675, y: 0.425 },
    ROP7: { x: 0.675, y: 0.386 },
    ROP8: { x: 0.676, y: 0.365 },
    ROP9: { x: 0.677, y: 0.314 },
    ROP10: { x: 0.678, y: 0.259 },
    ROP11: { x: 0.679, y: 0.196 },
    ROP12: { x: 0.68, y: 0.132 },

    //INSIDE STRUCTURE
    //IS: { x: 0.55, y: 0.185 }, //INSIDE STRUCTURE

    
    //EO1: { x: 0.55, y: 0.34 }, //ELEVATOR OUTLINE


  };


const mapConnections = [
    ["ULSTO1", "ULSTO2"],
    ["ULSTO2", "ULO1"],
    ["ULO1", "ULO1",],
    ["ULO1", "ULOP1"],
    ["ULOP1", "ULO2"],
    ["ULO2", "ULO3"],,
    ["ULO3", "ULOP2"],
    ["ULOP2", "ULOP3"],
    ["ULOP3", "ULOP4"],
    ["ULOP4", "ULOP5"],
    ["ULOP5", "ULOP6"],
    ["ULOP6", "ULO4"],

    ["ULO4", "MLSTO1"],
    ["MLSTO1", "MLSTO3"],
    ["MLSTO3", "MLSTO2"],
    ["MLSTO3", "MLSTO4"],
    ["MLSTO4", "MLSTO5"],
    ["MLSTO5", "MLSTO6"],
    ["MLSTO6", "MLSTO7"],
    ["MLSTO7", "MLSTO8"],
    ["MLSTO8", "MLSTO10"],
    ["MLSTO10", "MLOP1"],
    ["MLOP1", "MLSTO9"],
    ["MLSTO10", "MLO1"],
    ["MLO1", "MLO2"],

    ["MLO2", "LLO1"],
    ["LLO1", "LLO2"],
    ["LLO2", "LLO3"],
    ["LLO3", "LLO4"],
    ["LLO4", "LLO5"],
    ["LLO5", "LLO6"],
    ["LLO6", "LLO7"],
    ["LLO7", "LLOP1"],
    ["LLO7", "LLO8"],
    ["LLO8", "LLOP2"],
    ["LLOP2", "LLOP3"],
    ["LLOP3", "LLO9"],
    ["LLO8", "LLOP5"],
    ["LLOP5", "LLOP6"],
    ["LLOP6", "LLO10"],
    ["LLO10", "LLOP7"],
    ["LLOP7", "LLOP8"],

    ["LLOP8", "RO1"],
    ["RO1", "ROP1"],
    ["ROP1", "ROP2"],
    ["ROP2", "RO2"],
    ["RO2", "RO3"],
    ["RO3", "RO4"],
    ["RO4", "RO5"],
    ["RO5", "RO6"],

    ["LLOP1", "RO5"],

    ["RO6", "ROP3"],
    ["ROP3", "ROP4"],
    ["ROP4", "ROP5"],
    ["ROP5", "RO7"],
    ["RO7", "RO8"],
    ["RO8", "RO9"],
    ["RO9", "RO10"],
    ["RO10", "RO11"],
    ["RO11", "RO12"],
    ["RO12", "RO13"],
    ["RO13", "ROP6"],
    ["ROP6", "ROP7"],
    ["ROP7", "ROP8"],
    ["ROP8", "ROP9"],
    ["ROP9", "ROP10"],
    ["ROP10", "ROP11"],
    ["ROP11", "ROP12"],
    ["ROP12", "RO14"],
    ["RO14", "RO15"],
    ["RO15", "RO16"],

    
    
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
    "TYK E1"
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
        Tan Yan Kee Building - Third Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/TYK3RDFLR.png")}
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

export default TYK3RDFLOORScreen;
