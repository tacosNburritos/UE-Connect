import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
// Import Gesture components for zoom/pan functionality
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler"; // <--- ADDED GestureHandlerRootView
import { Svg, Circle, Line } from "react-native-svg";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  Easing,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedView = Animated.createAnimatedComponent(View); // Use Animated.View for the zoomable map container

const TYK10THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  // === ZOOM & PAN STATE ===
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  // ========================

const mapNodes = {
    //stairs top
    M1: { x: 0.61, y: 0.01 },
    M2: { x: 0.49, y: 0.01 },
    M3: { x: 0.49, y: 0.060 },
    M4: { x: 0.61, y: 0.060 },
    M5: { x: 0.551, y: 0.061 },
    M6: { x: 0.551, y: 0.021 },
    //upper-left room
    M7: { x: 0.407, y: 0.060 },
    M8: { x: 0.407, y: 0.122 },
    M9: { x: 0.49, y: 0.122 },
    M10: { x: 0.49, y: 0.074},
    M11: { x: 0.49, y: 0.109 },
    //upper-left center room
    M12: { x: 0.407, y: 0.186 },
    M13: { x: 0.491, y: 0.186 },
    M14: { x: 0.49, y: 0.138 },
    M15: { x: 0.49, y: 0.172 },
    //upper-left bottom room
    M16: { x: 0.407, y: 0.247 },
    M17: { x: 0.529, y: 0.247 },
    M18: { x: 0.49, y: 0.201 },
    M19: { x: 0.49, y: 0.235 },
    //upper-right room
    M20: { x: 0.691, y: 0.060 },
    M21: { x: 0.692, y: 0.121 },
    M22: { x: 0.61, y: 0.122 },
    M23: { x: 0.61, y: 0.074 },
    M24: { x: 0.61, y: 0.109 },
    //upper-right center room
    M25: { x: 0.693, y: 0.185 },
    M26: { x: 0.610, y: 0.185 },
    M27: { x: 0.61, y: 0.135 },
    M28: { x: 0.61, y: 0.171 },
    //upper-right bottom room
    M29: { x: 0.692, y: 0.245 },
    M30: { x: 0.610, y: 0.245 },
    M31: { x: 0.61, y: 0.198 },
    M32: { x: 0.61, y: 0.233 },
    //semi upper-left room
    M33: { x: 0.49, y: 0.24 },
    M34: { x: 0.49, y: 0.258 },
    M35: { x: 0.490, y: 0.276 },
    M36: { x: 0.530, y: 0.258 },
    M37: { x: 0.531, y: 0.276 },
  //left elevator
    M38: { x: 0.49, y: 0.284 },
    M39: { x: 0.532, y: 0.285 },
    M40: { x: 0.49, y: 0.303 },
    M41: { x: 0.530, y: 0.304 },
    M42: { x: 0.491, y: 0.321 },
    M43: { x: 0.529, y: 0.322 },
    M44: { x: 0.491, y: 0.338 },
    M45: { x: 0.42, y: 0.356 },
    M46: { x: 0.49, y: 0.356 },

    //stairs
    M47: { x: 0.394, y: 0.339 },
    M48: { x: 0.375, y: 0.356 },
    M49: { x: 0.395, y: 0.372 },
    M50: { x: 0.481, y: 0.371 },
    //faculty?
    M51: { x: 0.481, y: 0.425 },
    M52: { x: 0.446, y: 0.448 },
    M53: { x: 0.566, y: 0.459 },
    M54: { x: 0.448, y: 0.372 },
    M55: { x: 0.449, y: 0.493},
    M56: { x: 0.557, y: 0.566 },
    //zigzad left
    M57: { x: 0.448, y: 0.542 },
    M58: { x: 0.529, y: 0.581 },
    M59: { x: 0.529, y: 0.581 },
    M60: { x: 0.448, y: 0.627 },
    M61: { x: 0.504, y: 0.651 }, //THIS ONE
    M611: { x: 0.56, y: 0.627 }, //THIS ONE
    M62: { x: 0.451, y: 0.683 },
    M63: { x: 0.507, y: 0.712 }, //THIS ONE
    M633: { x: 0.564, y: 0.683 }, //THIS ONE
    M64: { x: 0.45, y: 0.74},
    //elevator baba
    M65: { x: 0.51, y: 0.77},
    M66: { x: 0.563, y: 0.741 },
    M67: { x: 0.49, y: 0.782 },
    M68: { x: 0.63, y: 0.855 },
    M69: { x: 0.591, y: 0.811 },
    M70: { x: 0.57, y: 0.821 },
    M71: { x: 0.57, y: 0.798 },
    M72: { x: 0.541, y: 0.809 },
    //lower 1 room
    M73: { x: 0.49, y: 0.79 },
    M74: { x: 0.43, y: 0.819 }, 
    M75: { x: 0.47, y: 0.839 },
    //lower 2,3 room
    M76: { x: 0.355, y: 0.854},
    M77: { x: 0.401, y: 0.874 },
    M78: { x: 0.285, y: 0.89 },
    M79: { x: 0.333, y: 0.911 },
    //stairs
    M80: { x: 0.296, y: 0.931},
    M81: { x: 0.381, y: 0.966},
    M82: { x: 0.412, y: 0.949},
    //room right
    M83: { x: 0.469, y: 0.977},
    M84: { x: 0.541, y: 0.941},
    M85: { x: 0.617, y: 0.911},
    M86: { x: 0.67, y: 0.882},
    M88: { x: 0.625, y: 0.856},
    M89: { x: 0.569, y: 0.888},
    M90: { x: 0.50, y: 0.92},
    //stairs right
    M91: { x: 0.655, y: 0.846},
    M92: { x: 0.65, y: 0.74},
    M93: { x: 0.566, y: 0.74},
    M94: { x: 0.695, y: 0.74},
    //gurl cr
    M95: { x: 0.695, y: 0.553},
    M96: { x: 0.693, y: 0.492},
    M97: { x: 0.61, y: 0.493},
    M98: { x: 0.61, y: 0.554},
    //ewan
    M99: { x: 0.664, y: 0.49},
    M100: { x: 0.665, y: 0.476},
    M101: { x: 0.693, y: 0.463},
    M102: { x: 0.664, y: 0.449},
    M103: { x: 0.664, y: 0.433},
    //boi cr
    M104: { x: 0.693, y: 0.433},
    M105: { x: 0.692, y: 0.245},
    M106: { x: 0.692, y: 0.308},
    M107: { x: 0.61, y: 0.308},
    M108: { x: 0.61, y: 0.433},
    M109: { x: 0.61, y: 0.371},
    M110: { x: 0.692, y: 0.371},
    M111: { x: 0.642, y: 0.433},

    M112: { x: 0.544, y: 0.78},
    M113: { x: 0.517, y: 0.796},

    //additions
    M114: { x: 0.693, y: 0.615 },
    M115: { x: 0.61, y: 0.615 },
    M116: { x: 0.6933, y: 0.678 },
    M117: { x: 0.61, y: 0.678 },
    M118: { x: 0.61, y: 0.695 },
    M119: { x: 0.61, y: 0.72 },
    M210: { x: 0.61, y: 0.57 },
    M211: { x: 0.61, y: 0.6 },

  };

  const mapConnections = [
    ["M112", "M113"],
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
    ["M56", "M58"],
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
    ["M72", "M75"],
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
    ["M103", "M104"],
    ["M108", "M30"],
    ["M106", "M107"],
    ["M109", "M110"],
    ["M108", "M111"],

    //additions
    ["M114", "M115"],
    ["M116", "M117"],
    ["M115", "M117"],
    ["M118", "M119"],
    ["M210", "M211"],
    ["M61", "M611"],
    ["M63", "M633"],
    ["M611", "M633"],
    ["M56", "M611"],
    ["M66", "M633"],

  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.4, y: 0.08, label: "TYK\n1014" },
    L2: { x: 0.4, y: 0.148, label: "TYK\n1012" },
    L3: { x: 0.4, y: 0.21, label: "TYK\n1010" },

    L4: { x: 0.6, y: 0.08, label: "TYK\n1013" },
    L5: { x: 0.6, y: 0.148, label: "TYK\n1011" },
    L6: { x: 0.6, y: 0.21, label: "TYK\n1009" },

    L7: { x: 0.6, y: 0.27, label: "TYK\n1008" },
    L8: { x: 0.6, y: 0.33, label: "TYK\n1007" },

    L9: { x: 0.5, y: 0.4, label: "Lobby" },

    L10: { x: 0.47, y: 0.52, label: "TYK \n1006" },

    L11: { x: 0.47, y: 0.61, label: "TYK \n1004" },
    L12: { x: 0.47, y: 0.67, label: "TYK \n1002" },
    L13: { x: 0.47, y: 0.73, label: "TYK \n1000" },

    L14: { x: 0.6, y: 0.58, label: "TYK \n1005" },
    L15: { x: 0.6, y: 0.64, label: "TYK \n1003" },
    L16: { x: 0.6, y: 0.7, label: "TYK \n1001" },
    L17: { x: 0.53, y: 0.25, label: "E\nL\nV\nA\nT\nO\nR" },
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
    const animatedProps = useAnimatedProps(() => {
      // Calculate the length of the line segment for dash array/offset
      const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      return {
        // Use the actual line length for dash array/offset
        strokeDasharray: [length, length],
        strokeDashoffset: (1 - progress.value) * length,
      };
    });
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

  // --- GESTURE HANDLERS ---
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Apply translation relative to the current saved position
      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      // Save the new translated position
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      // Update scale relative to the saved scale
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      // Clamp the scale between 1 (min zoom) and 5 (max zoom)
      if (scale.value < 1) {
        scale.value = withTiming(1);
      } else if (scale.value > 5) {
        scale.value = withTiming(5);
      }
      // Save the final scale value
      savedScale.value = scale.value;
    });

  // Combine pan and pinch gestures
  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  // Animated Style for the map container
  const mapAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });
  // -------------------------

  return (
    // Replaced the top-level <View> with <GestureHandlerRootView>
    <GestureHandlerRootView style={styles.flexContainer}> 
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        {showNextButton && (
          <TouchableOpacity
            onPress={handleNextPress}
            style={styles.nextButton}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.titleText}>
        TYK Building - Tenth Floor
      </Text>

      {/* Gesture Detector wraps the map */}
      <GestureDetector gesture={composedGesture}>
        <AnimatedView
          ref={containerRef}
          onLayout={onLayout}
          style={[styles.mapWrapper, mapAnimatedStyle]}
        >
          {/* Background image to trace over */}
          {/* <Image
            source={require("../images/EN1STFLR.png")}
            style={styles.backgroundImage}
          /> */}

          {/* SVG layer for map lines and path */}
          <Svg width="100%" height="100%" style={styles.svgLayer}>
            {/* MAP CONNECTIONS (Static Map Lines) */}
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

            {/* ANIMATED PATH LINES */}
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

            {/* Start point (You) */}
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

            {/* End point (Destination) */}
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

            {/* Map node circles (for debug, currently hidden) */}
            {Object.entries(mapNodes).map(([key, { x, y }]) => (
              <Circle
                key={`node-${key}`}
                cx={x * containerSize.width}
                cy={y * containerSize.height}
                r={0} 
                fill="red"
              />
            ))}
          </Svg>

          {/* Label points */}
          {Object.entries(labelNodes).map(([key, { x, y, label }]) => {
            if (stairNodes.includes(label)) return null;

            return (
              <React.Fragment key={`label-${key}`}>
                <Circle
                  cx={x * containerSize.width}
                  cy={y * containerSize.height}
                  r={0}
                  fill="black"
                />
                <Text
                  style={{
                    position: "absolute",
                    left: x * containerSize.width + 6,
                    top: y * containerSize.height - 6,
                    color: "black",
                    fontSize: 9,
                    fontWeight: "bold",
                  }}
                >
                  {label}
                </Text>
              </React.Fragment>
            );
          })}

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
        </AnimatedView>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    paddingTop: 50,
  },
  headerContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "white", 
    fontSize: 16
  },
  titleText: {
    fontSize: 16, 
    fontWeight: "bold", 
    marginTop: 10,
    marginBottom: 10,
  },
  mapWrapper: {
    width: "90%",
    height: "85%",
    position: "relative",
    overflow: 'hidden', 
    backgroundColor: '##f2f2f2',
    borderRadius: 10,
    borderWidth: 0,
  },
  backgroundImage: {
    width: "100%", 
    height: "100%", 
    position: "absolute", 
    resizeMode: "contain"
  },
  svgLayer: {
    position: "absolute", 
    top: 0, 
    left: 0
  }
});

export default TYK10THFLOORScreen;
