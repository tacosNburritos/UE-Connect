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

  const calculateDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) return Infinity;
    return Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.y - coord2.y, 2));
  };

  const getNearestCR = (startCoord, crOptions) => {
    let minDist = Infinity;
    let nearestCR = null;

    crOptions.forEach(cr => {
      const crCoord = buildingCoordinates[cr];
      if (crCoord && crCoord.floor === startCoord.floor) {
        const dist = calculateDistance(startCoord, crCoord);
        if (dist < minDist) {
          minDist = dist;
          nearestCR = cr;
        }
      }
    });

    return nearestCR;
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
    const startCoord = buildingCoordinates[selectedStart];

    if (!startCoord) {
      Alert.alert("Error", "Starting location data is missing.");
      return;
    }

    // Nearest Male CR
    if (selectedEnd === "NEAREST MALE CR") {
      const maleOptions = [
        "MALE COMFORT ROOM (CR) - LEFT WING",
        "MALE COMFORT ROOM (CR) - RIGHT WING",
        "MALE COMFORT ROOM (CR) - LEFT WING (2nd)",
        "MALE COMFORT ROOM (CR) - RIGHT WING (2nd)",
        "MALE COMFORT ROOM (CR) - LEFT WING (3rd)",
        "MALE COMFORT ROOM (CR) - RIGHT WING (3rd)",
        "MALE COMFORT ROOM (CR) - RIGHT WING (4th)",
        "MALE COMFORT ROOM (CR) - TYK1 (1st)",
        "MALE COMFORT ROOM (CR) - TYK2 (1st)",
        "MALE COMFORT ROOM (CR) - TYK (2nd)",
        "MALE COMFORT ROOM (CR) - TYK (3rd)",
        "MALE COMFORT ROOM (CR) - TYK (4th)",
        "MALE COMFORT ROOM (CR) - TYK (5th)",
        "MALE COMFORT ROOM (CR) - TYK (6th)",
        "MALE COMFORT ROOM (CR) - TYK (7th)",
        "MALE COMFORT ROOM (CR) - TYK (8th)",
        "MALE COMFORT ROOM (CR) - TYK (9th)",
        "MALE COMFORT ROOM (CR) - TYK (10th)",
        "MALE COMFORT ROOM (CR) - LCT (1st)",
        "MALE COMFORT ROOM (CR) - LCT (2nd)",


      ];

      const nearest = getNearestCR(startCoord, maleOptions);

      if (nearest) {
        actualEnd = nearest;
      } else {
        Alert.alert("Error", "Could not determine the nearest male CR.");
        return;
      }
    }

    // Nearest Female CR
    else if (selectedEnd === "NEAREST FEMALE CR") {
      const femaleOptions = [
        "FEMALE COMFORT ROOM (CR) - LEFT WING",
        "FEMALE COMFORT ROOM (CR) - RIGHT WING",
        "FEMALE COMFORT ROOM (CR) - LEFT WING (2nd)",
        "FEMALE COMFORT ROOM (CR) - RIGHT WING (2nd)",
        "FEMALE COMFORT ROOM (CR) - LEFT WING (3rd)",
        "FEMALE COMFORT ROOM (CR) - RIGHT WING (3rd)",
        "FEMALE COMFORT ROOM (CR) - RIGHT WING (4th)",
        "FEMALE COMFORT ROOM (CR) - TYK1 (1st)",
        "FEMALE COMFORT ROOM (CR) - TYK2 (1st)",
        "FEMALE COMFORT ROOM (CR) - TYK (2nd)",
        "FEMALE COMFORT ROOM (CR) - TYK (3rd)",
        "FEMALE COMFORT ROOM (CR) - TYK (4th)",
        "FEMALE COMFORT ROOM (CR) - TYK (5th)",
        "FEMALE COMFORT ROOM (CR) - TYK (6th)",
        "FEMALE COMFORT ROOM (CR) - TYK (8th)",
        "FEMALE COMFORT ROOM (CR) - TYK (9th)",
        "FEMALE COMFORT ROOM (CR) - TYK (10th)",
        "FEMALE COMFORT ROOM (CR) - LCT (1st)",
        "FEMALE COMFORT ROOM (CR) - LCT (2nd)",

      ];

      const nearest = getNearestCR(startCoord, femaleOptions);

      if (nearest) {
        actualEnd = nearest;
      } else {
        Alert.alert("Error", "Could not determine the nearest female CR.");
        return;
      }
    }

    const path = dijkstra(selectedStart, actualEnd);
    console.log("Path:", path);

    const startFloor = startCoord.floor;

    if (startFloor === 2) {
      navigation.navigate('EN2NDFLOORScreen', { path, buildingCoordinates });
    } else if (startFloor === 3) {
      navigation.navigate('EN3RDFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 4) {
      navigation.navigate('EN4THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 5) {
      navigation.navigate('UEScreen', { path, buildingCoordinates });
    }else if (startFloor === 6) {
      navigation.navigate('TYK1STFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 7) {
      navigation.navigate('TYK2NDFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 8) {
      navigation.navigate('TYK3RDFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 9) {
      navigation.navigate('TYK4THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 10) {
      navigation.navigate('TYK5THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 11) {
      navigation.navigate('TYK6THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 12) {
      navigation.navigate('TYK7THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 13) {
      navigation.navigate('TYK8THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 14) {
      navigation.navigate('TYK9THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 15) {
      navigation.navigate('TYK10THFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 16) {
      navigation.navigate('', { path, buildingCoordinates });
    }else if (startFloor === 17) {
      navigation.navigate('LCT1STFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 18) {
      navigation.navigate('LCT2NDFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 19) {
      navigation.navigate('LCT3RDFLOORScreen', { path, buildingCoordinates });
    }else if (startFloor === 20) {
      navigation.navigate('', { path, buildingCoordinates });
    }else if (startFloor === 21) {
      navigation.navigate('', { path, buildingCoordinates });
    }else if (startFloor === 22) {
      navigation.navigate('', { path, buildingCoordinates });
    }else if (startFloor === 23) {
      navigation.navigate('', { path, buildingCoordinates });
    }else if (startFloor === 24) {
      navigation.navigate('', { path, buildingCoordinates });
    }
    else {
      navigation.navigate('EN1STFLOORScreen', { path, buildingCoordinates });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo_red.png")} style={styles.logo_header} />
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

// --- styles remain unchanged
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
