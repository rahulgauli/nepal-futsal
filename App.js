import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BusinessHomeScreen from './screens/BusinessHomeScreen';
import AddFutsalGroundScreen from './screens/AddFutsalGroundScreen';


const Stack = createNativeStackNavigator(); 


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign Up" component={SignupScreen}/>
        <Stack.Screen name="Business Home" component={BusinessHomeScreen} />
        <Stack.Screen name="Add Ground" component={AddFutsalGroundScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
