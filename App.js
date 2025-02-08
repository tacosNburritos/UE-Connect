import { StatusBar, StyleSheet, Text, View, Button, SafeAreaView, Platform} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <LinearGradient style={[styles.container]} colors={['#8E0E00','#1F1C18']}>
    <SafeAreaView >
      <StatusBar backgroundColor="#8E0E00" barStyle="light-content" translucent={true}/>
      <WelcomeScreen />
    </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
