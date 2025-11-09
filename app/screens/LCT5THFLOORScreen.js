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

const LCT5THFLOORScreen = ({ route, navigation }) => {
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
  // left stairs outline
    S1: { x: 0.375, y: 0.025 },
    S2: { x: 0.375, y: 0.055 },
    S3: { x: 0.390, y: 0.025 },
    S4: { x: 0.390, y: 0.055 },
    S5: { x: 0.405, y: 0.025 },
    S6: { x: 0.405, y: 0.055 },
    S7: { x: 0.420, y: 0.025 },
    S8: { x: 0.420, y: 0.055 },
    S9: { x: 0.435, y: 0.025 },
    S10: { x: 0.435, y: 0.055 },
    //left wing stairs
    B1: { x: 0.335, y: 0.016 },
    B2: { x: 0.335, y: 0.064 },
    B3: { x: 0.535, y: 0.064 },
    B4: { x: 0.535, y: 0.016 },
    // multipurpose hall mph auditorium lct
    B5: { x: 0.335, y: 0.064 },
    B6: { x: 0.335, y: 0.527 },
    B7: { x: 0.679, y: 0.527},
    B8: { x: 0.679, y: 0.064 },
             //elevator
    B25: { x: 0.335, y: 0.527 },
    B26: { x: 0.335, y: 0.621},
    B27: { x: 0.405, y: 0.621},
    B28: { x: 0.405, y: 0.527},
    //elevator outline
    E1: { x: 0.35, y: 0.613 },
    E2: { x: 0.385, y: 0.593},
    E3: { x: 0.35, y: 0.593},
    E4: { x: 0.385, y: 0.613},
    E5: { x: 0.35, y: 0.583},
    E6: { x: 0.385, y: 0.563},
    E7: { x: 0.35, y: 0.563},
    E8: { x: 0.385, y: 0.583},
    E9: { x: 0.35, y: 0.553},
    E10: { x: 0.385, y: 0.535},
    E11: { x: 0.35, y: 0.535},
    E12: { x: 0.385, y: 0.553},
    // wall
    B29: { x: 0.335, y: 0.621 },
    B30: { x: 0.335, y: 0.807},
    // male female comfort room cr
    B37: { x: 0.335, y: 0.807 },
    B38: { x: 0.335, y: 0.895},
    B39: { x: 0.41, y: 0.895},
    B40: { x: 0.41, y: 0.807},
         //right stairs outline
    S11: { x: 0.375, y: 0.905 },
    S12: { x: 0.375, y: 0.940 },
    S13: { x: 0.390, y: 0.905 },
    S14: { x: 0.390, y: 0.940 },
    S15: { x: 0.405, y: 0.905 },
    S16: { x: 0.405, y: 0.940 },
    S17: { x: 0.420, y: 0.905 },
    S18: { x: 0.420, y: 0.940 },
    S19: { x: 0.435, y: 0.905 },
    S20: { x: 0.435, y: 0.940 },
    //right wing stairs
    B41: { x: 0.335, y: 0.895},
    B42: { x: 0.335, y: 0.951},
    B43: { x: 0.535, y: 0.951},
    B44: { x: 0.535, y: 0.895},
        // middle stairs outline
    S21: { x: 0.570, y: 0.582 },
    S22: { x: 0.570, y: 0.609 },
    S23: { x: 0.585, y: 0.582 },
    S24: { x: 0.585, y: 0.609 },
    S25: { x: 0.601, y: 0.582 },
    S26: { x: 0.601, y: 0.609 },
    S27: { x: 0.615, y: 0.582 },
    S28: { x: 0.615, y: 0.609 },
    S29: { x: 0.630, y: 0.582 },
    S30: { x: 0.630, y: 0.609 },
    // middle stairs
    F21: { x: 0.535, y: 0.571 },
    F22: { x: 0.535, y: 0.621 },
    F23: { x: 0.679, y: 0.621 },
    F24: { x: 0.679, y: 0.571 },
    // library lct
    F37: { x: 0.48, y: 0.669 },
    F38: { x: 0.48, y: 0.895 },
    F39: { x: 0.679, y: 0.895 },
    F40: { x: 0.679, y: 0.669 },
  };


  const mapConnections = [
    ["B7", "F40"],

    // left stairs outline
    ["S1", "S2"],
    ["S3", "S4"],
    ["S5", "S6"],
    ["S7", "S8"],
    ["S9", "S10"],
    //left wing stairs
    ["B1", "B2"],
    ["B2", "B3"],
    ["B3", "B4"],
    ["B4", "B1"],
    // lct mph
    ["B5", "B6"],
    ["B6", "B7"],
    ["B7", "B8"],
    ["B8", "B5"],
    //elevator outline
     ["E1", "E2"],
    ["E3", "E4"],
    ["E5", "E6"],
    ["E7", "E8"],
    ["E9", "E10"],
    ["E11", "E12"],
    //elevator
    ["B25", "B26"],
    ["B26", "B27"],
    ["B27", "B28"],
    ["B28", "B25"],
    ["B45", "B46"],
    ["B46", "B47"],
    ["B47", "B48"],
    ["B48", "B45"],
    // wall
    ["B29", "B30"],
    ["B30", "B31"],
    // comfort room cr
    ["B37", "B38"],
    ["B38", "B39"],
    ["B39", "B40"],
    ["B40", "B37"],
    // right stairs outline
    ["S11", "S12"],
    ["S13", "S14"],
    ["S15", "S16"],
    ["S17", "S18"],
    ["S19", "S20"],
    //right wing stairs
    ["B41", "B42"],
    ["B42", "B43"],
    ["B43", "B44"],
    // middle stairs outline
    ["S21", "S22"],
    ["S23", "S24"],
    ["S25", "S26"],
    ["S27", "S28"],
    ["S29", "S30"],
    // middle stairs
    ["F22", "F23"],
    ["F23", "F24"],
    ["F24", "F21"],
    // room 802
    ["F25", "F26"],
    ["F26", "F27"],
    ["F27", "F28"],
    ["F28", "F25"],
    // room 801
    ["F37", "F38"],
    ["F38", "F39"],
    ["F39", "F40"],
    ["F40", "F37"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    // LB1: { x: 0.345, y: 0.040, label: "Stairs" },
    LB4: { x: 0.345, y: 0.292, label: "LCT Multipurpose Hall/\n          Auditorium" },
    LB8: { x: 0.475, y: 0.546, label: "Lobby" },
    LB10: { x: 0.338, y: 0.850, label: "CR" },
    // LB11: { x: 0.345, y: 0.925, label: "Stairs" },
    // LF10: { x: 0.540, y: 0.595, label: "Stairs" },
    LF9: { x: 0.49, y: 0.775, label: "LCT Library" },
    LF10: { x: 0.41, y: 0.57, label: "Elev." },

  };

  const stairNodes = [
    "LCT - EL",
    "LCT - ER",
    "LCT - ELEVATOR"
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
  else if (nextFloor === 17) nextScreen = "LCT1STFLOORScreen";
  else if (nextFloor === 18) nextScreen = "LCT2NDFLOORScreen";
  else if (nextFloor === 19) nextScreen = "LCT3RDFLOORScreen";
  else if (nextFloor === 20) nextScreen = "LCT4THFLOORScreen";
  else if (nextFloor === 21) nextScreen = "LCT5THFLOORScreen";
  else if (nextFloor === 22) nextScreen = "LCT6THFLOORScreen";
  else if (nextFloor === 23) nextScreen = "LCT7THFLOORScreen";
  else if (nextFloor === 24) nextScreen = "LCT8THFLOORScreen";
  else nextScreen = "EN1STFLOORScreen"; // fallback

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
        LCT Building - Fifth Floor
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
                    fontSize: 10,
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

export default LCT5THFLOORScreen;
