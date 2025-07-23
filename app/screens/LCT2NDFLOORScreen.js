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

const LCT2NDFLOORScreen = ({ route, navigation }) => {
  const { path = [], buildingCoordinates = {} } = route.params || {};
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [showNextButton, setShowNextButton] = useState(false);

   const mapNodes = {
    //left wing stairs
    ls1: { x: 0.341, y: 0.016 }, //x axis pag mas mataas value = mas kanan 
    ls2: { x: 0.341, y: 0.064 }, //y axis pag mas mataas value = mas baba 
    ls3: { x: 0.535, y: 0.064 },
    ls4: { x: 0.535, y: 0.016 },
    //left wing extra room
    lx1: { x: 0.341, y: 0.064 }, 
    lx2: { x: 0.341, y: 0.153 }, 
    lx3: { x: 0.48, y: 0.153},
    lx4: { x: 0.48, y: 0.064 },
    //room 204
    r41: { x: 0.341, y: 0.153 }, 
    r42: { x: 0.341, y: 0.246 }, 
    r43: { x: 0.48, y: 0.246},
    r44: { x: 0.48, y: 0.153},
    //room 202
    r21: { x: 0.341, y: 0.246 }, 
    r22: { x: 0.341, y: 0.341}, 
    r23: { x: 0.48, y: 0.341},
    r24: { x: 0.48, y: 0.246},
    //elementary faculty
    ef1: { x: 0.341, y: 0.341}, 
    ef2: { x: 0.341, y: 0.434}, 
    ef3: { x: 0.48, y: 0.434},
    ef4: { x: 0.48, y: 0.341},
    //guidance office
    go1: { x: 0.341, y: 0.434 }, 
    go2: { x: 0.341, y: 0.527}, 
    go3: { x: 0.48, y: 0.527},
    go4: { x: 0.48, y: 0.434},
    //elevator
    elev1: { x: 0.341, y: 0.527 }, 
    elev2: { x: 0.341, y: 0.621}, 
    elev3: { x: 0.48, y: 0.621},
    elev4: { x: 0.48, y: 0.527},
    //highschool faculty
    hsf1: { x: 0.341, y: 0.621 }, 
    hsf2: { x: 0.341, y: 0.736}, 
    hsf3: { x: 0.48, y: 0.736},
    hsf4: { x: 0.48, y: 0.621},
    //multimedia room
    mmr1: { x: 0.341, y: 0.736 }, 
    mmr2: { x: 0.341, y: 0.815}, 
    mmr3: { x: 0.48, y: 0.815},
    mmr4: { x: 0.48, y: 0.736},
    //right wing extra room
    rx1: { x: 0.341, y: 0.815 }, 
    rx2: { x: 0.341, y: 0.895}, 
    rx3: { x: 0.48, y: 0.895},
    rx4: { x: 0.48, y: 0.815},
    //right wing stairs
    rs1: { x: 0.341, y: 0.895}, //x axis pag mas mataas value = mas kanan 
    rs2: { x: 0.341, y: 0.951}, //y axis pag mas mataas value = mas baba 
    rs3: { x: 0.535, y: 0.951},
    rs4: { x: 0.535, y: 0.895},

    
    //room 205
    r51: { x: 0.535, y: 0.064}, 
    r52: { x: 0.535, y: 0.153}, 
    r53: { x: 0.666, y: 0.153},
    r54: { x: 0.666, y: 0.064},
    // room 203
    r31: { x: 0.535, y: 0.153}, 
    r32: { x: 0.535, y: 0.246}, 
    r33: { x: 0.666, y: 0.246},
    r34: { x: 0.666, y: 0.153},
    // room 201
    r11: { x: 0.535, y: 0.246}, 
    r12: { x: 0.535, y: 0.341}, 
    r13: { x: 0.666, y: 0.341},
    r14: { x: 0.666, y: 0.246},
    // room 200
    r01: { x: 0.535, y: 0.341}, 
    r02: { x: 0.535, y: 0.434}, 
    r03: { x: 0.666, y: 0.434},
    r04: { x: 0.666, y: 0.341},
    // speech laboratory
    sl1: { x: 0.535, y: 0.434}, 
    sl2: { x: 0.535, y: 0.527}, 
    sl3: { x: 0.666, y: 0.527},
    sl4: { x: 0.666, y: 0.434},
    
  };

  const mapConnections = [
    ["ls1", "ls2"],
    ["ls2", "ls3"],
    ["ls3", "ls4"],
    ["ls4", "ls1"],
    //left wing stairs
    ["lx1", "lx2"],
    ["lx2", "lx3"],
    ["lx3", "lx4"],
    ["lx4", "lx1"],
    // room 204
    ["r41", "r42"],
    ["r42", "r43"],
    ["r43", "r44"],
    ["r44", "r41"],
    //room 202
    ["r21", "r22"],
    ["r22", "r23"],
    ["r23", "r24"],
    ["r24", "r21"],
    //elementary faculty
    ["ef1", "ef2"],
    ["ef2", "ef3"],
    ["ef3", "ef4"],
    ["ef4", "ef1"],
    //guidance office
    ["go1", "go2"],
    ["go2", "go3"],
    ["go3", "go4"],
    ["go4", "go1"],
    //elevator
    ["elev1", "elev2"],
    ["elev2", "elev3"],
    ["elev3", "elev4"],
    ["elev4", "elev1"],
    //highschool faculty
    ["hsf1", "hsf2"],
    ["hsf2", "hsf3"],
    ["hsf3", "hsf4"],
    ["hsf4", "hsf1"],
    //multimedia room
    ["mmr1", "mmr2"],
    ["mmr2", "mmr3"],
    ["mmr3", "mmr4"],
    ["mmr4", "mmr1"],
    //right wing extra room
    ["rx1", "rx2"],
    ["rx2", "rx3"],
    ["rx3", "rx4"],
    ["rx4", "rx1"],
    //right wing stairs
    ["rs1", "rs2"],
    ["rs2", "rs3"],
    ["rs3", "rs4"],
    ["rs4", "rs1"],

      //room 205
    ["r51", "r52"],
    ["r52", "r53"],
    ["r53", "r54"],
    ["r54", "r51"],
    //room 203
    ["r31", "r32"],
    ["r32", "r33"],
    ["r33", "r34"],
    ["r34", "r31"],
    //room 201
    ["r11", "r12"],
    ["r12", "r13"],
    ["r13", "r14"],
    ["r14", "r11"],
    // room 200
    ["r01", "r02"],
    ["r02", "r03"],
    ["r03", "r04"],
    ["r04", "r01"],
  ];

// STRICTLY FOR LABELS ONLY
  const labelNodes = {
    L1: { x: 0.22, y: 0.5, label: "Room 201" },
    
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
        LCT - Second Floor
      </Text>

      <View
        ref={containerRef}
        onLayout={onLayout}
        style={{ width: "90%", height: "85%", position: "relative" }}
      >
        {/* Background image to trace over */}
        <Image
          source={require("../images/LCT2NDFLR.png")}
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

export default LCT2NDFLOORScreen;
