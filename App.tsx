import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import LandingPage from './screens/LandingPage';
import './firebaseConfig';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{
            headerShown: false,       // Hides the header
            gestureEnabled: false     // Disables the swipe back gesture
          }} // Hides the header on the LandingPage
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
