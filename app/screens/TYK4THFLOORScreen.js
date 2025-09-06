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

const TYK4THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //UPPER LEFT
    UL1: { x: 0.507, y: 0.012 }, 
    UL2: { x: 0.507, y: 0.038 },
    UL3: { x: 0.4, y: 0.038 },  
    UL4: { x: 0.4, y: 0.106 },
    UL5: { x: 0.4, y: 0.172 },
    UL6: { x: 0.4, y: 0.241 },
    UL7: { x: 0.5, y: 0.241 },
    UL8: { x: 0.507, y: 0.241 },

    UL9: { x: 0.507, y: 0.056 },
    UL10: { x: 0.516, y: 0.056 },
    UL11: { x: 0.507, y: 0.09 },
    UL12: { x: 0.516, y: 0.09 },
    UL13: { x: 0.507, y: 0.106 },
    UL14: { x: 0.507, y: 0.122 },
    UL15: { x: 0.516, y: 0.122 },
    UL16: { x: 0.507, y: 0.156 },
    UL17: { x: 0.516, y: 0.156 },
    UL18: { x: 0.507, y: 0.172 },
    UL19: { x: 0.507, y: 0.189 },
    UL20: { x: 0.516, y: 0.189 },
    UL21: { x: 0.507, y: 0.225 },
    UL22: { x: 0.516, y: 0.225 },
    UL23: { x: 0.5, y: 0.265 },
    UL24: { x: 0.545, y: 0.265 },
    UL25: { x: 0.5, y: 0.281 },
    UL26: { x: 0.545, y: 0.281 },
    UL27: { x: 0.545, y: 0.276 },
    UL28: { x: 0.5, y: 0.287 },
    UL29: { x: 0.545, y: 0.287 },
    UL30: { x: 0.545, y: 0.29 },
    UL31: { x: 0.5, y: 0.304 },
    UL32: { x: 0.545, y: 0.304 },
    UL33: { x: 0.545, y: 0.302 },
    UL34: { x: 0.545, y: 0.306 },
    UL35: { x: 0.5, y: 0.323 },
    UL36: { x: 0.545, y: 0.323 },
    UL37: { x: 0.545, y: 0.320 },
    UL38: { x: 0.545, y: 0.325 },
    UL39: { x: 0.5, y: 0.341 },
    UL40: { x: 0.545, y: 0.341 },
    UL41: { x: 0.545, y: 0.339 },

    //MIDDLE LEFT
    MOP1: { x: 0.408, y: 0.339 },
    MOP2: { x: 0.4, y: 0.339 },
    MOP3: { x: 0.408, y: 0.345 },
    MOP4: { x: 0.39, y: 0.354 },

    MOP5: { x: 0.408, y: 0.363 },
    MOP6: { x: 0.408, y: 0.369 },
    MOP7: { x: 0.4, y: 0.369 },
    MOP8: { x: 0.5, y: 0.369 },
    UOP: { x: 0.5, y: 0.338 },
    UOP: { x: 0.5, y: 0.338 },
    UOP: { x: 0.5, y: 0.338 },
    UOP: { x: 0.5, y: 0.338 },

    UOP: { x: 0.5, y: 0.338 },
    UOP: { x: 0.5, y: 0.338 },


    /*/MIDLE PART OUTLINE
    MLSTO1: { x: 0.4, y: 0.34 }, //MIDLE STAIR OUTLINE
    MLSTO2: { x: 0.543, y: 0.34 },
    MLSTO3: { x: 0.412, y: 0.34 },
    MLSTO4: { x: 0.412, y: 0.35 },
    MLSTO5: { x: 0.395, y: 0.357 },
    MLSTO6: { x: 0.412, y: 0.3635 }, 
    MLSTO7: { x: 0.412, y: 0.3725 },
    MLSTO8: { x: 0.4, y: 0.3725 },
    MLSTO9: { x: 0.515, y: 0.3725 },
    MLSTO10: { x: 0.462, y: 0.3725 },

    MLO1: { x: 0.462, y: 0.542 },   // MIDLE PART OUTLINE 
  
    MLOP1: { x: 0.495, y: 0.3725 }, // MIDLE PART OUTLINE POINT
    MLOP2: { x: 0.462, y: 0.499 },
    MLOP3: { x: 0.462, y: 0.449 },
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.575, y: 0.565 }, // LOWER PART OUTLINE
    LLO2: { x: 0.543, y: 0.583 },
    LLO3: { x: 0.462, y: 0.6271 },
    LLO4: { x: 0.575, y: 0.626 },
    LLO5: { x: 0.52, y: 0.654 },
    LLO6: { x: 0.462, y: 0.6845 },
    LLO7: { x: 0.572, y: 0.685 },
    LLO8: { x: 0.52, y: 0.712 },
    LLO9: { x: 0.4653, y: 0.742 },
    LLO10: { x: 0.583, y: 0.742 },
    LLO11: { x: 0.527, y: 0.77 },
    LLO12: { x: 0.502, y: 0.7835 },
    LLO13: { x: 0.512, y: 0.7885 },
    LLO14: { x: 0.5845, y: 0.8245 },
    LLO15: { x: 0.3, y: 0.89 },
    LLO16: { x: 0.487, y: 0.978 },

    LLOP1: { x: 0.53, y: 0.7975 }, // LOWER PART OUTLINE POINT
    LLOP2: { x: 0.557, y: 0.812 }, 
    LLOP3: { x: 0.437, y: 0.823 },  
    LLOP4: { x: 0.37, y: 0.855 },
    LLOP5: { x: 0.343, y: 0.911 },
    LLOP6: { x: 0.37, y: 0.923 },
    LLOP7: { x: 0.41, y: 0.942 },
    LLOP8: { x: 0.37, y: 0.9235 }, 
    LLOP9: { x: 0.41, y: 0.942 },  

    //RIGHT PART OUTLINE 
    RO1: { x: 0.692, y: 0.882 }, 
    RO: { x: 0.623, y: 0.914 }, // DUNNO WHAT THIS IS
    RO3: { x: 0.6449, y: 0.86 },
    RO4: { x: 0.668, y: 0.849 },
    RO5: { x: 0.668, y: 0.7415 },
    RO6: { x: 0.708, y: 0.7415 },
    RO7: { x: 0.708, y: 0.494 },
    RO8: { x: 0.68, y: 0.494 },
    RO9: { x: 0.68, y: 0.478 },
    RO10: { x: 0.708, y: 0.464 },
    RO11: { x: 0.68, y: 0.451 },
    RO12: { x: 0.68, y: 0.433},
    RO13: { x: 0.708, y: 0.433},
    RO14: { x: 0.708, y: 0.062},
    RO15: { x: 0.625, y: 0.062},
    RO16: { x: 0.625, y: 0.009},


    ROP1: { x: 0.557, y: 0.9455 }, // LOWER PART OUTLINE POINT RIGHT
    ROP2: { x: 0.623, y: 0.914 },
    ROP3: { x: 0.708, y: 0.679 },
    ROP4: { x: 0.708, y: 0.617 },
    ROP5: { x: 0.708, y: 0.555 },
    ROP6: { x: 0.708, y: 0.511 },
    ROP7: { x: 0.708, y: 0.4115 },
    ROP8: { x: 0.708, y: 0.373 },
    ROP9: { x: 0.708, y: 0.3105 },
    ROP10: { x: 0.708, y: 0.247 },
    ROP11: { x: 0.708, y: 0.186 },
    ROP12: { x: 0.708, y: 0.125 },*/

    //INSIDE STRUCTURE
    //IS: { x: 0.55, y: 0.185 }, //INSIDE STRUCTURE

    
    //EO1: { x: 0.55, y: 0.34 }, //ELEVATOR OUTLINE


  };


