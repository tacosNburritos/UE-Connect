import React, { useEffect, useState } from 'react';
import { View,Text,TextInput,TouchableOpacity,StyleSheet,Alert,ImageBackground,ActivityIndicator} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { supabase } from '../lib/supabase';

export default function EditRoom({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [selectedId, setSelectedId] = useState(null); // will hold UUID (string)
  const [newLabel, setNewLabel] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLocations = async () => {
  setLoading(true);
  const { data, error } = await supabase
    .from('locations')
    .select('id, label')
    .is('checker', null); // filter

  if (error) {
    Alert.alert('Error fetching locations', error.message);
  } else {
    let sortedData = data ?? [];

    // Sort alphabetically
    sortedData.sort((a, b) => a.label.localeCompare(b.label));

    // If a room is currently selected, move it to the top
    if (selectedId) {
      sortedData = sortedData.filter(l => l.id !== selectedId);
      const selectedRoom = data.find(l => l.id === selectedId);
      if (selectedRoom) {
        sortedData.unshift(selectedRoom); // put selected at top
      }
    }

    setLocations(sortedData);
  }
  setLoading(false);
};


  const handleUpdate = async () => {
    if (!selectedId || !newLabel.trim()) {
      Alert.alert('Missing fields', 'Please select a room and enter a new label.');
      return;
    }

    const { error } = await supabase
      .from('locations')
      .update({ label: newLabel.trim() })
      .eq('id', selectedId); // selectedId is the UUID string

    if (error) {
      Alert.alert('Update Failed', error.message);
      console.log('Update Error:', error);
    } else {
      Alert.alert('Success', 'Room label updated.');
      setNewLabel('');
      setSelectedId(null); // reset dropdown
      fetchLocations();    // refresh list so the new label shows up
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <View

      style={styles.background}

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
              <SelectList
                data={locations.map((loc) => ({
                  key: String(loc.id),   // ensure UUID is string
                  value: loc.label,
                }))}
                save="key"                // return the key (UUID) to setSelected
                setSelected={(val) => {
                  setSelectedId(val);     // val is UUID
                  const selectedRoom = locations.find((l) => String(l.id) === val);
                  setNewLabel(selectedRoom?.label || '');
                }}
                placeholder="Select a room"
                boxStyles={{ backgroundColor: '#ffffffcc', borderRadius: 10 }}
                dropdownStyles={{ backgroundColor: '#ffffffcc', borderRadius: 10 }}
              />
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
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#5f2320ff',
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
    zIndex: 1,
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
    zIndex: 1000,
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
