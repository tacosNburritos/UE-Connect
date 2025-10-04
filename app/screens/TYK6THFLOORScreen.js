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

const TYK6THFLOORScreen = ({ route, navigation }) => {
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
    M1: { x: 0.6, y: 0.02 },
    M2: { x: 0.47, y: 0.02 },
    M3: { x: 0.47, y: 0.076 },
    M4: { x: 0.39, y: 0.076 },
    M5: { x: 0.39, y: 0.136 },
    M6: { x: 0.47, y: 0.136 },
    M7: { x: 0.39, y: 0.264 },
    M8: { x: 0.47, y: 0.264 },
    M9: { x: 0.47, y: 0.358 },
    M10: { x: 0.38, y: 0.358 },
    M11: { x: 0.36, y: 0.375 },
    M12: { x: 0.38, y: 0.39 },
    M13: { x: 0.54, y: 0.39 },
    M14: { x: 0.54, y: 0.39 },
    M15: { x: 0.425, y: 0.39 },
    M16: { x: 0.421, y: 0.565 },
    M17: { x: 0.5, y: 0.605 },
    M18: { x: 0.421, y: 0.65 },
    M19: { x: 0.476, y: 0.677 },
    M20: { x: 0.423, y: 0.708 },
    M21: { x: 0.474, y: 0.737 },
    M22: { x: 0.425, y: 0.765 },
    M23: { x: 0.484, y: 0.795 },
    M24: { x: 0.53, y: 0.768 },
    M25: { x: 0.55, y: 0.768 },
    M26: { x: 0.459, y: 0.809 },
    M27: { x: 0.536, y: 0.851 },
    M28: { x: 0.28, y: 0.905 },
    M29: { x: 0.439, y: 0.99999},
    M30: { x: 0.641, y: 0.91},
    M31: { x: 0.469, y: 0.815 },
    M32: { x: 0.599, y: 0.887 },
    M33: { x: 0.621, y: 0.876 },
    M34: { x: 0.621, y: 0.876 },
    M35: { x: 0.621, y: 0.768 },
    M36: { x: 0.58, y: 0.768 },
    M37: { x: 0.669, y: 0.768 },
    M38: { x: 0.669, y: 0.516 },
    M39: { x: 0.644, y: 0.516 },
    M40: { x: 0.644, y: 0.499 },
    M41: { x: 0.67, y: 0.486 },
    M42: { x: 0.644, y: 0.470 },
    M43: { x: 0.644, y: 0.455 },
    M44: { x: 0.673, y: 0.455 },
    M45: { x: 0.673, y: 0.391 },
    M46: { x: 0.58, y: 0.391 },
    M47: { x: 0.675, y: 0.344 },
    M50: { x: 0.65, y: 0.344 },
    M51: { x: 0.63, y: 0.344 },
    M52: { x: 0.61, y: 0.344 },
    M53: { x: 0.609, y: 0.391 },
    M54: { x: 0.675, y: 0.316 },
    M55: { x: 0.654, y: 0.316 },
    M56: { x: 0.636, y: 0.316 },
    M57: { x: 0.611, y: 0.316 },
    M58: { x: 0.611, y: 0.269 },
    M59: { x: 0.675, y: 0.269 },
    M60: { x: 0.675, y: 0.203 },
    M61: { x: 0.675, y: 0.138 },
    M62: { x: 0.678, y: 0.076 },
    M63: { x: 0.597, y: 0.076 },
    M64: { x: 0.597, y: 0.203 },
    M65: { x: 0.595, y: 0.269 },
    M66: { x: 0.595, y: 0.138 },
    //new add
    M67: { x: 0.47, y: 0.376 },
    M68: { x: 0.41, y: 0.376 },
    M69: { x: 0.51, y: 0.358 },
    M70: { x: 0.51, y: 0.34 },
    M71: { x: 0.47, y: 0.34 },
    M72: { x: 0.51, y: 0.3219 },
    M73: { x: 0.47, y: 0.3219 },
    M74: { x: 0.51, y: 0.303 },
    M75: { x: 0.47, y: 0.303 },
    M76: { x: 0.51, y: 0.278 },
    M77: { x: 0.47, y: 0.278 },
    M78: { x: 0.51, y: 0.295 },
    M79: { x: 0.47, y: 0.295 },
    M80: { x: 0.482, y: 0.824 },
    M81: { x: 0.51, y: 0.808 },
    M82: { x: 0.541, y: 0.825 },
    M83: { x: 0.513, y: 0.836 },
    M84: { x: 0.564, y: 0.837},
    M85: { x: 0.578, y: 0.799},
    M86: { x: 0.533, y: 0.076},
    M87: { x: 0.533, y: 0.037},
  };

  const mapConnections = [
    //new add
    ["M67", "M68"],
    ["M9", "M69"],
    ["M70", "M71"],
    ["M72", "M73"],
    ["M74", "M75"],
    ["M76", "M77"],
    ["M78", "M79"],
    ["M76", "M78"],
    ["M80", "M81"],
    ["M82", "M83"],
    ["M84", "M27"],
    ["M36", "M85"],
    ["M86", "M87"],



    ["M1", "M2"],
    ["M2", "M3"],
    ["M3", "M4"],
    ["M4", "M5"],
    ["M5", "M6"],
    ["M6", "M3"],
    ["M5", "M7"],
    ["M7", "M8"],
    ["M6", "M8"],
    ["M8", "M9"], 
    ["M9", "M10"], 
    ["M10", "M11"], 
    ["M11", "M12"], 
    ["M12", "M13"], 
    ["M13", "M14"],
    ["M14", "M15"],
    ["M15", "M16"],
    ["M16", "M17"],
    ["M17", "M18"],
    ["M18", "M19"],
    ["M19", "M20"],
    ["M20", "M21"],
    ["M21","M22"],
    ["M22","M23"],
    ["M23","M24"],
    ["M24","M25"],
    ["M24","M26"],
    ["M26","M27"],
    ["M31","M28"],
    ["M28","M29"],
    ["M29","M30"],
    ["M30","M32"],
    ["M32","M33"],
    ["M33","M34"],
    ["M34","M35"],
    ["M35","M36"],
    ["M36","M37"],
    ["M37","M38"],
    ["M38","M39"],
    ["M39","M40"],
    ["M40","M41"],
    ["M41","M42"],
    ["M42","M43"],
    ["M43","M44"],
    ["M44","M45"],
    ["M45","M46"],
    ["M45","M48"],
    ["M53","M52"],
    ["M52","M51"],
    ["M47","M50"],
    ["M45","M47"],
    ["M54","M47"],
    ["M54","M55"],
    ["M56","M57"],
    ["M57","M58"],
    ["M58","M59"],
    ["M59","M47"],
    ["M59","M60"],
    ["M60","M61"],
    ["M61","M62"],
    ["M62","M63"],
    ["M63","M1"],
    ["M63","M66"],
    ["M66","M61"],
    ["M65","M59"],
    ["M64","M60"],
    ["M64","M65"],
    ["M66","M64"],
    
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.38, y: 0.09, label: "Work\nshop\nRoom" },
    L2: { x: 0.376, y: 0.18, label: "Arts &\nDesign \nOpen \nStudio" },
    L3: { x: 0.53, y: 0.6, label: "Library" },
    L4: { x: 0.58, y: 0.22, label: "Anim-\nation \nStudio" },
    L5: { x: 0.595, y: 0.16, label: "TYK\n600" },
    L6: { x: 0.58, y: 0.09, label: "Video\nEditing\nRoom" },
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
        TYK Building - Sixth Floor
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

export default TYK6THFLOORScreen;
