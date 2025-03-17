import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import { ActivityIndicator, shadow } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OnBoard'); // Navigate to Main Screen after 3 seconds
    }, 3000);
  }, []);

  return (
    <LinearGradient colors={['#8E0E00','#1F1C18']} style={styles.container} >
      <SafeAreaView>
      <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={true}/>
      <Image 
          source={require("../assets/ue_logo.png")}
          style={styles.logo}
      />
      <Text style={styles.text}>CONNECT</Text>
      <ActivityIndicator size="medium" color="#ffffff" />
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#DF4242',
  },
  logo:{
    width:200,
    height:160,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Android shadow property
    elevation: 5,
  },
  text: {
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default LoadingScreen;