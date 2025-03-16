import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';

const OnBoardScreen = ({ navigation }) => {
  const swiperRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#8E0E00" barStyle="light-content" />
      <Swiper
        ref={swiperRef}
        loop={false}
        activeDotColor="#8E0E00"
        dotColor="#ccc"
        showsButtons={false}
        style={styles.wrapper}
      >
        {/* Slide 1 */}
        <View style={styles.slide}>
          <Image source={require('../assets/ue_logo.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Navigate the Campus</Text>
          <Text style={styles.subtitle}>Explore the University of the East Caloocan campus with ease.</Text>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <Image source={require('../assets/ue_logo.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Set Your Location</Text>
          <Text style={styles.subtitle}>Select where you are, and we'll guide you to your destination.</Text>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <Image source={require('../assets/ue_logo.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Follow Step-by-Step Directions</Text>
          <Text style={styles.subtitle}>Get clear and accurate directions to classrooms, offices, and more.</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.replace('Main')}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8E0E00',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#8E0E00',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OnBoardScreen;
