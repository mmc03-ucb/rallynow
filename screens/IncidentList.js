import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const IncidentList = () => {
  const [incidents, setIncidents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newIncidentTitle, setNewIncidentTitle] = useState('');
  const [newIncidentDescription, setNewIncidentDescription] = useState('');
  const [newIncidentLocation, setNewIncidentLocation] = useState('');
  const [newIncidentDate, setNewIncidentDate] = useState('');

  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, 'incidents'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const incidentsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setIncidents(incidentsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleAddIncident = () => {
    setModalVisible(true);
  };

  const handleSubmitIncident = async () => {
    if (newIncidentTitle && newIncidentDescription && newIncidentLocation && newIncidentDate) {
      try {
        await addDoc(collection(db, 'incidents'), {
          title: newIncidentTitle,
          description: newIncidentDescription,
          location: newIncidentLocation,
          date: newIncidentDate,
        });
        setModalVisible(false);
        setNewIncidentTitle('');
        setNewIncidentDescription('');
        setNewIncidentLocation('');
        setNewIncidentDate('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add incident. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.incidentItem}>
      <Text style={styles.incidentTitle}>{item.title}</Text>
      <Text style={styles.incidentDetails}>Location: {item.location}</Text>
      <Text style={styles.incidentDetails}>Date: {item.date}</Text>
      <Text style={styles.incidentDetails}>Description: {item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Incidents</Text>
      <FlatList
        data={incidents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleAddIncident} style={styles.addButton}>
          <Text style={styles.addButtonText}>Report Incident</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Incident</Text>
            <TextInput
              style={styles.input}
              placeholder="Incident Title"
              value={newIncidentTitle}
              onChangeText={setNewIncidentTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={newIncidentDescription}
              onChangeText={setNewIncidentDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newIncidentLocation}
              onChangeText={setNewIncidentLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newIncidentDate}
              onChangeText={setNewIncidentDate}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSubmitIncident} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  incidentItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  incidentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  incidentDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IncidentList;
