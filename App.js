import { StatusBar, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoadingScreen from './app/screens/LoadingScreen';
import PFScreen from './app/screens/PFScreen';
import ViewScreen from './app/screens/ViewScreen';
import AdminScreen from './app/screens/AdminScreen';
import NewAdmin from './app/screens/NewAdmin';
import EN1STFLOORScreen from './app/screens/EN1STFLOORScreen';
import EN2NDFLOORScreen from './app/screens/EN2NDFLOORScreen';
import EN3RDFLOORScreen from './app/screens/EN3RDFLOORScreen';
import EN4THFLOORScreen from './app/screens/EN4THFLOORScreen';
import TYK1STFLOORScreen from './app/screens/TYK1STFLOORScreen';
import TYK2NDFLOORScreen from './app/screens/TYK2NDFLOORScreen';
import TYK3RDFLOORScreen from './app/screens/TYK3RDFLOORScreen';
import TYK4THFLOORScreen from './app/screens/TYK4THFLOORScreen';
import TYK5THFLOORScreen from './app/screens/TYK5THFLOORScreen';
import TYK6THFLOORScreen from './app/screens/TYK6THFLOORScreen';
import TYK7THFLOORScreen from './app/screens/TYK7THFLOORScreen';
import TYK8THFLOORScreen from './app/screens/TYK8THFLOORScreen';
import TYK9THFLOORScreen from './app/screens/TYK9THFLOORScreen';
import TYK10THFLOORScreen from './app/screens/TYK10THFLOORScreen';
import LCT1STFLOORScreen from './app/screens/LCT1STFLOORScreen';
import LCT2NDFLOORScreen from './app/screens/LCT2NDFLOORScreen';
import LCT3RDFLOORScreen from './app/screens/LCT3RDFLOORScreen';
import LCT4THFLOORScreen from './app/screens/LCT4THFLOORScreen';
import LCT5THFLOORScreen from './app/screens/LCT5THFLOORScreen';
import LCT6THFLOORScreen from './app/screens/LCT6THFLOORScreen';
import LCT7THFLOORScreen from './app/screens/LCT7THFLOORScreen';
import LCT8THFLOORScreen from './app/screens/LCT8THFLOORScreen';
import OAFLOORScreen from './app/screens/OAFLOORScreen';
import HRMFLOORScreen from './app/screens/HRMFLOORScreen';
import LoginScreen from './app/screens/LoginScreen';
import EditRoom from './app/screens/EditRoom';

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
        <Stack.Screen name="ViewScreen" component={ViewScreen} options={{ headerShown: false }} />
        <Stack.Screen name="NewAdmin" component={NewAdmin} options={{ headerShown: false }} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditRoom" component={EditRoom} options={{ headerShown: false }} />
        <Stack.Screen name="EN1STFLOORScreen" component={EN1STFLOORScreen} />
        <Stack.Screen name="EN2NDFLOORScreen" component={EN2NDFLOORScreen} />
        <Stack.Screen name="EN3RDFLOORScreen" component={EN3RDFLOORScreen} />
        <Stack.Screen name="EN4THFLOORScreen" component={EN4THFLOORScreen} />
        <Stack.Screen name="TYK1STFLOORScreen" component={TYK1STFLOORScreen} />
        <Stack.Screen name="TYK2NDFLOORScreen" component={TYK2NDFLOORScreen} />
        <Stack.Screen name="TYK3RDFLOORScreen" component={TYK3RDFLOORScreen} />
        <Stack.Screen name="TYK4THFLOORScreen" component={TYK4THFLOORScreen} />
        <Stack.Screen name="TYK5THFLOORScreen" component={TYK5THFLOORScreen} />
        <Stack.Screen name="TYK6THFLOORScreen" component={TYK6THFLOORScreen} />
        <Stack.Screen name="TYK7THFLOORScreen" component={TYK7THFLOORScreen} />
        <Stack.Screen name="TYK8THFLOORScreen" component={TYK8THFLOORScreen} />
        <Stack.Screen name="TYK9THFLOORScreen" component={TYK9THFLOORScreen} />
        <Stack.Screen name="TYK10THFLOORScreen" component={TYK10THFLOORScreen} />
        <Stack.Screen name="LCT1STFLOORScreen" component={LCT1STFLOORScreen} />
        <Stack.Screen name="LCT2NDFLOORScreen" component={LCT2NDFLOORScreen} />
        <Stack.Screen name="LCT3RDFLOORScreen" component={LCT3RDFLOORScreen} />
        <Stack.Screen name="LCT4THFLOORScreen" component={LCT4THFLOORScreen} />
        <Stack.Screen name="LCT5THFLOORScreen" component={LCT5THFLOORScreen} />
        <Stack.Screen name="LCT6THFLOORScreen" component={LCT6THFLOORScreen} />
        <Stack.Screen name="LCT7THFLOORScreen" component={LCT7THFLOORScreen} />
        <Stack.Screen name="LCT8THFLOORScreen" component={LCT8THFLOORScreen} />
        <Stack.Screen name="OAFLOORScreen" component={OAFLOORScreen} />
        <Stack.Screen name="HRMFLOORScreen" component={HRMFLOORScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />

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