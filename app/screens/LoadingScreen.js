import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, ImageBackground } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('OnBoard'); // Navigate to OnBoard Screen after 3 seconds
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={true} />
      
      <ImageBackground
        source={require('../images/NEW BG.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          <Image 
            source={require('../assets/ue_logo.png')}
            style={styles.logo}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '102%',
    height: '102%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  text: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default LoadingScreen;
