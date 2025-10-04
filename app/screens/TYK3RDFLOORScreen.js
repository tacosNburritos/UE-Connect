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

const TYK3RDFLOORScreen = ({ route, navigation }) => {
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
    ULSTO1: { x: 0.48, y: 0.015 }, //UPPER STAIR OUTLINE
    ULSTO2: { x: 0.478, y: 0.069 },
    ULO1: { x: 0.394, y: 0.069 },
    ULO2: { x: 0.39,  y: 0.257},
    ULO3: { x: 0.475,  y: 0.257},
    ULO4: { x: 0.475,  y: 0.352},

    ULOP1: { x: 0.391, y: 0.164 }, //UPPER PART OUTLINE POINT
    ULOP2: { x: 0.475, y: 0.2692 },
    ULOP3: { x: 0.475, y: 0.2879 },
    ULOP4: { x: 0.475, y: 0.296 },
    ULOP5: { x: 0.475, y: 0.3152 },
    ULOP6: { x: 0.475, y: 0.334 },

    //MIDDLE PART OUTLINE
    MLSTO1: { x: 0.51, y: 0.352 }, //MIDDLE STAIR OUTLINE
    MLSTO2: { x: 0.365, y: 0.352 },
    MLSTO3: { x: 0.3765, y: 0.352 },
    MLSTO4: { x: 0.3765, y: 0.361 },
    MLSTO5: { x: 0.359, y: 0.368 },
    MLSTO6: { x: 0.3765, y: 0.375 },
    MLSTO7: { x: 0.3765, y: 0.384 },
    MLSTO8: { x: 0.365, y: 0.384 },
    MLSTO9: { x: 0.482, y: 0.384 },
    MLSTO10: { x: 0.427, y: 0.384 },

    MLO1:  { x: 0.427, y: 0.557 }, // MIDDLE PART OUTLINE 
    MLO2: { x: 0.505, y: 0.598 },  
  
    MLOP1: { x: 0.46, y: 0.384 }, // MIDDLE PART OUTLINE POINT
    MLOP2: { x: 0.427, y: 0.461},
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.42, y: 0.643 }, // LOWER PART OUTLINE
    LLO2: { x: 0.479, y: 0.672 }, 
    LLO3: { x: 0.42, y: 0.701 }, 
    LLO4: { x: 0.479, y: 0.729 }, 
    LLO5: { x: 0.425, y: 0.759 },
    LLO6: { x: 0.485, y: 0.788 },
    LLO7: { x: 0.459, y: 0.8025 },
    LLO8: { x: 0.467, y: 0.806 },  
    LLO9: { x: 0.54, y: 0.8435 }, 
    LLO10: { x: 0.25, y: 0.9095 }, 

    LLOP1: { x: 0.54, y: 0.759 }, // LOWER PART OUTLINE POINT
    LLOP2: { x: 0.486, y: 0.815 },
    LLOP3: { x: 0.515, y: 0.83 },
    LLOP4: { x: 0.467, y: 0.806 }, 
    LLOP5: { x: 0.392, y: 0.842 },
    LLOP6: { x: 0.32, y: 0.877 },
    LLOP7: { x: 0.302, y: 0.934 },
    LLOP8: { x: 0.393, y: 0.977 },
 
 
    //RIGHT PART OUTLINE 
    RO1: { x: 0.441, y: 0.999 }, 
    RO2: { x: 0.65, y: 0.903 }, 
    RO3: { x: 0.602, y: 0.88 }, 
    RO4: { x: 0.627, y: 0.869 }, 
    RO5: { x: 0.627, y: 0.759 }, 
    RO6: { x: 0.67, y: 0.759 }, 
    RO7: { x: 0.675, y: 0.508 }, 
    RO8: { x: 0.647, y: 0.508 }, 
    RO9: { x: 0.647, y: 0.493 }, 
    RO10: { x: 0.675, y: 0.479 }, 
    RO11: { x: 0.647, y: 0.464 }, 
    RO12: { x: 0.647, y: 0.448 }, 
    RO13: { x: 0.675, y: 0.448 }, 
    RO14: { x: 0.681, y: 0.069 },
    RO15: { x: 0.6, y: 0.069 },
    RO16: { x: 0.6, y: 0.015 },

    ROP1: { x: 0.5105, y: 0.9665 }, // LOWER PART OUTLINE POINT RIGHT
    ROP2: { x: 0.583, y: 0.934 },
    ROP3: { x: 0.675, y: 0.666 },
    ROP4: { x: 0.675, y: 0.57 },
    ROP5: { x: 0.675, y: 0.525 },
    ROP6: { x: 0.675, y: 0.425 },
    ROP7: { x: 0.675, y: 0.386 },
    ROP8: { x: 0.676, y: 0.365 },
    ROP9: { x: 0.677, y: 0.314 },
    ROP10: { x: 0.678, y: 0.259 },
    ROP11: { x: 0.679, y: 0.195 },
    ROP12: { x: 0.68, y: 0.132 },

    //INSIDE STRUCTURE
    IS1: { x: 0.539, y: 0.028 }, 
    IS2: { x: 0.539, y: 0.069 }, 
    /*IS3: { x: 0.479, y: 0.032 },
    IS4: { x: 0.599, y: 0.032 },
    IS5: { x: 0.479, y: 0.037 },
    IS6: { x: 0.599, y: 0.037 },
    IS7: { x: 0.479, y: 0.042 },
    IS8: { x: 0.599, y: 0.042 },
    IS9: { x: 0.599, y: 0.047 }, 
    IS10: { x: 0.479, y: 0.047 },
    IS11: { x: 0.599, y: 0.052 },
    IS12: { x: 0.479, y: 0.052 }, 
    IS13: { x: 0.599, y: 0.057 },
    IS14: { x: 0.479, y: 0.057 },
    IS15: { x: 0.599, y: 0.062 },
    IS16: { x: 0.479, y: 0.062 }, */
    IS17: { x: 0.478, y: 0.082 }, //LEFT LINE 1
    IS18: { x: 0.478, y: 0.150 },
    IS19: { x: 0.478, y: 0.180 },//LEFT LINE 2
    IS20: { x: 0.478, y: 0.243 }, 
    IS21: { x: 0.599, y: 0.082 }, //RIGHT LINE 1
    IS22: { x: 0.599, y: 0.119 },
    IS23: { x: 0.599, y: 0.145 }, //RIGHT LINE 2
    IS24: { x: 0.599, y: 0.181 },
    IS25: { x: 0.599, y: 0.207 }, //RIGHT LINE 3
    IS26: { x: 0.599, y: 0.243 },
    IS27: { x: 0.522, y: 0.088 }, //RECTANGLE OR SMTN
    IS28: { x: 0.521, y: 0.237 },
    IS29: { x: 0.560, y: 0.237 },
    IS30: { x: 0.560, y: 0.088 }, 
    IS31: { x: 0.478, y: 0.171 }, //LEFT SHORT LINE1
    IS32: { x: 0.478, y: 0.158 },
    IS33: { x: 0.478, y: 0.164 },
    IS34: { x: 0.599, y: 0.127 }, //RIGHT SHORT LINE1
    IS35: { x: 0.599, y: 0.138 },
    IS36: { x: 0.599, y: 0.132 },
    IS37: { x: 0.599, y: 0.190 }, //RIGHT SHORT LINE2
    IS38: { x: 0.599, y: 0.200 },
    IS39: { x: 0.599, y: 0.195 },
    IS40: { x: 0.595, y: 0.265 }, //RIGHT SHORT LINE3
    IS41: { x: 0.595, y: 0.253 },
    IS42: { x: 0.595, y: 0.259 },
    IS43: { x: 0.6, y: 0.075 }, //DOR?? RIGHT STAIRS TOP
    IS44: { x: 0.478, y: 0.075 }, //DOR?? LEFT STAIRS TOP
    IS45: { x: 0.514, y: 0.257 }, //ELEV
    IS46: { x: 0.514, y: 0.2692 }, //ELEV
    IS47: { x: 0.514, y: 0.2879 }, //ELEV
    IS48: { x: 0.514, y: 0.278 }, //ELEV
    IS49: { x: 0.514, y: 0.296 }, //ELEV
    IS50: { x: 0.514, y: 0.300 }, //ELEV
    IS51: { x: 0.514, y: 0.3152 }, //ELEV
    IS52: { x: 0.514, y: 0.312 }, //ELEV
    IS53: { x: 0.514, y: 0.320 }, //ELEV
    IS54: { x: 0.514, y: 0.334 }, //ELEV
    IS55: { x: 0.514, y: 0.330 }, //ELEV
    IS56: { x: 0.514, y: 0.338 }, //ELEV
    IS57: { x: 0.51, y: 0.348 }, //ELEV END
    IS58: { x: 0.410, y: 0.368 }, //STAIRS
    IS59: { x: 0.470, y: 0.368 }, //STAIRS
    /*IS60: { x: 0.420, y: 0.352 }, //STAIRS
    IS61: { x: 0.420, y: 0.384 }, //STAIRS
    IS62: { x: 0.430, y: 0.352 }, //STAIRS
    IS63: { x: 0.430, y: 0.384 }, //STAIRS
    IS64: { x: 0.440, y: 0.352 }, //STAIRS
    IS65: { x: 0.440, y: 0.384 }, //STAIRS
    IS66: { x: 0.450, y: 0.352 }, //STAIRS
    IS67: { x: 0.450, y: 0.384 }, //STAIRS
    IS68: { x: 0.460, y: 0.352 }, //STAIRS
    IS69: { x: 0.460, y: 0.384 }, //STAIRS */
    IS70: { x: 0.460, y: 0.444 }, 
    IS71: { x: 0.460, y: 0.438 }, 
    IS72: { x: 0.490, y: 0.451 }, 
    IS73: { x: 0.448, y: 0.451 }, 
    IS74: { x: 0.594, y: 0.273 }, //RIGHT ROOM MID 
    IS75: { x: 0.594, y: 0.318 }, 
    IS76: { x: 0.594, y: 0.314 }, 
    IS77: { x: 0.593, y: 0.325 }, 
    IS78: { x: 0.591, y: 0.447 }, 
    IS79: { x: 0.592, y: 0.365 }, 
    IS80: { x: 0.592, y: 0.386 }, 
    IS81: { x: 0.592, y: 0.408 }, 
    IS82: { x: 0.603, y: 0.408 }, 
    IS83: { x: 0.623, y: 0.425 }, 
    IS84: { x: 0.623, y: 0.408 },
    IS85: { x: 0.623, y: 0.433 }, 
    IS86: { x: 0.623, y: 0.447 }, 
    IS87: { x: 0.620, y: 0.508 }, //RIGHT LOWER ROWMMUH BELOW LOBBY?
    IS88: { x: 0.591, y: 0.508 }, 
    IS89: { x: 0.588, y: 0.57 }, 
    IS90: { x: 0.622, y: 0.525 }, 
    IS91: { x: 0.622, y: 0.518 }, 
    IS92: { x: 0.622, y: 0.547 }, 
    IS93: { x: 0.622, y: 0.57 }, 
    IS94: { x: 0.591, y: 0.556 }, 
    IS95: { x: 0.602, y: 0.556 }, 
    IS96: { x: 0.588, y: 0.666 }, 
    IS97: { x: 0.585, y: 0.759 }, //ROWMUH END
    IS98: { x: 0.544, y: 0.598 }, //LEFT ROWMUUHHHHHH
    IS99: { x: 0.544, y: 0.662 },
    IS100: { x: 0.527, y: 0.667 },
    IS101: { x: 0.527, y: 0.675 },
    IS102: { x: 0.527, y: 0.672 },
    IS103: { x: 0.543, y: 0.679 },
    IS104: { x: 0.541, y: 0.721 },
    IS105: { x: 0.523, y: 0.729 },
    IS106: { x: 0.54, y: 0.739 },
    IS107: { x: 0.582, y: 0.759 }, //LOW STAIRS
    IS108: { x: 0.582, y: 0.789 }, 
    IS109: { x: 0.604, y: 0.773 }, 
    IS110: { x: 0.604, y: 0.790 }, 
    /* IS111: { x: 0.582, y: 0.776 }, 
    IS112: { x: 0.627, y: 0.776 }, 
    IS113: { x: 0.582, y: 0.781 }, 
    IS114: { x: 0.627, y: 0.781 }, 
    IS115: { x: 0.582, y: 0.786 }, 
    IS116: { x: 0.627, y: 0.786 }, */
    IS117: { x: 0.498, y: 0.795 }, //ELEV
    IS118: { x: 0.507, y: 0.800 }, //ELEV
    IS119: { x: 0.520, y: 0.806 }, //ELEV
    IS120: { x: 0.513, y: 0.803 }, //ELEV
    IS121: { x: 0.539, y: 0.819 }, //ELEV
    IS122: { x: 0.535, y: 0.815 }, //ELEV
    IS123: { x: 0.547, y: 0.821 }, //ELEV
    IS124: { x: 0.565, y: 0.831 }, //ELEV
    IS125: { x: 0.560, y: 0.828 }, //ELEV
    IS126: { x: 0.521, y: 0.833 }, //tyk301
    IS127: { x: 0.505, y: 0.840 }, //tyk301
    IS128: { x: 0.497, y: 0.844 }, //tyk301
    IS129: { x: 0.465, y: 0.859 }, //tyk301
    IS130: { x: 0.445, y: 0.867 }, //tyk301
    IS131: { x: 0.454, y: 0.864 }, //tyk301
    IS132: { x: 0.441, y: 0.870 }, //tyk301
    IS133: { x: 0.433, y: 0.874 }, //tyk303
    IS134: { x: 0.389, y: 0.895 }, //tyk303
    IS135: { x: 0.380, y: 0.899 }, //tyk303
    IS136: { x: 0.371, y: 0.903 }, //tyk303
    IS137: { x: 0.373, y: 0.900 }, //tyk303
    IS138: { x: 0.360, y: 0.908 }, //tyk303
    IS139: { x: 0.322, y: 0.926 }, //tyk303
    IS140: { x: 0.312, y: 0.930 }, //tyk303
    IS141: { x: 0.503, y: 0.872 }, //RECTANGLE SMTN
    IS142: { x: 0.521, y: 0.880 }, //RECTANGLE SMTN
    IS143: { x: 0.379, y: 0.931 }, //RECTANGLE SMTN
    IS144: { x: 0.397, y: 0.939 }, //RECTANGLE SMTN
    IS145: { x: 0.593, y: 0.884 }, //TYK300
    IS146: { x: 0.585, y: 0.888 }, //TYK300
    IS147: { x: 0.555, y: 0.902 }, //TYK300
    IS148: { x: 0.546, y: 0.906 }, //TYK300
    IS149: { x: 0.531, y: 0.913 }, //TYK300
    IS150: { x: 0.536, y: 0.911 }, //TYK300
    IS151: { x: 0.522, y: 0.917 }, //TYK302
    IS152: { x: 0.480, y: 0.937 }, //TYK302
    IS153: { x: 0.473, y: 0.940 }, //TYK302
    IS154: { x: 0.459, y: 0.947 }, //TYK302
    IS155: { x: 0.465, y: 0.944 }, //TYK302
    IS156: { x: 0.452, y: 0.950 }, //TYK304
    IS157: { x: 0.413, y: 0.968 }, //TYK304
    IS158: { x: 0.402, y: 0.973 }, //TYK304
  };


