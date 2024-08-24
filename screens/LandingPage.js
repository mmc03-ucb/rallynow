import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const LandingPage = () => {
  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation();

  const handleTestBackend = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Send data to Firestore under the user's uid
        await addDoc(collection(db, 'activities'), {
          userId: user.uid,
          activity: 'Test backend activity',
          timestamp: new Date(),
        });
        console.log('Activity sent to backend');
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    } else {
      console.log('No user is signed in');
    }
  };

  const handleRetrieveData = async () => {
    const user = auth.currentUser;

    if (user) {
      try {
        // Query Firestore for documents associated with the current user's uid
        const q = query(collection(db, 'activities'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        const activities = [];
        querySnapshot.forEach((doc) => {
          activities.push(doc.data());
        });

        if (activities.length > 0) {
          console.log('Retrieved activities: ', activities);
          Alert.alert('Retrieved Activities', JSON.stringify(activities));
        } else {
          console.log('No activities found for this user.');
          Alert.alert('No Activities Found', 'No activities found for this user.');
        }
      } catch (e) {
        console.error('Error retrieving documents: ', e);
      }
    } else {
      console.log('No user is signed in');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      console.log('User signed out');
      navigation.navigate('SignIn'); // Redirect to SignIn page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Landing Page</Text>
      <Button title="Test Backend" onPress={handleTestBackend} />
      <Button title="Retrieve Data" onPress={handleRetrieveData} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default LandingPage;
