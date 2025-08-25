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

const LCT4THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {  
    //left wing stairs
    B1: { x: 0.335, y: 0.016 },
    B2: { x: 0.335, y: 0.064 },
    B3: { x: 0.48, y: 0.064 },
    B4: { x: 0.48, y: 0.016 },
    // female comfort room cr
    B5: { x: 0.335, y: 0.064 },
    B6: { x: 0.335, y: 0.153 },
    B7: { x: 0.48, y: 0.153},
    B8: { x: 0.48, y: 0.064 },
    //room 407
    B9:  { x: 0.335, y: 0.153 },
    B10: { x: 0.335, y: 0.246 },
    B11: { x: 0.48, y: 0.246},
    B12: { x: 0.48, y: 0.153},
    //room 405
    B13: { x: 0.335, y: 0.246 },
    B14: { x: 0.335, y: 0.341},
    B15: { x: 0.48, y: 0.341},
    B16: { x: 0.48, y: 0.246},
    //room 403
    B17: { x: 0.335, y: 0.341},
    B18: { x: 0.335, y: 0.434},
    B19: { x: 0.48, y: 0.434},
    B20: { x: 0.48, y: 0.341},
    // room 401
    B21: { x: 0.335, y: 0.434 },
    B22: { x: 0.335, y: 0.527},
    B23: { x: 0.48, y: 0.527},
    B24: { x: 0.48, y: 0.434},
    //elevator
    B25: { x: 0.335, y: 0.527 },
    B26: { x: 0.335, y: 0.621},
    B27: { x: 0.48, y: 0.621},
    B28: { x: 0.48, y: 0.527},
    // biology laboratory
    B29: { x: 0.305, y: 0.621 },
    B30: { x: 0.305, y: 0.807},
    B31: { x: 0.48, y: 0.807},
    B32: { x: 0.48, y: 0.621},
    // instrumentation room
    //B33: { x: 0.305, y: 0.788 },
    //B34: { x: 0.305, y: 0.807},
    //B35: { x: 0.48, y: 0.807},
    //B36: { x: 0.48, y: 0.788},
    // male comfort room cr
    B37: { x: 0.335, y: 0.807 },
    B38: { x: 0.335, y: 0.895},
    B39: { x: 0.48, y: 0.895},
    B40: { x: 0.48, y: 0.807},
    //right wing stairs
    B41: { x: 0.335, y: 0.895},
    B42: { x: 0.335, y: 0.951},
    B43: { x: 0.48, y: 0.951},
    B44: { x: 0.48, y: 0.895},

    //hallway
    H1: { x: 0.48, y: 0.016 },
    H2: { x: 0.48, y: 0.951 },
    H3: { x: 0.535, y: 0.951 },
    H4: { x: 0.535, y: 0.016 },


    //room 408
    F1:  { x: 0.535, y: 0.064 },
    F2:  { x: 0.535, y: 0.153 },
    F3:  { x: 0.679, y: 0.153 },
    F4:  { x: 0.679, y: 0.064 },
    // room 406
    F5:  { x: 0.535, y: 0.153 },
    F6:  { x: 0.535, y: 0.246 },
    F7:  { x: 0.679, y: 0.246 },
    F8:  { x: 0.679, y: 0.153 },
    // room 404
    F9:  { x: 0.535, y: 0.246 },
    F10: { x: 0.535, y: 0.341 },
    F11: { x: 0.679, y: 0.341 },
    F12: { x: 0.679, y: 0.246 },
    // room 402
    F13: { x: 0.535, y: 0.341 },
    F14: { x: 0.535, y: 0.434 },
    F15: { x: 0.679, y: 0.434 },
    F16: { x: 0.679, y: 0.341 },
    // room 400
    F17: { x: 0.535, y: 0.434 },
    F18: { x: 0.535, y: 0.527 },
    F19: { x: 0.679, y: 0.527 },
    F20: { x: 0.679, y: 0.434 },
    // room beside 400
    F33: { x: 0.535, y: 0.527 },
    F34: { x: 0.535, y: 0.571 },
    F35: { x: 0.679, y: 0.571 },
    F36: { x: 0.679, y: 0.527 },
    // middle stairs
    F21: { x: 0.535, y: 0.571 },
    F22: { x: 0.535, y: 0.621 },
    F23: { x: 0.679, y: 0.621 },
    F24: { x: 0.679, y: 0.571 },
    // physical laboratory
    F25: { x: 0.535, y: 0.621 },
    F26: { x: 0.535, y: 0.783 },
    F27: { x: 0.679, y: 0.783 },
    F28: { x: 0.679, y: 0.621 },
    // chemistry laboratory
    F29: { x: 0.535, y: 0.783 },
    F30: { x: 0.535, y: 0.895},
    F31: { x: 0.679, y: 0.895 },
    F32: { x: 0.679, y: 0.783 },
  };


  const mapConnections = [
    //hallway
    ["H1", "H2"],
    ["H2", "H3"],
    ["H3", "H4"],
    ["H4", "H1"],
    //left wing stairs
    ["B1", "B2"],
    ["B2", "B3"],
    ["B3", "B4"],
    ["B4", "B1"],
    // female comfort room cr
    ["B5", "B6"],
    ["B6", "B7"],
    ["B7", "B8"],
    ["B8", "B5"],
    // room 407
    ["B9",  "B10"],
    ["B10", "B11"],
    ["B11", "B12"],
    ["B12", "B9"],
    //room 405
    ["B13", "B14"],
    ["B14", "B15"],
    ["B15", "B16"],
    ["B16", "B13"],
    // room 403
    ["B17", "B18"],
    ["B18", "B19"],
    ["B19", "B20"],
    ["B20", "B17"],
    // room 401
    ["B21", "B22"],
    ["B22", "B23"],
    ["B23", "B24"],
    ["B24", "B21"],
    //elevator
    ["B25", "B26"],
    ["B26", "B27"],
    ["B27", "B28"],
    ["B28", "B25"],
    // biology laboratory
    ["B29", "B30"],
    ["B30", "B31"],
    ["B31", "B32"],
    ["B32", "B29"],
    // instrumentation room
    //["B33", "B34"],
    //["B34", "B35"],
    //["B35", "B36"],
    //["B36", "B33"],
    // male comfort room cr
    ["B37", "B38"],
    ["B38", "B39"],
    ["B39", "B40"],
    ["B40", "B37"],
    //right wing stairs
    ["B41", "B42"],
    ["B42", "B43"],
    ["B43", "B44"],
    ["B44", "B41"],


    //room 408
    ["F1", "F2"],
    ["F2", "F3"],
    ["F3", "F4"],
    ["F4", "F1"],
    //room 406
    ["F5", "F6"],
    ["F6", "F7"],
    ["F7", "F8"],
    ["F8", "F5"],
    //room 404
    ["F9",  "F10"],
    ["F10", "F11"],
    ["F11", "F12"],
    ["F12", "F9"],
    // room 402
    ["F13", "F14"],
    ["F14", "F15"],
    ["F15", "F16"],
    ["F16", "F13"],
    // room 400
    ["F17", "F18"],
    ["F18", "F19"],
    ["F19", "F20"],
    ["F20", "F17"],
    // room beside 400
    ["F33", "F34"],
    ["F34", "F35"],
    ["F35", "F36"],
    ["F36", "F333"],
    // middle stairs
    ["F21", "F22"],
    ["F22", "F23"],
    ["F23", "F24"],
    ["F24", "F21"],
    // physical laboratory
    ["F25", "F26"],
    ["F26", "F27"],
    ["F27", "F28"],
    ["F28", "F25"],
    // chemistry laboratory
    ["F37", "F38"],
    ["F38", "F39"],
    ["F39", "F40"],
    ["F40", "F37"],
    // room 300
    ["F29", "F30"],
    ["F30", "F31"],
    ["F31", "F32"],
    ["F32", "F29"],
  ];


// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.10, y: 0.25, label: "Room 101" },
    L2: { x: 0.35, y: 0.25, label: "Room 102" },
    L3: { x: 0.6, y: 0.4, label: "Lobby" },
  };

  const stairNodes = [
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
        LCT - Fourth Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/LCT4THFLR.png")}
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

export default LCT4THFLOORScreen;
