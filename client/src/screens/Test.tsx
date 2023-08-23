// App.tsx
import React, {useEffect, useState} from 'react';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {View, Text, Button, Alert} from 'react-native';
import {productSlice} from '../../store/slices/product.slice';
import {RootState} from '../../store/rootReducer';

export default function Test() {
  const product = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch();

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product._id}</Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product.name}</Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product.price}</Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product.sizes}</Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product.description}</Text>
      <Text style={{fontSize: 24, marginBottom: 20}}>{product.image}</Text>
      <View style={{flexDirection: 'row'}}>
        <Button
          title="+"
          onPress={() =>
            dispatch(
              productSlice.actions.setProduct({
                _id: 1,
                price: 5555,
                description: 'тут описание',
                name: 'Nike',
                sizes: ['43', '44', '45'],
                image: 'Nike.jpeg',
              }),
            )
          }
        />
      </View>
    </View>
  );
}
