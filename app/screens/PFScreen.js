import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [dropdownData, setDropdownData] = useState([
    { key: '1', value: 'TYK Building' },
    { key: '2', value: 'Engineering Building (EN)' },
    { key: '3', value: 'LCT Building' },
  ]);

  const graph = {
    'TYK Building': { 'Engineering Building (EN)': 2, 'LCT Building': 2 },
    'Engineering Building (EN)': { 'TYK Building': 2, 'LCT Building': 1 },
    'LCT Building': { 'Engineering Building (EN)': 1, 'TYK Building': 2 },
  };

  const dijkstra = (start, end) => {
    let distances = {};
    let visited = {};
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
      visited[current] = true;
    }

    let path = [];
    let current = end;
    while (current) {
      path.unshift(current);
      current = previous[current];
    }
    return { path, distance: distances[end] };
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

    const result = dijkstra(selectedStart, selectedEnd);
    Alert.alert("Shortest Path", `Path: ${result.path.join(" -> ")}\nDistance: ${result.distance}`);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text}>UE Connect</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Current Location</Text>
        <SelectList
          setSelected={setSelectedStart}
          data={dropdownData}
          save="value"
          placeholder="Select Location"
          boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Destination</Text>
        <SelectList
          setSelected={setSelectedEnd}
          data={dropdownData}
          save="value"
          placeholder="Select Location"
          boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
        />
      </View>

      <View>
        <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={handleGoBack}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Free Roam</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchbutton: {
    marginTop: 45,
    width: '47%',
    height: 60,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    left: 210,
  },
  dropdownContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#DF4242',
    paddingLeft: 10,
  },
  button1: {
    width: '47%',
    height: 60,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    left: 7,
  },
  button2: {
    width: '47%',
    height: 60,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    right: 7,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 45,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 14,
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PFScreen;