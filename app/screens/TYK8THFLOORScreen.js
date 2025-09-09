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

const TYK8THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

 const mapNodes = {
    //stairs top
    M1: { x: 0.58, y: 0.01 },
    M2: { x: 0.51, y: 0.01 },
    M3: { x: 0.51, y: 0.046 },
    M4: { x: 0.58, y: 0.046 },
    M5: { x: 0.546, y: 0.046 },
    M6: { x: 0.546, y: 0.03 },
    //upper-left room
    M7: { x: 0.4, y: 0.046 },
    M8: { x: 0.4, y: 0.11 },
    M9: { x: 0.51, y: 0.11 },
    M10: { x: 0.51, y: 0.06},
    M11: { x: 0.51, y: 0.1 },
    //upper-left center room
    M12: { x: 0.4, y: 0.17 },
    M13: { x: 0.51, y: 0.17 },
    M14: { x: 0.51, y: 0.12 },
    M15: { x: 0.51, y: 0.158 },
    //upper-left bottom room
    M16: { x: 0.4, y: 0.23 },
    M17: { x: 0.51, y: 0.23 },
    M18: { x: 0.51, y: 0.18 },
    M19: { x: 0.51, y: 0.22 },
    //upper-right room
    M20: { x: 0.72, y: 0.046 },
    M21: { x: 0.72, y: 0.11 },
    M22: { x: 0.62, y: 0.11 },
    M23: { x: 0.62, y: 0.06 },
    M24: { x: 0.62, y: 0.1 },
    //upper-right center room
    M25: { x: 0.72, y: 0.17 },
    M26: { x: 0.62, y: 0.17 },
    M27: { x: 0.62, y: 0.12 },
    M28: { x: 0.62, y: 0.158 },
    //upper-right bottom room
    M29: { x: 0.72, y: 0.23 },
    M30: { x: 0.62, y: 0.23 },
    M31: { x: 0.62, y: 0.18 },
    M32: { x: 0.62, y: 0.21 },
    //semi upper-left room
    M33: { x: 0.50, y: 0.235 },
    M34: { x: 0.50, y: 0.245 },
    M35: { x: 0.50, y: 0.275 },
    M36: { x: 0.545, y: 0.244 },
    M37: { x: 0.546, y: 0.275 },
  //left elevator
    M38: { x: 0.50, y: 0.29 },
    M39: { x: 0.547, y: 0.29 },
    M40: { x: 0.500, y: 0.309 },
    M41: { x: 0.546, y: 0.309 },
    M42: { x: 0.50, y: 0.329 },
    M43: { x: 0.549, y: 0.329 },
    M44: { x: 0.50, y: 0.325 },
    M45: { x: 0.43, y: 0.341 },
    M46: { x: 0.51, y: 0.342 },

    //stairs
    M47: { x: 0.42, y: 0.325 },
    M48: { x: 0.402, y: 0.341 },
    M49: { x: 0.42, y: 0.356 },
    M50: { x: 0.51, y: 0.357 },
    //faculty?
    M51: { x: 0.51, y: 0.414 },
    M52: { x: 0.474, y: 0.436 },
    M53: { x: 0.59, y: 0.450 },
    M54: { x: 0.471, y: 0.357 },
    M55: { x: 0.477, y: 0.493},
    M56: { x: 0.59, y: 0.51 }, //CONNECT HERE ALSO
    //zigzad left
    M57: { x: 0.540, y: 0.530 },
    M58: { x: 0.46, y: 0.57 }, //CONNECT HERE
    M58X: { x: 0.587, y: 0.57 }, //extra point
    M59: { x: 0.52, y: 0.60 },
    M60: { x: 0.45, y: 0.636 },
    M60X: { x: 0.587, y: 0.636 },
    M61: { x: 0.52, y: 0.668 },
  
    M62: { x: 0.455, y: 0.70 },
    M63: { x: 0.529, y: 0.737 },
    M64: { x: 0.50, y: 0.752},

    
    //elevator baba
    M65: { x: 0.52, y: 0.742},
    M66: { x: 0.584, y: 0.71 },
    M67: { x: 0.597, y: 0.781 },
    M68: { x: 0.628, y: 0.767 },
    M69: { x: 0.598, y: 0.757 },
    M70: { x: 0.576, y: 0.768 },
    M71: { x: 0.574, y: 0.743 },
    M72: { x: 0.549, y: 0.756 },
    //lower 1 room
    M73: { x: 0.50, y: 0.752 },
    M74: { x: 0.42, y: 0.791 }, 
    M75: { x: 0.499, y: 0.831 },
    //lower 2,3 room
    M76: { x: 0.335, y: 0.832 },
    M77: { x: 0.414, y: 0.874 },
    M78: { x: 0.245, y: 0.876 },
    M79: { x: 0.318, y: 0.914 },
    //stairs
    M80: { x: 0.296, y: 0.926},
    M81: { x: 0.373, y: 0.966},
    M82: { x: 0.399, y: 0.952},
    //room right
    M83: { x: 0.473, y: 0.993},
    M84: { x: 0.565, y: 0.951},
    M85: { x: 0.65, y: 0.907},
    M86: { x: 0.74, y: 0.862},
    M87: { x: 0.69, y: 0.908},
    M88: { x: 0.659, y: 0.825},
    M89: { x: 0.576, y: 0.87},
    M90: { x: 0.485, y: 0.91},
    //stairs right
    M91: { x: 0.691, y: 0.809},
    M92: { x: 0.689, y: 0.701},
    M93: { x: 0.629, y: 0.70},
    M94: { x: 0.727, y: 0.702},
    //gurl cr
    M95: { x: 0.72, y: 0.513},
    M96: { x: 0.72, y: 0.463},
    M97: { x: 0.62, y: 0.464},
    M98: { x: 0.62, y: 0.513},
    //ewan
    M99: { x: 0.68, y: 0.458},
    M100: { x: 0.68, y: 0.446},
    M101: { x: 0.71, y: 0.435},
    M102: { x: 0.681, y: 0.426},
    M103: { x: 0.681, y: 0.406},
    //boi cr
    M104: { x: 0.717, y: 0.406},
    M105: { x: 0.717, y: 0.230},
    M106: { x: 0.718, y: 0.294},
    M107: { x: 0.62, y: 0.295},
    M108: { x: 0.62, y: 0.405},
    M109: { x: 0.62, y: 0.359},
    M110: { x: 0.72, y: 0.36},
    M111: { x: 0.655, y: 0.406},
    //add
    M112: { x: 0.622, y: 0.576},
    M113: { x: 0.72, y: 0.576},
    M114: { x: 0.622, y: 0.64},
    M115: { x: 0.72, y: 0.64},
    M116: { x: 0.629, y: 0.74},

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
    ["M56", "M53"],
    ["M56", "M57"],
    ["M56", "M58X"],
    
    //baba ng faculty
    ["M57", "M58"],
    ["M55", "M57"],
    ["M58", "M59"],
    ["M59", "M58X"],
    ["M59", "M60"],
    ["M60", "M61"],
    
    //NEW ONES
    ["M61", "M60X"],
    ["M58X", "M60X"],
    ["M60X", "M66"],

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
    ["M93", "M98"],
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
    //ADD
    ["M112", "M113"],
    ["M114", "M115"],
    ["M93", "M116"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.29, y: 0.86, label: "TYK\n800" },
    L2: { x: 0.38, y: 0.82, label: "TYK\n802" },
    L3: { x: 0.47, y: 0.78, label: "TYK\n804" },
    L4: { x: 0.44, y: 0.94, label: "TYK\n801" },
    L5: { x: 0.53, y: 0.9, label: "TYK\n803" },
    L6: { x: 0.62, y: 0.855, label: "TYK\n805" },
    L7: { x: 0.49, y: 0.69, label: "TYK\n806" },
    L8: { x: 0.49, y: 0.62, label: "TYK\n808" },
    L9: { x: 0.49, y: 0.56, label: "TYK\n810" },
    L10: { x: 0.64, y: 0.66, label: "TYK\n807" },
    L11: { x: 0.63, y: 0.6, label: "TYK\n809" },
    L12: { x: 0.63, y: 0.53, label: "TYK\n811" },
    L13: { x: 0.47, y: 0.47, label: "Faculty\n Room" },
    L14: { x: 0.515, y: 0.37, label: "Lobby" },
    L15: { x: 0.62, y: 0.37, label: "MALE\nCR" },
    L16: { x: 0.61, y: 0.48, label: "FEMALE\nCR" },
    L17: { x: 0.63, y: 0.32, label: "TYK\n812" },
    L18: { x: 0.63, y: 0.25, label: "TYK\n813" },
    L19: { x: 0.63, y: 0.19, label: "TYK\n815" },
    L20: { x: 0.63, y: 0.13, label: "TYK\n817" },
    L21: { x: 0.63, y: 0.07, label: "TYK\n819" },
    L22: { x: 0.418, y: 0.19, label: "TYK\n814" },
    L23: { x: 0.418, y: 0.13, label: "TYK\n816" },
    L24: { x: 0.418, y: 0.07, label: "TYK\n818" },

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
        Tan Yan Kee Building - Eighth Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        {/* <Image
          source={require("../images/TYK8THFLR.png")}
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
                stroke="black"
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
                color: "black", // Change to black if preferred
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

export default TYK8THFLOORScreen;
