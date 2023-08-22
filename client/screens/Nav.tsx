import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import GreenScreen from './GreenScreen';
import RedScreen from './RedScreen';


const Stack = createStackNavigator();

const Nav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Green" component={GreenScreen} />
        <Stack.Screen name="Red" component={RedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Nav;
