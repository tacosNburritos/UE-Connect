import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  
  const dropdownData = [
    { key: '1', value: 'EN 101' },
    { key: '2', value: 'EN 102' },
    { key: '3', value: 'EN 103' },
    { key: '4', value: 'EN 104' }, // Trippings muna to
    { key: '5', value: 'ACCREDITATION ROOM' },
  ];

  const buildingCoordinates = {
    'EN 101': { x: 0.55, y: 0.93 },
    'EN 102': { x: 0.45, y: 0.93 }, 
    'EN 103': { x: 0.8, y: 0.75 }, 
    'EN 104': { x: 0.45, y: 0.82 },
    'ACCREDITATION ROOM': { x: 0.60, y: 0.82 },
    'U': { x: 0.54, y: 0.9 },
    'A': { x: 0.54, y: 0.82 },
  };

  const graph = {
    'EN 101': { 'U': 1 },
    'EN 102': { 'U': 1 },
    'EN 103': { 'U': 1 },
    'EN 104': { 'A': 1,},
    'ACCREDITATION ROOM': { 'A': 1,},
    'LEFT FEMALE CR': { 'V': 1,},
    'LEFT FEMALE FACULTY CR': { 'V': 1,},
    'LEFT MALE CR': { 'T': 1,},
    'LEFT MALE FACULTY CR': { 'T': 1,},
    'ACES PICE OFFICE': { 'T': 1,},
    'A': { 'EN 104': 1, 'ACCREDITATION ROOM': 1, 'U': 3 },
    'T': { 'LEFT MALE CR': 1, 'LEFT MALE FACULTY CR': 1, 'ACES PICE OFFICE': 1, 'U': 2 },
    'U': { 'EN 101': 1, 'EN 102': 1, 'EN 103': 1, 'T': 2, 'A': 3, 'V': 2 },
  };

  const dijkstra = (start, end) => {
    let distances = {};
    let previous = {};
    let nodes = Object.keys(graph);
    
    nodes.forEach(node => {
      distances[node] = Infinity;
      previous[node] = null;
    });
    distances[start] = 0;
    
    while (nodes.length > 0) {
      nodes.sort((a, b) => distances[a] - distances[b]);
      let current = nodes.shift();
      if (current === end) break;
      if (!graph[current]) continue;

      for (let neighbor in graph[current]) {
        let distance = distances[current] + graph[current][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previous[neighbor] = current;
        }
      }
    }
    
    let path = [];
    let current = end;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }
    return path;
  };

  const handleSearch = () => {
    if (!selectedStart || !selectedEnd) {
      Alert.alert("Error", "Please select both locations");
      return;
    }
    if (selectedStart === selectedEnd) {
      Alert.alert("Error", "Current Location and Destination cannot be the same");
      return;
    }
    const path = dijkstra(selectedStart, selectedEnd);
    navigation.navigate('Map', { path, buildingCoordinates });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>UE Connect</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Current Location</Text>
        <SelectList setSelected={setSelectedStart} data={dropdownData} save="value" placeholder="Select Location" boxStyles={{ backgroundColor: 'white', borderRadius: 30 }} />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Destination</Text>
        <SelectList setSelected={setSelectedEnd} data={dropdownData} save="value" placeholder="Select Location" boxStyles={{ backgroundColor: 'white', borderRadius: 30 }} />
      </View>

      <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>      

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleGoBack}>
          <Text style={styles.buttonText1}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText1}>Free Roam</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbutton: {
    marginTop: 30,
    alignSelf: 'center',
    width: '47%',
    height: 50,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DF4242',
    paddingLeft: 10,
  },
  mapContainer: {
    marginTop: 20,
    width: '100%',
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  map: {
    width: '90%',
    height: '100%',
    resizeMode: 'contain',
  },
  svgOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: '#DF4242',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 45,
    width: '100%',
},
  button1: {
    width: '47%',
    height: 60,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    left: 7,
    bottom: 12,
  },
  button2: {
      width: '47%',
      height: 60,
      backgroundColor: '#DF4242',
      borderRadius: 30,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
      right: 7,
      bottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  buttonText1: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 14,
  },
  });

export default PFScreen;