import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, StatusBar} from 'react-native';
import { ActivityIndicator, shadow } from 'react-native-paper';


const OnBoardScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main'); // Navigate to Main Screen after 3 seconds
    }, 3000);
  }, []);

  return (
      <SafeAreaView>
      <Text style={styles.text}>ikaw na bahala dito chelsea</Text>
      <ActivityIndicator size="medium" color="#ffffff" />
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  }
});

export default OnBoardScreen;