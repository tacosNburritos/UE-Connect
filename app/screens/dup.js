import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  const [currentLocation, setCurrentLocation] = useState("");
  const [destination, setDestination] = useState("");

  const dropdownData = [
    { key: '1', value: 'TYK Building' },
    { key: '2', value: 'Engineering Building (EN)' },
    { key: '3', value: 'LCT Building' },
  ];

  const graph = {
    'TYK Building': { 'Engineering Building (EN)': 1 },
    'Engineering Building (EN)': { 'LCT Building': 1 },
    'LCT Building': { 'TYK Building': 3 }
  };

  const dijkstra = (start, end) => {
    let distances = {};
    let visited = {};
    let queue = {};

    // Initialize distances and queue
    for (let node in graph) {
      distances[node] = Infinity;
      queue[node] = graph[node];
    }
    distances[start] = 0;

    while (Object.keys(queue).length > 0) {
      let minNode = Object.keys(queue).reduce((a, b) => (distances[a] < distances[b] ? a : b));

      if (minNode === end) {
        break;
      }

      for (let neighbor in graph[minNode]) {
        let distance = distances[minNode] + graph[minNode][neighbor];
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
        }
      }
      visited[minNode] = true;
      delete queue[minNode];
    }

    return distances[end];
  };

  const handleSearch = () => {
    if (currentLocation === "" || destination === "") {
      Alert.alert("Error", "Please select both Current Location and Destination");
      return;
    }
    if (currentLocation === destination) {
      Alert.alert("Info", "You are already at your destination");
      return;
    }

    const shortestPath = dijkstra(currentLocation, destination);
    Alert.alert("Shortest Path Found", `The shortest distance from ${currentLocation} to ${destination} is ${shortestPath}`);
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text}>UE Connect</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Current Location</Text>
        <SelectList
          setSelected={setCurrentLocation}
          data={dropdownData}
          save="value"
          placeholder="Select Location"
          boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
        />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Destination</Text>
        <SelectList
          setSelected={setDestination}
          data={dropdownData}
          save="value"
          placeholder="Select Location"
          boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
        />
      </View>

      <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>

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
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    width: '100%',
    height: 120,
    backgroundColor: '#DF4242',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    borderRadius: 30,
  },
});

export default PFScreen;
