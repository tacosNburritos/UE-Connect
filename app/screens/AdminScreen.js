import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';

export default function AdminScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../images/NEW BG.png')}
      style={styles.background}
      resizeMode="cover"
    >
        <View style={styles.header}>
            <Image
                source={require("../assets/ue_logo.png")}
                    style={styles.logo_header}
                    />
            <Text style={styles.text}>UE Connect</Text>
        </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                  <Text style={styles.backText}>← Back</Text>
                </TouchableOpacity>
      <View style={styles.container}>

        <TouchableOpacity
          style={styles.fullWidthButton}
          onPress={() => navigation.navigate('NewAdmin')}
        >
          <Text style={styles.buttonText}>Make New Admin</Text>
        </TouchableOpacity>

        <View style={styles.rowButtons}>
          <TouchableOpacity
            style={styles.halfWidthButton}
            onPress={() => navigation.navigate('EditRoom')}
          >
            <Text style={styles.buttonText}>Configure Rooms</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.halfWidthButton}
            onPress={() => navigation.navigate('ViewScreen')}
          >
            <Text style={styles.buttonText}>View Rooms</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '102%',
  },
  container: {
    flex: 0.9,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  fullWidthButton: {
    backgroundColor: 'rgba(255, 248, 247, 0.7)',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidthButton: {
    backgroundColor: 'rgba(255, 248, 247, 0.7)',
    flex: 0.48,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b51509',
  },
  logo_header: {
    width: 50,
    height: 50,
    marginEnd: 10,
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: '#fff8f7',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingStart: 20,
    paddingBottom: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.55)',
  },
  text: {
    color: '#b51509',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  backButton: {
    position: 'absolute',
    top: 140,
    left: 24,
  },
  backText: {
    fontSize: 18,
    color: '#fff8f7',
  },
});
