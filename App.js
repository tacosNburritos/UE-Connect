import { StatusBar, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import PFScreen from './app/screens/PFScreen';
import EN1STFLOORScreen from './app/screens/EN1STFLOORScreen';
import EN2NDFLOORScreen from './app/screens/EN2NDFLOORScreen';
import EN3RDFLOORScreen from './app/screens/EN3RDFLOORScreen';
import EN4THFLOORScreen from './app/screens/EN4THFLOORScreen';
import TYK2NDFLOORScreen from './app/screens/TYK2NDFLOORScreen';
import TYK4THFLOORScreen from './app/screens/TYK4THFLOORScreen';
import TYK5THFLOORScreen from './app/screens/TYK5THFLOORScreen';
import TYK7THFLOORScreen from './app/screens/TYK7THFLOORScreen';



import UEScreen from './app/screens/UEScreen';


import OnBoardScreen from './app/screens/OnBoardScreen';
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Main" component={WelcomeScreen} />
        <Stack.Screen name="PathFind" component={PFScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EN1STFLOORScreen" component={EN1STFLOORScreen} />
        <Stack.Screen name="EN2NDFLOORScreen" component={EN2NDFLOORScreen} />
        <Stack.Screen name="EN3RDFLOORScreen" component={EN3RDFLOORScreen} />
        <Stack.Screen name="EN4THFLOORScreen" component={EN4THFLOORScreen} />
        <Stack.Screen name="TYK2NDFLOORScreen" component={TYK2NDFLOORScreen} />
        <Stack.Screen name="TYK4THFLOORScreen" component={TYK4THFLOORScreen} />
        <Stack.Screen name="TYK5THFLOORScreen" component={TYK5THFLOORScreen} />
        <Stack.Screen name="TYK7THFLOORScreen" component={TYK7THFLOORScreen} />
        <Stack.Screen name="UEScreen" component={UEScreen} />
        <Stack.Screen name="OnBoard" component={OnBoardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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