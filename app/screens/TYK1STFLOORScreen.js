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

const TYK1STFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {

    //OUTLINE
    O1: { x: 0.41, y: 0.067 },
    O2: { x: 0.404, y: 0.252 },
    O3: { x: 0.49, y: 0.252 },
    O4: { x: 0.489, y: 0.344 }, //start stairs
    O5: { x: 0.379, y: 0.344 },
    O6: { x: 0.393, y: 0.344 },
    O7: { x: 0.393, y: 0.353 },
    O8: { x: 0.375, y: 0.36 },
    O9: { x: 0.393, y: 0.367 },
    O10: { x: 0.393, y: 0.376 },
    O11: { x: 0.379, y: 0.3761 },
    O12: { x: 0.495, y: 0.376 },
    O13: { x: 0.444, y: 0.377 }, // end stairs
    O14: { x: 0.442, y: 0.483 },
    O15: { x: 0.44, y: 0.52 },
    O16: { x: 0.44, y: 0.546 }, 
    O17: { x: 0.52, y: 0.587 },
    O18: { x: 0.44, y: 0.63 },
    O19: { x: 0.495, y: 0.658 },
    O20: { x: 0.437, y: 0.687 },
    O21: { x: 0.495, y: 0.716 },
    O22: { x: 0.44, y: 0.744 },
    O23: { x: 0.499, y: 0.772 },
    O24: { x: 0.473, y: 0.786 },
    O25: { x: 0.554, y: 0.827},
    O26: { x: 0.481, y: 0.791 },
    O27: { x: 0.27, y: 0.892 },
    O28: { x: 0.456, y: 0.981 },
    O29: { x: 0.66, y: 0.886 },
    O30: { x: 0.616, y: 0.8635 },
    O31: { x: 0.64, y: 0.851 },
    O32: { x: 0.642, y: 0.745 },
    O33: { x: 0.68, y: 0.745 },
    O34: { x: 0.687, y: 0.498 },
    O35: { x: 0.66, y: 0.498 },
    O36: { x: 0.66, y: 0.483 },
    O37: { x: 0.69, y: 0.469 },
    O38: { x: 0.66, y: 0.455 },
    O39: { x: 0.66, y: 0.439 },
    O40: { x: 0.69, y: 0.439 }, 
    O41: { x: 0.693, y: 0.067 }, 
    O42: { x: 0.69, y: 0.252 }, 
    O43: { x: 0.612, y: 0.067 },
    O44: { x: 0.495, y: 0.067 },
    O45: { x: 0.612, y: 0.015 },
    O46: { x: 0.495, y: 0.015 },

    //INSIDE
    I1: { x: 0.553, y: 0.067 },
    I2: { x: 0.553, y: 0.028 },  
    I3: { x: 0.494, y: 0.103 },
    I4: { x: 0.493, y: 0.13 },
    I5: { x: 0.492, y: 0.19 },
    I6: { x: 0.492, y: 0.22 },
    I7: { x: 0.527, y: 0.253 }, 
    I8: { x: 0.61, y: 0.252 },
    I9: { x: 0.475, y: 0.377 },
    I10: { x: 0.475, y: 0.435 },
    I11: { x: 0.442, y: 0.452 },
    I12: { x: 0.465, y: 0.441 },
    I13: { x: 0.505, y: 0.441 },
    I14: { x: 0.475, y: 0.429 },
    I15: { x: 0.553, y: 0.587 },
    I16: { x: 0.553, y: 0.606 },
    I17: { x: 0.553, y: 0.628 },
    I18: { x: 0.553, y: 0.722 },
    I19: { x: 0.553, y: 0.687 },
    I20: { x: 0.553, y: 0.745 },
    I21: { x: 0.553, y: 0.741 },
    I22: { x: 0.68, y: 0.708 },
    I23: { x: 0.60, y: 0.708 },
    I24: { x: 0.68, y: 0.655 },
    I25: { x: 0.60, y: 0.655 },
    I26: { x: 0.68, y: 0.559 },
    I27: { x: 0.60, y: 0.559 },
    I28: { x: 0.60, y: 0.498 },
    I29: { x: 0.63, y: 0.498 },
    I30: { x: 0.605, y: 0.377 },
    I31: { x: 0.69, y: 0.377 },
    I32: { x: 0.605, y: 0.438 },
    I33: { x: 0.605, y: 0.372 },
    I34: { x: 0.635, y: 0.438 },
    I35: { x: 0.635, y: 0.401 },
    I36: { x: 0.635, y: 0.426 },
    I37: { x: 0.605, y: 0.400 },
    I38: { x: 0.619, y: 0.400 },
    I39: { x: 0.635, y: 0.416 },
    I40: { x: 0.689, y: 0.416 },
    I41: { x: 0.636, y: 0.506 },
    I42: { x: 0.636, y: 0.514 },
    I43: { x: 0.686, y: 0.514 },
    I44: { x: 0.634, y: 0.558 },
    I45: { x: 0.634, y: 0.536 },
    I46: { x: 0.618, y: 0.545 },
    I47: { x: 0.600, y: 0.545 },
    I48: { x: 0.416, y: 0.823 },
    I49: { x: 0.447, y: 0.838 },
    I50: { x: 0.432, y: 0.845 },
    I51: { x: 0.438, y: 0.842 },
    I52: { x: 0.431, y: 0.839 },
    I53: { x: 0.433, y: 0.832 },
    I54: { x: 0.414, y: 0.841 },
    I55: { x: 0.422, y: 0.850 },
    I56: { x: 0.368, y: 0.875 },
    I57: { x: 0.383, y: 0.868 },
    I58: { x: 0.366, y: 0.859 },
    I59: { x: 0.373, y: 0.856 },
    I60: { x: 0.366, y: 0.846 },
    I61: { x: 0.397, y: 0.861 },
    I62: { x: 0.379, y: 0.840 },
    I63: { x: 0.398, y: 0.849 },
    I64: { x: 0.392, y: 0.852 },
    I65: { x: 0.318, y: 0.870 },
    I66: { x: 0.347, y: 0.884 },
    I67: { x: 0.354, y: 0.881 },
    I68: { x: 0.331, y: 0.874 },
    I69: { x: 0.346, y: 0.867 },
    I70: { x: 0.329, y: 0.865 },
    I71: { x: 0.333, y: 0.867 },
    I72: { x: 0.318, y: 0.862 },
    I73: { x: 0.495, y: 0.032},
    I74: { x: 0.613, y: 0.032 },
    I75: { x: 0.495, y: 0.039 },
    I76: { x: 0.613, y: 0.039 },
    I77: { x: 0.495, y: 0.046 },
    I78: { x: 0.613, y: 0.046 },
    I79: { x: 0.495, y: 0.053 },
    I80: { x: 0.613, y: 0.053 },
    I81: { x: 0.495, y: 0.06 },
    I82: { x: 0.613, y: 0.06 },
    I83: { x: 0.613, y: 0.067 },
    I84: { x: 0.485, y: 0.36 },
    I85: { x: 0.425, y: 0.36 },
    I86: { x: 0.434, y: 0.376 },
    I87: { x: 0.434, y: 0.344 },
    I88: { x: 0.447, y: 0.344 },
    I89: { x: 0.447, y: 0.376 },
    I90: { x: 0.460, y: 0.344 },
    I91: { x: 0.460, y: 0.376 },
    I92: { x: 0.473, y: 0.344 },
    I93: { x: 0.473, y: 0.376 },
    I94: { x: 0.60, y: 0.745 },
    I95: { x: 0.595, y: 0.745 },
    I96: { x: 0.595, y: 0.773 },
    I97: { x: 0.617, y: 0.757 },
    I98: { x: 0.617, y: 0.775 },
    I99: { x: 0.595, y: 0.760 },
    I100: { x: 0.641, y: 0.760 },
    I101: { x: 0.595, y: 0.765 },
    I102: { x: 0.641, y: 0.765 },
    I103: { x: 0.641, y: 0.770 },
    I104: { x: 0.595, y: 0.770 },
    I105: { x: 0.621, y: 0.865 },
    I106: { x: 0.555, y: 0.897 },
    I107: { x: 0.594, y: 0.917 },

    // ELEV
    E1: { x: 0.527, y: 0.263}, 
    E2: { x: 0.49, y: 0.263 }, 
    E3: { x: 0.49, y: 0.281 },
    E4: { x: 0.527, y: 0.281 },
    E5: { x: 0.527, y: 0.273 },

    E6: { x: 0.49, y: 0.29 }, 
    E7: { x: 0.527, y: 0.29 },
    E8: { x: 0.527, y: 0.293 }, 
    E9: { x: 0.49, y: 0.308 },
    E10: { x: 0.527, y: 0.304 },
    E11: { x: 0.527, y: 0.313 },
    E12: { x: 0.527, y: 0.308 },

    E13: { x: 0.49, y: 0.327 },
    E14: { x: 0.527, y: 0.327 },
    E15: { x: 0.527, y: 0.323 },
    E16: { x: 0.527, y: 0.331 },
    E17: { x: 0.527, y: 0.34 }, 
    E18: { x: 0.527, y: 0.344 },

    E19: { x: 0.516, y: 0.78 }, 
    E20: { x: 0.502, y: 0.8 },
    E21: { x: 0.525, y: 0.785 },
    E22: { x: 0.529, y: 0.787 },
    E23: { x: 0.533, y: 0.789 },
    E24: { x: 0.53, y: 0.814 },
    E25: { x: 0.55, y: 0.8 },
    E26: { x: 0.555, y: 0.8025 },
    E27: { x: 0.56, y: 0.805 },
    E28: { x: 0.571, y: 0.81 },
    E29: { x: 0.58, y: 0.815 },
    
  };

  const mapConnections = [
    ["O1", "O2"],
    ["O2", "O3"],
    ["O3", "O4"],
    ["O4", "O5"],
    ["O6", "O7"],
    ["O7", "O8"],
    ["O8", "O9"],
    ["O9", "O10"],
    ["O11", "O12"], 
    ["O12", "O13"],
    ["O13", "O14"],
    ["O15", "O16"],
    ["O16", "O17"],
    ["O17", "O18"],
    ["O18", "O19"],
    ["O19", "O20"],
    ["O20", "O21"],
    ["O21", "O22"],
    ["O22", "O23"],
    ["O23", "O24"],
    ["O24", "O25"],
    ["O25", "O26"],
    ["O26", "O27"],
    ["O27", "O28"],
    ["O28", "O29"],
    ["O29", "O30"],
    ["O30", "O31"],
    ["O31", "O32"],
    ["O32", "O33"],
    ["O33", "O34"],
    ["O34", "O35"],
    ["O35", "O36"],
    ["O36", "O37"],
    ["O37", "O38"],
    ["O38", "O39"],
    ["O39", "O40"],
    ["O40", "O41"],
    ["O41", "O42"],
    ["O41", "O1"],
    ["O45", "O43"],
    ["O44", "O46"],
    ["O45", "O46"],


    // INSIDE
    ["I1", "I2"],
    ["I3", "O44"],
    ["I4", "I5"],
    ["I6", "O3"],
    ["I7", "O3"],
    ["I8", "O42"],
    ["I9", "I10"],
    ["I10", "I11"],
    ["I12", "I13"],
    ["I13", "I14"],
    ["O17", "I15"],
    ["I15", "I16"],
    ["I17", "I18"],
    ["O20", "I19"],
    ["O23", "I20"],
    ["I20", "I21"],
    ["I20", "O32"],
    ["I22", "I23"],
    ["I24", "I25"],
    ["I26", "I27"],
    ["I23", "I27"],
    ["I28", "I27"],
    ["I28", "I29"],
    ["I30", "I31"], 
    ["I32", "I33"],
    ["I32", "I34"],
    ["I35", "I36"],
    ["I37", "I38"],
    ["I39", "I40"],
    ["I41", "I42"],
    ["I42", "I43"],
    ["I44", "I45"],
    ["I46", "I47"],
    ["I48", "I49"],
    ["I49", "I50"],
    ["I51", "I52"],
    ["I53", "I54"], 
    ["I55", "I56"],
    ["I57", "I58"],
    ["I58", "I59"],
    ["I60", "I61"],
    ["I62", "I63"],
    ["I64", "I63"],
    ["I65", "I66"],
    ["I66", "I67"],
    ["I68", "I69"],
    ["I70", "I71"],
    ["I73", "I74"],
    ["I75", "I76"],
    ["I77", "I78"],
    ["I79", "I80"],
    ["I81", "I82"],
    ["I83", "I8"],
    ["I84", "I85"],
    ["I86", "I87"],
    ["I88", "I89"],
    ["I90", "I91"],
    ["I92", "I93"],
    ["I94", "I23"],
    ["I95", "I96"],
    ["I97", "I98"],
    ["I99", "I100"],
    ["I101", "I102"],
    ["I103", "I104"],
    ["I105", "I106"],
    ["I107", "I106"],


    //ELEV
    ["E1", "E2"], 
    ["E3", "E4"], 
    ["E4", "E5"], 
    ["E6", "E7"], 
    ["E7", "E8"], 
    ["E9", "E12"],
    ["E11", "E10"], 
    ["E13", "E14"], 
    ["E15", "E16"],
    ["E18", "O4"],
    ["E17", "E18"],
    ["E19", "O23"],
    ["E20", "E22"],
    ["E21","E23"],
    ["E24", "E26"],
    ["E25", "E27"],
    ["E28", "E29"],
    ["E29", "O25"],
  

  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.425, y: 0.11, label: "C\nA\nN\nT\nE\nE\nN" },
    L2: { x: 0.63, y: 0.125, label: "L\nO\nB\nB\nY" },
    L3: { x: 0.46, y: 0.62, label: "CBA\nOffice" },
    L4: { x: 0.47, y: 0.73, label: "CBA\nFaculty" },
    L5: { x: 0.585, y: 0.675, label: "Alumni\nMarketing" },
    L6: { x: 0.61, y: 0.61, label: "DCO" },
  };

  const stairNodes = [
    "ELEVATOR L",
    "ELEVATOR R",
    "TYK E1"
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
        Tan Yan Kee Building - First Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        {/* <Image
          source={require("../images/TYK1STFLR.png")}
          style={{ width: "100%", height: "100%", position: "absolute", resizeMode: "contain" }}
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
                fontSize: 7,
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

export default TYK1STFLOORScreen;
