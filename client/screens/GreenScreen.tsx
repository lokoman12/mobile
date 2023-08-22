import React from 'react';
import { View, StyleSheet } from 'react-native';

const GreenScreen: React.FC = () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default GreenScreen;
