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

const TYK2NDFLOORScreen = ({ route, navigation }) => {
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
    ULSTO1: { x: 0.505, y: 0.009 }, 
    ULSTO2: { x: 0.505, y: 0.062 },
    ULO1: { x: 0.423, y: 0.062 },  
    ULO2: { x: 0.423, y: 0.247 },
    ULO3: { x: 0.508, y: 0.247 },
    ULO4: { x: 0.507, y: 0.34 },

    ULOP1: { x: 0.423, y: 0.123 }, 
    ULOP2: { x: 0.423, y: 0.184 },
    ULOP3: { x: 0.507, y: 0.259 },
    ULOP4: { x: 0.507, y: 0.2775 },
    ULOP5: { x: 0.507, y: 0.2853 },
    ULOP6: { x: 0.507, y: 0.3043 },
    ULOP7: { x: 0.507, y: 0.323 },

    //MIDDLE PART OUTLINE
    MLSTO1: { x: 0.4, y: 0.34 }, 
    MLSTO2: { x: 0.543, y: 0.34 },
    MLSTO3: { x: 0.412, y: 0.34 },
    MLSTO4: { x: 0.412, y: 0.35 },
    MLSTO5: { x: 0.395, y: 0.357 },
    MLSTO6: { x: 0.412, y: 0.3635 }, 
    MLSTO7: { x: 0.412, y: 0.3725 },
    MLSTO8: { x: 0.4, y: 0.3725 },
    MLSTO9: { x: 0.515, y: 0.3725 },
    MLSTO10: { x: 0.462, y: 0.3725 },

    MLO1: { x: 0.462, y: 0.542 },   
  
    MLOP1: { x: 0.495, y: 0.3725 }, 
    MLOP2: { x: 0.462, y: 0.499 },
    MLOP3: { x: 0.462, y: 0.449 },
    
    //LOWER PART OUTLINE
    LLO1: { x: 0.575, y: 0.565 }, 
    LLO2: { x: 0.543, y: 0.583 },
    LLO3: { x: 0.462, y: 0.6271 },
    LLO4: { x: 0.575, y: 0.626 },
    LLO5: { x: 0.52, y: 0.654 },
    LLO6: { x: 0.462, y: 0.6845 },
    LLO7: { x: 0.572, y: 0.685 },
    LLO8: { x: 0.52, y: 0.712 },
    LLO9: { x: 0.4653, y: 0.742 },
    LLO10: { x: 0.583, y: 0.742 },
    LLO11: { x: 0.527, y: 0.77 },
    LLO12: { x: 0.502, y: 0.7835 },
    LLO13: { x: 0.512, y: 0.7885 },
    LLO14: { x: 0.5845, y: 0.8245 },
    LLO15: { x: 0.3, y: 0.89 },
    LLO16: { x: 0.487, y: 0.978 },

    LLOP1: { x: 0.53, y: 0.7975 }, 
    LLOP2: { x: 0.557, y: 0.812 }, 
    LLOP3: { x: 0.437, y: 0.823 },  
    LLOP4: { x: 0.37, y: 0.855 },
    LLOP5: { x: 0.343, y: 0.911 },
    LLOP6: { x: 0.37, y: 0.923 },
    LLOP7: { x: 0.41, y: 0.942 },
    LLOP8: { x: 0.37, y: 0.9235 }, 
    LLOP9: { x: 0.41, y: 0.942 },  

    //RIGHT PART OUTLINE 
    RO1: { x: 0.692, y: 0.882 }, 
    RO: { x: 0.623, y: 0.914 }, // DUNNO WHAT THIS IS
    RO3: { x: 0.648, y: 0.859 },
    RO4: { x: 0.668, y: 0.849 },
    RO5: { x: 0.668, y: 0.7415 },
    RO6: { x: 0.708, y: 0.7415 },
    RO7: { x: 0.708, y: 0.494 },
    RO8: { x: 0.68, y: 0.494 },
    RO9: { x: 0.68, y: 0.478 },
    RO10: { x: 0.708, y: 0.464 },
    RO11: { x: 0.68, y: 0.451 },
    RO12: { x: 0.68, y: 0.433},
    RO13: { x: 0.708, y: 0.433},
    RO14: { x: 0.708, y: 0.062},
    RO15: { x: 0.625, y: 0.062},
    RO16: { x: 0.625, y: 0.009},


    ROP1: { x: 0.557, y: 0.9455 },
    ROP2: { x: 0.623, y: 0.914 },
    ROP3: { x: 0.708, y: 0.679 },
    ROP4: { x: 0.708, y: 0.617 },
    ROP5: { x: 0.708, y: 0.555 },
    ROP6: { x: 0.708, y: 0.511 },
    ROP7: { x: 0.708, y: 0.4115 },
    ROP8: { x: 0.708, y: 0.373 },
    ROP9: { x: 0.708, y: 0.3105 },
    ROP10: { x: 0.708, y: 0.247 },
    ROP11: { x: 0.708, y: 0.184 },
    ROP12: { x: 0.708, y: 0.123 },

    //INSIDE STRUCTURE
    IST1: { x: 0.565, y: 0.021},
    IST2: { x: 0.565, y: 0.062 },
    IST3: { x: 0.505, y: 0.025 },
    IST4: { x: 0.625, y: 0.025 },
    IST5: { x: 0.505, y: 0.030 },
    IST6: { x: 0.625, y: 0.030 },
    IST7: { x: 0.505, y: 0.035 },
    IST8: { x: 0.625, y: 0.035 },
    IST9: { x: 0.505, y: 0.040 },
    IST10: { x: 0.625, y: 0.040 },
    IST11: { x: 0.505, y: 0.045 },
    IST12: { x: 0.625, y: 0.045 },
    IST13: { x: 0.505, y: 0.050 },
    IST14: { x: 0.625, y: 0.050 },
    IST15: { x: 0.505, y: 0.055 },
    IST16: { x: 0.625, y: 0.055 },
    IST17: { x: 0.505, y: 0.062 },
    IST18: { x: 0.625, y: 0.062 },
    IST19: { x: 0.505, y: 0.066 },
    IST20: { x: 0.625, y: 0.066 },
    IST21: { x: 0.508, y: 0.076 }, //LEFT BRACKET LOOKING AHH 1
    IST22: { x: 0.530, y: 0.076 },
    IST23: { x: 0.508, y: 0.110 }, 
    IST24: { x: 0.530, y: 0.110 },
    IST25: { x: 0.600, y: 0.076 }, //RIGHT BRACKET LOOKING AHH 1
    IST26: { x: 0.623, y: 0.076 },
    IST27: { x: 0.623, y: 0.110 },
    IST28: { x: 0.600, y: 0.110 }, 
    IST29: { x: 0.509, y: 0.123 }, //LEFT LINE?? NO.1
    IST30: { x: 0.509, y: 0.119 }, 
    IST31: { x: 0.509, y: 0.127 },
    IST32: { x: 0.622, y: 0.123 }, //RIGHT LINE?? NO.1
    IST33: { x: 0.622, y: 0.119 }, 
    IST34: { x: 0.622, y: 0.127 },
    IST35: { x: 0.538, y: 0.101 }, //OPEN BOX WTV IDK
    IST36: { x: 0.592, y: 0.101 },
    IST37: { x: 0.538, y: 0.208 },
    IST38: { x: 0.592, y: 0.208 },
    IST39: { x: 0.509, y: 0.137 }, //LEFT MID BRACKET AHH
    IST40: { x: 0.509, y: 0.171 },
    IST41: { x: 0.529, y: 0.137 },
    IST42: { x: 0.529, y: 0.171 },
    IST43: { x: 0.602, y: 0.137 }, //RIGHT MID BRACKET AHH
    IST44: { x: 0.622, y: 0.137 },
    IST45: { x: 0.622, y: 0.171 },
    IST46: { x: 0.602, y: 0.171 },
    IST47: { x:  0.509, y: 0.184 }, // LEFT LINE?? NO.2
    IST48: { x: 0.509, y: 0.188 }, 
    IST49: { x: 0.509, y: 0.180 },
    IST50: { x: 0.622, y: 0.184 }, // RIGHT LINE?? NO.2
    IST51: { x: 0.622, y: 0.188 },
    IST52: { x: 0.622, y: 0.180 },
    IST53: { x: 0.509, y: 0.198 }, //LEFT LOWER BRACKET AHH
    IST54: { x: 0.509, y: 0.232 },
    IST55: { x: 0.529, y: 0.198 },
    IST56: { x: 0.529, y: 0.232 },
    IST57: { x: 0.602, y: 0.198 }, //RIGHT LOWER BRACKET AHH
    IST58: { x: 0.622, y: 0.198 },
    IST59: { x: 0.622, y: 0.232 },
    IST60: { x: 0.602, y: 0.232 },
    IST61: { x: 0.544, y: 0.247 }, //LEFT LINE?? NO.3
    IST62: { x: 0.508, y: 0.243 },
    IST63: { x: 0.622, y: 0.247 }, //RIGHT LINE?? NO.3
    IST64: { x: 0.622, y: 0.243 },
    IST65: { x: 0.622, y: 0.251 },
    IST66: { x: 0.622, y: 0.3105 }, //RIGHT LINE?? NO.4
    IST67: { x: 0.622, y: 0.3065 },
    IST68: { x: 0.622, y: 0.3145 },
    IST69: { x: 0.602, y: 0.261 }, //RIGHT BRACKET?? NO.1
    IST70: { x: 0.622, y: 0.261 },
    IST71: { x: 0.602, y: 0.296 },
    IST72: { x: 0.622, y: 0.296 },
    IST73: { x: 0.602, y: 0.323 }, //RIGHT BRACKET?? NO.2
    IST74: { x: 0.622, y: 0.323 },
    IST75: { x: 0.602, y: 0.358 },
    IST76: { x: 0.622, y: 0.358 },
    IST77: { x: 0.543, y: 0.259 }, //ELEV LINE IDK 1
    IST78: { x: 0.543, y: 0.2775 }, //ELEV LINE IDK 2
    IST79: { x: 0.543, y: 0.267 }, //ELEV LINE IDK 2
    IST80: { x: 0.543, y: 0.2853 }, //ELEV LINE IDK 3
    IST81: { x: 0.543, y: 0.291 }, //ELEV LINE IDK 3
    IST82: { x: 0.543, y: 0.3043 }, //ELEV LINE IDK 4
    IST83: { x: 0.543, y: 0.309 }, //ELEV LINE IDK 4
    IST84: { x: 0.543, y: 0.300 }, //ELEV LINE IDK 4
    IST85: { x: 0.543, y: 0.323 }, //ELEV LINE IDK 5
    IST86: { x: 0.543, y: 0.318 }, //ELEV LINE IDK 5
    IST87: { x: 0.543, y: 0.328 }, //ELEV LINE IDK 5
    IST88: { x: 0.543, y: 0.336 }, //ELEV LINE IDK 6 TINY AHH LINE
    IST89: { x: 0.509, y: 0.357 }, //STAIRS MID
    IST90: { x: 0.445, y: 0.357 },
    IST91: { x: 0.453, y: 0.340 },
    IST92: { x: 0.453, y: 0.372 },
    IST93: { x: 0.463, y: 0.340 },
    IST94: { x: 0.463, y: 0.372 },
    IST95: { x: 0.473, y: 0.340 },
    IST96: { x: 0.473, y: 0.372 },
    IST97: { x: 0.483, y: 0.340 },
    IST98: { x: 0.483, y: 0.372 },
    IST99: { x: 0.493, y: 0.340 },
    IST100: { x: 0.493, y: 0.372 },
    IST101: { x: 0.503, y: 0.340 },
    IST102: { x: 0.503, y: 0.372 },
    IST103: { x: 0.495, y: 0.425 }, //MID LEFT
    IST104: { x: 0.495, y: 0.431 },
    IST105: { x: 0.527, y: 0.438 },
    IST106: { x: 0.483, y: 0.438 },
    IST107: { x: 0.561, y: 0.475 },
    IST108: { x: 0.561, y: 0.485 },
    IST109: { x: 0.585, y: 0.485 },
    IST110: { x: 0.624, y: 0.373 }, //LOBBY MID
    IST111: { x: 0.624, y: 0.368 },
    IST112: { x: 0.624, y: 0.434 },
    IST113: { x: 0.652, y: 0.434 },
    IST114: { x: 0.656, y: 0.420 },
    IST115: { x: 0.656, y: 0.395 },
    IST116: { x: 0.624, y: 0.395 },
    IST117: { x: 0.636, y: 0.395 },
    IST118: { x: 0.656, y: 0.411 },
    IST119: { x: 0.581, y: 0.499 }, //MID LEFT LINE??
    IST120: { x: 0.559, y: 0.513 },
    IST121: { x: 0.559, y: 0.530 },
    IST122: { x: 0.584, y: 0.549 },
    IST123: { x: 0.565, y: 0.555 },
    IST124: { x: 0.654, y: 0.494 }, //RIGHT ROOM MID???
    IST125: { x: 0.625, y: 0.494 },
    IST126: { x: 0.625, y: 0.555 },
    IST127: { x: 0.657, y: 0.511 },
    IST128: { x: 0.657, y: 0.503 },
    IST129: { x: 0.657, y: 0.555 },
    IST130: { x: 0.657, y: 0.530 },
    IST131: { x: 0.625, y: 0.541 },
    IST132: { x: 0.642, y: 0.541 },
    IST133: { x: 0.625, y: 0.568 }, //BRACKET?? 1
    IST134: { x: 0.625, y: 0.602 },
    IST135: { x: 0.605, y: 0.568 },
    IST136: { x: 0.605, y: 0.602 },
    IST137: { x: 0.625, y: 0.630 }, //BRACKET?? 2
    IST138: { x: 0.625, y: 0.664 },
    IST139: { x: 0.605, y: 0.664 },
    IST140: { x: 0.605, y: 0.630 },
    IST141: { x: 0.625, y: 0.692 }, //BRACKET?? 3
    IST142: { x: 0.625, y: 0.726 },
    IST143: { x: 0.605, y: 0.726 },
    IST144: { x: 0.605, y: 0.692 },
    IST145: { x: 0.625, y: 0.617 }, //LINE RIGHT 1
    IST146: { x: 0.625, y: 0.613 },
    IST147: { x: 0.625, y: 0.621 },
    IST148: { x: 0.625, y: 0.679 }, //LINE RIGHT 2
    IST149: { x: 0.625, y: 0.675 },
    IST150: { x: 0.625, y: 0.683 },
    IST151: { x: 0.574, y: 0.598 }, // > LINE 1 LEFT
    IST152: { x: 0.574, y: 0.614 }, 
    IST153: { x: 0.556, y: 0.589 }, 
    IST154: { x: 0.574, y: 0.657 }, // > LINE 2 LEFT
    IST155: { x: 0.574, y: 0.673 }, 
    IST156: { x: 0.556, y: 0.648 }, 
    IST157: { x: 0.580, y: 0.710 }, // > LINE 3 LEFT
    IST158: { x: 0.580, y: 0.728 }, 
    IST159: { x: 0.564, y: 0.703 }, 
    IST160: { x: 0.597, y: 0.626 }, //WALL LINE1
    IST161: { x: 0.597, y: 0.685 }, //WALL LINE2
    IST162: { x: 0.624, y: 0.737 }, //LOW STAIRS 1
    IST163: { x: 0.624, y: 0.770 },
    IST164: { x: 0.645, y: 0.770 },
    IST165: { x: 0.645, y: 0.752 },
    IST166: { x: 0.624, y: 0.755 },
    IST167: { x: 0.668, y: 0.755 },
    IST168: { x: 0.668, y: 0.760 },
    IST169: { x: 0.624, y: 0.760 },
    IST170: { x: 0.668, y: 0.765 },
    IST171: { x: 0.624, y: 0.765 },
    IST172: { x: 0.539, y: 0.776 }, //LOW ELEV 1.0
    IST173: { x: 0.557, y: 0.785 },//LOW ELEV 
    IST174: { x: 0.550, y: 0.781 },
    IST175: { x: 0.564, y: 0.788 },
    IST176: { x: 0.584, y: 0.799 }, 
    IST177: { x: 0.577, y: 0.795 },
    IST178: { x: 0.593, y: 0.803 },
    IST179: { x: 0.611, y: 0.812 },
    IST180: { x: 0.603, y: 0.808 },
    IST181: { x: 0.550, y: 0.815 }, //DOOR ??? IDK 1
    IST182: { x: 0.637, y: 0.863 }, //DOOR ??? IDK 2
    IST183: { x: 0.482, y: 0.844 }, //LOW LINE 1
    IST184: { x: 0.477, y: 0.848 },
    IST185: { x: 0.489, y: 0.842 },
    IST186: { x: 0.414, y: 0.876 }, // LINE2
    IST187: { x: 0.421, y: 0.874 },
    IST188: { x: 0.410, y: 0.879 },
    IST189: { x: 0.511, y: 0.924 }, // LINE3
    IST190: { x: 0.503, y: 0.927 },
    IST191: { x: 0.516, y: 0.921 },
    IST192: { x: 0.576, y: 0.893 }, // LINE4
    IST193: { x: 0.569, y: 0.896 },
    IST194: { x: 0.583, y: 0.8894 },
    IST195: { x: 0.552, y: 0.829 }, //BRACKET 1
    IST196: { x: 0.535, y: 0.821 }, 
    IST197: { x: 0.506, y: 0.835 }, 
    IST198: { x: 0.521, y: 0.843 },
    IST199: { x: 0.465, y: 0.854 }, //BRACKET 2
    IST200: { x: 0.481, y: 0.862 },
    IST201: { x: 0.439, y: 0.867 },
    IST202: { x: 0.453, y: 0.875 },
    IST203: { x: 0.396, y: 0.886 }, //BRACKET 3
    IST204: { x: 0.414, y: 0.895 },
    IST205: { x: 0.366, y: 0.901 },
    IST206: { x: 0.382, y: 0.909 },
    IST207: { x: 0.459, y: 0.948 }, //BRACKET 4
    IST208: { x: 0.490, y: 0.933 }, 
    IST209: { x: 0.475, y: 0.926 }, 
    IST210: { x: 0.441, y: 0.940 }, 
    IST211: { x: 0.527, y: 0.915 }, //BRACKET 5
    IST212: { x: 0.555, y: 0.902 },
    IST213: { x: 0.540, y: 0.894 },
    IST214: { x: 0.512, y: 0.908 },
    IST215: { x: 0.596, y: 0.883 }, //BRACKET 6
    IST216: { x: 0.623, y: 0.870 }, 
    IST217: { x: 0.608, y: 0.862 }, 
    IST218: { x: 0.579, y: 0.876 }, 
    IST219: { x: 0.560, y: 0.838 },  //LOW BOX
    IST220: { x: 0.591, y: 0.854 },
    IST221: { x: 0.442, y: 0.896 },
    IST222: { x: 0.473, y: 0.911 },
    IST223: { x: 0.417, y: 0.908 }, //STAIRS IN BOX ???
    IST224: { x: 0.446, y: 0.924 },
    IST225: { x: 0.456, y: 0.903 },
    IST226: { x: 0.429, y: 0.916 },
    IST227: { x: 0.435, y: 0.899 },
    IST228: { x: 0.467, y: 0.914 },
    IST229: { x: 0.428, y: 0.902 },
    IST230: { x: 0.460, y: 0.917 },
    IST231: { x: 0.423, y: 0.905 },
    IST232: { x: 0.453, y: 0.921 },
    IST233: { x: 0.352, y: 0.907 }, //TINY AHH LINE BOTT
    IST234: { x: 0.383, y: 0.917 },
    IST235: { x: 0.394, y: 0.921 },
    IST236: { x: 0.422, y: 0.936 },
    IST237: { x: 0.413, y: 0.931 },  
  };


