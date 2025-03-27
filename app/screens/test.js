import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  
  //dropdown labels
  const dropdownData = [
    { key: '1', value: 'NEAREST MALE CR'},
    { key: '2', value: 'NEAREST FEMALE CR'},
    { key: '3', value: 'EN 101' },
    { key: '4', value: 'EN 118'},
    { key: '5', value: 'CAS Faculty Room' },
  ];

  //Room Coordinates
  const buildingCoordinates = {
    'EN 101': { x: 0.55, y: 0.93 },
    'EN 118': { x: 0.50, y: 0.06 },
    'MALE COMFORT ROOM (CR) - LEFT WING': { x: 0.24, y: 0.95 },
    'FEMALE COMFORT ROOM (CR) - LEFT WING': { x: 0.79, y: 0.96 },
    'CAS Faculty Room': { x: 0.32, y: 0.05 },
    'MALE COMFORT ROOM (CR) - RIGHT WING': { x: 0.29, y: 0.05 },

    //Hallway Nodes (not actual rooms) 
    'V': { x: 0.73, y: 0.92 },
    'U': { x: 0.54, y: 0.91 },
    'T': { x: 0.34, y: 0.90 },
    'T1': { x: 0.25, y: 0.9 },

    'A': { x: 0.55, y: 0.82 },
    'B': { x: 0.55, y: 0.75 },
    'C': { x: 0.55, y: 0.66 },
    'D': { x: 0.55, y: 0.58 },
    'E': { x: 0.55, y: 0.53 },
    'F': { x: 0.55, y: 0.43 },
    'G': { x: 0.55, y: 0.38 },
    'H': { x: 0.55, y: 0.32 },
    'I': { x: 0.55, y: 0.25 },
    'J': { x: 0.55, y: 0.16 },

    'X': { x: 0.27, y: 0.08 },
    'Y': { x: 0.55, y: 0.08 },
    
  };

  //connections (EN 1ST FLOOR)
  const graph = {
    'EN 101': { 'U': 1 },
    'EN 118': { 'Y': 1},

    
    'FEMALE COMFORT ROOM (CR) - LEFT WING': { 'V': 1,},
    'MALE COMFORT ROOM (CR) - LEFT WING': { 'T1': 1,},
    'CAS Faculty Room': { 'X': 1},
    
    'A': { 'EN 104': 1, 'ACCREDITATION ROOM': 1, 'U': 3, 'B': 2 },
    'B': { 'A': 2, 'Faculty Training & Briefing Room' : 1, 'C': 2},
    'C': { 'B': 2, 'D': 2,'Deans Office': 1, 'Fluid Mechanics & Hydraulics Room': 1,  'COE (Deans Office)': 1},
    'D': { 'C': 2, 'E': 2, 'COE (Deans Office)': 1, 'CE Tool Room': 1 },
    'E': { 'D': 2, 'F': 2, 'Structural Material & Testing Lab': 1, 'Soil Mechanics Laboratory': 1, 'EN 112': 1 },
    'F': { 'E': 2, 'G': 2, 'EN 113': 1 , 'EN 111B': 1},
    'G': { 'F': 2, 'H': 2, 'ME TOOL ROOM': 1, 'CE Faculty Room': 1 },
    'H': { 'G': 2, 'I': 2, 'ME Lab': 1, 'CPE Faculty Room': 1 },
    'I': { 'H': 2, 'J': 2, 'Y': 2, 'ECE Faculty Room': 1, 'Machine Fabrication Room': 1, 'EE Faculty Room': 1 },
    'J': { 'I': 2, 'ME Faculty Room': 1, 'Electrical Room': 1 },

    'T': { 'ACES PICE OFFICE': 1, 'U': 2, 'T1': 1 },
    'U': { 'EN 101': 1, 'EN 102': 1, 'EN 103': 1, 'T': 2, 'A': 3, 'V': 2 },
    'V': { 'FEMALE COMFORT ROOM (CR) - LEFT WING': 1, 'U': 2 },
    'T1': { 'T': 1, 'MALE COMFORT ROOM (CR) - LEFT WING': 1},
    
    'X': { 'CAS Faculty Room': 1, 'Y': 2 },
    'Y': { 'I': 2, 'X':2, 'EN 118': 1 },


  };

  const dijkstra = (start, end) =>{
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
    
    // If the user selects "NEAREST MALE CR" or "NEAREST FEMALE CR", map it to the correct location
    if (selectedEnd === "NEAREST MALE CR") {
      actualEnd = "MALE COMFORT ROOM (CR) - LEFT WING";
    } else if (selectedEnd === "NEAREST FEMALE CR") {
      actualEnd = "FEMALE COMFORT ROOM (CR) - LEFT WING";
    }
  
    
    const path = dijkstra(selectedStart, actualEnd);
    navigation.navigate('Map', { path, buildingCoordinates });
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
    marginEnd: 10
    
}
  });

export default PFScreen;