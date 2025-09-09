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

const EN4THFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

    const mapNodes = {
    // O - Outer Wall Node 
    O1: { x: 0.374, y: 0.147 },
    O2: { x: 0.157, y: 0.147 },
    O3: { x: 0.157, y: 0.018 },
    O4: { x: 0.846, y: 0.024 },
    O5: { x: 0.845, y: 0.151 },
    O6: { x: 0.678, y: 0.15 },
    O7: { x: 0.684, y: 0.831 },
    O8: { x: 0.853, y: 0.838 },
    O9: { x: 0.827, y: 0.968 },
    O10: { x: 0.13, y: 0.945 },
    O11: { x: 0.156, y: 0.813 },
    O12: { x: 0.373, y: 0.821  },
    // C - Comfort Room nodes
    C1:{ x: 0.156, y: 0.071 },
    C2:{ x: 0.203, y: 0.071 },
    C3:{ x: 0.252, y: 0.071 },
    C4:{ x: 0.296, y: 0.071 },
    C5:{ x: 0.297, y: 0.019 },
    C6:{ x: 0.709, y: 0.0227 },
    C7:{ x: 0.709, y: 0.075 },
    C8:{ x: 0.752, y: 0.076 },
    C9:{ x: 0.797, y: 0.076 },
    C10:{ x: 0.844, y: 0.076 },
   
    // S - Stair Wall Nodes
    S1: { x: 0.156, y: 0.093 },
    S2: { x: 0.297, y: 0.093},
    S3: { x: 0.383, y: 0.093},
    S4: { x: 0.383, y: 0.093},
    S5: { x: 0.297, y: 0.12},
    S6: { x: 0.297, y: 0.136},
    S7: { x: 0.297, y: 0.147},
    S8: { x: 0.753, y: 0.096 },
    S9: { x: 0.843, y: 0.098 },
    S10: { x: 0.843, y: 0.893 },
    S11: { x: 0.748, y: 0.889 },
    S12: { x: 0.145, y: 0.867 },
    S13: { x: 0.238, y: 0.871 },
    // SS - Stair Steps Nodes, SC - Stair Center Nodes
    SS1: { x: 0.256, y: 0.147 },
    SS2: { x: 0.256, y: 0.093 },
    SS3: { x: 0.246, y: 0.147 },
    SS4: { x: 0.246, y: 0.093 },
    SS5: { x: 0.236, y: 0.147 },
    SS6: { x: 0.236, y: 0.093 },
    SS7: { x: 0.226, y: 0.147 },
    SS8: { x: 0.226, y: 0.093 },
    SS9: { x: 0.216, y: 0.147 },
    SS10: { x: 0.216, y: 0.093 },
    SS11: { x: 0.206, y: 0.147 },
    SS12: { x: 0.206, y: 0.093 },
    SC1: { x: 0.206, y: 0.12 },
    SC2: { x: 0.256, y: 0.12 },
    //
    SS13: { x: 0.753, y: 0.149 },
    SS14: { x: 0.753, y: 0.096 },
    SS15: { x: 0.766, y: 0.149 },
    SS16: { x: 0.766, y: 0.096 },
    SS17: { x: 0.776, y: 0.149 },
    SS18: { x: 0.776, y: 0.096 },
    SS19: { x: 0.786, y: 0.149 },
    SS20: { x: 0.786, y: 0.096 },
    SS21: { x: 0.796, y: 0.149 },
    SS22: { x: 0.796, y: 0.096 },
    SS23: { x: 0.806, y: 0.149 },
    SS24: { x: 0.806, y: 0.096 },
    SC3: { x: 0.753, y: 0.124 },
    SC4: { x: 0.806, y: 0.124 },
    //
    SS25: { x: 0.76, y: 0.834 },
    SS26: { x: 0.77, y: 0.835 },
    SS27: { x: 0.76, y: 0.889 },
    SS28: { x: 0.78, y: 0.835 },
    SS29: { x: 0.77, y: 0.89 },
    SS30: { x: 0.79, y: 0.835 },
    SS31: { x: 0.78, y: 0.889 },
    SS32: { x: 0.80, y: 0.835 },
    SS33: { x: 0.79, y: 0.89 },
    SS34: { x: 0.81, y: 0.835 },
    SS35: { x: 0.80, y: 0.891 },
    SC5: { x: 0.755, y: 0.863 },
    SC6: { x: 0.81, y: 0.863 },
    //
    SS36: { x: 0.256, y: 0.816 },
    SS37: { x: 0.246, y: 0.816 },
    SS38: { x: 0.23, y: 0.871 },
    SS39: { x: 0.236, y: 0.816 },
    SS40: { x: 0.22, y: 0.871 },
    SS41: { x: 0.226, y: 0.816 },
    SS42: { x: 0.21, y: 0.87 },
    SS43: { x: 0.216, y: 0.816 },
    SS44: { x: 0.2, y: 0.87 },
    SS45: { x: 0.206, y: 0.816 },
    SS46: { x: 0.19, y: 0.87 },
    SC7: { x: 0.25, y: 0.844 },
    SC8: { x: 0.198, y: 0.843 },
    // R - Room Nodes
    // RU - Upper Hallways rooms
    RU1:{ x: 0.318, y: 0.072 },
    RU2:{ x: 0.375, y: 0.072 },
    RU3:{ x: 0.398, y: 0.072 },
    RU4:{ x: 0.4, y: 0.02 },
    RU5:{ x: 0.42, y: 0.073 },
    RU6:{ x: 0.478, y: 0.073 },
    RU7:{ x: 0.502, y: 0.073 },
    RU8:{ x: 0.504, y: 0.021 },
    RU9:{ x: 0.528, y: 0.074 },
    RU10:{ x: 0.582, y: 0.074 },
    RU11:{ x: 0.607, y: 0.074 },
    RU12:{ x: 0.607, y: 0.022 },
    RU13:{ x: 0.63, y: 0.074 },
    RU14:{ x: 0.685, y: 0.074 },
    RU15:{ x: 0.557, y: 0.149 },
    RU16:{ x: 0.557, y: 0.101 },
    RU17:{ x: 0.606, y: 0.101 },
    RU18:{ x: 0.628, y: 0.101 },
    RU19:{ x: 0.628, y: 0.149 },
    RU20:{ x: 0.651, y: 0.102 },
    RU21:{ x: 0.71, y: 0.102 },
    RU22:{ x: 0.71, y: 0.15 },
    // RM - Middle Hallways Rooms
    RM1: { x: 0.449, y: 0.147 },
    RM2: { x: 0.449, y: 0.16 },
    RM3: { x: 0.449, y: 0.187 },
    RM4: { x: 0.449, y: 0.2 },
    RM5: { x: 0.374, y: 0.2 },
    RM6: { x: 0.449, y: 0.212 },
    RM7: { x: 0.449, y: 0.24 },
    RM8: { x: 0.449, y: 0.251 },
    RM9: { x: 0.374, y: 0.251 },
    RM10: { x: 0.449, y: 0.264 },
    RM11: { x: 0.449, y: 0.292 },
    RM12: { x: 0.449, y: 0.303 },
    RM13: { x: 0.374, y: 0.303 },
    RM14: { x: 0.449, y: 0.317 },
    RM15: { x: 0.449, y: 0.344 },
    RM16: { x: 0.449, y: 0.356 },
    RM17: { x: 0.374, y: 0.356 },
    RM18: { x: 0.449, y: 0.369 },
    RM19: { x: 0.448, y: 0.397 },
    RM20: { x: 0.448, y: 0.408 },
    RM21: { x: 0.374, y: 0.408 }, 
    RM22: { x: 0.447, y: 0.421 },
    RM23: { x: 0.447, y: 0.449 },
    RM24: { x: 0.447, y: 0.46 },  
    RM25: { x: 0.374, y: 0.46 },
    RM26: { x: 0.446, y: 0.473 },
    RM27: { x: 0.446, y: 0.501 },
    RM28: { x: 0.445, y: 0.512 },
    RM29: { x: 0.374, y: 0.512 },
    RM30: { x: 0.445, y: 0.525 },
    RM31: { x: 0.445, y: 0.553 },
    RM32: { x: 0.445, y: 0.564 },
    RM33: { x: 0.374, y: 0.564 },
    RM34: { x: 0.445, y: 0.577 },
    RM35: { x: 0.445, y: 0.605 },
    RM36: { x: 0.445, y: 0.616 },
    RM37: { x: 0.374, y: 0.616 },
    RM38: { x: 0.445, y: 0.629 },
    RM39: { x: 0.445, y: 0.657 },
    RM40: { x: 0.445, y: 0.669 },
    RM41: { x: 0.374, y: 0.669 },
    RM42: { x: 0.445, y: 0.682 },
    RM43: { x: 0.445, y: 0.71 },
    RM44: { x: 0.445, y: 0.721 },
    RM45: { x: 0.374, y: 0.721 },
    RM46: { x: 0.445, y: 0.734 },
    RM47: { x: 0.445, y: 0.762 },
    RM48: { x: 0.445, y: 0.773 },
    RM49: { x: 0.374, y: 0.773 },
    RM50: { x: 0.445, y: 0.786 },
    RM51: { x: 0.445, y: 0.814 },
    RM52: { x: 0.445, y: 0.825 },
    RM53: { x: 0.556, y: 0.16 },
    RM54: { x: 0.556, y: 0.187 },
    RM55: { x: 0.556, y: 0.201 },
    RM56: { x: 0.676, y: 0.201 },
    RM57: { x: 0.556, y: 0.212 },
    RM58: { x: 0.556, y: 0.24 },
    RM59: { x: 0.556, y: 0.252 },
    RM60: { x: 0.677, y: 0.253 },
    RM61: { x: 0.556, y: 0.264 },
    RM62: { x: 0.556, y: 0.292 },
    RM63: { x: 0.556, y: 0.304 },
    RM64: { x: 0.678, y: 0.305 },
    RM65: { x: 0.556, y: 0.317 },
    RM66: { x: 0.556, y: 0.344 },
    RM67: { x: 0.556, y: 0.357 },
    RM68: { x: 0.679, y: 0.357 },
    RM69: { x: 0.556, y: 0.369 },
    RM70: { x: 0.556, y: 0.397 },
    RM71: { x: 0.556, y: 0.409 },
    RM72: { x: 0.68, y: 0.409 }, 
    RM73: { x: 0.556, y: 0.421 },
    RM74: { x: 0.556, y: 0.449 },
    RM75: { x: 0.556, y: 0.461 },  
    RM76: { x: 0.68, y: 0.462 },
    RM77: { x: 0.556, y: 0.473 },
    RM78: { x: 0.556, y: 0.501 },
    RM79: { x: 0.556, y: 0.513 },
    RM80: { x: 0.68, y: 0.514 },
    RM81: { x: 0.556, y: 0.525 },
    RM82: { x: 0.556, y: 0.553 },
    RM83: { x: 0.556, y: 0.565 },
    RM84: { x: 0.68, y: 0.565 },
    RM85: { x: 0.556, y: 0.577 },
    RM86: { x: 0.556, y: 0.605 },
    RM87: { x: 0.556, y: 0.617 },
    RM88: { x: 0.68, y: 0.618 },
    RM89: { x: 0.556, y: 0.629 },
    RM90: { x: 0.556, y: 0.657 },
    RM91: { x: 0.556, y: 0.67 },
    RM92: { x: 0.681, y: 0.67 },
    RM93: { x: 0.556, y: 0.682 },
    RM94: { x: 0.556, y: 0.71 },
    RM95: { x: 0.556, y: 0.722 },
    RM96: { x: 0.681, y: 0.723 },
    RM97: { x: 0.556, y: 0.734 },
    RM98: { x: 0.556, y: 0.762 },
    RM99: { x: 0.556, y: 0.774 },
    RM100: { x: 0.681, y: 0.775 },
    RM101: { x: 0.556, y: 0.786 },
    RM102: { x: 0.555, y: 0.814 },
    RM103: { x: 0.551, y: 0.826 },
    // RL - Lower Hallway Rooms
    RL1: { x: 0.298, y: 0.818 }, 
    RL2: { x: 0.286, y: 0.866 }, 
    RL3: { x: 0.41, y: 0.874 }, 
    RL4: { x: 0.431, y: 0.875 }, 
    RL5: { x: 0.541, y: 0.877 },
    //RL6: { x: 0.563, y: 0.879 },
    RL7: { x: 0.563, y: 0.879 },
    RL8: { x: 0.563, y: 0.879 },
    RL9: { x: 0.611, y: 0.882 },
    RL10: { x: 0.634, y: 0.882 },
    RL11: { x: 0.644, y: 0.829 },
    RL12: { x: 0.655, y: 0.884 },
    RL13: { x: 0.704, y: 0.887 },
    RL14: { x: 0.726, y: 0.888 },
    RL15: { x: 0.738, y: 0.833 },
    RL16: { x: 0.14 , y: 0.891 },
    RL17: { x: 0.19 , y: 0.891 },
    RL18: { x: 0.247 , y: 0.898 },
    RL19: { x: 0.28 , y: 0.9 },
    RL20: { x: 0.273 , y: 0.95 },
    RL21: { x: 0.401 , y: 0.905 },
    RL22: { x: 0.425 , y: 0.905 },
    RL23: { x: 0.414 , y: 0.955 },
    RL24: { x: 0.455 , y: 0.906 },
    RL25: { x: 0.53 , y: 0.909 },
    RL26: { x: 0.555 , y: 0.91 },
    RL27: { x: 0.547 , y: 0.959 },
    RL28: { x: 0.578 , y: 0.911 },
    RL29: { x: 0.618 , y: 0.913 },
    RL30: { x: 0.639 , y: 0.914 },
    RL31: { x: 0.63 , y: 0.962 },
    RL32: { x: 0.662 , y: 0.915 },
    RL33: { x: 0.725 , y: 0.918 },
    RL34: { x: 0.716 , y: 0.965 },
    RL35: { x: 0.754 , y: 0.919 },
    RL36: { x: 0.834 , y: 0.923 },
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
    ["C1", "C2"],
    ["C3", "C4"],
    ["C4", "C5"],
    ["C6", "C7"],
    ["C7", "C8"],
    ["C9", "C10"],
    ["S1", "S4"],
    ["S2", "S5"],
    ["S6", "S7"],
    ["S8", "S9"],
    ["S10", "S11"],
    ["S12", "S13"],
    ["RU1", "RU2"],
    ["RU3", "RU4"],
    ["RU5", "RU6"],
    ["RU7", "RU8"],
    ["RU9", "RU10"],
    ["RU11", "RU12"],
    ["RU13", "RU14"],
    ["RU15", "RU16"],
    ["RU16", "RU17"],
    ["RU18", "RU19"],
    ["RU20", "RU21"],
    ["RU21", "RU22"],
    ["RU15", "O6"],
    ["O1", "RM1"],
    ["RM2", "RM3"],
    ["RM4", "RM5"],
    ["RM6", "RM7"],
    ["RM8", "RM9"],
    ["RM10", "RM11"],
    ["RM12", "RM13"],
    ["RM14", "RM15"],
    ["RM16", "RM17"],
    ["RM18", "RM19"],
    ["RM20", "RM21"],
    ["RM22", "RM23"],
    ["RM24", "RM25"],
    ["RM26", "RM27"],
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
    ["RM52", "O12"],
    ["RM53", "RM54"],
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
    ["RM95", "RM96"],
    ["RM97", "RM98"],
    ["RM99", "RM100"],
    ["RM101", "RM102"],
    ["RM103", "O7"],
    ["RL1", "RL2"],
    ["RL2", "RL3"],
    ["RL4", "RM51"],
    ["RM103", "RL5"],
    ["RL6", "RL7"],
    ["RL7", "RL8"],
    ["RL8", "RL9"],
    ["RL10", "RL11"],
    ["RL12", "RL13"],
    ["RL14", "RL15"],
    ["RL16", "RL17"],
    ["RL17", "RL18"],
    ["RL19", "RL20"],
    ["RL19", "RL21"],
    ["RL22", "RL23"],
    ["RL24", "RL25"],
    ["RL26", "RL27"],
    ["RL28", "RL29"],
    ["RL30", "RL31"],
    ["RL32", "RL33"],
    ["RL33", "RL34"],
    ["RL35", "RL36"],
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
    ["SS25", "S11"],
    ["SS26", "SS27"],
    ["SS28", "SS29"],
    ["SS30", "SS31"],
    ["SS32", "SS33"],
    ["SS34", "SS35"],
    ["SC5", "SC6"],
    ["SS36", "S13"],
    ["SS37", "SS38"],
    ["SS39", "SS40"],
    ["SS41", "SS42"],
    ["SS43", "SS44"],
    ["SS45", "SS46"],
    ["SC7", "SC8"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1 : { x: 0.14, y: 0.92, label: "EN 434" },
    L2 : { x: 0.29, y: 0.925, label: "EN 432" },
    L3 : { x: 0.43, y: 0.93, label: "EN 431" },
    L4 : { x: 0.55, y: 0.93, label: "EN\n430" },
    L5 : { x: 0.65, y: 0.93, label: "EN\n429" },
    L6 : { x: 0.75, y: 0.935, label: "EN\n433" },
    L7 : { x: 0.55, y: 0.845, label: "EN\n428" },
    L8 : { x: 0.65, y: 0.845, label: "EN\n427" },
    L9 : { x: 0.32, y: 0.845, label: "AEES" },
    L10 : { x: 0.37, y: 0.79, label: "EN\n426" },
    L11 : { x: 0.37, y: 0.74, label: "EN\n424" },
    L12 : { x: 0.37, y: 0.69, label: "EN\n422" },
    L13 : { x: 0.37, y: 0.63, label: "EN\n420" },
    L14 : { x: 0.37, y: 0.58, label: "EN\n418" },
    L15 : { x: 0.37, y: 0.53, label: "EN\n416" },
    L16 : { x: 0.37, y: 0.48, label: "EN\n414" },
    L17 : { x: 0.37, y: 0.43, label: "EN\n412" },
    L18 : { x: 0.37, y: 0.37, label: "EN\n410" },
    L19 : { x: 0.37, y: 0.32, label: "EN\n408" },
    L20 : { x: 0.37, y: 0.27, label: "EN\n406" },
    L21 : { x: 0.37, y: 0.22, label: "EN\n404" },
    L22 : { x: 0.37, y: 0.17, label: "EN\n402" },

    L23 : { x: 0.57, y: 0.79, label: "EN 425" },
    L24 : { x: 0.57, y: 0.74, label: "EN 423" },
    L25 : { x: 0.57, y: 0.69, label: "EN 421" },
    L26 : { x: 0.57, y: 0.63, label: "EN 419" },
    L27 : { x: 0.57, y: 0.58, label: "EN 417" },
    L28 : { x: 0.57, y: 0.53, label: "EN 415" },
    L29 : { x: 0.57, y: 0.48, label: "EN 413" },
    L30 : { x: 0.57, y: 0.43, label: "EN 411" },
    L31 : { x: 0.57, y: 0.37, label: "EN 409" },
    L32 : { x: 0.57, y: 0.32, label: "EN 407" },
    L33 : { x: 0.57, y: 0.27, label: "EN 405" },
    L34 : { x: 0.57, y: 0.22, label: "EN 403" },
    L35 : { x: 0.57, y: 0.17, label: "EN 401" },

    L36 : { x: 0.165, y: 0.035, label: "FEMALE\n    CR" },
    L37 : { x: 0.32, y: 0.035, label: "EN\nD1" },
    L38 : { x: 0.42, y: 0.036, label: "EN\nD2" },
    L39 : { x: 0.52, y: 0.037, label: "EN\nD3" },
    L40 : { x: 0.62, y: 0.038, label: "EN\nD4" },
    L41 : { x: 0.71, y: 0.047, label: "MALE CR" },
    L42 : { x: 0.56, y: 0.115, label: "EN\nD5" },
    L43 : { x: 0.64, y: 0.115, label: "EN\nD6" },

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
        Engineering Building - Fourth Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          // source={require("../images/EN4THFLR.png")}
          // style={{ width: "100%", height: "102%", position: "absolute", resizeMode: "contain" }}
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

export default EN4THFLOORScreen;
