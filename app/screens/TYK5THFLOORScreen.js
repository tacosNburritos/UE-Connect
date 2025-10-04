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

const TYK5THFLOORScreen = ({ route, navigation }) => {
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
    //UPPER PART OUTLINE (LEFT)
    ULSTO1: { x: 0.48, y: 0.011 }, //UPPER STAIR OUTLINE
    ULSTO2: { x: 0.478, y: 0.064 },
    ULO1: { x: 0.394, y: 0.064 },  //UPPER PART OUTLINE
    ULO2: { x: 0.394, y: 0.253 },
    ULO3: { x: 0.481, y: 0.253 },
    ULO4: { x: 0.481, y: 0.347 },

    ULOP1: { x: 0.481, y: 0.265 }, //UPPER PART OUTLINE POINT
    ULOP2: { x: 0.481, y: 0.284 },
    ULOP3: { x: 0.481, y: 0.291 },
    ULOP4: { x: 0.481, y: 0.311 },
    ULOP5: { x: 0.481, y: 0.33 },

    //MIDDLE PART OUTLINE
    MLSTO1: { x: 0.372, y: 0.347 }, //MIDDLE STAIR OUTLINE
    MLSTO2: { x: 0.384, y: 0.347 },
    MLSTO3: { x: 0.384, y: 0.357 },
    MLSTO4: { x: 0.368, y: 0.364 },
    MLSTO5: { x: 0.384, y: 0.372 },
    MLSTO6: { x: 0.384, y: 0.38 }, 
    MLSTO7: { x: 0.372, y: 0.38 },
    MLSTO8: { x: 0.434, y: 0.38 },
    MLSTO9: { x: 0.49, y: 0.38 },

    MLO1: { x: 0.434, y: 0.553 }, // MIDDLE PART OUTLINE 
    MLO2: { x: 0.516, y: 0.595 },
  
    MLOP1: { x: 0.467, y: 0.38 }, // MIDD LE PART OUTLINE POINT
    MLOP2: { x: 0.434, y: 0.457 },
    MLOP3: { x: 0.434, y: 0.514 },
    MLOP4: { x: 0.434, y: 0.527 },
    MLOP5: { x: 0.48, y: 0.576 },
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.434, y: 0.639 }, // LOWER PART OUTLINE
    LLO2: { x: 0.495, y: 0.666 },
    LLO3: { x: 0.434, y: 0.698 },
    LLO4: { x: 0.495, y: 0.725 },
    LLO5: { x: 0.439, y: 0.755 },
    LLO6: { x: 0.502, y: 0.784 },
    LLO7: { x: 0.475, y: 0.798 },
    LLO8: { x: 0.485, y: 0.803 },
    LLO9: { x: 0.271, y: 0.907 }, 

    LLOP1: { x: 0.558, y: 0.755 }, // LOWER PART OUTLINE POINT
    LLOP2: { x: 0.503, y: 0.812 }, 
    LLOP3: { x: 0.531, y: 0.826 }, 
    LLOP4: { x: 0.558, y: 0.84 }, 

    //RIGHT PART OUTLINE 
    RO1: { x: 0.46, y: 0.996 }, 
    RO2: { x: 0.669, y: 0.899 }, 
    RO3: { x: 0.621, y: 0.876 },
    RO4: { x: 0.626, y: 0.874 },
    RO5: { x: 0.645, y: 0.865 },
    RO6: { x: 0.645, y: 0.755 },
    RO7: { x: 0.685, y: 0.755 },
    RO8: { x: 0.685, y: 0.503 },
    RO9: { x: 0.659, y: 0.503 },
    RO10: { x: 0.659, y: 0.488 },
    RO11: { x: 0.685, y: 0.474 },
    RO12: { x: 0.659, y: 0.46 },
    RO13: { x: 0.659, y: 0.443 },
    RO14: { x: 0.687, y: 0.443},
    RO15: { x: 0.686, y: 0.064},
    RO16: { x: 0.6, y: 0.064},
    RO17: { x: 0.6, y: 0.011},

    ROP1: { x: 0.686, y: 0.693 }, // LOWER PART OUTLINE POINT RIGHT
    ROP2: { x: 0.686, y: 0.629 },
    ROP3: { x: 0.686, y: 0.565 },
    ROP4: { x: 0.686, y: 0.521 },
    ROP5: { x: 0.686, y: 0.38 },
    ROP6: { x: 0.686, y: 0.42 },
    ROP7: { x: 0.686, y: 0.317 },
    ROP8: { x: 0.686, y: 0.253 },

    //INSIDE STRUCTURE
    IS1: { x: 0.54, y: 0.022 },
    IS2: { x: 0.54, y: 0.064 },

    IS3: { x: 0.525, y: 0.085 },
    IS4: { x: 0.562, y: 0.085 },
    IS5: { x: 0.525, y: 0.232 },
    IS6: { x: 0.562, y: 0.232 },

    IS7: { x: 0.518, y: 0.265 }, //ELEV
    IS8: { x: 0.518, y: 0.273 },
    IS9: { x: 0.518, y: 0.284 },
    IS10: { x: 0.518, y: 0.291 },
    IS11: { x: 0.518, y: 0.295 },
    IS12: { x: 0.518, y: 0.306 },
    IS13: { x: 0.518, y: 0.3115 },
    IS14: { x: 0.518, y: 0.316 },
    IS15: { x: 0.518, y: 0.326 },
    IS16: { x: 0.518, y: 0.33 },
    IS17: { x: 0.518, y: 0.334 },
    IS18: { x: 0.518, y: 0.344 },
    IS19: { x: 0.518, y: 0.347 },
  
    IS20: { x: 0.585, y: 0.267 },
    IS21: { x: 0.6, y: 0.267 },
    IS22: { x: 0.6, y: 0.302 },
    IS23: { x: 0.585, y: 0.302},
    IS24: { x: 0.6, y: 0.317 },
    IS25: { x: 0.585, y: 0.33 },
    IS26: { x: 0.6, y: 0.33 },
    IS27: { x: 0.6, y: 0.365 },
    IS28: { x: 0.585, y: 0.365 },

    IS29: { x: 0.6, y: 0.38 },
    IS30: { x: 0.6, y: 0.403 },
    IS31: { x: 0.6, y: 0.442 },
    IS32: { x: 0.629, y: 0.442 },
    IS33: { x: 0.61, y: 0.403 },
    IS34: { x: 0.632, y: 0.403},
    IS35: { x: 0.632, y: 0.42 },
    IS36: { x: 0.632, y: 0.428 },

    IS37: { x: 0.467, y: 0.44 },
    IS38: { x: 0.497, y: 0.445 },
    IS39: { x: 0.46, y: 0.445 },
    IS40: { x: 0.537, y: 0.484 },
    IS41: { x: 0.537, y: 0.509 },
    IS42: { x: 0.51, y: 0.52 },
    IS43: { x: 0.467, y: 0.434},

    IS44: { x: 0.478, y: 0.514 },
    IS45: { x: 0.478, y: 0.527 },
    IS46: { x: 0.478, y: 0.511 },
    IS47: { x: 0.505, y: 0.511 },
    IS48: { x: 0.48, y: 0.56 },
    IS49: { x: 0.48, y: 0.539 },
    IS50: { x: 0.52, y: 0.56 },

    IS51: { x: 0.6, y: 0.503 },
    IS52: { x: 0.63, y: 0.503 },
    IS53: { x: 0.6, y: 0.551 },
    IS54: { x: 0.614, y: 0.551 },
    IS55: { x: 0.6, y: 0.565 },
    IS56: { x: 0.634, y: 0.565 },
    IS57: { x: 0.634, y: 0.543 },
    IS58: { x: 0.634, y: 0.521 },
    IS59: { x: 0.634, y: 0.513 },

    IS60: { x: 0.55, y: 0.52 },
    IS61: { x: 0.55, y: 0.577 },
    IS62: { x: 0.55, y: 0.625 },
    IS63: { x: 0.53, y: 0.636 },
    IS64: { x: 0.55, y: 0.636 },
    IS65: { x: 0.55, y: 0.665 },
    IS66: { x: 0.533, y: 0.674 },
    IS67: { x: 0.542, y: 0.679 },
    IS68: { x: 0.542, y: 0.69 },
    IS69: { x: 0.52, y: 0.695 },
    IS70: { x: 0.548, y: 0.698 },
    IS71: { x: 0.539, y: 0.716 },
    IS72: { x: 0.555, y: 0.725 },
    IS73: { x: 0.555, y: 0.74 },

    IS74: { x: 0.582, y: 0.579 },
    IS75: { x: 0.6, y: 0.579 },
    IS76: { x: 0.6, y: 0.614 },
    IS77: { x: 0.582, y: 0.614 },
    IS78: { x: 0.6, y: 0.629 },
    IS79: { x: 0.582, y: 0.642 },
    IS80: { x: 0.6, y: 0.642 },
    IS81: { x: 0.6, y: 0.678 },
    IS82: { x: 0.582, y: 0.678 },
    IS83: { x: 0.6, y: 0.693 },
    IS84: { x: 0.582, y: 0.705 },
    IS85: { x: 0.6, y: 0.705 },
    IS86: { x: 0.6, y: 0.74 },
    IS87: { x: 0.582, y: 0.74 },

    IS88: { x: 0.515, y: 0.79 },
    IS89: { x: 0.526, y: 0.796 },
    IS90: { x: 0.532, y: 0.799 },
    IS91: { x: 0.537, y: 0.802 },
    IS92: { x: 0.553, y: 0.811 },
    IS93: { x: 0.559, y: 0.814 },
    IS94: { x: 0.563, y: 0.817 },
    IS95: { x: 0.58, y: 0.824 },
    IS96: { x: 0.586, y: 0.827 },

    IS97: { x: 0.538, y: 0.855 },
    IS98: { x: 0.574, y: 0.873 },
    IS99: { x: 0.41, y: 0.918 },
    IS100: { x: 0.45, y: 0.935 },

    ST1: { x: 0.41, y: 0.364 },
    ST2: { x: 0.475, y: 0.364 },
    /* ST3: { x: 0.42, y: 0.347 },
    ST4: { x: 0.42, y: 0.38 },
    ST5: { x: 0.435, y: 0.347 },
    ST6: { x: 0.45, y: 0.347 },
    ST7: { x: 0.45, y: 0.38 },
    ST8: { x: 0.468, y: 0.347 }, */

    ST9: { x: 0.6, y: 0.755 },
    ST10: { x: 0.6, y: 0.785 },
    ST11: { x: 0.62, y: 0.767 },
    ST12: { x: 0.62, y: 0.785 },
    /* ST13: { x: 0.645, y: 0.785 },
    ST14: { x: 0.6, y: 0.77 },
    ST15: { x: 0.645, y: 0.77 },
    ST16: { x: 0.6, y: 0.777 },
    ST17: { x: 0.645, y: 0.777 }, */

    ST18: { x: 0.48, y: 0.025 },
   /* ST19: { x: 0.6, y: 0.025 },
    ST20: { x: 0.48, y: 0.035 },
    ST21: { x: 0.6, y: 0.035 },
    ST22: { x: 0.48, y: 0.045 },
    ST23: { x: 0.6, y: 0.045 },
    ST24: { x: 0.48, y: 0.055 },
    ST25: { x: 0.6, y: 0.055 }, */

  };

  const mapConnections = [
    ["ULSTO1", "ULSTO2"],
    ["ULSTO2", "ULO1"],
    ["ULO1", "ULO2"],
    ["ULO2", "ULO3"],
    ["ULO3", "ROP8"],
    ["ULO3", "ULOP1"],
    ["ULOP1", "ULOP2"],
    ["ULOP2", "ULOP3"],
    ["ULOP3", "ULOP4"],
    ["ULOP4", "ULOP5"],
    ["ULOP5", "ULO4"],

    ["ULO4", "MLSTO1"],
    ["MLSTO1", "MLSTO2"],
    ["MLSTO2", "MLSTO3"],
    ["MLSTO3", "MLSTO4"],
    ["MLSTO4", "MLSTO5"],
    ["MLSTO5", "MLSTO6"],
    ["MLSTO6", "MLSTO7"],
    ["MLSTO7", "MLSTO8"],
    ["MLSTO8", "MLOP1"],
    ["MLOP1", "MLSTO9"],
    ["MLSTO8", "MLOP2"],
    ["MLOP2", "MLOP3"],
    ["MLOP3", "MLOP4"],
    ["MLOP4", "MLO1"],
    ["MLO1", "MLOP5"],
    ["MLOP5", "MLO2"],

    ["MLO2", "LLO1"],
    ["LLO1", "LLO2"],
    ["LLO2", "LLO3"],
    ["LLO3", "LLO4"],
    ["LLO4", "LLO5"],
    ["LLO5", "LLO6"],
    ["LLO6", "LLOP1"],
    ["LLOP1", "RO6"],
    ["LLO6", "LLO7"],
    ["LLO7", "LLO8"],
    ["LLO8", "LLOP2"],
    ["LLOP2", "LLOP3"],
    ["LLOP3", "LLOP4"],
    ["LLOP4", "RO4"],
    ["LLO8", "LLO9"],

    ["LLO9", "RO1"],
    ["RO1", "RO2"],
    ["RO2", "RO3"],
    ["RO3", "RO4"],
    ["RO4", "RO5"],
    ["RO5", "RO6"],
    ["RO6", "RO7"],
    ["RO7", "ROP1"],
    ["ROP1", "ROP2"],
    ["ROP2", "ROP3"],
    ["ROP3", "ROP4"],
    ["ROP4", "RO8"],
    ["RO8", "RO9"],
    ["RO9", "RO10"],
    ["RO10", "RO11"],
    ["RO11", "RO12"],
    ["RO12", "RO13"],
    ["RO13", "RO14"],
    ["RO14", "ROP5"],
    ["ROP5", "ROP6"],
    ["ROP6", "ROP7"],
    ["ROP7", "ROP8"],
    ["ROP8", "RO15"],
    ["RO15", "RO16"],
    ["RO16", "ULSTO2"],
    ["RO16", "RO17"],
    ["ULSTO1", "RO17"],

    ["IS1", "IS2"],

    ["IS3", "IS4"],
    ["IS3", "IS5"],
    ["IS5", "IS6"],
    ["IS6", "IS4"],

    ["ULOP1", "IS7"],
    ["ULOP2", "IS9"],
    ["IS9", "IS8"],
    ["ULOP3", "IS10"],
    ["IS10", "IS11"],
    ["ULOP4", "IS13"],
    ["IS12", "IS13"],
    ["IS13", "IS14"],
    ["ULOP5", "IS16"],
    ["IS15", "IS16"],
    ["IS16", "IS17"],
    ["ULO4", "IS19"],
    ["IS19", "IS18"],

    ["IS20", "IS21"],
    ["IS21", "IS22"],
    ["IS22", "IS23"],
    ["ROP7", "IS24"],
    ["IS25", "IS26"],
    ["IS26", "IS27"],
    ["IS27", "IS28"],

    ["IS29", "ROP5"],
    ["IS29", "IS30"],
    ["IS30", "IS33"],
    ["IS30", "IS31"],
    ["IS31", "IS32"],
    ["ROP6", "IS35"],
    ["IS35", "IS34"],
    ["IS35", "IS36"],

    ["MLOP1", "IS43"],
    ["IS43", "IS37"],
    ["IS37", "IS39"],
    ["IS39", "MLOP2"],
    ["IS39", "IS38"],
    ["IS43", "IS38"],
    ["IS38", "IS40"],
    ["IS40", "IS41"],
    ["IS41", "IS42"],

    ["MLOP3", "IS44"],
    ["MLOP4", "IS45"],
    ["IS45", "IS44"],
    ["IS44", "IS46"],
    ["IS46", "IS47"],
    ["MLOP5", "IS48"],
    ["IS48", "IS49"],
    ["IS48", "IS50"],

    ["IS51", "IS52"],
    ["IS51", "IS53"],
    ["IS53", "IS54"],
    ["IS53", "IS55"],
    ["IS55", "IS56"],
    ["IS56", "ROP3"],
    ["IS56", "IS57"],
    ["IS58", "IS59"],  
    ["IS58", "ROP4"],

    ["IS60", "IS61"],
    ["MLO2", "IS61"],
    ["IS61", "IS62"],
    ["IS63", "IS64"],
    ["LLO2", "IS64"],
    ["IS64", "IS65"],  
    ["IS65", "IS66"],
    ["IS66", "IS67"],
    ["LLO2", "IS68"],
    ["IS68", "IS69"],
    ["LLO5", "IS70"],
    ["IS71", "IS72"],
    ["IS72", "IS73"],

    ["IS74", "IS75"],
    ["IS75", "IS76"],
    ["IS76", "IS77"],
    ["ROP2", "IS78"],
    ["IS79", "IS80"],
    ["IS80", "IS81"],
    ["IS81", "IS82"],
    ["ROP1", "IS83"],
    ["IS84", "IS85"],
    ["IS85", "IS86"],
    ["IS86", "IS87"],

    ["LLO6", "IS88"],
    ["IS89", "IS90"],
    ["IS90", "IS91"],
    ["LLOP2", "IS90"],
    ["IS92", "IS93"],
    ["IS93", "IS94"],
    ["LLOP3", "IS93"],
    ["IS95", "IS96"],
    ["IS96", "LLOP4"],

    ["IS97", "IS98"],
    ["IS98", "IS100"],
    ["IS100", "IS99"],
    ["IS99", "IS97"],

    ["ST1", "ST2"],
    ["ST3", "ST4"],
    ["ST5", "MLOP2"],
    ["ST6", "ST7"],
    ["ST8", "MLOP1"],

    ["ST9", "ST10"],
    ["ST11", "ST12"],
    ["ST13", "ST10"],
    ["ST14", "ST15"],
    ["ST16", "ST17"],

    ["ST18", "ST19"],
    ["ST20", "ST21"],
    ["ST22", "ST23"],
    ["ST24", "ST25"],
  ];

//STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.4, y: 0.16, label: "Roof Deck" },
    L2: { x: 0.48, y: 0.303, label: "Elev" },
    L3: { x: 0.597, y: 0.287, label: "TYK 505" },
    L4: { x: 0.597, y: 0.35, label: "TYK 504"  },
    L5: { x: 0.5, y: 0.415, label: "Lobby" },
    L6: { x: 0.59, y: 0.475, label: "Terrace" },
    L7: { x: 0.46, y: 0.535, label: "Reception" },
    L8: { x: 0.598, y: 0.601, label: "TYK 503" },
    L9: { x: 0.465, y: 0.633, label: "Office" },
    L10: { x: 0.49, y: 0.661, label: "  Dark \n Room" },
    L11: { x: 0.598, y: 0.663, label: "TYK 502" },
    L12: { x: 0.445, y: 0.7, label: "TYK 500" },
    L13: { x: 0.465, y: 0.745, label: "     CFA \n Faculty \n      Rm" },
    L14: { x: 0.6, y: 0.726, label: "TYK 501" },
    L15: { x: 0.35, y: 0.885, label: "Roof Deck" },

  }

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
        TYK Building - Fifth Floor
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
                    fontSize: 7,
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

export default TYK5THFLOORScreen;
