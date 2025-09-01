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

const TYK7THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //stairs top
    M1: { x: 0.56, y: 0.0199 },
    M2: { x: 0.496, y: 0.0199 },
    M3: { x: 0.496, y: 0.057 },
    M4: { x: 0.56, y: 0.057 },
    M5: { x: 0.53, y: 0.057 },
    M6: { x: 0.53, y: 0.03 },
    //upper-left room
    M7: { x: 0.38, y: 0.057 },
    M8: { x: 0.38, y: 0.12 },
    M9: { x: 0.496, y: 0.12 },
    M10: { x: 0.496, y: 0.07 },
    M11: { x: 0.496, y: 0.109 },
    //upper-left center room
    M12: { x: 0.38, y: 0.18 },
    M13: { x: 0.496, y: 0.18 },
    M14: { x: 0.496, y: 0.13 },
    M15: { x: 0.496, y: 0.17 },
    //upper-left bottom room
    M16: { x: 0.38, y: 0.247 },
    M17: { x: 0.496, y: 0.247 },
    M18: { x: 0.496, y: 0.193 },
    M19: { x: 0.496, y: 0.23 },
    //upper-right room
    M20: { x: 0.707, y: 0.057 },
    M21: { x: 0.707, y: 0.12 },
    M22: { x: 0.593, y: 0.12 },
    M23: { x: 0.593, y: 0.07 },
    M24: { x: 0.593, y: 0.109 },
    //upper-right center room
    M25: { x: 0.707, y: 0.18 },
    M26: { x: 0.593, y: 0.18 },
    M27: { x: 0.593, y: 0.13 },
    M28: { x: 0.593, y: 0.17 },
    //upper-right bottom room
    M29: { x: 0.707, y: 0.244 },
    M30: { x: 0.593, y: 0.244 },
    M31: { x: 0.593, y: 0.193 },
    M32: { x: 0.593, y: 0.23 },
    //semi upper-left room
    M33: { x: 0.49, y: 0.244 },
    M34: { x: 0.49, y: 0.26 },
    M35: { x: 0.49, y: 0.28 },
    M36: { x: 0.53, y: 0.26 },
    M37: { x: 0.53, y: 0.28 },
    //left elevator
    M38: { x: 0.49, y: 0.29 },
    M39: { x: 0.53, y: 0.29 },
    M40: { x: 0.49, y: 0.306 },
    M41: { x: 0.53, y: 0.306 },
    M42: { x: 0.49, y: 0.324 },
    M43: { x: 0.53, y: 0.324 },
    M44: { x: 0.49, y: 0.338 },
    M45: { x: 0.53, y: 0.34 },
    M46: { x: 0.49, y: 0.34 },
    //stairs
    M47: { x: 0.42, y: 0.338 },
    M48: { x: 0.40, y: 0.353 },
    M49: { x: 0.42, y: 0.370 },
    M50: { x: 0.49, y: 0.370 },
    //faculty?
    M51: { x: 0.49, y: 0.428 },
    M52: { x: 0.46, y: 0.45 },
    M53: { x: 0.563, y: 0.463 },
    M54: { x: 0.46, y: 0.370 },//
    M55: { x: 0.46, y: 0.48 },
    M56: { x: 0.564, y: 0.48 },
    //zigzad left
    M57: { x: 0.46, y: 0.5 },
    M58: { x: 0.527, y: 0.543 },
    M59: { x: 0.448, y: 0.588 },
    M60: { x: 0.51, y: 0.614 },
    M61: { x: 0.448, y: 0.649 },
    M62: { x: 0.51, y: 0.678 },
    M63: { x: 0.448, y: 0.71 },
    M64: { x: 0.515, y: 0.741},
    //elevator baba
    M65: { x: 0.503, y: 0.753 },
    M66: { x: 0.566, y: 0.71 },
    M67: { x: 0.576, y: 0.79 },
    M68: { x: 0.599, y: 0.779 },
    M69: { x: 0.58, y: 0.76 },
    M70: { x: 0.55, y: 0.778 },
    M71: { x: 0.56, y: 0.749 },
    M72: { x: 0.53, y: 0.768 },
    //lower 1 room
    M73: { x: 0.51, y: 0.755 },
    M74: { x: 0.42, y: 0.809 },
    M75: { x: 0.48, y: 0.84 },
    //lower 2,3 room
    M76: { x: 0.338, y: 0.849 },
    M77: { x: 0.399, y: 0.88 },
    M78: { x: 0.26, y: 0.896 },
    M79: { x: 0.32, y: 0.93 },
    //stairs
    M80: { x: 0.3, y: 0.94},
    M81: { x: 0.374, y: 0.978},
    M82: { x: 0.4, y: 0.966},




    //room right
    M83: { x: 0.453, y: 0.993},
    M84: { x: 0.53, y: 0.95},
    M85: { x: 0.61, y: 0.908},
    M86: { x: 0.69, y: 0.862},
    M87: { x: 0.61, y: 0.908},
    M88: { x: 0.63, y: 0.83},
    M89: { x: 0.55, y: 0.88},
    M90: { x: 0.47, y: 0.92},
    //stairs right
    M91: { x: 0.655, y: 0.816},
    M92: { x: 0.655, y: 0.71},
    M93: { x: 0.6, y: 0.71},
    M94: { x: 0.68, y: 0.71},
    //gurl cr
    M95: { x: 0.68, y: 0.523},
    M96: { x: 0.68, y: 0.475},
    M97: { x: 0.589, y: 0.475},
    M98: { x: 0.589, y: 0.523},
    //ewan
    M99: { x: 0.647, y: 0.475},
    M100: { x: 0.647, y: 0.458},
    M101: { x: 0.663, y: 0.446},
    M102: { x: 0.647, y: 0.435},
    M103: { x: 0.647, y: 0.417},
    //boi cr
    M104: { x: 0.674, y: 0.417},
    M105: { x: 0.674, y: 0.245},
    M106: { x: 0.674, y: 0.307},
    M107: { x: 0.59, y: 0.307},
    M108: { x: 0.59, y: 0.417},
    M109: { x: 0.59, y: 0.37},
    M110: { x: 0.674, y: 0.37},
    M111: { x: 0.628, y: 0.417},

    S1: { x: 0.42, y: 0.354},
    S2: { x: 0.49, y: 0.355},
    S3: { x: 0.43, y: 0.338},
    S4: { x: 0.43, y: 0.37},
    S5: { x: 0.45, y: 0.338},
    S6: { x: 0.45, y: 0.37},
    S7: { x: 0.47, y: 0.338},
    S8: { x: 0.47, y: 0.37},

  };

  const mapConnections = [
    //stairs top
    ["M1", "M2"],
    ["M2", "M3"],
    ["M1", "M4"],
    ["M5", "M6"],
    //upper left room
    ["M7", "M3"],
    ["M7", "M8"],
    ["M8", "M9"],
    ["M10", "M11"],
    //upper-left center room
    ["M8", "M12"],
    ["M12", "M13"],
    ["M14", "M15"],
    //upper-left bottom room
    ["M12", "M16"],
    ["M16", "M17"],
    ["M18", "M19"],
    //upper-right room
    ["M4", "M20"],
    ["M20", "M21"],
    ["M21", "M22"],
    ["M23", "M24"],
    //upper-right center room
    ["M21", "M25"],
    ["M25", "M26"],
    ["M27", "M28"],
    //upper-right bottom room
    ["M29", "M25"],
    ["M30", "M29"],
    ["M31", "M32"],
    //semi upper-left room
    ["M34", "M33"],
    ["M34", "M35"],
    ["M35", "M37"],
    ["M36", "M37"],
    ["M34", "M36"],
    //elevator
    ["M38", "M34"],
    ["M38", "M39"],
    ["M40", "M38"],
    ["M40", "M41"],
    ["M40", "M42"],
    ["M42", "M43"],
    ["M40", "M44"],
    ["M46", "M44"],
    ["M46", "M45"],
    //stairs left
    ["M44", "M47"],
    ["M47", "M48"],
    ["M48", "M49"],
    ["M49", "M50"],
    //faculty?
    ["M50", "M51"],
    ["M51", "M52"],
    ["M51", "M53"],
    ["M54", "M52"],
    ["M55", "M52"],
    ["M55", "M56"],
    ["M56", "M53"],
    //baba ng faculty
    ["M57", "M58"],
    ["M55", "M57"],
    ["M58", "M59"],
    ["M59", "M60"],
    ["M60", "M61"],
    ["M62", "M61"],
    ["M62", "M63"],
    ["M63", "M64"],
    //elevator baba
    ["M64", "M65"],
    ["M65", "M66"],
    ["M67", "M68"],
    ["M65", "M67"],
    ["M69", "M70"],
    ["M71", "M72"],
    //lower 1 room
    ["M73", "M74"],
    ["M74", "M75"],
    ["M68", "M75"],
    //lower 2,3 room
    ["M74", "M78"],
    ["M76", "M77"],
    ["M79", "M78"],
    ["M75", "M79"],
    //stairs
    ["M79", "M80"],
    ["M80", "M81"],
    ["M81", "M82"],
    ["M82", "M83"], 
    //room right
    ["M83", "M86"],
    ["M86", "M88"],
    ["M88", "M82"],
    ["M90", "M84"],
    ["M89", "M85"],
    //stairs right
    ["M91", "M90"],
    ["M91", "M92"],
    ["M92", "M93"],
    ["M92", "M94"],
    //gurl cr
    ["M94", "M95"],
    ["M95", "M96"],
    ["M96", "M97"],
    ["M97", "M98"],
    ["M95", "M98"],
    //ewan
    ["M99", "M100"],
    ["M100", "M101"],
    ["M101", "M102"],
    ["M102", "M103"],
    //boi cr
    ["M104", "M105"],
    ["M108", "M30"],
    ["M106", "M107"],
    ["M109", "M110"],
    ["M108", "M111"],

    ["S1", "S2"],
    ["S3", "S4"],
    ["S5", "S6"],
    ["S7", "S8"],

  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.28, y: 0.88, label: "TYK\n700" },
    L2: { x: 0.37, y: 0.84, label: "TYK\n702" },
    L3: { x: 0.45, y: 0.794, label: "TYK\n704" },
    
    L4: { x: 0.425, y: 0.95, label: "TYK\n701" },
    L5: { x: 0.5, y: 0.906, label: "TYK\n703" },
    L6: { x: 0.58, y: 0.86, label: "TYK\n705" },
    L7: { x: 0.52, y: 0.59, label: "Lobby" },

    L8: { x: 0.58, y: 0.495, label: "Female\nCR" },
    L9: { x: 0.585, y: 0.39, label: "Male\nCR" },
    L10: { x: 0.587, y: 0.33, label: "TYK\n706" },
    L11: { x: 0.587, y: 0.27, label: "TYK\n707" },

    L12: { x: 0.61, y: 0.205, label: "TYK\n709" },
    L13: { x: 0.61, y: 0.145, label: "TYK\n711" },
    L14: { x: 0.61, y: 0.087, label: "TYK\n713" },

    L15: { x: 0.39, y: 0.205, label: "TYK\n708" },
    L16: { x: 0.39, y: 0.145, label: "TYK\n710" },
    L17: { x: 0.39, y: 0.087, label: "TYK\n712" },
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
        Tan Yan Kee Building - Seventh Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        {/* <Image
          source={require("../images/TYK7THFLR.png")}
          style={{ width: "97%", height: "100%", position: "absolute", resizeMode: "contain" }}
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
              r={3} // CHANGE TO 0 ONCE YOU'RE DONE (Chelsea, Jinjer, Mariel, Jacob)
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
                fontSize: 11,
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

export default TYK7THFLOORScreen;