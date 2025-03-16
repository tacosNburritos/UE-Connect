import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const [pathResult, setPathResult] = useState([]); // Store computed path as points

  const dropdownData = [
    { key: '1', value: 'EN 101' },
    { key: '2', value: 'EN 102' },
    { key: '3', value: 'EN 103' },
  ];

  // Define static coordinates for buildings on the map (x, y)
  const buildingCoordinates = {
    'EN 101': { x: 500, y: 760 },
    'EN 102': { x: 320, y: 750 },
    'EN 103': { x: 370, y: 700 },
    'U': { x: 430, y: 720 },

  };

  // Graph representation
  const graph = {
    'EN 101': { 'U': 1},
    'EN 102': { 'U': 1},
    'EN 103': { 'U': 1},
    'U': { 'EN 101': 1, 'EN 102': 1, 'EN 103': 1},
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
    setPathResult(path);
  
    navigation.navigate('Map', { path, buildingCoordinates });
  };
  

  return (
    <View style={styles.container}>
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
