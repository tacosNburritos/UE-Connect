import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'react-native-paper';

const OnBoardScreen = ({ navigation }) => {
  const swiperRef = useRef(null);
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const value = await AsyncStorage.getItem('onboardingShown');
      if (value === 'true') {
        navigation.replace('Main');
      }
    };
    checkOnboardingStatus();
  }, [navigation]);

  const handleGetStarted = async () => {
    if (doNotShowAgain) {
      await AsyncStorage.setItem('onboardingShown', 'true');
    }
    navigation.replace('Main');
  };

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
          <Image source={require('../images/slide1.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Navigate the Campus</Text>
          <Text style={styles.subtitle}>Explore the University of the East Caloocan campus with ease.</Text>
        </View>

        {/* Slide 2 */}
        <View style={styles.slide}>
          <Image source={require('../images/slide2.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Set Your Location</Text>
          <Text style={styles.subtitle}>Select where you are, and we'll guide you to your destination.</Text>
        </View>

        {/* Slide 3 */}
        <View style={styles.slide}>
          <Image source={require('../images/slide3.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>Follow Step-by-Step Directions</Text>
          <Text style={styles.subtitle}>Get clear and accurate directions to classrooms, offices, and more.</Text>

          {/* Get Started Button */}
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>

          {/* Do Not Show Again Checkbox */}
          <View style={styles.checkboxWrapper}>
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setDoNotShowAgain(!doNotShowAgain)}
              activeOpacity={0.7}
            >
              <Checkbox
                status={doNotShowAgain ? 'checked' : 'unchecked'}
                onPress={() => setDoNotShowAgain(!doNotShowAgain)}
                color="#8E0E00"
              />
              <Text style={styles.checkboxText}>Do not show again</Text>
            </TouchableOpacity>
          </View>
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
  checkboxWrapper: {
    marginTop: 30, // Increased spacing to lower the checkbox
    alignItems: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxText: {
    color: '#8E0E00',
    fontSize: 14,
    fontWeight: '400',
  },
});

export default OnBoardScreen;
