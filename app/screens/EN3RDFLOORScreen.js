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

const EN3RDFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

  const mapNodes = {
    // O - Outer Wall Node 
    O1: { x: 0.363, y: 0.15 },
    O2: { x: 0.138, y: 0.152 },
    O3: { x: 0.141, y: 0.024 },
    O4: { x: 0.866, y: 0.02 },
    O5: { x: 0.868, y: 0.148 },
    O6: { x: 0.687, y: 0.15 },
    O7: { x: 0.687, y: 0.843 },
    O8: { x: 0.867, y: 0.853 },
    O9: { x: 0.844, y: 0.989 },
    O10: { x: 0.106, y: 0.949 },
    O11: { x: 0.134, y: 0.817 },
    O12: { x: 0.359, y: 0.828 },
    // B - Balcony Nodes
    B1: { x: 0.138, y: 0.109 },
    B2: { x: 0.117, y: 0.109 },
    B3: { x: 0.117, y: 0.069 },
    B4: { x: 0.138, y: 0.069 },
    B5: { x: 0.868, y: 0.064 },
    B6: { x: 0.89, y: 0.064 },
    B7: { x: 0.868, y: 0.104 },
    B8: { x: 0.89, y: 0.104 },
    B9: { x: 0.116, y: 0.903 },
    B10: { x: 0.093, y: 0.902 },
    B11: { x: 0.102, y: 0.861 },
    B12: { x: 0.125, y: 0.861 },
    // C - Comfort Room nodes
    C1:{ x: 0.176, y: 0.077 },
    C2:{ x: 0.14, y: 0.077 },
    C3:{ x: 0.239, y: 0.077 },
    C4:{ x: 0.283, y: 0.077 },
    C5:{ x: 0.285, y: 0.023 },
    C6:{ x: 0.718, y: 0.021 },
    C7:{ x: 0.719, y: 0.073 },
    C8:{ x: 0.767, y: 0.073 },
    C9:{ x: 0.827, y: 0.072 },
    C10:{ x: 0.866, y: 0.072 },
    C11:{ x: 0.118, y: 0.894 },
    C12:{ x: 0.157, y: 0.895 },
    C13:{ x: 0.219, y: 0.899 },
    C14:{ x: 0.265, y: 0.902 },
    C15:{ x: 0.255, y: 0.957 },
    C16:{ x: 0.695, y: 0.98 },
    C17:{ x: 0.705, y: 0.924 },
    C18:{ x: 0.758, y: 0.927 },
    C19:{ x: 0.813, y: 0.93 },
    C20:{ x: 0.852, y: 0.932 },
    // S - Stair Wall Nodes
    S1: { x: 0.14, y: 0.1 },
    S2: { x: 0.233, y: 0.099},
    S3: { x: 0.867, y: 0.095 },
    S4: { x: 0.765, y: 0.096 },
    S5: { x: 0.857, y: 0.909 },
    S6: { x: 0.757, y: 0.904 },
    S7: { x: 0.123, y: 0.871 },
    S8: { x: 0.22, y: 0.875 },
    // SS - Stair Steps Nodes, SC - Stair Center Nodes
    SS1: { x: 0.233, y: 0.099 },
    SS2: { x: 0.233, y: 0.15 },
    SS3: { x: 0.223, y: 0.099 },
    SS4: { x: 0.223, y: 0.15 },
    SS5: { x: 0.213, y: 0.099 },
    SS6: { x: 0.213, y: 0.15 },
    SS7: { x: 0.203, y: 0.099 },
    SS8: { x: 0.203, y: 0.15 },
    SS9: { x: 0.193, y: 0.099 },
    SS10: { x: 0.193, y: 0.15 },
    SS11: { x: 0.183, y: 0.099 },
    SS12: { x: 0.183, y: 0.15 },
    SC1: { x: 0.233, y: 0.125 },
    SC2: { x: 0.183, y: 0.125 },
    //
    SS13: { x: 0.765, y: 0.148 },
    SS14: { x: 0.765, y: 0.096 },
    SS15: { x: 0.765, y: 0.148 },
    SS16: { x: 0.765, y: 0.096 },
    SS17: { x: 0.775, y: 0.148 },
    SS18: { x: 0.775, y: 0.096 },
    SS19: { x: 0.785, y: 0.148 },
    SS20: { x: 0.785, y: 0.096 },
    SS21: { x: 0.795, y: 0.148 },
    SS22: { x: 0.795, y: 0.096 },
    SS23: { x: 0.805, y: 0.148 },
    SS24: { x: 0.805, y: 0.096 },
    SC3: { x: 0.765, y: 0.124 },
    SC4: { x: 0.805, y: 0.124 },
    //
    SS25: { x: 0.767, y: 0.849 },
    SS26: { x: 0.767, y: 0.904 },
    SS27: { x: 0.777, y: 0.849 },
    SS28: { x: 0.777, y: 0.904 },
    SS29: { x: 0.787, y: 0.849 },
    SS30: { x: 0.797, y: 0.849 },
    SS31: { x: 0.787, y: 0.904 },
    SS32: { x: 0.807, y: 0.849 },
    SS33: { x: 0.797, y: 0.904 },
    SS34: { x: 0.817, y: 0.849 },
    SS35: { x: 0.807, y: 0.904 },
    SC5: { x: 0.757, y: 0.877 },
    SC6: { x: 0.816, y: 0.88 },
    //
    SS36: { x: 0.23, y: 0.823 },
    SS37: { x: 0.22, y: 0.82 },
    SS38: { x: 0.21, y: 0.875 },
    SS39: { x: 0.21, y: 0.82 },
    SS40: { x: 0.2, y: 0.875 },
    SS41: { x: 0.2, y: 0.82 },
    SS42: { x: 0.19, y: 0.875 },
    SS43: { x: 0.19, y: 0.82 },
    SS44: { x: 0.18, y: 0.875 },
    SS45: { x: 0.18, y: 0.82 },
    SS46: { x: 0.17, y: 0.875 },
    SC7: { x: 0.23, y: 0.85 },
    SC8: { x: 0.17, y: 0.847 },
    // R - Room Nodes
    // RU - Upper Hallways rooms
    RU1:{ x: 0.303, y: 0.077 },
    RU2:{ x: 0.326, y: 0.077 },
    RU3:{ x: 0.384, y: 0.077 },
    RU4:{ x: 0.41, y: 0.076 },
    RU5:{ x: 0.428, y: 0.076 },
    RU6:{ x: 0.43, y: 0.023 },
    RU7:{ x: 0.457, y: 0.076 },
    RU8:{ x: 0.527, y: 0.075 },
    RU9:{ x: 0.553, y: 0.075 },
    RU10:{ x: 0.574, y: 0.075 },
    RU11: { x: 0.573, y: 0.022 },
    RU12: { x: 0.599, y: 0.075 },
    RU13: { x: 0.667, y: 0.074 },
    RU14: { x: 0.692, y: 0.074 },
    RU15: { x: 0.284, y: 0.151 },
    RU16: { x: 0.284, y: 0.099 },
    RU17: { x: 0.306, y: 0.099 },
    RU18: { x: 0.328, y: 0.099 },
    RU19: { x: 0.363, y: 0.099 },
    RU20: { x: 0.458, y: 0.098 },
    RU21: { x: 0.479, y: 0.098 },
    RU22: { x: 0.478, y: 0.15 },
    RU23: { x: 0.523, y: 0.098 },
    RU24: { x: 0.523, y: 0.117 },
    RU25: { x: 0.523, y: 0.127 },
    RU26: { x: 0.523, y: 0.151 },
    RU27: { x: 0.574, y: 0.15 },
    RU28: { x: 0.574, y: 0.111 },
    RU29: { x: 0.62, y: 0.111 },
    RU30: { x: 0.622, y: 0.12 },
    RU31: { x: 0.622, y: 0.127 },
    RU32: { x: 0.672, y: 0.127 },
    RU33: { x: 0.672, y: 0.097 },
    RU34: { x: 0.717, y: 0.097 },
    RU35: { x: 0.72, y: 0.15 },
    // RM - Middle Hallways Rooms
    RM1: { x: 0.524, y: 0.168 },
    RM2: { x: 0.503, y: 0.168 },
    RM3: { x: 0.486, y: 0.172 },
    RM4: { x: 0.401, y: 0.172 },
    RM5: { x: 0.386, y: 0.169 },
    RM6: { x: 0.363, y: 0.169 },
    RM7: { x: 0.523, y: 0.2 },
    RM8: { x: 0.523, y: 0.218 },
    RM9: { x: 0.523, y: 0.264 },
    RM10: { x: 0.363, y: 0.264 },
    RM11: { x: 0.523, y: 0.289 },
    RM12: { x: 0.523, y: 0.306 },
    RM13: { x: 0.524, y: 0.352 },
    RM14: { x: 0.494, y: 0.352 },
    RM15: { x: 0.48, y: 0.346 },
    RM16: { x: 0.414, y: 0.346 },
    RM17: { x: 0.39, y: 0.353 },
    RM18: { x: 0.363, y: 0.353 },
    RM19: { x: 0.363, y: 0.359 },
    RM20: { x: 0.39, y: 0.359 },
    RM21: { x: 0.413, y: 0.367 },
    RM22: { x: 0.48, y: 0.367 },
    RM23: { x: 0.494, y: 0.36 },
    RM24: { x: 0.524, y: 0.36 },
    RM25: { x: 0.524, y: 0.407 },
    RM26: { x: 0.524, y: 0.425 },
    RM27: { x: 0.443, y: 0.425 },
    RM28: { x: 0.363, y: 0.425 },
    RM29: { x: 0.524, y: 0.447 },
    RM30: { x: 0.461, y: 0.448 },
    RM31: { x: 0.444, y: 0.444 },
    RM32: { x: 0.423, y: 0.447 },
    RM33: { x: 0.363, y: 0.448 },
    RM34: { x: 0.524, y: 0.474 },
    RM35: { x: 0.524, y: 0.486 },
    RM36: { x: 0.524, y: 0.634 },
    RM37: { x: 0.524, y: 0.651 },
    RM38: { x: 0.523, y: 0.838 },
    RM39: { x: 0.572, y: 0.164 },
    RM40: { x: 0.572, y: 0.199 },
    RM41: { x: 0.572, y: 0.21 },
    RM42: { x: 0.573, y: 0.217 },
    RM43: { x: 0.687, y: 0.217 },
    RM44: { x: 0.573, y: 0.225 },
    RM45: { x: 0.573, y: 0.225 },
    RM46: { x: 0.573, y: 0.237 },
    RM47: { x: 0.573, y: 0.269 },
    RM48: { x: 0.573, y: 0.279 },
    RM49: { x: 0.573, y: 0.279 },
    RM50: { x: 0.573, y: 0.287 },
    RM51: { x: 0.687, y: 0.287 },
    RM52: { x: 0.573, y: 0.294 },
    RM53: { x: 0.573, y: 0.306 },
    RM54: { x: 0.573, y: 0.338 },
    RM55: { x: 0.573, y: 0.349 },
    RM56: { x: 0.573, y: 0.356 },
    RM57: { x: 0.687, y: 0.356 },
    RM58: { x: 0.573, y: 0.363 },
    RM59: { x: 0.573, y: 0.375 },
    RM60: { x: 0.573, y: 0.406 },
    RM61: { x: 0.573, y: 0.417 },
    RM62: { x: 0.573, y: 0.426 },
    RM63: { x: 0.687, y: 0.426 },
    RM64: { x: 0.573, y: 0.433 },
    RM65: { x: 0.572, y: 0.445 },
    RM66: { x: 0.573, y: 0.476 },
    RM67: { x: 0.573, y: 0.486 },
    RM68: { x: 0.573, y: 0.494 },
    RM69: { x: 0.687, y: 0.494 },
    RM70: { x: 0.573, y: 0.5 },
    RM71: { x: 0.572, y: 0.513 },
    RM72: { x: 0.572, y: 0.544 },
    RM73: { x: 0.572, y: 0.555 },
    RM74: { x: 0.572, y: 0.562 },
    RM75: { x: 0.687, y: 0.563 },
    RM76: { x: 0.572, y: 0.57 },
    RM77: { x: 0.572, y: 0.582 },
    RM78: { x: 0.572, y: 0.613 },
    RM79: { x: 0.572, y: 0.623 },
    RM80: { x: 0.572, y: 0.632 },
    RM81: { x: 0.687, y: 0.633 },
    RM82: { x: 0.572, y: 0.64 },
    RM83: { x: 0.572, y: 0.64 },
    RM84: { x: 0.572, y: 0.652 },
    RM85: { x: 0.572, y: 0.684 },
    RM86: { x: 0.573, y: 0.695 },
    RM87: { x: 0.574, y: 0.704 },
    RM88: { x: 0.687, y: 0.704 },
    RM89: { x: 0.574, y: 0.71 },
    RM90: { x: 0.574, y: 0.722 },
    RM91: { x: 0.574, y: 0.755 },
    RM92: { x: 0.574, y: 0.767 },
    RM93: { x: 0.574, y: 0.774 },
    RM94: { x: 0.687, y: 0.774 },
    RM95: { x: 0.574, y: 0.781 },
    RM96: { x: 0.574, y: 0.792 },
    RM97: { x: 0.574, y: 0.797 },
    RM98: { x: 0.574, y: 0.81 },
    RM99: { x: 0.573, y: 0.839 },
    // RL - Lower Hallway Rooms
    RL1: { x: 0.278, y: 0.825 },
    RL2: { x: 0.269, y: 0.878 },
    RL3: { x: 0.304, y: 0.88 },
    RL4: { x: 0.334, y: 0.881 },
    RL5: { x: 0.467, y: 0.888 },
    RL6: { x: 0.498, y: 0.89 },
    RL7: { x: 0.513, y: 0.891 },
    RL8: { x: 0.564, y: 0.879 },
    RL9: { x: 0.615, y: 0.881 },
    RL10: { x: 0.617, y: 0.874 },
    RL11: { x: 0.62, y: 0.866 },
    RL12: { x: 0.668, y: 0.868 },
    RL13: { x: 0.664, y: 0.898 },
    RL14: { x: 0.709, y: 0.9 },
    RL15: { x: 0.721, y: 0.846 },
    RL16: { x: 0.292, y: 0.903 },
    RL17: { x: 0.317, y: 0.904 },
    RL18: { x: 0.41, y: 0.909 },
    RL19: { x: 0.4, y: 0.965 },
    RL20: { x: 0.44, y: 0.91 },
    RL21: { x: 0.529, y: 0.915 },
    RL22: { x: 0.558, y: 0.917 },
    RL23: { x: 0.549, y: 0.972 },
    RL24: { x: 0.585, y: 0.918 },
    RL25: { x: 0.677, y: 0.923},
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
    ["B6", "B8"],
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
    ["RU7", "RU8"],
    ["RU9", "RU10"],
    ["RU10", "RU11"],
    ["RU12", "RU13"],
    ["RU14", "C7"],
    ["RU15", "RU16"],
    ["RU16", "RU17"],
    ["RU18", "RU19"],
    ["RU26", "O1"],
    ["RU19", "RU20"],
    ["RU21", "RU22"],
    ["RU21", "RU23"],
    ["RU23", "RU24"],
    ["RU25", "RU26"],
    ["RU27", "RU28"],
    ["RU28", "RU29"],
    ["RU30", "RU31"],
    ["RU31", "RU32"],
    ["RU32", "RU33"],
    ["RU33", "RU34"],
    ["RU34", "RU35"],
    ["RM1", "RM2"],
    ["RM2", "RM3"],
    ["RM3", "RM4"],
    ["RM4", "RM5"],
    ["RM5", "RM6"],
    ["RU26", "RM7"],
    ["RM8", "RM9"],
    ["RM9", "RM10"],
    ["RM9", "RM11"],
    ["RM12", "RM13"],
    ["RM13", "RM14"],
    ["RM14", "RM15"],
    ["RM15", "RM16"],
    ["RM16", "RM17"],
    ["RM17", "RM18"],
    ["RM18", "RM19"],
    ["RM19", "RM20"],
    ["RM20", "RM21"],
    ["RM21", "RM22"],
    ["RM22", "RM23"],
    ["RM23", "RM24"],
    ["RM24", "RM25"],
    ["RM26", "RM28"],
    ["RM26", "RM29"],
    ["RM29", "RM30"],
    ["RM27", "RM31"],
    ["RM32", "RM33"],
    ["RM29", "RM34"],
    ["RM35", "RM36"],
    ["RM37", "RM38"],
    ["RM38", "RL7"],
    ["RM39", "RM40"],
    ["RM41", "RM45"],
    ["RM42", "RM43"],
    ["RM46", "RM47"],
    ["RM48", "RM52"],
    ["RM50", "RM51"],
    ["RM53", "RM54"],
    ["RM55", "RM58"],
    ["RM56", "RM57"],
    ["RM59", "RM60"],
    ["RM61", "RM64"],
    ["RM62", "RM63"],
    ["RM65", "RM66"],
    ["RM67", "RM70"],
    ["RM68", "RM69"],
    ["RM71", "RM72"],
    ["RM73", "RM76"],
    ["RM74", "RM75"],
    ["RM77", "RM78"],
    ["RM79", "RM83"],
    ["RM80", "RM81"],
    ["RM84", "RM85"],
    ["RM86", "RM89"],
    ["RM87", "RM88"],
    ["RM90", "RM91"],
    ["RM92", "RM95"],
    ["RM93", "RM94"],
    ["RM96", "RM97"],
    ["RM98", "RM99"],
    ["RM99", "RL8"],
    ["RL1", "RL2"],
    ["RL2", "RL3"],
    ["RL4", "RL5"],
    ["RL6", "RL7"],
    ["RL8", "RL9"],
    ["RL9", "RL10"],
    ["RL11", "RL12"],
    ["RL12", "RL13"],
    ["RL13", "RL14"],
    ["RL14", "RL15"],
    ["C14", "RL16"],
    ["RL17", "RL18"],
    ["RL18", "RL19"],
    ["RL20", "RL21"],
    ["RL22", "RL23"],
    ["RL24", "RL25"],
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
    L1 : { x: 0.12, y: 0.92, label: "MALE CR" },
    L2 : { x: 0.28, y: 0.93, label: "EN 319" },
    L3 : { x: 0.42, y: 0.94, label: "EN 318" },
    L4 : { x: 0.57, y: 0.95, label: "EN 317" },
    L5 : { x: 0.71, y: 0.95, label: "FEMALE\n    CR" },
    L6 : { x: 0.43, y: 0.62, label: "L\nI\nB\nR\nA\nR\nY" },
    L7 : { x: 0.39, y: 0.39, label: "MPH 2" },
    L8 : { x: 0.39, y: 0.21, label: "MPH 1" },
    L9 : { x: 0.37, y: 0.12, label: "IECEP" },
    L10 : { x: 0.57, y: 0.8, label: "EN 313" },
    L11 : { x: 0.57, y: 0.73, label: "EN 312" },
    L12 : { x: 0.57, y: 0.67, label: "EN 311" },
    L13 : { x: 0.57, y: 0.6, label: "EN 310" },
    L14 : { x: 0.57, y: 0.525, label: "EN 309" },
    L15 : { x: 0.57, y: 0.45, label: "EN 308" },
    L16 : { x: 0.57, y: 0.39, label: "EN 307" },
    L17 : { x: 0.57, y: 0.32, label: "EN 306" },
    L18 : { x: 0.57, y: 0.25, label: "EN 305" },
    L19 : { x: 0.57, y: 0.17, label: "EN 304" },
    L20 : { x: 0.59, y: 0.05, label: "EN 301" },
    L21 : { x: 0.45, y: 0.05, label: "EN 302" },
    L22 : { x: 0.3, y: 0.05, label: "EN 303" },
    L23 : { x: 0.15, y: 0.05, label: "MALE CR" },
    L24 : { x: 0.73, y: 0.04, label: "FEMALE\n    CR" },


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
        Engineering Building - Third Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          // source={require("../images/EN3RDFLR.png")}
          // style={{ width: "100%", height: "105%", position: "absolute", resizeMode: "contain" }}
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
                fontSize: 9,
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

export default EN3RDFLOORScreen;
