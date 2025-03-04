import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

function PFScreen({ navigation }) {
  
  const handleGoBack = () => {
    navigation.navigate('Main');
  };

  const [selected, setSelected] = useState("");
  const [dropdownData, setDropdownData] = useState([
    { key: '1', value: 'TYK Building' },
  ]);

  const options = {
    "TYK Building": [
      { key: '1', value: 'TYK 1st Floor' },
      { key: '2', value: 'TYK 2nd Floor' },
      { key: '3', value: 'TYK 3rd Floor' },
    ],
    "TYK 1st Floor": [
      { key: '4', value: 'Room 100' },
      { key: '5', value: 'Room 101' },
    ],
    "TYK 2nd Floor": [
      { key: '6', value: 'Room 202' },
      { key: '7', value: 'Room 203' },
    ],
  };

  const handleSelection = (val) => {
    setSelected(val);

    if (options[val]) {
      setDropdownData(options[val]); // If category has sub-options, update dropdown
    } else {
      console.log("Final Choice:", val); // If no more options, log final choice
    }
  };

  return (
    <>
      <View style={styles.header}>
          <Text style={styles.text}>UE Connect</Text>
      </View>

      <View style={styles.dropdownContainer}>
        <Text style={styles.label}>Select Current Location</Text>
        <SelectList
          setSelected={handleSelection}
          data={dropdownData}
          save="value"
          placeholder="Select Location"
          boxStyles={{ backgroundColor: 'white', borderRadius: 30 }}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1}>
          <Text style={styles.buttonText} onPress={handleGoBack}>Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2}>
          <Text style={styles.buttonText}>Free Roam</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
    left: 7,
  },
  button2: {
    width: '47%',
    height: 60,
    backgroundColor: '#DF4242',
    borderRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
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
    borderRadius: 30,
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.55)',
  },
  text: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PFScreen;
