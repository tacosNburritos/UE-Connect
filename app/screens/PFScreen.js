import React from 'react'; // Fixed import without curly braces
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

function PFScreen({ navigation }) { // Receive navigation prop

    const handleGoBack = () => {
        navigation.navigate('Main'); // Navigates back to WelcomeScreen
    };

    return(
        <>
        <View style={styles.header}>
            <TouchableOpacity style={styles.button0} onPress={handleGoBack}>
                <Text style={styles.text}>UE Connect</Text>
            </TouchableOpacity>
        </View>

        {/* Buttons Side by Side */}
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button1}>
                <Text style={styles.buttonText}>Find Path</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText}>Free Roam</Text>
            </TouchableOpacity>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    button0: {
        top: 35,
        width: '100%', 
        height: '100%', 
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 120,
        backgroundColor: '#DF4242',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        borderRadius: 30,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PFScreen;
