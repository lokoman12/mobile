import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
import { StackNavigationProp } from '@react-navigation/stack';

const API_URL = 'http://46.229.128.194:5555/Users';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const handleLogin = async () => {
    try {
      const response = await axios.get(API_URL);
      const users = response.data;

      const user = users.find((user: any) => user.login === username && user.password === password);

      if (user) {
        navigation.navigate('Главная');
      } else {
        Alert.alert('Error', 'Invalid username or password.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while processing your request.');
    }
  };

  return (
    <View  style={styles.container}>
      <Text style={styles.centeredText}>Добро пожаловать!</Text>
      <TextInput
        placeholder="Логин"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.button}>
      <Button title="Войти" onPress={handleLogin} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  centeredText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    width: '100%'
  }
});
export default LoginPage;
