import React, { useEffect, useRef, useState } from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import { Svg, Circle, Line } from "react-native-svg";
import Animated, { useSharedValue, withTiming, useAnimatedProps, Easing } from "react-native-reanimated";

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MapScreen = ({ route, navigation }) => {
    const { path, buildingCoordinates } = route.params;
    const containerRef = useRef(null);
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    // Animation progress for each segment
    const lineProgress = path.slice(0, -1).map(() => useSharedValue(0)); // Separate progress for each line

    useEffect(() => {
        console.log("(NOBRIDGE) LOG  MapScreen Mounted");
        console.log("(NOBRIDGE) LOG  Path:", path);
        console.log("(NOBRIDGE) LOG  Building Coordinates:", buildingCoordinates);

        // Animate each segment one by one
        path.forEach((_, index) => {
            if (index === 0) return;
            setTimeout(() => {
                lineProgress[index - 1].value = withTiming(1, {
                    duration: 200, // Adjust speed
                    easing: Easing.linear,
                });
            }, index * 300);
        });
    }, []);

    const onLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerSize({ width, height });
        console.log("(NOBRIDGE) LOG  Map container size:", width, height);
    };

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {/* Go Back Button */}
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    position: "absolute",
                    top: 40,
                    left: 20,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    borderRadius: 8,
                    zIndex: 10,
                }}
            >
                <Text style={{ color: "white", fontSize: 16 }}>Back</Text>
            </TouchableOpacity>

            <View
                ref={containerRef}
                onLayout={onLayout}
                style={{ width: "90%", height: "85%", position: "relative" }}
            >
                <Image
                    source={require("../images/EN1STFLR.png")}
                    style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                />
                <Svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
                    {/* Animated lines appearing one at a time */}
                    {path.slice(0, -1).map((node, index) => {
                        const startCoords = buildingCoordinates[node];
                        const endCoords = buildingCoordinates[path[index + 1]];
                        if (!startCoords || !endCoords) return null;

                        const x1 = startCoords.x * containerSize.width;
                        const y1 = startCoords.y * containerSize.height;
                        const x2 = endCoords.x * containerSize.width;
                        const y2 = endCoords.y * containerSize.height;

                        const animatedProps = useAnimatedProps(() => ({
                            strokeDasharray: [300, 300], // Adjust based on total path length
                            strokeDashoffset: (1 - lineProgress[index].value) * 300,
                        }));

                        return (
                            <AnimatedLine
                                key={`line-${index}`}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="red"
                                strokeWidth={3}
                                animatedProps={animatedProps}
                            />
                        );
                    })}

                    {/* Animated intermediate nodes appearing with lines */}
                    {path.map((node, index) => {
                        if (index === 0 || index === path.length - 1) return null;

                        const coords = buildingCoordinates[node];
                        if (!coords) return null;

                        const cx = coords.x * containerSize.width;
                        const cy = coords.y * containerSize.height;

                        const animatedProps = useAnimatedProps(() => ({
                            opacity: lineProgress[index - 1].value, // Fade in effect with the line
                        }));

                        return (
                            <AnimatedCircle
                                key={`node-${index}`}
                                cx={cx}
                                cy={cy}
                                r={1.5}
                                fill="red"
                                animatedProps={animatedProps}
                            />
                        );
                    })}

                    {/* Animated start node */}
                    {path.length > 0 && (
                        <>
                            {buildingCoordinates[path[0]] && (
                                <>
                                    <AnimatedCircle
                                        cx={buildingCoordinates[path[0]].x * containerSize.width}
                                        cy={buildingCoordinates[path[0]].y * containerSize.height}
                                        r={5}
                                        fill="blue"
                                        animatedProps={useAnimatedProps(() => ({
                                            opacity: 1,
                                        }))}
                                    />
                                    <Text
                                        style={{
                                            position: "absolute",
                                            left: buildingCoordinates[path[0]].x * containerSize.width - 30,
                                            top: buildingCoordinates[path[0]].y * containerSize.height - 25,
                                            color: "blue",
                                            paddingHorizontal: 37,
                                            paddingVertical: 16,
                                            fontSize: 12,
                                            fontWeight: "bold",
                                        }}
                                    >
                                        You
                                    </Text>
                                </>
                            )}

                            {/* Animated end node */}
                            {buildingCoordinates[path[path.length - 1]] && (
                                <AnimatedCircle
                                    cx={buildingCoordinates[path[path.length - 1]].x * containerSize.width}
                                    cy={buildingCoordinates[path[path.length - 1]].y * containerSize.height}
                                    r={5}
                                    fill="red"
                                    animatedProps={useAnimatedProps(() => ({
                                        opacity: lineProgress[lineProgress.length - 1].value,
                                    }))}
                                />
                            )}
                        </>
                    )}
                </Svg>
            </View>
        </View>
    );
};

export default MapScreen;
