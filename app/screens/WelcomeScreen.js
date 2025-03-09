import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity } from 'react-native';

function WelcomeScreen({ navigation }) { // Pass navigation prop

    const handlePathPress = () => {
        navigation.navigate('PathFind'); // Navigates to PFScreen
    };

    return(
        <>
         <ImageBackground
            source={require("../images/Placeholder.png")} 
            style={styles.placeholder}
        >
        <View style={styles.header}>
            <Text style={styles.text}>UE Connect</Text>
        </View>

        {/* Buttons Side by Side with TouchableOpacity */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
                <Text style={styles.buttonText}>Find Path</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => alert("Free Roam Button Pressed!")}>
                <Text style={styles.buttonText}>Free Roam</Text>
            </TouchableOpacity>
        </View>

        </ImageBackground>
        </>
    )
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
    button2: {
        width: '47%',
        height: 60,
        backgroundColor: '#DF4242',
        borderRadius: 30,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
        right: 7,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 45,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 14,
    },
    header: {
        width: '100%',
        height: 120,
        backgroundColor: '#DF4242',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        borderBottomEndRadius: 30,
        borderBottomStartRadius: 30,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    },
    placeholder: {
        height: '100%',
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WelcomeScreen;

