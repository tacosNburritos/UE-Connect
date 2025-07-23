// PFScreen.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { supabase } from '../lib/supabase';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [dropdownData, setDropdownData] = useState([]);
  const [buildingCoordinates, setBuildingCoordinates] = useState({});
  const [graph, setGraph] = useState({});
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
        "MALE COMFORT ROOM (CR) - LCT (3rd)",
        "MALE COMFORT ROOM (CR) - LCT (4th)",
        "MALE COMFORT ROOM (CR) - LCT (5th)",
        "MALE COMFORT ROOM (CR) - LCT (6th)",
        "MALE COMFORT ROOM (CR) - LCT (7th)",
        "MALE COMFORT ROOM (CR) - LCT (8th)",
    ]; // Your male CR options here (same as before)
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
        "FEMALE COMFORT ROOM (CR) - LCT (3rd)",
        "FEMALE COMFORT ROOM (CR) - LCT (4th)",
        "FEMALE COMFORT ROOM (CR) - LCT (5th)",
        "FEMALE COMFORT ROOM (CR) - LCT (6th)",
        "FEMALE COMFORT ROOM (CR) - LCT (7th)",
        "FEMALE COMFORT ROOM (CR) - LCT (8th)",
    ]; // Your female CR options here (same as before)

    if (selectedEnd === "NEAREST MALE CR") {
      const nearest = getNearestCR(startCoord, maleOptions);
      if (nearest) actualEnd = nearest;
      else return Alert.alert("Error", "Could not determine the nearest male CR.");
    } else if (selectedEnd === "NEAREST FEMALE CR") {
      const nearest = getNearestCR(startCoord, femaleOptions);
      if (nearest) actualEnd = nearest;
      else return Alert.alert("Error", "Could not determine the nearest female CR.");
    }

    const path = dijkstra(selectedStart, actualEnd);
    const startFloor = startCoord.floor;

    const screenMap = {
      2: 'EN2NDFLOORScreen',
      3: 'EN3RDFLOORScreen',
      4: 'EN4THFLOORScreen',
      5: 'UEScreen',
      6: 'TYK1STFLOORScreen',
      7: 'TYK2NDFLOORScreen',
      8: 'TYK3RDFLOORScreen',
      9: 'TYK4THFLOORScreen',
      10: 'TYK5THFLOORScreen',
      11: 'TYK6THFLOORScreen',
      12: 'TYK7THFLOORScreen',
      13: 'TYK8THFLOORScreen',
      14: 'TYK9THFLOORScreen',
      15: 'TYK10THFLOORScreen',
      17: 'LCT1STFLOORScreen',
      18: 'LCT2NDFLOORScreen',
      19: 'LCT3RDFLOORScreen',
      20: 'LCT4THFLOORScreen',
      21: 'LCT5THFLOORScreen',
      22: 'LCT6THFLOORScreen',
      23: 'LCT7THFLOORScreen',
      24: 'LCT8THFLOORScreen',
      25: 'OAFLOORScreen',
      26: 'HRMFLOORScreen',
    };

    navigation.navigate(screenMap[startFloor] || 'EN1STFLOORScreen', {
      path,
      buildingCoordinates,
    });
    console.log("🚀 Final path:", path);

  };

 useEffect(() => {
  const fetchGraph = async () => {
    try {
      const { data: locations, error: locError } = await supabase.from('locations').select('id, label, x, y, floor');
      if (locError) {
        console.error("❌ Error fetching locations:", locError);
        return;
      }

      console.log("✅ Fetched locations:", locations.length);

      const labelMap = {};
      const coordsMap = {};

      locations.forEach(loc => {
        labelMap[loc.id] = loc.label;
        coordsMap[loc.label] = { x: loc.x, y: loc.y, floor: loc.floor };
      });

      const { data: combinedConnections, error } = await supabase.from('connections').select('*');

      if (error) {
        console.error("❌ Error fetching connections:", error);
        return;
      }

      console.log("✅ Fetched connections:", combinedConnections.length);

      const graphMap = {};

      combinedConnections.forEach(conn => {
        const fromLabel = labelMap[conn.from_id];
        const toLabel = labelMap[conn.to_id];
        const weight = conn.weight || 1;

        if (!fromLabel || !toLabel) {
          console.warn("⚠️ Skipping connection with missing label:", conn);
          return;
        }

        if (!graphMap[fromLabel]) graphMap[fromLabel] = {};
        graphMap[fromLabel][toLabel] = weight;

        if (!graphMap[toLabel]) graphMap[toLabel] = {};
        graphMap[toLabel][fromLabel] = weight;
      });

      console.log("✅ Final graph node count:", Object.keys(graphMap).length);
      setGraph(graphMap);
    } catch (err) {
      console.error("❌ Unexpected error in fetchGraph:", err);
    }
  };

  fetchGraph();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo_red.png")} style={styles.logo_header} />
        <Text style={styles.text}>UE Connect</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Current Location</Text>
        <SelectList setSelected={setSelectedStart} data={dropdownData} save="value"
          placeholder="Select Location" boxStyles={{ backgroundColor: 'white', borderRadius: 30 }} />
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Destination</Text>
        <SelectList setSelected={setSelectedEnd} data={dropdownData} save="value"
          placeholder="Select Location" boxStyles={{ backgroundColor: 'white', borderRadius: 30 }} />
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