const mapConnections = [
    ["ULSTO1", "ULSTO2"],
    ["ULSTO2", "ULO1"],
    ["ULO1", "ULO1",],
    ["ULO1", "ULOP1"],
    ["ULOP1", "ULO2"],
    ["ULO2", "ULO3"],,
    ["ULO3", "ULOP2"],
    ["ULOP2", "ULOP3"],
    ["ULOP3", "ULOP4"],
    ["ULOP4", "ULOP5"],
    ["ULOP5", "ULOP6"],
    ["ULOP6", "ULO4"],

    ["ULO4", "MLSTO1"],
    ["MLSTO1", "MLSTO3"],
    ["MLSTO3", "MLSTO2"],
    ["MLSTO3", "MLSTO4"],
    ["MLSTO4", "MLSTO5"],
    ["MLSTO5", "MLSTO6"],
    ["MLSTO6", "MLSTO7"],
    ["MLSTO7", "MLSTO8"],
    ["MLSTO8", "MLSTO10"],
    ["MLSTO10", "MLOP1"],
    ["MLOP1", "MLSTO9"],
    ["MLSTO10", "MLO1"],
    ["MLO1", "MLO2"],

    ["MLO2", "LLO1"],
    ["LLO1", "LLO2"],
    ["LLO2", "LLO3"],
    ["LLO3", "LLO4"],
    ["LLO4", "LLO5"],
    ["LLO5", "LLO6"],
    ["LLO6", "LLO7"],
    ["LLO7", "LLOP1"],
    ["LLO7", "LLO8"],
    ["LLO8", "LLOP2"],
    ["LLOP2", "LLOP3"],
    ["LLOP3", "LLO9"],
    ["LLO8", "LLOP5"],
    ["LLOP5", "LLOP6"],
    ["LLOP6", "LLO10"],
    ["LLO10", "LLOP7"],
    ["LLOP7", "LLOP8"],

    ["LLOP8", "RO1"],
    ["RO1", "ROP1"],
    ["ROP1", "ROP2"],
    ["ROP2", "RO2"],
    ["RO2", "RO3"],
    ["RO3", "RO4"],
    ["RO4", "RO5"],
    ["RO5", "RO6"],

    ["LLOP1", "RO5"],

    ["RO6", "ROP3"],
    ["ROP3", "ROP4"],
    ["ROP4", "ROP5"],
    ["ROP5", "RO7"],
    ["RO7", "RO8"],
    ["RO8", "RO9"],
    ["RO9", "RO10"],
    ["RO10", "RO11"],
    ["RO11", "RO12"],
    ["RO12", "RO13"],
    ["RO13", "ROP6"],
    ["ROP6", "ROP7"],
    ["ROP7", "ROP8"],
    ["ROP8", "ROP9"],
    ["ROP9", "ROP10"],
    ["ROP10", "ROP11"],
    ["ROP11", "ROP12"],
    ["ROP12", "RO14"],
    ["RO14", "RO15"],
    ["RO15", "RO16"],

    //YANI'S WORK
    ["IS1", "IS2"],
    ["IS3", "IS4"],
    ["IS5", "IS6"],
    ["IS7", "IS8"],
    ["IS9", "IS10"],
    ["IS11", "IS12"],
    ["IS13", "IS14"],
    ["IS15", "IS16"],
    ["IS17", "IS18"],
    ["IS19", "IS20"],
    ["IS21", "IS22"],
    ["IS23", "IS24"],
    ["IS25", "IS26"],
    ["IS27", "IS28"],
    ["IS29", "IS30"],
    ["IS29", "IS28"],
    ["IS27", "IS30"],
    ["IS31", "IS32"],
    ["IS33", "ULOP1"],
    ["IS34", "IS35"],
    ["IS36", "ROP12"],
    ["IS37", "IS38"],
    ["IS39", "ROP11"],
    ["IS42", "ROP10"],
    ["IS40", "IS41"],
    ["ULSTO1", "RO16"],
    ["IS43", "RO15"],
    ["IS44", "ULSTO2"],
    ["RO15", "ULSTO2"],
    ["IS45", "ULO3"],
    ["IS46", "ULOP2"],
    ["IS47", "ULOP3"],
    ["IS47", "IS48"],
    ["IS49", "ULOP4"],
    ["IS49", "IS50"],
    ["IS51", "ULOP5"],
    ["IS52", "IS53"],
    ["IS54", "ULOP6"],
    ["IS55", "IS56"],
    ["MLSTO1", "IS57"],
    ["IS59", "IS58"],
    ["IS60", "IS61"],
    ["IS62", "IS63"],
    ["IS64", "IS65"],
    ["IS66", "IS67"],
    ["IS68", "IS69"],
    ["MLOP1", "IS70"],
    ["IS72", "IS71"],
    ["IS72", "IS73"],
    ["IS70", "MLOP2"],
    ["IS75", "IS74"],
    ["IS76", "ROP9"],
    ["IS77", "IS78"],
    ["IS79", "ROP8"],
    ["IS80", "ROP7"],
    ["IS82", "IS81"],
    ["IS83", "ROP6"],
    ["IS84", "IS85"],
    ["IS78", "IS86"],
    ["IS87", "IS88"],
    ["IS89", "IS88"],
    ["IS89", "ROP4"],
    ["IS90", "ROP5"],
    ["IS90", "IS91"],
    ["IS92", "IS93"],
    ["IS94", "IS95"],
    ["IS96", "ROP3"],
    ["IS97", "IS89"],
    ["MLO2", "IS98"],
    ["IS99", "IS98"],
    ["IS99", "IS100"],
    ["IS101", "IS100"],
    ["IS102", "LLO2"],
    ["IS101", "IS103"],
    ["IS104", "IS103"],
    ["LLO4", "IS105"],
    ["IS104", "IS105"],
    ["IS106", "IS105"],
    ["IS106", "LLOP1"],
    ["IS107", "IS108"],
    ["IS109", "IS110"],
    ["IS112", "IS111"],
    ["IS113", "IS114"],
    ["IS115", "IS116"],
    ["LLO6", "IS117"],
    ["IS118", "IS119"],
    ["LLOP2", "IS120"],
    ["LLOP3", "IS121"],
    ["IS122", "IS123"],
    ["LLO9", "IS124"],
    ["IS124", "IS125"],
    ["IS126", "IS127"],
    ["IS128", "IS129"],
    ["LLOP5", "IS130"],
    ["IS132", "IS131"],
    ["IS133", "IS134"],
    ["IS135", "IS136"],
    ["IS137", "LLOP6"],
    ["IS138", "IS139"],
    ["IS140", "LLOP7"],
    ["IS142", "IS141"],
    ["IS143", "IS144"],
    ["IS143", "IS141"],
    ["IS142", "IS144"],
    ["RO3", "IS145"],
    ["IS146", "IS147"],
    ["IS148", "IS149"],
    ["ROP2", "IS150"],
    ["IS151", "IS152"],
    ["IS153", "IS154"],
    ["ROP1", "IS155"],
    ["IS156", "IS157"],
    ["LLOP8", "IS158"],
 
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.393, y: 0.11, label: "Speech \n    Lab \n   Rm 1" },
    L2: { x: 0.393, y: 0.2, label: "Speech \n    Lab \n   Rm 2" },
    L3: { x: 0.609, y: 0.1, label: " TYK \n 309" },
    L4: { x: 0.58, y: 0.155, label: "         CAS \n  Research & \nConsultation \n          Rm" },
    L5: { x: 0.6, y: 0.225, label: "  CAS \nStudio" },
    L6: { x: 0.58, y: 0.285, label: " Multimedia \n      Rm 3B" },
    L7: { x: 0.58, y: 0.338, label: " Multimedia \n      Rm 3A" },
    L8: { x: 0.58, y: 0.617, label: "Computer \n     Rm 3A" },
    L9: { x: 0.58, y: 0.707, label: "Computer \n     Rm 3B" },
    L10: { x: 0.451, y: 0.63, label: "College of \n    Arts & \n Science" },
    L11: { x: 0.434, y: 0.7, label: "Dept Chair's \n      Office" },
    L12: { x: 0.449, y: 0.75, label: "Student \nCouncil \n  Office" },
    L13: { x: 0.41, y: 0.84, label: "TYK 301" },
    L14: { x: 0.335, y: 0.875, label: "TYK 303" },
    L15: { x: 0.265, y: 0.91, label: "TYK 305" },
    L16: { x: 0.407, y: 0.975, label: "TYK 304" },
    L17: { x: 0.483, y: 0.94, label: "TYK 302" },
    L18: { x: 0.55, y: 0.91, label: "TYK 300" },

    L19: { x: 0.466, y: 0.309, label: "Elev" },
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
        TYK Building - Third Floor
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

export default TYK3RDFLOORScreen;