const mapConnections = [
    ["UL1", "UL2"],
    ["UL2", "UL3"],
    ["UL3", "UL4",],
    ["UL4", "UL5"],
    ["UL5", "UL6"],
    ["UL6", "UL7"],
    ["UL7", "UL8"],
    ["UL9", "UL10"],
    ["UL9", "UL11"], 
    ["UL11", "UL12"],
    ["UL4", "UL13"],
    ["UL14", "UL15"],
    ["UL14", "UL16"],
    ["UL16", "UL17"],
    ["UL5", "UL18"],
    ["UL19", "UL20"],
    ["UL19", "UL21"],
    ["UL21", "UL22"],

    ["UL7", "UL23"],
    ["UL23", "UL24"],
    ["UL23", "UL25"],
    ["UL25", "UL26"],
    ["UL26", "UL27"],
    ["UL25", "UL28"],
    ["UL28", "UL29"],
    ["UL29", "UL30"],
    ["UL28", "UL31"],
    ["UL31", "UL32"],
    ["UL32", "UL33"],
    ["UL32", "UL34"],

    ["UL31", "UL35"],
    ["UL35", "UL36"],
    ["UL36", "UL37"],
    ["UL36", "UL38"],
    ["UL35", "UL39"],
    ["UL39", "UL40"],
    ["UL40", "UL41"],

    ["UL40", "MOP1"],
    ["MOP1", "MOP2"],
    ["MOP1", "MOP3"],
    ["MOP3", "MOP4"],
    ["MOP4", "MOP5"],
    ["MOP5", "MOP6"],
    ["MOP6", "MOP7"],
    ["MOP7", "MOP8"],


    ["MLO1", "LLO2"],
    ["LLO1", "LLO2"],
    ["LLO2", "LLO3"],
    ["LLO3", "LLO5"],
    ["LLO5", "LLO4"],
    ["LLO4", "LLO6"],
    ["LLO6", "LLO8"],
    ["LLO8", "LLO7"],
    ["LLO7", "LLO9"],
    ["LLO9", "LLO11"],
    ["LLO11", "LLO10"],
    ["LLO10", "LLO12"],
    ["LLO12", "LLO13"],
    ["LLO13", "LLOP1"],
    ["LLOP1", "LLOP2"],
    ["LLOP2", "LLO14"],
    ["LLO13", "LLOP3"],
    ["LLOP3", "LLOP4"],
    ["LLOP4", "LLO15"],
    ["LLO15", "LLOP5"],
    ["LLOP5", "LLOP8"],
    ["LLOP8", "LLOP9"],
    ["LLOP9", "LLO16"],
    ["LLO16", "LLOP6" ],
    ["LLOP6", "LLOP7" ],
    ["LLO16", "ROP1" ],


    ["ROP1", "ROP2" ],
    ["ROP2", "RO1" ],
    ["RO1", "RO3" ],
    ["RO3", "RO4" ],
    ["RO4", "RO5" ],
    ["LLO10", "RO5" ],
    ["RO5", "RO6" ],
    ["RO6", "ROP3" ],
    ["ROP3", "ROP4" ],
    ["ROP4", "ROP5" ],
    ["ROP5", "ROP6" ],
    ["ROP6", "RO7" ],
    ["RO7", "RO8" ],
    ["RO8", "RO9" ],
    ["RO9", "RO10" ],
    ["RO10", "RO11" ],
    ["RO11", "RO12" ],
    ["RO12", "RO13" ],
    ["RO13", "ROP7" ],
    ["ROP7", "ROP8" ],
    ["ROP8", "ROP9" ],
    ["ROP9", "ROP10" ],
    ["ROP10", "ROP11" ],
    ["ROP11", "ROP12" ],
    ["ROP12", "RO14" ],
    ["RO14", "RO15" ],
    ["RO15", "RO16" ],
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
        Tan Yan Kee Building - Fourth Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/TYK4THFLR.png")}
          style={{ width: "97%", height: "108%", position: "absolute", resizeMode: "contain" }}
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
              r={1.2} // CHANGE TO 0 ONCE YOU'RE DONE (Chelsea, Jinjer, Mariel, Jacob)
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

export default TYK4THFLOORScreen;
