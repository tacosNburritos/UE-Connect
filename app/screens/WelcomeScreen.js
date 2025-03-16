import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity } from 'react-native';

function WelcomeScreen({ navigation }) {
    const handlePathPress = () => {
        navigation.navigate('PathFind'); // Navigate to Pathfinding screen
    };

    return (
        <ImageBackground
            source={require("../images/Placeholder.png")}
            style={styles.placeholder}
            resizeMode="cover"
        >
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.text}>UE Connect</Text>
            </View>

            {/* Buttons Side by Side */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePathPress}>
                    <Text style={styles.buttonText}>Find Path</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => alert("Free Roam Button Pressed!")}>
                    <Text style={styles.buttonText}>Free Roam</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        height: 140,
        backgroundColor: '#8E0E00',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 20,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Android shadow
        elevation: 8,
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
        bottom: 60,
        width: '90%',
        alignSelf: 'center',
    },
    button: {
        width: '45%',
        height: 60,
        backgroundColor: '#8E0E00',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // iOS shadow
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        // Android shadow
        elevation: 8,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WelcomeScreen;
