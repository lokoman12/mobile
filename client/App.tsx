import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './src/screens/LoginPage';
import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Favorite from './src/screens/Favorite';
import Cart from './src/screens/Cart';



const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Авторизация">
        <Stack.Screen name="Авторизация" component={LoginPage} />
        <Stack.Screen name="Главная" component={Home} />
        <Stack.Screen name="Профиль" component={Profile} />
        <Stack.Screen name="Корзина" component={Cart} />
        <Stack.Screen name="Избранное" component={Favorite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
