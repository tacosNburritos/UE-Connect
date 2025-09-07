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
    MLP1: { x: 0.408, y: 0.339 },
    MLP2: { x: 0.4, y: 0.339 },
    MLP3: { x: 0.408, y: 0.345 },
    MLP4: { x: 0.39, y: 0.354 },

    MLP5: { x: 0.408, y: 0.363 },
    MLP6: { x: 0.408, y: 0.369 },
    MLP7: { x: 0.4, y: 0.369 },
    MLP8: { x: 0.5, y: 0.369 },


    MLP9: { x: 0.5, y: 0.433 },
    MLP10: { x: 0.51, y: 0.433 },
    MLP11: { x: 0.47, y: 0.45 },
    MLP12: { x: 0.47, y: 0.455 },
    MLP13: { x: 0.56, y: 0.455 },
    MLP14: { x: 0.47, y: 0.484 },
    MLP15: { x: 0.52, y: 0.484 },
    MLP16: { x: 0.52, y: 0.509 },
    MLP17: { x: 0.52, y: 0.535 },
    MLP18: { x: 0.47, y: 0.514 },
    MLP19: { x: 0.47, y: 0.509 },
    MLP20: { x: 0.547, y: 0.546 },
    MLP21: { x: 0.46, y: 0.59 },
    MLP22: { x: 0.52, y: 0.623 },
    MLP23: { x: 0.46, y: 0.655 },
    MLP24: { x: 0.52, y: 0.685 },
    MLP25: { x: 0.46, y: 0.716 },
    MLP26: { x: 0.53, y: 0.75 },
    MLP27: { x: 0.59, y: 0.467 },
    MLP28: { x: 0.59, y: 0.59 },
    MLP29: { x: 0.575, y: 0.615 },
    MLP30: { x: 0.59, y: 0.622 },
    MLP31: { x: 0.59, y: 0.64 },
    MLP32: { x: 0.59, y: 0.652 },
    MLP33: { x: 0.576, y: 0.677 },
    MLP34: { x: 0.59, y: 0.685 },
    MLP35: { x: 0.59, y: 0.706 },
    MLP36: { x: 0.59, y: 0.719 },

    MLP37: { x: 0.515, y: 0.76 },
    MLP38: { x: 0.54, y: 0.772 },
    MLP39: { x: 0.573, y: 0.756 },
    MLP40: { x: 0.569, y: 0.754 },
    MLP41: { x: 0.575, y: 0.756 },
    MLP42: { x: 0.578, y: 0.758 },

    MLP43: { x: 0.571, y: 0.7855 },
    MLP44: { x: 0.6, y: 0.769 },
    MLP45: { x: 0.597, y: 0.768 },
    MLP46: { x: 0.604, y: 0.771 },
    MLP47: { x: 0.60, y: 0.799 },
    MLP48: { x: 0.629, y: 0.784 },
    MLP49: { x: 0.626, y: 0.782 },
    MLP50: { x: 0.67, y: 0.832 },
    MLP51: { x: 0.52, y: 0.763 },

    //LOWER LEFT
    LOP1: { x: 0.415, y: 0.815 },
    LOP2: { x: 0.487, y: 0.847 },
    LOP3: { x: 0.325, y: 0.86 },
    LOP4: { x: 0.395, y: 0.891 },
    LOP5: { x: 0.234, y: 0.903 },
    LOP6: { x: 0.327, y: 0.945 },
    LOP7: { x: 0.335,  y: 0.94 },
    LOP8: { x: 0.36, y: 0.96 },
    LOP9: { x: 0.369, y: 0.955 },
    LOP10: { x: 0.578, y: 0.959 },
    LOP: { x: 0.575, y: 0.756 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.575, y: 0.756 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.575, y: 0.756 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.575, y: 0.756 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.575, y: 0.756 },
    LOP: { x: 0.578, y: 0.758 },
    LOP: { x: 0.578, y: 0.758 },

    //LOWER RIGHT
    LRP1: { x: 0.455, y: 0.999 },
    LRP2: { x: 0.545, y: 0.958 },
    LRP3: { x: 0.477, y: 0.927 },
    LRP4: { x: 0.637, y: 0.915 },
    LRP5: { x: 0.57, y: 0.884 },
    LRP6: { x: 0.729, y: 0.873 },
    LRP7: { x: 0.656, y: 0.839 },

    LRP8: { x: 0.5, y: 0.8 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.575, y: 0.756 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.575, y: 0.756 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.575, y: 0.756 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.575, y: 0.756 },
    LRP: { x: 0.578, y: 0.758 },
    LRP: { x: 0.575, y: 0.756 },
    LRP: { x: 0.578, y: 0.758 },

    //MIDDLE RIGHT
    MRP1: { x: 0.697, y: 0.82 },
    MRP2: { x: 0.695, y: 0.717 },
    MRP3: { x: 0.63, y: 0.717 },
    MRP4: { x: 0.732, y: 0.717 },
    MRP5: { x: 0.732, y: 0.622 },
    MRP6: { x: 0.63, y: 0.622 },
    MRP7: { x: 0.732, y: 0.528 },
    MRP8: { x: 0.63, y: 0.528 },
    MRP9: { x: 0.732, y: 0.48 },
    MRP10: { x: 0.63, y: 0.48 },
    MRP11: { x: 0.66, y: 0.48 },
    MRP12: { x: 0.695, y: 0.48 },
    MRP13: { x: 0.695, y: 0.462 },
    MRP14: { x: 0.72, y: 0.45 },
    MRP15: { x: 0.695, y: 0.438 },
    MRP16: { x: 0.695, y: 0.421 },

    //UPPER RIGHT
    URP1: { x: 0.732, y: 0.421 },
    URP2: { x: 0.66, y: 0.421 },
    URP3: { x: 0.63, y: 0.421 },
    URP4: { x: 0.732, y: 0.372 },
    URP5: { x: 0.63, y: 0.372 },
    URP6: { x: 0.732, y: 0.305 },
    URP7: { x: 0.63, y: 0.305 },
    URP8: { x: 0.732, y: 0.241 },
    URP9: { x: 0.63, y: 0.241 },
    URP10: { x: 0.732, y: 0.175 },
    URP11: { x: 0.63, y: 0.175 },
    URP12: { x: 0.732, y: 0.11 },
    URP13: { x: 0.63, y: 0.11 },
    URP14: { x: 0.732, y: 0.038 },
    URP15: { x: 0.59, y: 0.038 },
    URP16: { x: 0.59, y: 0.012 },

    URP: { x: 0.578, y: 0.758 },
    URP: { x: 0.575, y: 0.756 },
    URP: { x: 0.578, y: 0.758 },
    URP: { x: 0.575, y: 0.756 },
    URP: { x: 0.578, y: 0.758 },
    URP: { x: 0.575, y: 0.756 },
    URP: { x: 0.578, y: 0.758 },
    URP: { x: 0.575, y: 0.756 },
    URP: { x: 0.578, y: 0.758 },
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
    ["UL40", "MLP1"],
    ["MLP1", "MLP2"],
    ["MLP1", "MLP3"],
    ["MLP3", "MLP4"],
    ["MLP4", "MLP5"],
    ["MLP5", "MLP6"],
    ["MLP6", "MLP7"],
    ["MLP7", "MLP8"],
    ["MLP8", "MLP9"],
    ["MLP9", "MLP10"],
    ["MLP9", "MLP11"],
    ["MLP11", "MLP12"],
    ["MLP12", "MLP13"],
    ["MLP12", "MLP14"],
    ["MLP14", "MLP15"],
    ["MLP15", "MLP16"],
    ["MLP16", "MLP17"],
    ["MLP17", "MLP18"],
    ["MLP18", "MLP19"],
    ["MLP19", "MLP16"],
    ["MLP19", "MLP14"],
    ["MLP17", "MLP20"],
    ["MLP20", "MLP21"],
    ["MLP21", "MLP22"],
    ["MLP22", "MLP23"],
    ["MLP23", "MLP24"],
    ["MLP24", "MLP25"],
    ["MLP25", "MLP26"],
    ["MLP13", "MLP27"],
    ["MLP27", "MLP28"],
    ["MLP28", "MLP22"],
    ["MLP29", "MLP30" ],
    ["MLP30", "MLP31" ],
    ["MLP24", "MLP32" ],
    ["MLP33", "MLP34" ],
    ["MLP34", "MLP35" ],
    ["MLP36", "MLP26" ],
    ["MLP36", "MLP37" ],
    ["MLP37", "MLP51" ],
    ["MLP51", "MLP38" ],
    ["MLP38", "MLP39" ],
    ["MLP40", "MLP41" ],
    ["MLP40", "MLP42" ],
    ["MLP38", "MLP43" ],
    ["MLP43", "MLP44" ],
    ["MLP44", "MLP45" ],
    ["MLP44", "MLP46" ],
    ["MLP38", "MLP47" ],
    ["MLP47", "MLP48" ],
    ["MLP48", "MLP49" ],
    ["MLP47", "MLP50" ],

    ["MLP51", "LOP1" ],
    ["LOP1", "LOP2" ],
    ["LOP1", "LOP3" ],
    ["LOP3", "LOP4" ],
    ["LOP3", "LOP5" ],
    ["LOP5", "LOP6" ],
    ["LOP6", "LOP7" ],
    ["LOP6", "LOP8" ],
    ["LOP8", "LOP9" ],

    ["LOP8", "LRP1" ],
    ["LRP1", "LRP2" ],
    ["LRP2", "LRP3" ],
    ["LRP2", "LRP4" ],
    ["LRP4", "LRP5" ],
    ["LRP4", "LRP6" ],
    ["LRP6", "LRP7" ],
    ["LRP7", "MLP50" ],

    ["MLP50", "MRP1" ],
    ["MRP1", "MRP2" ],
    ["MRP3", "MLP36" ],
    ["MRP3", "MRP2" ],
    ["MRP2", "MRP4" ],   
    ["MRP4", "MRP5" ],
    ["MRP5", "MRP6" ],
    ["MRP5", "MRP7" ],
    ["MRP7", "MRP8" ],
    ["MRP7", "MRP9" ],
    ["MRP10", "MRP11" ],
    ["MRP12", "MRP9" ],
    ["MRP8", "MRP10" ],
    ["MRP10", "MRP6" ],
    ["MRP6", "MRP3" ],    
    ["MRP12", "MRP13" ],
    ["MRP13", "MRP14" ],
    ["MRP14", "MRP15" ],
    ["MRP15", "MRP16" ],
    ["MRP16", "URP1" ],
    ["URP2", "URP3" ],
    ["URP1", "URP4" ],
    ["URP4", "URP5" ],
    ["URP4", "URP6" ],
    ["URP6", "URP7" ],    
    ["URP6", "URP8" ],
    ["URP8", "URP9" ],
    ["URP8", "URP10" ],
    ["URP10", "URP11" ],
    ["URP10", "URP12" ],
    ["URP12", "URP13" ],
    ["URP12", "URP14" ],
    ["URP14", "URP15" ],
    ["URP15", "URP16" ],

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
