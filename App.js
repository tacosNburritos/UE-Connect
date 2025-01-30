import { StatusBar, StyleSheet, Text, View, Button, SafeAreaView, Platform} from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <SafeAreaView style={[styles.container ]}>
      <StatusBar backgroundColor="grey" barStyle="light-content" translucent={true}/>
      <WelcomeScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
