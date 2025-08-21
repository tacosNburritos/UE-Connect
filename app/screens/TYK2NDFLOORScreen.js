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

const TYK2NDFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //UPPER PART OUTLINE (LEFT)
    UPSTO1: { x: 0.505, y: 0.009 }, //UPPER STAIR OUTLINE
    UPSTO2: { x: 0.505, y: 0.062 },
    UPTO1: { x: 0.423, y: 0.062 },  //UPPER PART OUTLINE
    UPTO2: { x: 0.423, y: 0.247 },
    UPTO3: { x: 0.508, y: 0.247 },
    UPTO4: { x: 0.507, y: 0.34 },

    UPTOP1: { x: 0.423, y: 0.122 }, //UPPER PART OUTLINE POINT
    UPTOP2: { x: 0.423, y: 0.184 },
    UPTOP3: { x: 0.507, y: 0.259 },
    UPTOP4: { x: 0.507, y: 0.2775 },
    UPTOP5: { x: 0.507, y: 0.2853 },
    UPTOP6: { x: 0.507, y: 0.3043 },
    UPTOP7: { x: 0.507, y: 0.323 },

    //MIDLE PART OUTLINE
    MST1: { x: 0.4, y: 0.34 }, //MIDLE STAIR OUTLINE
    MST2: { x: 0.543, y: 0.34 },
    MST3: { x: 0.412, y: 0.34 },
    MST4: { x: 0.412, y: 0.35 },
    MST5: { x: 0.395, y: 0.357 },
    MST6: { x: 0.412, y: 0.3635 }, 
    MST7: { x: 0.412, y: 0.3725 },
    MST8: { x: 0.4, y: 0.3725 },
    MST9: { x: 0.515, y: 0.3725 },
    MST10: { x: 0.462, y: 0.3725 },

    MPO1: { x: 0.462, y: 0.542 },   // MIDLE PART OUTLINE 
  
    MPOP1: { x: 0.495, y: 0.3725 }, // MIDLE PART OUTLINE POINT
    MPOP2: { x: 0.462, y: 0.499 },
    MPOP3: { x: 0.462, y: 0.449 },
    
    //LOWER PART OUTLINE
    LPO1: { x: 0.575, y: 0.565 }, // LOWER PART OUTLINE
    LPO2: { x: 0.543, y: 0.583 },
    LPO3: { x: 0.462, y: 0.6271 },
    LPO4: { x: 0.575, y: 0.626 },
    LPO5: { x: 0.52, y: 0.654 },
    LPO6: { x: 0.462, y: 0.6845 },
    LPO7: { x: 0.572, y: 0.685 },
    LPO8: { x: 0.52, y: 0.712 },
    LPO9: { x: 0.4653, y: 0.742 },
    LPO10: { x: 0.583, y: 0.742 },
    LPO11: { x: 0.527, y: 0.77 },
    LPO12: { x: 0.502, y: 0.7835 },
    LPO13: { x: 0.512, y: 0.7885 },
    LPO14: { x: 0.5845, y: 0.8245 },
    LPO15: { x: 0.3, y: 0.89 },
    LPO16: { x: 0.487, y: 0.978 },

    LPOP1: { x: 0.53, y: 0.7975 }, // LOWER PART OUTLINE POINT
    LPOP2: { x: 0.557, y: 0.812 }, 
    LPOP3: { x: 0.437, y: 0.823 },  
    LPOP4: { x: 0.37, y: 0.855 },
    LPOP5: { x: 0.343, y: 0.911 },
    LPOP6: { x: 0.37, y: 0.923 },
    LPOP7: { x: 0.41, y: 0.942 },
    LPOP8: { x: 0.437, y: 0.96 }, //
    LPOP9: { x: 0.465, y: 0.978 }, // 

    //LOWER PART OUTLINE (RIGHT)
    LRO1: { x: 0.692, y: 0.882 }, // LOWER PART OUTLINE RIGHT

    LPOP6: { x: 0.557, y: 0.9455 }, // LOWER PART OUTLINE POINT RIGHT
    LPOP7: { x: 0.623, y: 0.914 },

  };


const mapConnections = [
    ["UPSTO1", "UPSTO2"],
    ["UPSTO2", "UPTO1"],
    ["UPTO1", "UPTOP1",],
    ["UPTOP1", "UPTOP2"],
    ["UPTOP2", "UPTO2"],
    ["UPTO2", "UPTO3"],
    ["UPTO3", "UPTOP3"],
    ["UPTOP3", "UPTOP4"],
    ["UPTOP4", "UPTOP5"], 
    ["UPTOP5", "UPTOP6"],
    ["UPTOP6", "UPTOP7"],
    ["UPTOP7", "UPTO4"],
    ["MST2", "UPTO4"],
    ["UPTO4", "MST1"],
    ["MST1", "MST3"],
    ["MST3", "MST4"],
    ["MST4", "MST5"],
    ["MST5", "MST6"],
    ["MST6", "MST7"],
    ["MST7", "MST8"],
    ["MST8", "MST9"],
    ["MST9", "MST10"],
    ["MST10", "MPOP2"],
    ["MPOP2", "MPO1"],
    ["MPO1", "LPO2"],
    ["LPO1", "LPO2"],
    ["LPO2", "LPO3"],
    ["LPO3", "LPO5"],
    ["LPO5", "LPO4"],
    ["LPO4", "LPO6"],
    ["LPO6", "LPO8"],
    ["LPO8", "LPO7"],
    ["LPO7", "LPO9"],
    ["LPO9", "LPO11"],
    ["LPO11", "LPO10"],
    ["LPO10", "LPO12"],
    ["LPO12", "LPO13"],
    ["LPO13", "LPOP1"],
    ["LPOP1", "LPOP2"],
    ["LPOP2", "LPO14"],
    ["LPO13", "LPOP3"],
    ["LPOP3", "LPOP4"],
    ["LPOP4", "LPO15"],
    ["LPO15", "LPOP5"],
  

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
        Tan Yan Kee Building - Second Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/TYK2NDFLR.png")}
          style={{ width: "100%", height: "100%", position: "absolute", resizeMode: "contain" }}
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

export default TYK2NDFLOORScreen;
