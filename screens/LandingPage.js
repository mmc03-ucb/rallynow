import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const LandingPage = () => {
  const [upcomingProtest, setUpcomingProtest] = useState(null);
  const [latestIncident, setLatestIncident] = useState(null);
  const [internetStatus, setInternetStatus] = useState('Connected'); // Default to connected
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch data for upcoming protests, incidents, and internet status
    // Replace these with actual database queries
    setUpcomingProtest({
      title: 'Protest for Climate Action',
      address: '123 Main St, Springfield',
      time: '2024-08-25 10:00 AM',
    });
    setLatestIncident({
      title: 'Police Intervention',
      description: 'Police dispersed protestors at Central Park.',
      time: '2024-08-24 03:00 PM',
    });
    // Simulate checking internet status
    setInternetStatus('Connected');
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('User signed out');
      navigation.navigate('SignIn'); // Redirect to SignIn page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  const handleViewMore = (type) => {
    if (type === 'protests') {
      navigation.navigate('ProtestList');
    } else {
      Alert.alert(`Viewing more ${type}`, `Show more details about ${type}`);
    }
  };

  const handleSOS = () => {
    Alert.alert('SOS', 'Emergency services have been contacted.');
    // Add more functionality as needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.centerContent}>
        <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#007bff' }]} onPress={() => handleViewMore('protests')}>
          <Text style={styles.cardTitle}>Upcoming Protest</Text>
          {upcomingProtest ? (
            <>
              <Text style={styles.cardContent}>Next: {upcomingProtest.title}</Text>
              <Text style={styles.cardContent}>Address: {upcomingProtest.address}</Text>
              <Text style={styles.cardContent}>Time: {upcomingProtest.time}</Text>
            </>
          ) : (
            <Text style={styles.cardContent}>Loading...</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#fd7e14' }]} onPress={() => handleViewMore('incidents')}>
          <Text style={styles.cardTitle}>Latest Incident</Text>
          {latestIncident ? (
            <>
              <Text style={styles.cardContent}>{latestIncident.title}</Text>
              <Text style={styles.cardContent}>{latestIncident.description}</Text>
              <Text style={styles.cardContent}>Time: {latestIncident.time}</Text>
            </>
          ) : (
            <Text style={styles.cardContent}>Loading...</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.card,
            { backgroundColor: internetStatus === 'Connected' ? '#28a745' : '#dc3545' },
          ]}
          onPress={() => handleViewMore('internet connectivity')}
        >
          <Text style={styles.cardTitle}>Internet Connectivity</Text>
          <Text style={styles.cardContent}>Status: {internetStatus}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => Alert.alert('More Features', 'Here you can access more features later.')}>
          <Text style={styles.moreFeaturesText}>More Features</Text>
        </TouchableOpacity>
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between', // Space between the content and the buttons at the bottom
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  sosButton: {
    width: 100, // Size of the SOS button
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 24, // Font size for the SOS button text
    fontWeight: 'bold',
  },
  card: {
    width: '90%', // Width of the cards
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardContent: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  moreFeaturesText: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LandingPage;
