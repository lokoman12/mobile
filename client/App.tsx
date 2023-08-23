import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/LoginPage';
import Home from './Home';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Авторизация">
        <Stack.Screen name="Авторизация" component={LoginPage} />
        <Stack.Screen name="Главная" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
