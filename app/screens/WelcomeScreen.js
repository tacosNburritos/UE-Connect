import React, { useRef } from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View, StatusBar, Animated, Dimensions } from 'react-native';
import { PinchGestureHandler, GestureHandlerRootView, State, PanGestureHandler } from 'react-native-gesture-handler';

function WelcomeScreen({ navigation }) {
    const { width, height } = Dimensions.get('window'); // Get screen dimensions
    const scale = useRef(new Animated.Value(1.5)).current; // Set initial scale to 1.5 (50% zoom)
    const offsetX = useRef(new Animated.Value(0)).current; // Drag X position
    const offsetY = useRef(new Animated.Value(0)).current; // Drag Y position
    const lastOffsetX = useRef(0); // Store the last X position
    const lastOffsetY = useRef(0); // Store the last Y position

    const handlePathPress = () => {
        navigation.navigate('PathFind'); // Navigate to Pathfinding screen
    };

    const onPinchEvent = Animated.event(
        [{ nativeEvent: { scale } }],
        { useNativeDriver: true }
    );

    const onPanEvent = Animated.event(
        [{ nativeEvent: { translationX: offsetX, translationY: offsetY } }],
        { useNativeDriver: false }
    );

    const onPinchStateChange = (event) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // Prevent zoom out below 1.5 (prevent zoom out to 100%)
            Animated.spring(scale, {
                toValue: Math.max(1.5, scale.__getValue()), // Lock scale at a minimum of 1.5
                useNativeDriver: true,
            }).start();
        }
    };

    // Reset the position back to center when the pan gesture ends
    const onPanStateChange = (event) => {
        if (event.nativeEvent.state === State.END) {
            // Reset the offset values to 0 when the drag ends, so it returns to the center
            Animated.spring(offsetX, {
                toValue: 0,
                useNativeDriver: true,
            }).start();

            Animated.spring(offsetY, {
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    };

    const clampedOffsetX = Animated.add(lastOffsetX.current, offsetX).interpolate({
        inputRange: [-width, 0, width],
        outputRange: [-width, 0, width],
        extrapolate: 'clamp',
    });

    const clampedOffsetY = Animated.add(lastOffsetY.current, offsetY).interpolate({
        inputRange: [-height, 0, height],
        outputRange: [-height, 0, height],
        extrapolate: 'clamp',
    });

    const clampedScale = scale.interpolate({
        inputRange: [1, 3], // Limit the maximum scale (can be adjusted)
        outputRange: [1, 2],
        extrapolate: 'clamp',
    });

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />

            <PinchGestureHandler
                onGestureEvent={onPinchEvent}
                onHandlerStateChange={onPinchStateChange}
            >
                <Animated.View style={styles.imageContainer}>
                    <PanGestureHandler onGestureEvent={onPanEvent} onHandlerStateChange={onPanStateChange}>
                        <Animated.Image
                            source={require("../images/background v2.png")}
                            style={[
                                styles.placeholder,
                                {
                                    transform: [
                                        { scale: clampedScale }, // Apply zoom (scale)
                                        { translateX: clampedOffsetX }, // Apply clamped drag X
                                        { translateY: clampedOffsetY }, // Apply clamped drag Y
                                    ]
                                }
                            ]}
                            resizeMode="contain"
                        />
                    </PanGestureHandler>
                </Animated.View>
            </PinchGestureHandler>

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../assets/logo_red.png")}
                    style={styles.logo_header}
                />
                <Text style={styles.text}>UE Connect</Text>
            </View>

            {/* Buttons Side by Side */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
                    <Text style={styles.buttonText}>Find Path</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1} onPress={() => alert("Free Roam Button Pressed!")}>
                    <Text style={styles.buttonText}> 3D Map </Text>
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    button1: {
        width: '47%',
        height: 60,
        backgroundColor: '#DF4242',
        borderRadius: 30,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
        left: 7,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 50,
        width: '90%',
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 14,
    },
    header: {
        position: 'absolute',
        top: 0, 
        width: '100%',
        height: 120,
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row',
        paddingStart: 20,
        paddingBottom: 10,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.55)',
    },
    placeholder: {
        width: '100%',
        height: '100%',
    },
    text: {
        color: '#DF4242',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    logo_header: {
        width: 50,
        height: 50,
        marginEnd: 10
    }
});

export default WelcomeScreen;
