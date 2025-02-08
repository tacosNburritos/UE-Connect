import {React, StyleSheet, ImageBackground, View, Image, Text, Button, TouchableOpacity} from 'react-native';


function WelcomeScreen() {
    return(
        <>
        <Image 
            source={require("../assets/ue_logo.png")}
            style={{ width: 200, height: 160, }}
        />
        <Text style={styles.text}>Connect</Text>
        </>        
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 45
    }
});

export default WelcomeScreen;   