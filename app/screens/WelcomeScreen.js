import React from 'react';
import { StyleSheet, ImageBackground, View, Text, TouchableOpacity, Image, SafeAreaView, Platform, StatusBar } from 'react-native';



function WelcomeScreen({ navigation }) { // Pass navigation prop

    const handlePathPress = () => {
        navigation.navigate('PathFind'); // Navigates to PFScreen
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

            <TouchableOpacity style={styles.button2} onPress={() => alert("Free Roam Button Pressed!")}>
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