const mapConnections = [
    ["ULSTO1", "ULSTO2"],
    ["ULSTO2", "ULO1"],
    ["ULO1", "ULO1",],
    ["ULO1", "ULOP1"],
    ["ULOP1", "ULOP2"],
    ["ULOP2", "ULO2"],
    ["ULO2", "ULO3"],
    ["ULO3", "ULOP3"],
    ["ULOP3", "ULOP4"], 
    ["ULOP4", "ULOP5"],
    ["ULOP5", "ULOP6"],
    ["ULOP6", "ULOP7"],
    ["ULOP7", "ULO4"],
    ["MLSTO2", "ULO4"],

    ["ULO4", "MLSTO1"],
    ["MLSTO1", "MLSTO3"],
    ["MLSTO3", "MLSTO4"],
    ["MLSTO4", "MLSTO5"],
    ["MLSTO5", "MLSTO6"],
    ["MLSTO6", "MLSTO7"],
    ["MLSTO7", "MLSTO8"],
    ["MLSTO8", "MLSTO9"],
    ["MLSTO9", "MLSTO10"],
    ["MLSTO10", "MLOP2"],
    ["MLOP2", "MLO1"],

    ["MLO1", "LLO2"],
    ["LLO1", "LLO2"],
    ["LLO2", "LLO3"],
    ["LLO3", "LLO5"],
    ["LLO5", "LLO4"],
    ["LLO4", "LLO6"],
    ["LLO6", "LLO8"],
    ["LLO8", "LLO7"],
    ["LLO7", "LLO9"],
    ["LLO9", "LLO11"],
    ["LLO11", "LLO10"],
    ["LLO10", "LLO12"],
    ["LLO12", "LLO13"],
    ["LLO13", "LLOP1"],
    ["LLOP1", "LLOP2"],
    ["LLOP2", "LLO14"],
    ["LLO13", "LLOP3"],
    ["LLOP3", "LLOP4"],
    ["LLOP4", "LLO15"],
    ["LLO15", "LLOP5"],
    ["LLOP5", "LLOP8"],
    ["LLOP8", "LLOP9"],
    ["LLOP9", "LLO16"],
    ["LLO16", "LLOP6" ],
    ["LLOP6", "LLOP7" ],
    ["LLO16", "ROP1" ],

    ["ROP1", "ROP2" ],
    ["ROP2", "RO1" ],
    ["RO1", "RO3" ],
    ["RO3", "RO4" ],
    ["RO4", "RO5" ],
    ["LLO10", "RO5" ],
    ["RO5", "RO6" ],
    ["RO6", "ROP3" ],
    ["ROP3", "ROP4" ],
    ["ROP4", "ROP5" ],
    ["ROP5", "ROP6" ],
    ["ROP6", "RO7" ],
    ["RO7", "RO8" ],
    ["RO8", "RO9" ],
    ["RO9", "RO10" ],
    ["RO10", "RO11" ],
    ["RO11", "RO12" ],
    ["RO12", "RO13" ],
    ["RO13", "ROP7" ],
    ["ROP7", "ROP8" ],
    ["ROP8", "ROP9" ],
    ["ROP9", "ROP10" ],
    ["ROP10", "ROP11" ],
    ["ROP11", "ROP12" ],
    ["ROP12", "RO14" ],
    ["RO14", "RO15" ],
    ["RO15", "RO16" ],

    ["IST1", "IST2" ],
    ["IST3", "IST4" ],
    ["IST5", "IST6" ],
    ["IST7", "IST8" ],
    ["IST9", "IST10" ],
    ["IST11", "IST12" ],
    ["IST13", "IST14" ],
    ["IST15", "IST16" ],
    ["IST17", "IST18" ],
    ["ULSTO2", "IST19" ],
    ["RO15", "IST20" ],
    ["IST21", "IST22" ],
    ["IST21", "IST23" ],
    ["IST23", "IST24" ],
    ["IST25", "IST26"],
    ["IST26", "IST27"],
    ["IST27", "IST28"],
    ["ULOP1", "IST29"],
    ["IST30", "IST31"],
    ["ROP12", "IST32"],
    ["IST33", "IST34"],
    ["IST35", "IST36"],
    ["IST37", "IST38"],
    ["IST35", "IST37" ],
    ["IST36", "IST38" ],
    ["IST39", "IST40"],
    ["IST39", "IST41"],
    ["IST40", "IST42"],
    ["IST43", "IST44"],
    ["IST44", "IST45"],
    ["IST46", "IST45"],
    ["ULOP2", "IST47"],
    ["IST48", "IST49"],
    ["ROP11", "IST50" ],
    ["IST51", "IST52" ],
    ["IST53", "IST54" ],
    ["IST53", "IST55" ],
    ["IST54", "IST56" ],
    ["IST57", "IST58" ],
    ["IST58", "IST59" ],
    ["IST59", "IST60" ],
    ["ULO3", "IST61"],
    ["ULO3", "IST62"],
    ["ROP10", "IST63" ],
    ["IST64", "IST65"],
    ["ROP9", "IST66" ],
    ["IST67", "IST68"],
    ["IST70", "IST69"],
    ["IST71", "IST72"],
    ["IST70", "IST72"],
    ["IST73", "IST74"],
    ["IST75", "IST76"],
    ["IST74", "IST76"],
    ["IST77", "ULOP3"],
    ["IST78", "ULOP4"],
    ["IST78", "IST79"],
    ["IST80", "ULOP5"],
    ["IST80", "IST81"],
    ["IST82", "ULOP6"],
    ["IST83", "IST84"],
    ["IST85", "ULOP7"],
    ["IST86", "IST87"],
    ["MLSTO2", "IST88"],
    ["IST89", "IST90"],
    ["IST91", "IST92"],
    ["IST93", "IST94"],
    ["IST95", "IST96"],
    ["IST97", "IST98"],
    ["IST99", "IST100"],
    ["IST101", "IST102"],
    ["MLOP1", "IST103"],
    ["IST103", "IST104"],
    ["IST103", "IST105"],
    ["MLOP3", "IST104"],
    ["IST106", "IST105"],
    ["IST107", "IST105"],
    ["IST109", "IST108"],
    ["ROP8", "IST110"],
    ["IST111", "IST112"],
    ["IST113", "IST112"],
    ["IST114", "IST115"],
    ["IST116", "IST117"],
    ["ROP7", "IST118"],
    ["MLOP2", "IST119"],
    ["IST120", "IST121"],
    ["IST122", "IST121"],
    ["IST122", "IST123"],
    ["IST107", "IST108"],
    ["IST124", "IST125"],
    ["ROP5", "IST126"],
    ["IST125", "IST126"],
    ["ROP6", "IST127"],
    ["IST128", "IST127"],
    ["IST129", "IST130"],
    ["IST131", "IST132"],
    ["IST133", "IST134"],
    ["IST133", "IST135"],
    ["IST136", "IST134"],
    ["IST137", "IST138"],
    ["IST139", "IST138"],
    ["IST137", "IST140"],
    ["IST141", "IST142"],
    ["IST143", "IST142"],
    ["IST144", "IST141"],
    ["ROP4", "IST145"],
    ["IST146", "IST147"],
    ["ROP3", "IST148"],
    ["IST149", "IST150"],
    ["IST151", "IST152"],
    ["IST151", "IST153"],
    ["IST154", "IST155"],
    ["IST154", "IST156"],
    ["IST157", "IST158"],
    ["IST157", "IST159"],
    ["LLO4", "IST160"],
    ["LLO7", "IST161"],
    ["IST162", "IST163"],
    ["IST164", "IST165"],
    ["IST166", "IST167"],
    ["IST168", "IST169"],
    ["IST170", "IST171"],
    ["LLO11", "IST172"],
    ["LLOP1", "IST173"],
    ["IST174", "IST175"],
    ["LLOP2", "IST176"],
    ["IST177", "IST178"],
    ["LLO14", "IST179"],
    ["IST179", "IST180"],
    ["LLOP2", "IST181"],
    ["RO3", "IST182"],
    ["LLO14", "RO3"],
    ["LLOP3", "IST183"],
    ["IST184", "IST185"],
    ["LLOP4", "IST186"],
    ["IST188", "IST187"],
    ["ROP1", "IST189"],
    ["IST190", "IST191"],
    ["RO", "IST192"],
    ["IST193", "IST194"],
    ["IST196", "IST195"],
    ["IST196", "IST197"],
    ["IST198", "IST197"],
    ["IST199", "IST200"],
    ["IST201", "IST199"],
    ["IST201", "IST202"],
    ["IST203", "IST204"],
    ["IST205", "IST206"],
    ["IST205", "IST203"],
    ["IST208", "IST207"],
    ["IST208", "IST209"],
    ["IST207", "IST210"],
    ["IST211", "IST212"],
    ["IST213", "IST212"],
    ["IST211", "IST214"],
    ["IST215", "IST216"],
    ["IST215", "IST218"],
    ["IST217", "IST216"],
    ["IST219", "IST220"],
    ["IST221", "IST222"],
    ["IST222", "IST220"],
    ["IST221", "IST219"],
    ["IST221", "IST223"],
    ["IST222", "IST224"],
    ["IST226", "IST225"],
    ["IST227", "IST228"],
    ["IST229", "IST230"],
    ["IST231", "IST232"],
    ["LLOP5", "IST233"],
    ["LLOP8", "IST234"],
    ["LLOP9", "IST236"],
    ["IST234", "IST235"],
    ["IST236", "IST237"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.42, y: 0.08, label: "TYK\n220" },
    L2: { x: 0.42, y: 0.14, label: "TYK\n218" },
    L3: { x: 0.42, y: 0.21, label: "TYK\n216" },

    L4: { x: 0.62, y: 0.08, label: "TYK\n219" },
    L5: { x: 0.62, y: 0.14, label: "TYK\n217" },
    L6: { x: 0.62, y: 0.21, label: "TYK\n215" },
    L7: { x: 0.62, y: 0.27, label: "TYK\n214" },
    L8: { x: 0.62, y: 0.33, label: "TYK\n213" },
    
    L9: { x: 0.62, y: 0.58, label: "TYK\n211" },
    L10: { x: 0.62, y: 0.64, label: "TYK\n209" },
    L11: { x: 0.62, y: 0.7, label: "TYK\n207" },

    L12: { x: 0.48, y: 0.52, label: "TYK\n212" },
    L13: { x: 0.49, y: 0.61, label: "TYK\n210" },
    L14: { x: 0.49, y: 0.67, label: "TYK\n208" },
    L15: { x: 0.49, y: 0.73, label: "TYK\n206" },

    L16: { x: 0.46, y: 0.81, label: "TYK\n204" },
    L17: { x: 0.39, y: 0.84, label: "TYK\n202" },
    L18: { x: 0.33, y: 0.87, label: "TYK\n200" },

    L19: { x: 0.59, y: 0.88, label: "TYK\n205" },
    L20: { x: 0.53, y: 0.91, label: "TYK\n203" },
    L21: { x: 0.46, y: 0.94, label: "TYK\n201" },
    L22: { x: 0.55, y: 0.26, label: "E\nL\nE\nV\nA\nT\nO\nR" },
    
  };

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
        TYK Building - Second Floor
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
                    fontSize: 8,
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

export default TYK2NDFLOORScreen;
