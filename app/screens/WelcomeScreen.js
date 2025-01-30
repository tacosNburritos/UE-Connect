import {React, StyleSheet, ImageBackground, View, Image, Text, Button, TouchableOpacity} from 'react-native';

function WelcomeScreen() {
    return(
        <>
        <Text style={styles.text}>Testing for Unity Integration.</Text>
        <TouchableOpacity style={styles.button} onPress={() => alert('Button Clicked')}>
                <Text style={styles.buttonText}>Button for UNITY.</Text> 
        </TouchableOpacity>
        </>        
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'lightblue',
        fontStyle: 'italic',
    },
    button: {
        backgroundColor: 'grey',
        padding: 0,
        borderRadius: 0,
        margin: 10,
    },
    buttonText: {
        color: 'white',
    },
});

export default WelcomeScreen;   