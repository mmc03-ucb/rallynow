import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, SafeAreaView, TextInput, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, increment } from 'firebase/firestore';

const ProtestList = () => {
  const [protests, setProtests] = useState([]);
  const [upvotedProtests, setUpvotedProtests] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [newProtestTitle, setNewProtestTitle] = useState('');
  const [newProtestLocation, setNewProtestLocation] = useState('');
  const [newProtestDate, setNewProtestDate] = useState('');

  const db = getFirestore();

  useEffect(() => {
    const q = query(collection(db, 'protests'), orderBy('votes', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const protestsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProtests(protestsArray);
    });

    return () => unsubscribe();
  }, []);

  const handleAddProtest = () => {
    setModalVisible(true);
  };

  const handleUpvote = async (id) => {
  try {
    // Update votes in the Firestore database
    const protestRef = doc(db, 'protests', id);
    await updateDoc(protestRef, {
      votes: increment(1)
    });

    // Update the local state to mark the protest as upvoted
    setUpvotedProtests(prevState => ({
      ...prevState,
      [id]: true
    }));
  } catch (error) {
    console.error("Error upvoting the protest: ", error);
  }
};


  const handleSubmitProtest = async () => {
    if (newProtestTitle && newProtestLocation && newProtestDate) {
      try {
        await addDoc(collection(db, 'protests'), {
          title: newProtestTitle,
          location: newProtestLocation,
          date: newProtestDate,
          votes: 0
        });
        setModalVisible(false);
        setNewProtestTitle('');
        setNewProtestLocation('');
        setNewProtestDate('');
      } catch (error) {
        Alert.alert('Error', 'Failed to add protest. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill out all fields.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.protestItem}>
      <Text style={styles.protestTitle}>{item.title}</Text>
      <Text style={styles.protestDetails}>Location: {item.location}</Text>
      <Text style={styles.protestDetails}>Date: {item.date}</Text>
      <View style={styles.voteContainer}>
        <Text style={styles.voteCount}>Votes: {item.votes}</Text>
        <TouchableOpacity
          onPress={() => handleUpvote(item.id)}
          style={[
            styles.voteButton,
            upvotedProtests[item.id] && { backgroundColor: 'green' } // Change color if upvoted
          ]}
          disabled={upvotedProtests[item.id]} // Disable button if already upvoted
        >
          <Text style={styles.voteText}>
            {upvotedProtests[item.id] ? 'Voted' : 'Upvote'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Protests Near You</Text>
      <FlatList
        data={protests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleAddProtest} style={styles.addButton}>
          <Text style={styles.addButtonText}>Start Your Own</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Protest</Text>
            <TextInput
              style={styles.input}
              placeholder="Protest Title"
              value={newProtestTitle}
              onChangeText={setNewProtestTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Location"
              value={newProtestLocation}
              onChangeText={setNewProtestLocation}
            />
            <TextInput
              style={styles.input}
              placeholder="Date"
              value={newProtestDate}
              onChangeText={setNewProtestDate}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleSubmitProtest} style={styles.submitButton}>
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
    justifyContent: 'flex-end',
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
  protestItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  protestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  protestDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  voteCount: {
    fontSize: 16,
  },
  voteButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  voteText: {
    color: '#fff',
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

export default ProtestList;
