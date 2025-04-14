import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { dropdowndata, buildingCoordinates, graph } from '../screens/MapData';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");

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

    let actualEnd = selectedEnd;

    // Determine the nearest male CR
    if (selectedEnd === "NEAREST MALE CR") {
      const startCoord = buildingCoordinates[selectedStart];
      const leftWingCoord = buildingCoordinates['MALE COMFORT ROOM (CR) - LEFT WING'];
      const rightWingCoord = buildingCoordinates['MALE COMFORT ROOM (CR) - RIGHT WING'];

      if (startCoord && leftWingCoord && rightWingCoord) {
        const distLeft = calculateDistance(startCoord, leftWingCoord);
        const distRight = calculateDistance(startCoord, rightWingCoord);

        actualEnd = distRight < distLeft - 0.1 ? 
                    "MALE COMFORT ROOM (CR) - RIGHT WING" : 
                    "MALE COMFORT ROOM (CR) - LEFT WING";
      } else {
        Alert.alert("Error", "Could not determine the nearest male CR.");
        return;
      }
    } 
    
    // Nearest female CR
    else if (selectedEnd === "NEAREST FEMALE CR") {
      const startCoord = buildingCoordinates[selectedStart];
      const leftWingCoord = buildingCoordinates['FEMALE COMFORT ROOM (CR) - LEFT WING'];
      const rightWingCoord = buildingCoordinates['FEMALE COMFORT ROOM (CR) - RIGHT WING'];

      if (startCoord && leftWingCoord && rightWingCoord) {
        const distLeft = calculateDistance(startCoord, leftWingCoord);
        const distRight = calculateDistance(startCoord, rightWingCoord);

        actualEnd = distRight < distLeft - 0.1 ?
                    "FEMALE COMFORT ROOM (CR) - RIGHT WING" :
                    "FEMALE COMFORT ROOM (CR) - LEFT WING";
      } else {
        Alert.alert("Error", "Could not determine the nearest female CR.");
        return;
      }
    }

    // Run pathfinding
    const path = dijkstra(selectedStart, actualEnd);
    console.log("Path:", path);

    // Determine the starting floor and navigate accordingly
    const startFloor = buildingCoordinates[selectedStart]?.floor;

    if (startFloor === 2) {
      navigation.navigate('EN2NDFLOORScreen', { path, buildingCoordinates });
    } else {
      navigation.navigate('EN1STFLOORScreen', { path, buildingCoordinates });
    }
  };

  const calculateDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) return Infinity;
    return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image 
                source={require("../assets/logo_red.png")}
                style={styles.logo_header}
            />
            <Text style={styles.text}>UE Connect</Text>
        </View>

        <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Select Current Location</Text>
            <SelectList 
                setSelected={setSelectedStart} 
                data={dropdowndata} 
                save="value" 
                placeholder="Select Location" 
                boxStyles={{ backgroundColor: 'white', borderRadius: 30 }} 
            />
        </View>

        <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Select Destination</Text>
            <SelectList 
                setSelected={setSelectedEnd} 
                data={dropdowndata} 
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
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 50,
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
  logo_header: {
    width: 50,
    height: 50,
    marginEnd: 10,
  },
});

export default PFScreen;