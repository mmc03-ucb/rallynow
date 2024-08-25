import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View, SafeAreaView } from 'react-native';

// Community Page Component
export default function CommunityPage() {
  // Array containing organizations
  const organizations = [
    { name: "Climate Action Network", description: "Support climate action initiatives.", id: '1' },
    { name: "Red Cross", description: "Donate to support disaster relief.", id: '2' },
    { name: "World Wildlife Fund", description: "Help protect endangered species.", id: '3' },
    { name: "Doctors Without Borders", description: "Fund medical care in crisis areas.", id: '4' },
    { name: "UNICEF", description: "Support children's rights worldwide.", id: '5' },
  ];

  // The UI for the Community Page
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Community Donations</Text>
        <FlatList
          data={organizations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.organization}>
              <View style={styles.organizationDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
              <TouchableOpacity style={styles.donateButton}>
                <Text style={styles.donateButtonText}>Donate</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles for the Community Page
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f7f7f7', // Match the background color
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7', // Light background color for contrast
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center',
    color: '#333',
  },
  organization: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  organizationDetails: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  donateButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
