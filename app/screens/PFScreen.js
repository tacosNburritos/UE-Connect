import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { supabase } from '../lib/supabase';

function PFScreen({ navigation }) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [selectedFilter, setSelectedFilter] = useState('ALL');

  // separate sources and dropdowns
  const [allLocationOptions, setAllLocationOptions] = useState([]);   // sorted locations only
  const [endBaseOptions, setEndBaseOptions] = useState([]);           // CR options + sorted locations
  const [startDropdownData, setStartDropdownData] = useState([]);     // filtered for start (no CR)
  const [endDropdownData, setEndDropdownData] = useState([]);         // filtered for end (with CR)

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
    ];
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
      "FEMALE COMFORT ROOM (CR) - TYK (7th)",
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
    ];

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
      2: 'EN2NDFLOORScreen', 3: 'EN3RDFLOORScreen', 4: 'EN4THFLOORScreen',
      5: 'UEScreen',
      6: 'TYK1STFLOORScreen', 7: 'TYK2NDFLOORScreen', 8: 'TYK3RDFLOORScreen', 9: 'TYK4THFLOORScreen', 10: 'TYK5THFLOORScreen',
      11: 'TYK6THFLOORScreen', 12: 'TYK7THFLOORScreen', 13: 'TYK8THFLOORScreen', 14: 'TYK9THFLOORScreen', 15: 'TYK10THFLOORScreen',
      17: 'LCT1STFLOORScreen', 18: 'LCT2NDFLOORScreen', 19: 'LCT3RDFLOORScreen', 20: 'LCT4THFLOORScreen', 21: 'LCT5THFLOORScreen',
      22: 'LCT6THFLOORScreen', 23: 'LCT7THFLOORScreen', 24: 'LCT8THFLOORScreen',
      25: 'OAFLOORScreen',
      26: 'HRMFLOORScreen',
    };

    navigation.navigate(screenMap[startFloor] || 'EN1STFLOORScreen', {
      path,
      buildingCoordinates,
    });
    console.log("Final path:", path);
  };

  // Filter both dropdowns whenever filter/coords/base lists change
  useEffect(() => {
    const applyFilter = () => {
      if (!selectedFilter || selectedFilter === 'ALL') {
        setStartDropdownData(allLocationOptions);
        setEndDropdownData(endBaseOptions);
        return;
      }

      let floorRange = [];
      if (selectedFilter === 'EN') floorRange = [1, 2, 3, 4];
      else if (selectedFilter === 'TYK') floorRange = Array.from({ length: 10 }, (_, i) => i + 6);
      else if (selectedFilter === 'LCT') floorRange = Array.from({ length: 8 }, (_, i) => i + 17);

      const filterByFloor = (arr) =>
        arr.filter(item => {
          const coords = buildingCoordinates[item.value];
          // keep items without coords (NEAREST options)
          if (!coords || typeof coords.floor !== 'number') return true;
          return floorRange.includes(coords.floor);
        });

      setStartDropdownData(filterByFloor(allLocationOptions));
      setEndDropdownData(filterByFloor(endBaseOptions));
    };

    applyFilter();
  }, [selectedFilter, allLocationOptions, endBaseOptions, buildingCoordinates]);

  // Fetch locations + connections
  useEffect(() => {
  const fetchGraph = async () => {
    try {
      const { data: locations, error: locError } = await supabase.from('locations').select('*');
      if (locError) {
        console.error("Error fetching locations:", locError);
        return;
      }

      console.log("Fetched locations:", locations.length);

      const labelMap = {};
      const coordsMap = {};
      const dropdownOptions = [];

      locations.forEach(loc => {
        labelMap[loc.id] = loc.label;
        coordsMap[loc.label] = { x: loc.x, y: loc.y, floor: loc.floor };

        if (loc.checker !== 'excluded') {
          dropdownOptions.push({
            label: loc.label,
            value: loc.label,
            isEntrance: loc["entrance?"] === "yes",   // track entrance
          });
        }
      });

      // Update coordinates
      setBuildingCoordinates(coordsMap);

      // Split entrances and others
      const entrances = dropdownOptions
        .filter(opt => opt.isEntrance)
        .sort((a, b) => a.label.localeCompare(b.label));

      const others = dropdownOptions
        .filter(opt => !opt.isEntrance)
        .sort((a, b) => a.label.localeCompare(b.label));

      // Merge: entrances first, then others
      const sortedLocations = [...entrances, ...others];

      // Build end base options (NEAREST + sorted)
      const nearestOptions = [
        { label: 'NEAREST MALE CR', value: 'NEAREST MALE CR' },
        { label: 'NEAREST FEMALE CR', value: 'NEAREST FEMALE CR' },
      ];
      const endAll = [...nearestOptions, ...sortedLocations];

      // Seed state
      setAllLocationOptions(sortedLocations);
      setEndBaseOptions(endAll);
      setStartDropdownData(sortedLocations);
      setEndDropdownData(endAll);

      // Fetch connections
      let allConnections = [];
      let from = 0;
      const pageSize = 1000;

      while (true) {
        const { data, error } = await supabase
          .from('connections')
          .select('*')
          .range(from, from + pageSize - 1);

        if (error) {
          console.error("Error fetching page:", error);
          break;
        }

        if (data.length === 0) break;

        allConnections = [...allConnections, ...data];
        from += pageSize;

        if (data.length < pageSize) break;
      }

      console.log("Total fetched connections:", allConnections.length);

      const graphMap = {};

      allConnections.forEach(conn => {
        const fromLabel = labelMap[conn.from_id];
        const toLabel = labelMap[conn.to_id];
        const weight = conn.weight || 1;

        if (!fromLabel || !toLabel) {
          return;
        }

        if (!graphMap[fromLabel]) graphMap[fromLabel] = {};
        graphMap[fromLabel][toLabel] = weight;

        if (!graphMap[toLabel]) graphMap[toLabel] = {};
        graphMap[toLabel][fromLabel] = weight;
      });

      console.log("Final graph node count:", Object.keys(graphMap).length);
      setGraph(graphMap);
    } catch (err) {
      console.error("Unexpected error in fetchGraph:", err);
    }
  };

  fetchGraph();
}, []);


  return (
    <ImageBackground
      source={require('../images/NEW BG.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View>
          <View style={styles.header}>
            <Image source={require("../assets/logo_red.png")} style={styles.logo_header} />
            <Text style={styles.text}>UE Connect</Text>
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'EN' && styles.selectedFilter]}
              onPress={() => setSelectedFilter(prev => prev === 'EN' ? 'ALL' : 'EN')}
            >
              <Text style={[styles.filterText, selectedFilter === 'EN' && { color: 'white' }]}>EN</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'TYK' && styles.selectedFilter]}
              onPress={() => setSelectedFilter(prev => prev === 'TYK' ? 'ALL' : 'TYK')}
            >
              <Text style={[styles.filterText, selectedFilter === 'TYK' && { color: 'white' }]}>TYK</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.filterButton, selectedFilter === 'LCT' && styles.selectedFilter]}
              onPress={() => setSelectedFilter(prev => prev === 'LCT' ? 'ALL' : 'LCT')}
            >
              <Text style={[styles.filterText, selectedFilter === 'LCT' && { color: 'white' }]}>LCT</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Select Current Location</Text>
            <SelectList
              setSelected={setSelectedStart}
              data={startDropdownData}   // no CR options
              save="value"
              placeholder="Select Location"
              boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
              dropdownStyles={{ backgroundColor: '#fff8f7' }}
            />
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Select Destination</Text>
            <SelectList
              setSelected={setSelectedEnd}
              data={endDropdownData}     // includes CR options
              save="value"
              placeholder="Select Location"
              boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
              dropdownStyles={{ backgroundColor: '#fff8f7' }}
            />
          </View>

          <TouchableOpacity style={styles.searchbutton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button1} onPress={handleGoBack}>
            <Text style={styles.buttonText1}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '102%',
  },
  overlay: {
    flex: 1,
  },
  searchbutton: {
    marginTop: 30,
    alignSelf: 'center',
    width: '47%',
    height: 50,
    backgroundColor: '#fff8f7',
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
    color: 'white',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    position: 'absolute',
    bottom: 50,
    left: 6,
    width: '205%',
  },
  button1: {
    width: '47%',
    height: 60,
    backgroundColor: '#fff8f7',
    borderRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    left: 7,
    bottom: 12,
  },
  button2: {
    width: '47%',
    height: 60,
    backgroundColor: '#fff8f7',
    borderRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    right: 7,
    bottom: 12,
  },
  buttonText: {
    color: '#b51509',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 0,
  },
  buttonText1: {
    color: '#b51509',
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
    gap: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff8f7',
    borderRadius: 20,
    elevation: 4,
  },
  selectedFilter: {
    backgroundColor: '#b51509',
  },
  filterText: {
    color: '#b51509',
    fontWeight: 'bold',
  }
});

export default PFScreen;
