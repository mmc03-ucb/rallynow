import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';

// Medical ID Page Component
export default function MedicalIDPage() {
  // Random data for the Medical ID
  const medicalInfo = {
    name: "John Doe",
    age: 29,
    bloodType: "O+",
    weight: "75 kg",
    height: "180 cm",
  };

  // Emergency contacts
  const emergencyContacts = [
    { name: "Jane Doe", relationship: "Wife", number: "+123456789", id: '1' },
    { name: "Robert Smith", relationship: "Friend", number: "+987654321", id: '2' },
    { name: "Alice Johnson", relationship: "Mother", number: "+1122334455", id: '3' },
  ];

  // The UI for the Medical ID Page
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Medical ID</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{medicalInfo.name}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Age:</Text>
          <Text style={styles.value}>{medicalInfo.age}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Blood Type:</Text>
          <Text style={styles.value}>{medicalInfo.bloodType}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{medicalInfo.weight}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{medicalInfo.height}</Text>
        </View>

        <Text style={styles.subHeader}>Emergency Contacts</Text>
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contact}>
              <Text style={styles.contactName}>{item.name} ({item.relationship})</Text>
              <Text style={styles.contactNumber}>{item.number}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles for the Medical ID Page
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    width: 120,
  },
  value: {
    fontSize: 18,
    color: '#555',
  },
  contact: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  contactNumber: {
    fontSize: 16,
    color: '#007bff',
  },
});

