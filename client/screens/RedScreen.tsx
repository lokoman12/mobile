import React from 'react';
import { View, StyleSheet } from 'react-native';

const RedScreen: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default RedScreen;
