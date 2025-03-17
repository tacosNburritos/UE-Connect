import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';



function WelcomeScreen({ navigation }) {
    const handlePathPress = () => {
        navigation.navigate('PathFind'); // Navigate to Pathfinding screen
    };


    return(
        <SafeAreaView styles = {styles.container}>
            <StatusBar 
                barStyle="dark-content" // Use 'light-content' for white text/icons
                backgroundColor="transparent" // Set to transparent if you want the background to show through
                translucent={true} // Set to true if you want the status bar to be translucent
            />
        <>
         <ImageBackground
            source={require("../images/background.png")} 

            style={styles.placeholder}
            resizeMode="cover"
        >

        <View style={styles.header}>
            <Image 
                      source={require("../assets/logo_red.png")}
                      style={styles.logo_header}
                  />
            <Text style={styles.text}>UE Connect</Text>
        </View>

        {/* Buttons Side by Side with TouchableOpacity */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1} onPress={handlePathPress}>
                <Text style={styles.buttonText}>Find Path</Text>
            </TouchableOpacity>


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

        </>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    button1: {
        width: '47%',
        height: 60,
        backgroundColor: '#DF4242',
        borderRadius: 30,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
        left: 7,

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

    buttonText: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 14,
    },
    header: {
        width: '100%',
        height: '13%',
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
        height: '100%',
        width: '100%',
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
