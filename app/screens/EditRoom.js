import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../lib/supabase';

export default function EditRoom({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [newLabel, setNewLabel] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
  const { data, error } = await supabase
    .from('locations')
    .select('id, label')
    .is('checker', 'NULL'); // Filter out 'excluded' entries

    if (error) {
        Alert.alert('Error fetching locations', error.message);
    } else {
        setLocations(data);
    }
    setLoading(false);
    };


  const handleUpdate = async () => {
    if (!selectedId || !newLabel) {
      Alert.alert('Missing fields', 'Please select a room and enter a new label.');
      return;
    }

    const { error } = await supabase
      .from('locations')
      .update({ label: newLabel })
      .eq('id', selectedId);

    if (error) {
      Alert.alert('Update Failed', error.message);
    } else {
      Alert.alert('Success', 'Room label updated.');
      setNewLabel('');
      fetchLocations();
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <ImageBackground
      source={require('../images/NEW BG.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Edit Room Label</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#b51509" />
        ) : (
          <>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedId}
                onValueChange={(itemValue) => {
                  setSelectedId(itemValue);
                  const selectedRoom = locations.find(loc => loc.id === itemValue);
                  setNewLabel(selectedRoom?.label || '');
                }}
                style={styles.picker}
              >
                <Picker.Item label="Select a room" value={null} />
                {locations.map((loc) => (
                  <Picker.Item key={loc.id} label={loc.label} value={loc.id} />
                ))}
              </Picker>
            </View>

            <TextInput
              placeholder="New Label"
              value={newLabel}
              onChangeText={setNewLabel}
              style={styles.input}
            />

            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
              <Text style={styles.buttonText}>Update Label</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: 24,
  },
  backText: {
    fontSize: 18,
    color: '#fff8f7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff8f7',
    textAlign: 'center',
    marginBottom: 24,
  },
  pickerContainer: {
    backgroundColor: '#ffffffcc',
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#ffffffcc',
    paddingHorizontal: 12,
    marginBottom: 16,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'rgba(255, 248, 247, 0.7)',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.55,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b51509',
  },
});
