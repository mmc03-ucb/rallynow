import React from 'react';
import { FlatList, Text, TouchableOpacity, StyleSheet, View, Linking, Image, SafeAreaView } from 'react-native';

// Emergency Contacts Screen Component
export default function EmergencyContactsScreen() {
  // Array containing emergency contacts
  const emergencyContacts = [
    { name: "Hospital", number: "+123456789", icon: require('../assets/hospital_icon.png') },
    { name: "Police", number: "+987654321", icon: require('../assets/police_icon.png') },
    { name: "Fire Department", number: "+1122334455", icon: require('../assets/fire_icon.png') },
    { name: "Ambulance", number: "+9988776655", icon: require('../assets/ambulance_icon.png') },
    { name: "Local Legal Aid", number: "+5566778899", icon: require('../assets/legal_aid_icon.png') },
  ];

  // Function to make a phone call
  const makeCall = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  // The UI for the EmergencyContactsScreen
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Emergency Contacts</Text>
        <FlatList
          data={emergencyContacts}
          keyExtractor={(item) => item.number}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => makeCall(item.number)} style={styles.contact}>
              <Image source={item.icon} style={styles.icon} />
              <View style={styles.contactDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.number}>{item.number}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// Styles for the EmergencyContactsScreen
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
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
  contactDetails: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  number: {
    fontSize: 16,
    color: '#007bff', // Blue color for the phone number
  },
});
