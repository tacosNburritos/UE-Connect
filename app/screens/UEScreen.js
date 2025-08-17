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

const UEScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //coe
    M1: { x: 0.099, y: 0.194 },
    M2: { x: 0.216, y: 0.194 },
    M3: { x: 0.216, y: 0.168 },
    M4: { x: 0.725, y: 0.068 },
    M5: { x: 0.216, y: 0.105 },
    M6: { x: 0.216, y: 0.06 },
    M7: { x: 0.099, y: 0.06 },
    M8: { x: 0.725, y: 0.134 },
    M9: { x: 0.725, y: 0.163 },
    M10: { x: 0.86, y: 0.163 },
    M11: { x: 0.86, y: 0.023 },
    M12: { x: 0.725, y: 0.023 },

    //lct
    L1: { x: 0.11, y: 0.227 },
    L2: { x: 0.225, y: 0.229 },
    L3: { x: 0.222, y: 0.467 },
    L4: { x: 0.106, y: 0.465 },

    //hrm
    H1: { x: 0.806, y: 0.215 },
    H2: { x: 0.809, y: 0.305 },
    H3: { x: 0.909, y: 0.302 },
    H4: { x: 0.907, y: 0.211 },

    //oa
    O1: { x: 0.137, y: 0.499 },
    O2: { x: 0.22, y: 0.503 },
    O3: { x: 0.215, y: 0.66 },
    O4: { x: 0.137, y: 0.656 },

    O5: { x: 0.17, y: 0.758 },
    O6: { x: 0.195, y: 0.753 },
    O7: { x: 0.187, y: 0.742 },
    O8: { x: 0.287, y: 0.726 },
    O9: { x: 0.334, y: 0.774 },
    O10: { x: 0.21, y: 0.795 },

    //playground
    P1: { x: 0.22, y: 0.665 }, 
    P2: { x: 0.158, y: 0.68 }, 
    P3: { x: 0.278, y: 0.717 }, 
    P4: { x: 0.216, y: 0.729 }, 

    //gym
    G1: { x: 0.098, y: 0.889 },
    G2: { x: 0.118, y: 0.884 },
    G3: { x: 0.11, y: 0.872 },
    G4: { x: 0.155, y: 0.861 },
    G5: { x: 0.169, y: 0.872 },
    G6: { x: 0.202, y: 0.865 },
    G7: { x: 0.3, y: 0.954 },
    G8: { x: 0.28, y: 0.959 },
    G9: { x: 0.291, y: 0.972 },
    G10: { x: 0.217, y: 0.99 },
    G11: { x: 0.205, y: 0.978 },
    G12: { x: 0.198, y: 0.979 },

    //roan chafel
    C1: { x: 0.293, y: 0.972 }, 
    C2: { x: 0.32, y: 0.985 }, 
    C3: { x: 0.308, y: 0.99 }, 
    C4: { x: 0.28, y: 0.979 }, 

    //admin bldg
    A1: { x: 0.402, y: 0.805 },
    A2: { x: 0.62, y: 0.732 },
    A3: { x: 0.69, y: 0.775 },
    A4: { x: 0.649, y: 0.789 },
    A5: { x: 0.657, y: 0.796 },
    A7: { x: 0.618, y: 0.808 },
    A8: { x: 0.609, y: 0.803 },
    A9: { x: 0.567, y: 0.818 },
    A10: { x: 0.575, y: 0.826 },
    A11: { x: 0.537, y: 0.838 },
    A12: { x: 0.526, y: 0.83 },
    A13: { x: 0.465, y: 0.85 },

    //clinic
    CL1: { x: 0.633, y: 0.732 },
    CL2: { x: 0.68, y: 0.716 },
    CL3: { x: 0.732, y: 0.751 },
    CL4: { x: 0.69, y: 0.767 },

    //Security office
    SO1: { x: 0.92, y: 0.745 },
    SO2: { x: 0.88, y: 0.745 },
    SO3: { x: 0.88, y: 0.79 },
    SO4: { x: 0.92, y: 0.79 },

    //tyk building
    T1: { x: 0.8, y: 0.732 },
    T2: { x: 0.695, y: 0.679 },
    T3: { x: 0.81, y: 0.629 },
    T4: { x: 0.81, y: 0.621 },
    T5: { x: 0.782, y: 0.609 },
    T6: { x: 0.81, y: 0.597 },
    T7: { x: 0.782, y: 0.585 },
    T8: { x: 0.81, y: 0.572 },
    T9: { x: 0.782, y: 0.558 },
    T10: { x: 0.82, y: 0.54 },
    T11: { x: 0.787, y: 0.528 },
    T12: { x: 0.787, y: 0.502 },
    T13: { x: 0.805, y: 0.494 },
    T14: { x: 0.805, y: 0.471 },
    T15: { x: 0.765, y: 0.468 },
    T16: { x: 0.755, y: 0.461 },
    T17: { x: 0.765, y: 0.455 },
    T18: { x: 0.8, y: 0.453 },
    T19: { x: 0.8, y: 0.42 },
    T20: { x: 0.764, y: 0.42 },
    T21: { x: 0.764, y: 0.42 },
    T22: { x: 0.762, y: 0.334 },
    T23: { x: 0.803, y: 0.334 },
    T24: { x: 0.803, y: 0.317 },
    T25: { x: 0.84, y: 0.317 },
    T26: { x: 0.84, y: 0.33 },
    T27: { x: 0.9, y: 0.33 },
    T28: { x: 0.91, y: 0.49 },
    T29: { x: 0.87, y: 0.49 },
    T30: { x: 0.87, y: 0.511 },
    T31: { x: 0.908, y: 0.511 },
    T32: { x: 0.908, y: 0.63 },
    T33: { x: 0.865, y: 0.65 },
    T34: { x: 0.927, y: 0.677 },

    //roads
    R1: { x: 0.143, y: 0.195 },
    R2: { x: 0.143, y: 0.203 },
    R3: { x: 0.127, y: 0.203 },
    R4: { x: 0.127, y: 0.227 },
    R5: { x: 0.19, y: 0.195 },
    R6: { x: 0.19, y: 0.203 },
    R7: { x: 0.255, y: 0.199 },
    R8: { x: 0.37, y: 0.178 },
    R9: { x: 0.645, y: 0.164 },
    R10: { x: 0.71, y: 0.182 },
    R11: { x: 0.797, y: 0.177 },
    R12: { x: 0.77, y: 0.163 },
    R13: { x: 0.83, y: 0.163 },
    R14: { x: 0.852, y: 0.176 },
    R15: { x: 0.865, y: 0.213 },
    R16: { x: 0.266, y: 0.22 },
    R17: { x: 0.393, y: 0.193 },
    R18: { x: 0.44, y: 0.208 },
    R19: { x: 0.785, y: 0.19 },
    R20: { x: 0.785, y: 0.319 },
    R21: { x: 0.747, y: 0.319 },
    R22: { x: 0.755, y: 0.639 },
    R23: { x: 0.66, y: 0.678 },
    R24: { x: 0.643, y: 0.705 },
    R25: { x: 0.393, y: 0.787 },
    R26: { x: 0.257, y: 0.67 },

    R27: { x: 0.32, y: 0.756 },
    R28: { x: 0.372, y: 0.793 },
    R29: { x: 0.394, y: 0.822 },
    R30: { x: 0.213, y: 0.875 },

    R31: { x: 0.38, y: 0.99 },
    R32: { x: 0.248, y: 0.878 },
    R33: { x: 0.431, y: 0.826 },

    R34: { x: 0.906, y: 0.87 },
    R35: { x: 0.79, y: 0.781 },
    R36: { x: 0.81, y: 0.775 },
    R37: { x: 0.91, y: 0.85 },

    RG: { x: 0.348, y: 0.99 }, 

    R38: { x: 0.78, y: 0.772 }, 
    R39: { x: 0.8, y: 0.767 }, 

    R40: { x: 0.793, y: 0.762 }, 
    R41: { x: 0.773, y: 0.767 }, 

    R42: { x: 0.785, y: 0.757 }, 
    R43: { x: 0.766, y: 0.762 }, 

  };

  const mapConnections = [
    //coe
    ["M1", "M2"],
    ["M2", "M3"],
    ["M3", "M8"],
    ["M4", "M5"],
    ["M5", "M6"],
    ["M6", "M7"],
    ["M7", "M1"],
    ["M8", "M9"],
    ["M9", "M10"],
    ["M10", "M11"],
    ["M11", "M12"],
    ["M4", "M12"],

    //lct
    ["L1", "L2"],
    ["L2", "L3"],
    ["L3", "L4"],
    ["L4", "L1"],

    //hrm
    ["H1", "H2"],
    ["H2", "H3"],
    ["H3", "H4"],
    ["H4", "H1"],

    //OA
    ["O1", "O2"],
    ["O2", "O3"],
    ["O3", "O4"],
    ["O4", "O1"],

    ["O5", "O6"],
    ["O6", "O7"],
    ["O7", "O8"],
    ["O8", "O9"],
    ["O9", "O10"],
    ["O10", "O5"],

    //playground
    ["P1", "P2"],
    ["P2", "P4"],
    ["P3", "P4"],
    ["P1", "P3"],

    //gym
    ["G1", "G2"],
    ["G2", "G3"],
    ["G3", "G4"],
    ["G4", "G5"],
    ["G5", "G6"],
    ["G6", "G7"],
    ["G7", "G8"],
    ["G8", "G9"],
    ["G9", "G10"],
    ["G10", "G11"],
    ["G11", "G12"],
    ["G12", "G1"],

    //Chapel
    ["C1", "C2"],
    ["C2", "C3"],
    ["C3", "C4"],
    ["C4", "C1"],

    //admin bldg
    ["A1", "A2"],
    ["A2", "A3"],
    ["A3", "A4"],
    ["A4", "A5"],
    ["A5", "A7"],
    ["A7", "A8"],
    ["A8", "A9"],
    ["A9", "A10"],
    ["A10", "A11"],
    ["A11", "A12"],
    ["A12", "A13"],
    ["A13", "A1"],

    //clinic
    ["CL1", "CL2"],
    ["CL2", "CL3"],
    ["CL3", "CL4"],
    ["CL4", "CL1"],

    //security office
    ["SO1", "SO2"],
    ["SO2", "SO3"],
    ["SO3", "SO4"],
    ["SO4", "SO1"],

    //tyk building
    ["T1", "T2"],
    ["T2", "T3"],
    ["T3", "T4"],
    ["T4", "T5"],
    ["T5", "T6"],
    ["T6", "T7"],
    ["T7", "T8"],
    ["T8", "T9"],
    ["T9", "T10"],
    ["T10", "T11"],
    ["T11", "T12"],
    ["T12", "T13"],
    ["T13", "T14"],
    ["T14", "T15"],
    ["T15", "T16"],
    ["T16", "T17"],
    ["T17", "T18"],
    ["T18", "T19"],
    ["T19", "T20"],
    ["T20", "T21"],
    ["T21", "T22"],
    ["T22", "T23"],
    ["T23", "T24"],
    ["T24", "T25"],
    ["T25", "T26"],
    ["T26", "T27"],
    ["T27", "T28"],
    ["T28", "T29"],
    ["T29", "T30"],
    ["T30", "T31"],
    ["T31", "T32"],
    ["T32", "T33"],
    ["T33", "T34"],
    ["T34", "T1"],

    //roads
    ["R1", "R2"],
    ["R2", "R3"],
    ["R3", "R4"],
    ["R5", "R6"],
    ["R6", "R7"],
    ["R7", "R8"],
    ["R8", "R9"],
    ["R9", "R10"],
    ["R10", "R11"],
    ["R11", "R12"],
    ["R12", "R13"],
    ["R13", "R14"],
    ["R14", "R15"],
    ["R16", "R17"],
    ["R17", "R18"],
    ["R18", "R19"],
    ["R19", "R20"],
    ["R20", "R21"],
    ["R21", "R22"],
    ["R22", "R23"],
    ["R23", "R24"],
    ["R24", "R25"],
    ["R25", "R26"],
    ["R26", "R16"],

    ["R27", "R28"],
    ["R28", "R29"],
    ["R29", "R30"],

    ["R31", "R32"],
    ["R32", "R33"],

    ["R34", "R35"],
    ["R35", "R36"],
    ["R36", "R37"],

    ["RG", "G7"],

    ["R38", "R39"],
    ["R40", "R41"],
    ["R42", "R43"],

   


  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    // L1: { x: 0.10, y: 0.25, label: "Room 101" },
    // L2: { x: 0.35, y: 0.25, label: "Room 102" },
    // L3: { x: 0.6, y: 0.4, label: "Lobby" },
  };

   const stairNodes = [
    "EN - EL",
    "EN - ER",
    "LCT - EL",
    "LCT - ER",
    "TYK E1",
    'OA - E',
    'OA - E2',
    "HRM - E",
    "HRM - E2",
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
    else if (nextFloor === 17) nextScreen = "LCT1STFLOORScreen";
    else if (nextFloor === 25) nextScreen = "OAFLOORScreen";
    else if (nextFloor === 26) nextScreen = "HRMScreen";
    else nextScreen = "EN1STFLOORScreen";
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
        University of the East - Campus Map
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/UE MAP.png")}
          style={{ width: "100%", height: "105%", position: "absolute", resizeMode: "contain" }}
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

export default UEScreen;
