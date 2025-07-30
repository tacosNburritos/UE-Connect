import React from 'react';
import { ImageBackground, StyleSheet, Image, Text, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native';

function WelcomeScreen({ navigation }) {
    const { width, height } = Dimensions.get('window'); // You can remove if not used elsewhere

    const handlePathPress = () => {
        navigation.navigate('PathFind');
    };

    const handleRoamPress = () => {
        navigation.navigate('LoginScreen');
    };

    return (
        <View style={{ flex: 1 }}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent={true}
            />
            <ImageBackground
                source={require('../images/NEW BG.png')}
                style={styles.background}
                resizeMode="cover"
            ></ImageBackground>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../images/background v2.png")}
                    style={styles.placeholder}
                    resizeMode="cover"
                />
            </View>

            {/* Header */}
            <View style={styles.header}>
                <Image
                    source={require("../assets/ue_logo.png")}
                    style={styles.logo_header}
                />
                <Text style={styles.text}>UE Connect</Text>
            </View>

            {/* Buttons Side by Side */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
                    <Text style={styles.buttonText}>Find Path</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button1} onPress={handleRoamPress}>
                    <Text style={styles.buttonText}> Admin Panel </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button1: {
        width: '47%',
        height: 60,
        backgroundColor: '#b51509',
        borderRadius: 30,
        left: 7,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.55)',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'left',
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
    backgroundColor: '#b51509',
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
    logo_header: {
        width: 50,
        height: 50,
        marginEnd: 10
    },
    imageContainer: {
        flex: 1,
    }
});

export default WelcomeScreen;
