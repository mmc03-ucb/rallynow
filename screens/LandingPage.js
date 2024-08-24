import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore } from 'firebase/firestore';

const LandingPage = () => {
  const [upcomingProtest, setUpcomingProtest] = useState(null);
  const [latestIncident, setLatestIncident] = useState(null);
  const [internetStatus, setInternetStatus] = useState('Connected');
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  useEffect(() => {
    // Simulate fetching data
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
    setInternetStatus('Connected');
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigation.navigate('SignIn');
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo and Internet Connectivity */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.headerText}>RallyNow</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.internetCard,
              { backgroundColor: 'rgba(40, 167, 69, 0.3)' }, // Slightly less transparent green background
            ]}
            onPress={() => handleViewMore('internet connectivity')}
          >
            <Text style={styles.internetCardTitle}>Internet</Text>
            <Text style={styles.internetCardContent}>Status: {internetStatus}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.centerContent}>
          {/* Upcoming Protest Card */}
          <TouchableOpacity style={[styles.card, { backgroundColor: '#5F9EA0' }]} onPress={() => handleViewMore('protests')}>
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

          {/* Latest Incident Card */}
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

          {/* SOS Button */}
          <TouchableOpacity style={styles.sosButton} onPress={handleSOS}>
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>

          {/* Grid of Buttons */}
          <View style={styles.buttonGrid}>
            <TouchableOpacity style={styles.gridButton} onPress={() => Alert.alert('Emergency Services', 'Accessing Emergency Services...')}>
              <Text style={styles.gridButtonText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridButton} onPress={() => Alert.alert('Emergency Aid', 'Accessing Emergency Aid...')}>
              <Text style={styles.gridButtonText}>Emergency Aid</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridButton} onPress={() => Alert.alert('Medical ID', 'Accessing Medical ID...')}>
              <Text style={styles.gridButtonText}>Medical ID</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridButton} onPress={() => Alert.alert('Community', 'Accessing Community...')}>
              <Text style={styles.gridButtonText}>Community</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    padding: 10,
    borderWidth: 1, // Add a border
    borderColor: '#ccc', // Border color
    borderRadius: 10, // Rounded corners for the border
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    padding: 10, // Add padding inside the border
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  internetCard: {
    width: 103,
    height: 50,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#28a745',
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internetCardTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 1,
  },
  internetCardContent: {
    fontSize: 10,
    color: '#28a745',
    textAlign: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  card: {
    width: '90%',
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
  sosButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonGrid: {
    width: '90%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridButton: {
    width: '48%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  gridButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    width: '90%',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LandingPage;
