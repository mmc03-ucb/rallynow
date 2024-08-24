import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const FirstAidPage = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.header}>First Aid Guide</Text>
        {/* CPR Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>CPR</Text>
          </View>
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-1.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>For adults: 30 compressions.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/CPR.png')} 
              style={styles.shockImage} 
            />
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-2.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>For infants and children: 2 breaths.</Text>
          </View>
        </View>

        {/* Bleeding Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Bleeding (if severe bleeding)</Text>
          </View>
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/call_icon.jpg')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Call 000</Text>
          </View>
          
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-1.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Apply as much pressure as possible over the wound.</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-2.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Lay person down and keep at rest.{' '}
              <Text style={styles.boldText}>(maintain body temperature)</Text>.
            </Text>
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-3.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Continue to maintain pressure.</Text>
          </View>
        </View>

        {/* Burns and Scalds Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Burns and Scalds</Text>
          </View>
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-1.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Cool burn for a minimum of 20 minutes using cool running water.</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-2.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>If burn is extensive or in a sensitive area seek medical help or{' '}
              <Text style={styles.boldText}>call</Text>
              <Text style={styles.boldRedText}> 000</Text>
            </Text>
          </View>
        </View>

        {/* Shock Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Shock</Text>
          </View>
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-1.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Reassure the person.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/shock-1.png')} 
              style={styles.shockImage} 
            />
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-2.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Lay them down and maintain body temperature. Do not allow them to eat or drink.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/shock-2.png')} 
              style={styles.shockImage} 
            />
          </View>
        </View>

        {/* Asthma Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.subHeaderContainer}>
            <Text style={styles.subHeader}>Asthma Attack</Text>
          </View>
          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-1.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Sit the person comfortably upright.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/asthma-1.png')} 
              style={styles.shockImage} 
            />
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-2.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Reassure them and keep calm.</Text>
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-3.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>Follow their asthma plan or help them to 
            take a puff on reliever medication through a spacer (if available), then 4 breaths through the spacer. They do this 4 times and repeat every 4 minutes if no improvement.</Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/asthma-2.png')} 
              style={styles.shockImage} 
            />
          </View>

          <View style={styles.stepsContainer}>
            <Image 
              source={require('../assets/icons/circle-4.png')} 
              style={styles.icon} 
            />
            <Text style={styles.stepsText}>If attack is severe, or no reliever medication is available, {' '}
              <Text style={styles.boldText}>call</Text>
              <Text style={styles.boldRedText}> 000</Text>
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image 
              source={require('../assets/asthma-3.png')} 
              style={styles.shockImage} 
            />
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContainer: {
    padding: 20,
    paddingBottom: 40,  
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  subHeaderContainer: {
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  stepsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingRight: 18,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  stepsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    paddingRight: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
  boldRedText: {
    fontWeight: 'bold',
    color: 'red',
  },
  imageContainer: {
    alignItems: 'center', 
    marginTop: 10,
    marginBottom: 10,
  },
  shockImage: {
    width: '100%', 
    height: 200, 
    resizeMode: 'contain',
  },
});

export default FirstAidPage;
