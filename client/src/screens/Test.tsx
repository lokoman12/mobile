// Test.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from '../../actions'; // Поправьте путь к файлу actions

const Test = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: any) => state.count); // Используйте подходящий тип здесь

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="+" onPress={() => dispatch(increment())} />
      <Button title="-" onPress={() => dispatch(decrement())} />
    </View>
  );
};

export default Test;
