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

const EN2NDFLOORScreen = ({ route, navigation }) => {
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
    // O - Outer Wall Node 
    O1: { x: 0.35, y: 0.173 },
    O2: { x: 0.135, y: 0.174 },
    O3: { x: 0.139, y: 0.047 },
    O4: { x: 0.845, y: 0.041 },
    O5: { x: 0.846, y: 0.17 },
    O6: { x: 0.669, y: 0.171 },
    O7: { x: 0.671, y: 0.843 },
    O8: { x: 0.844, y: 0.852 },
    O9: { x: 0.819, y: 0.981 },
    O10: { x: 0.114, y: 0.946 },
    O11: { x: 0.137, y: 0.82 },
    O12: { x: 0.35, y: 0.828 },
    // B - Balcony Nodes
    B1: { x: 0.135, y: 0.131 },
    B2: { x: 0.113, y: 0.131 },
    B3: { x: 0.114, y: 0.092 },
    B4: { x: 0.137, y: 0.092 },
    B5: { x: 0.846, y: 0.087 },
    B6: { x: 0.871, y: 0.087 },
    B7: { x: 0.871, y: 0.126 },
    B8: { x: 0.846, y: 0.126 },
    B9: { x: 0.123, y: 0.902 },
    B10: { x: 0.097, y: 0.901 },
    B11: { x: 0.105, y: 0.861 },
    B12: { x: 0.129, y: 0.861 },
    // C - Comfort Room nodes
    C1:{ x: 0.137, y: 0.1 },
    C2:{ x: 0.175, y: 0.1 },
    C3:{ x: 0.24, y: 0.099 },
    C4:{ x: 0.279, y: 0.098 },
    C5:{ x: 0.279, y: 0.046 },
    C6:{ x: 0.704, y: 0.042 },
    C7:{ x: 0.704, y: 0.095 },
    C8:{ x: 0.745, y: 0.095 },
    C9:{ x: 0.804, y: 0.094 },
    C10:{ x: 0.844, y: 0.094 },
    C11:{ x: 0.125, y: 0.893 },
    C12:{ x: 0.162, y: 0.895 },
    C13:{ x: 0.222, y: 0.897 },
    C14:{ x: 0.265, y: 0.9 },
    C15:{ x: 0.255, y: 0.953 },
    C16:{ x: 0.678, y: 0.974 },
    C17:{ x: 0.687, y: 0.92 },
    C18:{ x: 0.732, y: 0.922 },
    C19:{ x: 0.793, y: 0.926 },
    C20:{ x: 0.83, y: 0.926 },
    // S - Stair Wall Nodes
    S1: { x: 0.137, y: 0.122 },
    S2: { x: 0.229, y: 0.121 },
    S3: { x: 0.846, y: 0.118 },
    S4: { x: 0.753, y: 0.118 },
    S5: { x: 0.834, y: 0.905 },
    S6: { x: 0.735, y: 0.9 },
    S7: { x: 0.13, y: 0.87 },
    S8: { x: 0.22, y: 0.874 },
    // SS - Stair Steps Nodes, SC - Stair Center Nodes
    SS1: { x: 0.229, y: 0.121 },
    SS2: { x: 0.229, y: 0.173 },
    SS3: { x: 0.219, y: 0.121 },
    SS4: { x: 0.219, y: 0.173 },
    SS5: { x: 0.209, y: 0.121 },
    SS6: { x: 0.209, y: 0.173 },
    SS7: { x: 0.199, y: 0.121 },
    SS8: { x: 0.199, y: 0.173 },
    SS9: { x: 0.189, y: 0.121 },
    SS10: { x: 0.189, y: 0.173 },
    SS11: { x: 0.179, y: 0.121 },
    SS12: { x: 0.179, y: 0.173 },
    SC1: { x: 0.23, y: 0.148 },
    SC2: { x: 0.178, y: 0.148 },
    //
    SS13: { x: 0.753, y: 0.118 },
    SS14: { x: 0.753, y: 0.171 },
    SS15: { x: 0.763, y: 0.118 },
    SS16: { x: 0.763, y: 0.171 },
    SS17: { x: 0.773, y: 0.118 },
    SS18: { x: 0.773, y: 0.171 },
    SS19: { x: 0.783, y: 0.118 },
    SS20: { x: 0.783, y: 0.171 },
    SS21: { x: 0.793, y: 0.118 },
    SS22: { x: 0.793, y: 0.171 },
    SS23: { x: 0.803, y: 0.118 },
    SS24: { x: 0.803, y: 0.171 },
    SC3: { x: 0.753, y: 0.144 },
    SC4: { x: 0.803, y: 0.144 },
    //
    SS25: { x: 0.747, y: 0.849 },
    SS26: { x: 0.747, y: 0.903 },
    SS27: { x: 0.757, y: 0.849 },
    SS28: { x: 0.757, y: 0.903 },
    SS29: { x: 0.767, y: 0.849 },
    SS30: { x: 0.777, y: 0.848 },
    SS31: { x: 0.767, y: 0.903 },
    SS32: { x: 0.787, y: 0.849 },
    SS33: { x: 0.777, y: 0.903 },
    SS34: { x: 0.797, y: 0.849 },
    SS35: { x: 0.787, y: 0.903 },
    SC5: { x: 0.739, y: 0.877 },
    SC6: { x: 0.789, y: 0.88 },
    //
    SS36: { x: 0.23, y: 0.822 },
    SS37: { x: 0.22, y: 0.822 },
    SS38: { x: 0.21, y: 0.873 },
    SS39: { x: 0.21, y: 0.822 },
    SS40: { x: 0.2, y: 0.873 },
    SS41: { x: 0.2, y: 0.822 },
    SS42: { x: 0.19, y: 0.873 },
    SS43: { x: 0.19, y: 0.822 },
    SS44: { x: 0.18, y: 0.873 },
    SS45: { x: 0.18, y: 0.822 },
    SS46: { x: 0.17, y: 0.873 },
    SC7: { x: 0.23, y: 0.85 },
    SC8: { x: 0.17, y: 0.847 },
    // R - Room Nodes
    // RU - Upper Hallways rooms
    RU1:{ x: 0.3, y: 0.098 },
    RU2:{ x: 0.33, y: 0.098 },
    RU3:{ x: 0.393, y: 0.098 },
    RU4:{ x: 0.419, y: 0.097 },
    RU5:{ x: 0.466, y: 0.097 },
    RU6:{ x: 0.466, y: 0.045 },
    RU7:{ x: 0.488, y: 0.097 },
    RU8:{ x: 0.535, y: 0.096 },
    RU9:{ x: 0.561, y: 0.095 },
    RU10:{ x: 0.561, y: 0.044 },
    RU11: { x: 0.279, y: 0.173 },
    RU12: { x: 0.279, y: 0.121 },
    RU13: { x: 0.3, y: 0.121 },
    RU14: { x: 0.325, y: 0.12 },
    RU15: { x: 0.395, y: 0.119 },
    RU16: { x: 0.421, y: 0.119 },
    RU17: { x: 0.421, y: 0.172 },
    RU18: { x: 0.49, y: 0.119 },
    RU19: { x: 0.514, y: 0.119 },
    RU20: { x: 0.514, y: 0.172 },
    RU21: { x: 0.562, y: 0.172 },
    RU22: { x: 0.562, y: 0.134 },
    RU23: { x: 0.61, y: 0.134 },
    RU24: { x: 0.61, y: 0.148 },
    RU25: { x: 0.61, y: 0.171 },
    RU26: { x: 0.652, y: 0.148 },
    RU27: { x: 0.652, y: 0.119 },
    RU28: { x: 0.703, y: 0.119 },
    RU29: { x: 0.703, y: 0.171 },
    // RM - Middle Hallways Rooms
    RM1: { x: 0.513, y: 0.184 },
    RM2: { x: 0.513, y: 0.195 },
    RM3: { x: 0.513, y: 0.214 },
    RM4: { x: 0.513, y: 0.227 },
    RM5: { x: 0.513, y: 0.238 },
    RM6: { x: 0.351, y: 0.238 },
    RM7: { x: 0.513, y: 0.25 },
    RM8: { x: 0.513, y: 0.26 },
    RM9: { x: 0.513, y: 0.282 },
    RM10: { x: 0.513, y: 0.293 },
    RM11: { x: 0.513, y: 0.306 },
    RM12: { x: 0.351, y: 0.306 },
    RM13: { x: 0.513, y: 0.319 },
    RM14: { x: 0.513, y: 0.329 },
    RM15: { x: 0.513, y: 0.352 },
    RM16: { x: 0.513, y: 0.362 },
    RM17: { x: 0.513, y: 0.375 },
    RM18: { x: 0.351, y: 0.375 },
    RM19: { x: 0.513, y: 0.386 },
    RM20: { x: 0.513, y: 0.397 },
    RM21: { x: 0.513, y: 0.419 },
    RM22: { x: 0.513, y: 0.428},
    RM23: { x: 0.513, y: 0.44},
    RM24: { x: 0.351, y: 0.44},
    RM25: { x: 0.513, y: 0.463},
    RM26: { x: 0.351, y: 0.463},
    RM27: { x: 0.513, y: 0.494},
    RM28: { x: 0.513, y: 0.508},
    RM29: { x: 0.351, y: 0.508},
    RM30: { x: 0.513, y: 0.519},
    RM31: { x: 0.513, y: 0.538},
    RM32: { x: 0.513, y: 0.551},
    RM33: { x: 0.351, y: 0.551},
    RM34: { x: 0.513, y: 0.562},
    RM35: { x: 0.513, y: 0.583},
    RM36: { x: 0.513, y: 0.596},
    RM37: { x: 0.351, y: 0.596},
    RM38: { x: 0.513, y: 0.608},
    RM39: { x: 0.513, y: 0.628},
    RM40: { x: 0.513, y: 0.64},
    RM41: { x: 0.351, y: 0.64},
    RM42: { x: 0.513, y: 0.654},
    RM43: { x: 0.513, y: 0.672},
    RM44: { x: 0.513, y: 0.684},
    RM45: { x: 0.351, y: 0.684},
    RM46: { x: 0.513, y: 0.697},
    RM47: { x: 0.513, y: 0.718},
    RM48: { x: 0.513, y: 0.731},
    RM49: { x: 0.351, y: 0.731},
    RM50: { x: 0.513, y: 0.743},
    RM51: { x: 0.513, y: 0.762},
    RM52: { x: 0.513, y: 0.775},
    RM53: { x: 0.351, y: 0.775},
    RM54: { x: 0.513, y: 0.781},
    RM55: { x: 0.513, y: 0.792},
    RM56: { x: 0.513, y: 0.837},
    RM57: { x: 0.562, y: 0.184 },
    RM58: { x: 0.562, y: 0.227 },
    RM59: { x: 0.562, y: 0.238 },
    RM60: { x: 0.668, y: 0.238 },
    RM61: { x: 0.562, y: 0.25 },
    RM62: { x: 0.562, y: 0.293 },
    RM63: { x: 0.564, y: 0.306 },
    RM64: { x: 0.67, y: 0.305 },
    RM65: { x: 0.562, y: 0.319 },
    RM66: { x: 0.562, y: 0.361 },
    RM67: { x: 0.564, y: 0.375 },
    RM68: { x: 0.67, y: 0.374 },
    RM69: { x: 0.562, y: 0.319 },
    RM70: { x: 0.562, y: 0.361 },
    RM71: { x: 0.562, y: 0.386 },
    RM72: { x: 0.562, y: 0.428 },
    RM73: { x: 0.562, y: 0.44 },
    RM74: { x: 0.67, y: 0.44 },
    RM75: { x: 0.56, y: 0.454 },
    RM76: { x: 0.56, y: 0.496 },
    RM77: { x: 0.56, y: 0.508 },
    RM78: { x: 0.669, y: 0.508 },
    RM79: { x: 0.56, y: 0.52 },
    RM80: { x: 0.56, y: 0.562 },
    RM81: { x: 0.56, y: 0.574 },
    RM82: { x: 0.669, y: 0.574 },
    RM83: { x: 0.561, y: 0.587},
    RM84: { x: 0.561, y: 0.63},
    RM85: { x: 0.561, y: 0.641 },
    RM86: { x: 0.669, y: 0.641 },
    RM87: { x: 0.561, y: 0.653 },
    RM88: { x: 0.561, y: 0.694 },
    RM89: { x: 0.561, y: 0.708 },
    RM90: { x: 0.669, y: 0.708 },
    RM91: { x: 0.561, y: 0.722 },
    RM92: { x: 0.561, y: 0.764 },
    RM93: { x: 0.561, y: 0.776 },
    RM94: { x: 0.669, y: 0.776 },
    RM95: { x: 0.561, y: 0.821 },
    RM96: { x: 0.561, y: 0.831 },
    RM97: { x: 0.561, y: 0.839 },
    // RL - Lower Hallway Rooms
    RL1: { x: 0.279, y: 0.826 },
    RL2: { x: 0.269, y: 0.877 },
    RL3: { x: 0.326, y: 0.88 },
    RL4: { x: 0.354, y: 0.881 },
    RL5: { x: 0.502, y: 0.888 },
    RL6: { x: 0.552, y: 0.876 },
    RL7: { x: 0.599, y: 0.879 },
    RL8: { x: 0.61, y: 0.841 },
    RL9: { x: 0.605, y: 0.863 },
    RL10: { x: 0.628, y: 0.865 },
    RL11: { x: 0.62, y: 0.894},
    RL12: { x: 0.691, y: 0.897},
    RL13: { x: 0.704, y: 0.845},
    RL14: { x: 0.648, y: 0.918},
    RL15: { x: 0.628, y: 0.917},
    RL16: { x: 0.587, y: 0.915},
    RL17: { x: 0.564, y: 0.914},
    RL18: { x: 0.546, y: 0.913},
    RL19: { x: 0.535, y: 0.967},
    RL20: { x: 0.523, y: 0.911},
    RL21: { x: 0.474, y: 0.909},
    RL22: { x: 0.455, y: 0.908},
    RL23: { x: 0.442, y: 0.962},
    RL24: { x: 0.427, y: 0.907},
    RL25: { x: 0.348, y: 0.903},
    RL26: { x: 0.326, y: 0.902},

    //addition
    AD1: { x: 0.6, y: 0.095 },
    AD2: { x: 0.67, y: 0.094 },
  }; 

  const mapConnections = [
    ["O1", "O2"],
    ["O2", "O3"],
    ["O3", "O4"],
    ["O4", "O5"],
    ["O5", "O6"],
    ["O6", "O7"],
    ["O7", "O8"],
    ["O8", "O9"],
    ["O9", "O10"],
    ["O10", "O11"],
    ["O11", "O12"],
    ["O12", "O1"],
    ["B1", "B2"],
    ["B2", "B3"],
    ["B3", "B4"],
    ["B5", "B6"],
    ["B6", "B7"],
    ["B7", "B8"],
    ["B9", "B10"],
    ["B10", "B11"],
    ["B11", "B12"],
    ["C1", "C2"],
    ["C3", "C4"],
    ["C4", "C5"],
    ["C6", "C7"],
    ["C7", "C8"],
    ["C9", "C10"],
    ["C11", "C12"],
    ["C13", "C14"],
    ["C14", "C15"],
    ["C16", "C17"],
    ["C17", "C18"],
    ["C19", "C20"],
    ["S1", "S2"],
    ["S3", "S4"],
    ["S5", "S6"],
    ["S7", "S8"],
    ["C4", "RU1"],
    ["RU2", "RU3"],
    ["RU4", "RU5"],
    ["RU5", "RU6"],
    ["RU4", "RU7"],
    ["RU8", "RU9"],
    ["RU9", "RU10"],
    ["RU11", "RU12"],
    ["RU12", "RU13"],
    ["RU14", "RU15"],
    ["RU16", "RU17"],
    ["RU16", "RU18"],
    ["RU19", "RU20"],
    ["RU21", "RU22"],
    ["RU22", "RU23"],
    ["RU24", "RU25"],
    ["RU24", "RU26"],
    ["RU26", "RU27"],
    ["RU28", "RU29"],
    ["O1", "RU20"],
    ["RU21", "O5"],
    ["RU20", "RM1"],
    ["RM2", "RM3"],
    ["RM4", "RM5"],
    ["RM5", "RM6"],
    ["RM5", "RM7"],
    ["RM8", "RM9"],
    ["RM10", "RM11"],
    ["RM11", "RM12"],
    ["RM11", "RM13"],
    ["RM14", "RM15"],
    ["RM10", "RM11"],
    ["RM16", "RM17"],
    ["RM17", "RM18"],
    ["RM17", "RM19"],
    ["RM20", "RM21"],
    ["RM22", "RM23"],
    ["RM23", "RM24"],
    ["RM23", "RM25"],
    ["RM25", "RM26"],
    ["RM25", "RM27"],
    ["RM28", "RM29"],
    ["RM30", "RM31"],
    ["RM32", "RM33"],
    ["RM34", "RM35"],
    ["RM36", "RM37"],
    ["RM38", "RM39"],
    ["RM40", "RM41"],
    ["RM42", "RM43"],
    ["RM44", "RM45"],
    ["RM46", "RM47"],
    ["RM48", "RM49"],
    ["RM50", "RM51"],
    ["RM52", "RM53"],
    ["RM52", "RM54"],
    ["RM55", "RM56"],
    ["RM57", "RM58"],
    ["RM59", "RM60"],
    ["RM61", "RM62"],
    ["RM63", "RM64"],
    ["RM65", "RM66"],
    ["RM67", "RM68"],
    ["RM69", "RM70"],
    ["RM71", "RM72"],
    ["RM73", "RM74"],
    ["RM75", "RM76"],
    ["RM77", "RM78"],
    ["RM79", "RM80"],
    ["RM81", "RM82"],
    ["RM83", "RM84"],
    ["RM85", "RM86"],
    ["RM87", "RM88"],
    ["RM89", "RM90"],
    ["RM91", "RM92"],
    ["RM93", "RM94"],
    ["RM93", "RM95"],
    ["RM96", "RM97"],
    ["RM97", "O7"],
    ["RL1", "RL2"],
    ["RL2", "RL3"],
    ["RL4", "RL5"],
    ["RL5", "RM56"],
    ["RM97", "RL6"],
    ["RL6", "RL7"],
    ["RL8", "RL9"],
    ["RL9", "RL10"],
    ["RL10", "RL11"],
    ["RL11", "RL12"],
    ["RL12", "RL13"],
    ["RL15", "RL16"],
    ["RL17", "RL18"],
    ["RL18", "RL19"],
    ["RL20", "RL21"],
    ["RL22", "RL23"],
    ["RL24", "RL25"],
    ["RL26", "C14"],
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
    ["AD1", "AD2"]
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.12, y: 0.92, label: "MALE CR" },
    L2: { x: 0.3, y: 0.928, label: "EN 217" },
    L3: { x: 0.44, y: 0.925, label: "CHEM\nSTOCK\nROOM" },
    L4: { x: 0.556, y: 0.94, label: "EN 215" },
    L5: { x: 0.69, y: 0.94, label: "FEMALE\n     CR" },
    L6: { x: 0.14, y: 0.07, label: "MALE CR" },
    L7: { x: 0.72, y: 0.06, label: "FEMALE\n     CR" },
    L8: { x: 0.38, y: 0.8, label: "DCSS\nFaculty\nRoom" },
    L9: { x: 0.38, y: 0.75, label: "CLR 1" },
    L10: { x: 0.38, y: 0.7, label: "ECE\nLAB 1" },
    L11: { x: 0.38, y: 0.655, label: "ECE\nLAB 2" },
    L12: { x: 0.38, y: 0.61, label: "ECE\nLAB 3" },
    L13: { x: 0.38, y: 0.565, label: "ECE\nLAB 4" },
    L14: { x: 0.345, y: 0.52, label: "Satellite\nRepair Room" },
    L15: { x: 0.355, y: 0.478, label: "ECE/COE\nTool Room" },
    L16: { x: 0.355, y: 0.39, label: "Electrical\nPower\nEng' Lab 1" },
    L17: { x: 0.355, y: 0.32, label: "Electrical\nPower\nEng' Lab 2" },
    L18: { x: 0.355, y: 0.26, label: "Electrical\nPower\nEng' Lab 3" },
    L19: { x: 0.355, y: 0.19, label: "Electrical\nPower\nEng' Lab 4" },
    L20: { x: 0.56, y: 0.79, label: "Bio Lab\nStock\nRoom" },
    L21: { x: 0.56, y: 0.74, label: "CLR 2" },
    L22: { x: 0.56, y: 0.67, label: "CLR 3" },
    L23: { x: 0.56, y: 0.6, label: "CLR 4" },
    L24: { x: 0.56, y: 0.54, label: "CLR 5" },
    L25: { x: 0.56, y: 0.47, label: "CLR 6" },
    L26: { x: 0.56, y: 0.41, label: "CLR 7" },
    L27: { x: 0.56, y: 0.34, label: "CLR 8" },
    L28: { x: 0.56, y: 0.27, label: "EN 206" },
    L29: { x: 0.56, y: 0.2, label: "EN 205" },
    L30: { x: 0.42, y: 0.13, label: "EE\nTool\nRoom" },
    L31: { x: 0.29, y: 0.145, label: "Net Lab" },
    L32: { x: 0.32, y: 0.07, label: "EN 219" },
    L33: { x: 0.46, y: 0.055, label: "Physics\nStock\nRoom" },
    L34: { x: 0.58, y: 0.07, label: "EN 201" },
  };

   const stairNodes = [
    "EN - STAIRS RIGHT WING1",
    "EN - STAIRS LEFT WING1",
    "EN - STAIRS RIGHT WING2",
    "EN - STAIRS LEFT WING2",
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
    else nextScreen = "EN1STFLOORScreen";

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
        Engineering Building - Second Floor
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

export default EN2NDFLOORScreen;
