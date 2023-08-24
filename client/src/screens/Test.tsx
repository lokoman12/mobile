import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import {Product} from './Home';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Test = () => {
  const products = useSelector(
    (state: RootState) => state.product.favoriteProduct,
  );

  const [imageBaseUrl, setImageBaseUrl] = useState<string>(
    'http://46.229.128.194:5555/image/',
  );
  const renderProductCard = (item: Product) => {
    return (
      <TouchableOpacity key={item._id}>
        <View style={styles.productContainer}>
          <Image
            source={{uri: imageBaseUrl + item.image}}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price} рублей</Text>
            <Text style={styles.productPrice}>{item.description}</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.deleteButton}>
                <Icon name="favorite" size={30}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.contentContainer}>
            {products.map(item => renderProductCard(item))}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 60, 
  },
  productContainer: {
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  productImage: {
    borderRadius: 10,
    width: 100,
    height: '100%',
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    marginBottom: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: 'black',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
    width: 30,
    height: 30,
  },
  quantityButtonText: {
    fontSize: 12,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteButtonText: {
    color: 'red',
    fontSize: 16,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default Test;
