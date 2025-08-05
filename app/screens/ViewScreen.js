import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const ViewScreen = ({ navigation }) => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');

  const buildingOptions = [
    { key: 'EN', value: 'EN' },
    { key: 'LCT', value: 'LCT' },
    { key: 'HRM', value: 'HRM' },
    { key: 'OA', value: 'OA' },
    { key: 'TYK', value: 'TYK' },
    { key: 'UE', value: 'UE' },
  ];

  const buildingFloors = {
    EN: 4,
    LCT: 8,
    TYK: 10,
    HRM: 1,
    OA: 1,
    UE: 1,
  };

  const getFloorOptions = () => {
    const count = buildingFloors[selectedBuilding] || 0;
    return Array.from({ length: count }, (_, i) => ({
      key: `Floor ${i + 1}`,
      value: `Floor ${i + 1}`,
    }));
  };

  const handlePresent = () => {
    if (!selectedBuilding || !selectedFloor) {
      Alert.alert('Incomplete', 'Please select both building and floor.');
      return;
    }

    const screenMap = {
      'EN-Floor 1': 'EN1STFLOORScreen',
      'EN-Floor 2': 'EN2NDFLOORScreen',
      'EN-Floor 3': 'EN3RDFLOORScreen',
      'EN-Floor 4': 'EN4THFLOORScreen',
      'HRM-Floor 1': 'HRMFLOORScreen',
      'OA-Floor 1': 'OAFLOORScreen',
      'UE-Floor 1': 'UEScreen',
      'TYK-Floor 1': 'TYK1STFLOORScreen',
      'TYK-Floor 2': 'TYK2NDFLOORScreen',
      'TYK-Floor 3': 'TYK3RDFLOORScreen',
      'TYK-Floor 4': 'TYK4THFLOORScreen',
      'TYK-Floor 5': 'TYK5THFLOORScreen',
      'TYK-Floor 6': 'TYK6THFLOORScreen',
      'TYK-Floor 7': 'TYK7THFLOORScreen',
      'TYK-Floor 8': 'TYK8THFLOORScreen',
      'TYK-Floor 9': 'TYK9THFLOORScreen',
      'TYK-Floor 10': 'TYK10THFLOORScreen',
      'LCT-Floor 1': 'LCT1STFLOORScreen',
      'LCT-Floor 2': 'LCT2NDFLOORScreen',
      'LCT-Floor 3': 'LCT3RDFLOORScreen',
      'LCT-Floor 4': 'LCT4THFLOORScreen',
      'LCT-Floor 5': 'LCT5THFLOORScreen',
      'LCT-Floor 6': 'LCT6THFLOORScreen',
      'LCT-Floor 7': 'LCT7THFLOORScreen',
      'LCT-Floor 8': 'LCT8THFLOORScreen',
    };

    const key = `${selectedBuilding}-${selectedFloor}`;
    const screenName = screenMap[key];

    if (screenName) {
      navigation.navigate(screenName);
    } else {
      Alert.alert('Coming Soon', `No screen defined for ${key}`);
    }
  };

  const handleBack = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Screen</Text>

      <Text style={styles.label}>Building</Text>
      <SelectList
        setSelected={setSelectedBuilding}
        data={buildingOptions}
        placeholder="Select a building"
        save="value"
        boxStyles={styles.dropdown}
      />

      <Text style={styles.label}>Floor</Text>
      <SelectList
        setSelected={setSelectedFloor}
        data={getFloorOptions()}
        placeholder="Select a floor"
        save="value"
        boxStyles={styles.dropdown}
        disabled={!selectedBuilding}
      />

      <TouchableOpacity style={styles.button} onPress={handlePresent}>
        <Text style={styles.buttonText}>Present</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  dropdown: {
    borderColor: '#ccc',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    borderRadius: 6,
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#333',
    textAlign: 'center',
    fontSize: 16,
  },
});
