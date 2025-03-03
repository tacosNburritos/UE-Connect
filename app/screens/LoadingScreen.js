import React, { useEffect } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const LoadingScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Main'); // Navigate to Main Screen after 3 seconds
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>UE CONNECT</Text>
      <ActivityIndicator size="medium" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DF4242',
  },
  text: {
    marginBottom: 15,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LoadingScreen;
