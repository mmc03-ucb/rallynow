import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import ProtestList from './screens/ProtestList';
import LandingPage from './screens/LandingPage';
import IncidentList from './screens/IncidentList';
import FirstAidPage from './screens/FirstAidPage';
import EmergencyContactsScreen from './screens/EmergencyContactsScreen';
import MedicalIDPage from './screens/MedicalIDPage';
import CommunityPage from './screens/CommunityPage';
import './firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{
          headerShown: false,  // Hides the header by default for all screens
        }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{
            gestureEnabled: false,  // Disables the swipe back gesture
          }}
        />
        <Stack.Screen name="ProtestList" component={ProtestList} />
        <Stack.Screen name="IncidentList" component={IncidentList} />
        <Stack.Screen name="FirstAidPage" component={FirstAidPage} />
        <Stack.Screen name="EmergencyContactsScreen" component={EmergencyContactsScreen} />
        <Stack.Screen name="MedicalIDPage" component={MedicalIDPage} />
        <Stack.Screen name="CommunityPage" component={CommunityPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
