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

const EN1STFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    //part 1
    M1: { x: 0.147, y: 0.014 },
    M2: { x: 0.147, y: 0.068 },
    M3: { x: 0.197, y: 0.068 },
    M4: { x: 0.8, y: 0.075 },
    M5: { x: 0.85, y: 0.075 },
    M6: { x: 0.85, y: 0.021 },
    M7: { x: 0.29, y: 0.016 },
    M8: { x: 0.342, y: 0.017 },
    M9: { x: 0.526, y: 0.018 },
    M10: { x: 0.712, y: 0.02 },
    M11: { x: 0.291, y: 0.069 },
    M12: { x: 0.341, y: 0.07 },
    M13: { x: 0.526, y: 0.072 },
    M14: { x: 0.712, y: 0.073 },
    M15: { x: 0.24, y: 0.069 },
    M16: { x: 0.315, y: 0.0695 },
    M17: { x: 0.362, y: 0.07 },
    M18: { x: 0.495, y: 0.071 },
    M19: { x: 0.549, y: 0.0725 },
    M20: { x: 0.757, y: 0.074 },
    //
    SS1: { x: 0.24, y: 0.092 },
    SS2: { x: 0.24, y: 0.147 },
    SS3: { x: 0.23, y: 0.092 },
    SS4: { x: 0.23, y: 0.147 },
    SS5: { x: 0.22, y: 0.092 },
    SS6: { x: 0.22, y: 0.147 },
    SS7: { x: 0.21, y: 0.092 },
    SS8: { x: 0.21, y: 0.147 },
    SS9: { x: 0.2, y: 0.092 },
    SS10: { x: 0.2, y: 0.147 },
    SS11: { x: 0.19, y: 0.092 },
    SS12: { x: 0.19, y: 0.147 },
    SC1: { x: 0.242, y: 0.118 },
    SC2: { x: 0.19, y: 0.118 },
    //
    SS13: { x: 0.753, y: 0.097 },
    SS14: { x: 0.753, y: 0.15 },
    SS15: { x: 0.763, y: 0.097 },
    SS16: { x: 0.763, y: 0.15 },
    SS17: { x: 0.773, y: 0.097 },
    SS18: { x: 0.773, y: 0.15 },
    SS19: { x: 0.783, y: 0.097 },
    SS20: { x: 0.783, y: 0.15 },
    SS21: { x: 0.793, y: 0.097 },
    SS22: { x: 0.793, y: 0.15 },
    SS23: { x: 0.803, y: 0.097 },
    SS24: { x: 0.803, y: 0.15 },
    SC3: { x: 0.753, y: 0.123 },
    SC4: { x: 0.803, y: 0.123 },
    //
    SS26: { x: 0.757, y: 0.904 },
    SS27: { x: 0.767, y: 0.85 },
    SS28: { x: 0.767, y: 0.904 },
    SS29: { x: 0.777, y: 0.85 },
    SS30: { x: 0.787, y: 0.849 },
    SS31: { x: 0.777, y: 0.904 },
    SS32: { x: 0.797, y: 0.85 },
    SS33: { x: 0.787, y: 0.904 },
    SS34: { x: 0.807, y: 0.85 },
    SS35: { x: 0.797, y: 0.904 },
    SC5: { x: 0.757, y: 0.877 },
    SC6: { x: 0.8, y: 0.876 },
    //
    SS37: { x: 0.243, y: 0.829 },
    SS38: { x: 0.233, y: 0.883 },
    SS39: { x: 0.233, y: 0.829 },
    SS40: { x: 0.223, y: 0.883 },
    SS41: { x: 0.223, y: 0.829 },
    SS42: { x: 0.213, y: 0.883 },
    SS43: { x: 0.213, y: 0.829 },
    SS44: { x: 0.203, y: 0.883 },
    SS45: { x: 0.203, y: 0.829 },
    SS46: { x: 0.193, y: 0.883 },
    SC7: { x: 0.193, y: 0.858 },
    SC8: { x: 0.243, y: 0.86 },
    //part2
    M21: { x: 0.148, y: 0.092},
    M22: { x: 0.24, y: 0.092},
    M23: { x: 0.368, y: 0.094},
    M24: { x: 0.291, y: 0.093},
    M25: { x: 0.523, y: 0.095},
    M26: { x: 0.57, y: 0.11},
    M27: { x: 0.62, y: 0.11},
    M28: { x: 0.68, y: 0.096},
    M29: { x: 0.714, y: 0.096},
    M30: { x: 0.754, y: 0.096},
    M31: { x: 0.852, y: 0.097},
    M32: { x: 0.148, y: 0.146},
    M33: {x: 0.247, y: 0.146},
    M34: {x: 0.247, y: 0.134},
    M35: {x: 0.292, y: 0.146},
    M36: {x: 0.368, y: 0.146},
    M37: {x: 0.369, y: 0.132},
    M39: {x: 0.526, y: 0.128},
    M38: {x: 0.526, y: 0.118},
    M40: {x: 0.526, y: 0.159},
    M41: {x: 0.571, y: 0.148},
    M42: {x: 0.62, y: 0.148},
    M43: {x: 0.62, y: 0.126},
    M44: {x: 0.62, y: 0.126},
    M45: {x: 0.712, y: 0.126},
    M46: {x: 0.711, y: 0.148},
    M47: {x: 0.754, y: 0.15},
    M48: {x: 0.85, y: 0.15},
    //part 3
    M49: {x: 0.369, y: 0.286},
    M50: {x: 0.369, y: 0.334},
    M51: {x: 0.369, y: 0.334},
    M52: {x: 0.369, y: 0.345},
    M53: {x: 0.369, y: 0.357},
    M54: {x: 0.369, y: 0.415},
    M55: {x: 0.369, y: 0.461},
    M56: {x: 0.369, y: 0.519},
    M57: {x: 0.369, y: 0.562},
    M58: {x: 0.369, y: 0.585},
    M59: {x: 0.369, y: 0.608},
    M60: {x: 0.369, y: 0.636},
    M61: {x: 0.369, y: 0.682},
    M62: {x: 0.369, y: 0.754},
    M63: {x: 0.369, y: 0.76},
    M64: {x: 0.369, y: 0.778},
    M65: {x: 0.369, y: 0.79},
    M66: {x: 0.369, y: 0.835},
    M67: {x: 0.526, y: 0.17},
    M68: {x: 0.526, y: 0.237},
    M69: {x: 0.526, y: 0.249},
    M70: {x: 0.526, y: 0.286},
    M71: {x: 0.526, y: 0.312},
    M72: {x: 0.526, y: 0.33},
    M73: {x: 0.526, y: 0.357},
    M74: {x: 0.526, y: 0.357},
    M75: {x: 0.526, y: 0.376},
    M76: {x: 0.526, y: 0.393},
    M77: {x: 0.526, y: 0.415},
    M78: {x: 0.526, y: 0.435},
    M79: {x: 0.526, y: 0.453},
    M80: {x: 0.526, y: 0.46},
    M81: {x: 0.526, y: 0.471},
    M82: {x: 0.526, y: 0.47},
    M83: {x: 0.527, y: 0.488},
    M84: {x: 0.527, y: 0.518},
    M85: {x: 0.527, y: 0.563},
    M86: {x: 0.527, y: 0.634},
    M87: {x: 0.527, y: 0.669},
    M88: {x: 0.527, y: 0.681},
    M89: {x: 0.527, y: 0.84},
    M90: {x: 0.437, y: 0.634}, 
    M91: {x: 0.46, y: 0.634}, 
    M92: {x: 0.418, y: 0.562},
    M93: {x: 0.482, y: 0.564},
    M94: {x: 0.454, y: 0.519},
    M95: {x: 0.456, y: 0.564},
    M96: {x: 0.418, y: 0.585},
    M97: {x: 0.418, y: 0.608},
    M98: {x: 0.386, y: 0.79},
    M99: {x: 0.411, y: 0.79},
    M100: {x: 0.497, y: 0.789},
    M101: {x: 0.571, y: 0.18},
    M102: {x: 0.571, y: 0.193},
    M103: {x: 0.571, y: 0.227},
    M104: {x: 0.571, y: 0.239},
    M105: {x: 0.572, y: 0.274},
    M106: {x: 0.572, y: 0.287},
    M107: {x: 0.573, y: 0.32},
    M108: {x: 0.573, y: 0.333},
    M109: {x: 0.574, y: 0.366},
    M110: {x: 0.574, y: 0.379},
    M111: {x: 0.574, y: 0.394},
    M112: {x: 0.574, y: 0.435},
    M113: {x: 0.574, y: 0.449},
    M114: {x: 0.574, y: 0.483},
    M115: {x: 0.574, y: 0.496},
    M116: {x: 0.574, y: 0.518},
    M117: {x: 0.574, y: 0.533},
    M118: {x: 0.574, y: 0.564},
    M119: {x: 0.574, y: 0.598},
    M120: {x: 0.574, y: 0.61},
    M121: {x: 0.575, y: 0.623},
    M122: {x: 0.575, y: 0.692},
    M123: {x: 0.575, y: 0.705},
    M124: {x: 0.575, y: 0.724},
    M125: {x: 0.575, y: 0.788},
    M126: {x: 0.576, y: 0.799},
    M127: {x: 0.576, y: 0.812},
    M128: {x: 0.574, y: 0.84},
    M129: {x: 0.681, y: 0.149},
    M130: {x: 0.681, y: 0.194},
    M131: {x: 0.681, y: 0.24},
    M132: {x: 0.681, y: 0.287},
    M133: {x: 0.681, y: 0.333},
    M134: {x: 0.681, y: 0.379},
    M135: {x: 0.682, y: 0.449},
    M136: {x: 0.682, y: 0.518},
    M137: {x: 0.683, y: 0.564},
    M138: {x: 0.683, y: 0.61},
    M139: {x: 0.683, y: 0.705},
    M140: {x: 0.683, y: 0.799},
    M141: {x: 0.685, y: 0.845},
    //part 4
    M142: {x: 0.147, y: 0.826},
    M143: {x: 0.29, y: 0.831},
    M144: {x: 0.625, y: 0.843},
    M145: {x: 0.72, y: 0.847},
    M146: {x: 0.763, y: 0.849},
    M147: {x: 0.858, y: 0.853},
    M148: {x: 0.848, y: 0.907},
    M149: {x: 0.755, y: 0.905},
    M150: {x: 0.708, y: 0.903},
    M151: {x: 0.685, y: 0.902},
    M152: {x: 0.693, y: 0.871},
    M153: {x: 0.618, y: 0.869},
    M154: {x: 0.693, y: 0.871},
    M155: {x: 0.612, y: 0.884},
    M156: {x: 0.565, y: 0.882},
    M157: {x: 0.525, y: 0.854},
    M158: {x: 0.515, y: 0.895},
    M159: {x: 0.424, y: 0.893},
    M160: {x: 0.393, y: 0.892},
    M161: {x: 0.357, y: 0.891},
    M162: {x: 0.282, y: 0.888},
    M163: {x: 0.234, y: 0.886},
    M164: {x: 0.135, y: 0.882},
    M165: {x: 0.133, y: 0.906},
    M166: {x: 0.179, y: 0.906},
    M167: {x: 0.229, y: 0.908},
    M168: {x: 0.275, y: 0.911},
    M169: {x: 0.293, y: 0.911},
    M170: {x: 0.338, y: 0.912},
    M171: {x: 0.368, y: 0.913},
    M172: {x: 0.484, y: 0.918},
    M173: {x: 0.513, y: 0.92},
    M174: {x: 0.536, y: 0.92},
    M175: {x: 0.559, y: 0.921},
    M176: {x: 0.67, y: 0.925},
    M177: {x: 0.705, y: 0.926},
    M178: {x: 0.745, y: 0.927},
    M179: {x: 0.792, y: 0.929},
    M180: {x: 0.842, y: 0.93},
    M181: {x: 0.834, y: 0.986},
    M182: {x: 0.692, y: 0.981},
    M183: {x: 0.692, y: 0.981},
    M184: {x: 0.503, y: 0.974},
    M185: {x: 0.326, y: 0.968},
    M186: {x: 0.266, y: 0.966},
    M187: {x: 0.12, y: 0.961},
  };

  const mapConnections = [
    //part 1
    ["M1", "M2"],
    ["M2", "M3"],
    ["M4", "M5"],
    ["M5", "M6"],
    ["M6", "M1"],
    ["M7", "M11"],
    ["M8", "M12"],
    ["M9", "M13"],
    ["M10", "M14"],
    ["M15", "M16"],
    ["M17", "M18"],
    ["M19", "M20"],
    //part 2
    ["M21", "M22"],
    ["M24", "M25"],
    ["M26", "M27"],
    ["M28", "M29"],
    ["M30", "M31"],
    ["M21", "M32"],
    ["M32", "M33"],
    ["M33", "M34"],
    ["M24", "M35"],
    ["M23", "M37"],
    ["M35", "M36"],
    ["M25", "M38"],
    ["M39", "M40"],
    ["M26", "M41"],
    ["M41", "M42"],
    ["M42", "M43"],
    ["M44", "M45"],
    ["M42", "M46"],
    ["M29", "M46"],
    ["M47", "M48"],
    ["M31", "M48"],
    //part 3
    ["M36", "M51"],
    ["M52", "M63"],
    ["M64", "M66"],
    ["M67", "M68"],
    ["M69", "M71"],
    ["M72", "M75"],
    ["M76", "M78"],
    ["M79", "M80"],
    ["M80", "M81"],
    ["M83", "M87"],
    ["M88", "M89"],
    ["M49", "M70"],
    ["M53", "M73"],
    ["M54", "M77"],
    ["M55", "M80"],
    ["M56", "M84"],
    ["M61", "M88"],
    ["M94", "M95"],
    ["M57", "M92"],
    ["M85", "M93"],
    ["M58", "M96"],
    ["M59", "M97"],
    ["M60", "M90"],
    ["M86", "M91"],
    ["M65", "M98"],
    ["M99", "M100"],
    ["M41", "M101"],
    ["M102", "M103"],
    ["M104", "M105"],
    ["M106", "M107"],
    ["M108", "M109"],
    ["M111", "M112"],
    ["M113", "M114"],
    ["M115", "M116"],
    ["M117", "M119"],
    ["M121", "M122"],
    ["M124", "M125"],
    ["M127", "M128"],
    ["M129", "M141"],
    ["M102", "M130"],
    ["M104", "M131"],
    ["M106", "M132"],
    ["M108", "M133"],
    ["M110", "M134"],
    ["M113", "M135"],
    ["M116", "M136"],
    ["M118", "M137"],
    ["M120", "M138"],
    ["M123", "M139"],
    ["M126", "M140"],
    //part 4
    ["M142", "M89"],
    ["M128", "M145"],
    ["M146", "M147"],
    ["M147", "M148"],
    ["M148", "M149"],
    ["M145", "M150"],
    ["M150", "M151"],
    ["M151", "M152"],
    ["M152", "M153"],
    ["M153", "M144"],
    ["M155", "M156"],
    ["M156", "M128"],
    ["M157", "M158"],
    ["M158", "M159"],
    ["M160", "M162"],
    ["M161", "M66"],
    ["M162", "M143"],
    ["M163", "M164"],
    ["M164", "M142"],
    ["M165", "M166"],
    ["M167", "M169"],
    ["M171", "M172"],
    ["M173", "M174"],
    ["M175", "M176"],
    ["M177", "M178"],
    ["M179", "M180"],
    ["M180", "M181"],
    ["M181", "M187"],
    ["M186", "M168"],
    ["M185", "M170"],
    ["M184", "M173"],
    ["M183", "M177"],
    ["M187", "M165"],
    ["SS1", "SS2"],
    ["SS3", "SS4"],
    ["SS5", "SS6"],
    ["SS7", "SS8"],
    ["SS9", "SS10"],
    ["SS11", "SS12"],
    ["SC1", "SC2"],
    ["SS13", "SS14"],
    ["SS15", "SS16"],
    ["SS17", "SS18"],
    ["SS19", "SS20"],
    ["SS21", "SS22"],
    ["SS23", "SS24"],
    ["SC3", "SC4"],
    ["SS25", "S6"],
    ["SS26", "SS27"],
    ["SS28", "SS29"],
    ["SS30", "SS31"],
    ["SS32", "SS33"],
    ["SS34", "SS35"],
    ["SC5", "SC6"],
    ["SS36", "S8"],
    ["SS37", "SS38"],
    ["SS39", "SS40"],
    ["SS41", "SS42"],
    ["SS43", "SS44"],
    ["SS45", "SS46"],
    ["SC7", "SC8"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.375, y: 0.043, label: "EN 118" },
    L2: { x: 0.562, y: 0.044, label: "EN 117" },
    L3: { x: 0.16, y: 0.042, label: "Male CR" },
    L4: { x: 0.704, y: 0.045, label: "Female CR" },
    L5: { x: 0.375, y: 0.189, label: "Machine\nFabrication\nRoom" },
    L6: { x: 0.57, y: 0.155, label: "ME\nFaculty\nRoom" },
    L7: { x: 0.57, y: 0.201, label: "EE\nFaculty\nRoom" },
    L8: { x: 0.57, y: 0.248, label: "ECE\nFaculty\nRoom" },
    L9: { x: 0.57, y: 0.248, label: "CFE\nFaculty\nRoom" },
  };

  const stairNodes = [
    "EN - STAIRS RIGHT WING1",
    "EN - STAIRS LEFT WING1",
    "EN - STAIRS RIGHT WING2",
    "EN - STAIRS LEFT WING2",
    "EN - EL",
    "EN - ER",
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
        Engineering Building - First Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        { <Image
          // source={require("../images/EN1STFLR.png")}
          // style={{ width: "100%", height: "100%", position: "absolute", resizeMode: "contain" }}
        />}

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
                  color: "red",
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
      </View>
    </View>
  );
};

export default EN1STFLOORScreen;
