import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import {productSlice} from '../../store/slices/product.slice';

export interface Product {
  _id?: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
  sizes?: Array<string>;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageBaseUrl, setImageBaseUrl] = useState<string>(
    'http://46.229.128.194:5555/image/',
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(-1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const navigation = useNavigation<StackNavigationProp<any, any>>();

  const product = useSelector((state: RootState) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://46.229.128.194:5555/Products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSizeIndex(-1);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSizeIndex(-1);
    setModalVisible(false);
  };

  const selectSize = (index: number) => {
    setSelectedSizeIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {products.map(product => (
          <TouchableOpacity
            key={product._id}
            style={styles.card}
            onPress={() => openModal(product)}>
            <ImageBackground
              source={{uri: imageBaseUrl + product.image}}
              style={styles.cardBackground}>
              {/* Other components inside the ImageBackground */}
            </ImageBackground>
          </TouchableOpacity>
        ))}

        <Modal visible={modalVisible} transparent animationType="slide">
          {selectedProduct && (
            <TouchableWithoutFeedback onPress={closeModal}>
              <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                  <ImageBackground
                    source={{uri: imageBaseUrl + selectedProduct.image}}
                    style={styles.modalImage}>
                    {/* Other components inside the modal image background */}
                  </ImageBackground>
                  <Text
                    style={
                      styles.modalDescription
                    }>{`Название: ${selectedProduct.name}`}</Text>
                  <Text
                    style={
                      styles.modalDescription
                    }>{`Описание: ${selectedProduct.description}`}</Text>
                  {selectedProduct.sizes && (
                    <View style={styles.sizeContainer}>
                      {selectedProduct.sizes.map((size, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.sizeButton,
                            selectedSizeIndex === index && {
                              backgroundColor: 'green',
                            },
                          ]}
                          onPress={() => selectSize(index)}>
                          <Text
                            style={[
                              styles.sizeButtonText,
                              selectedSizeIndex === index && {color: 'white'},
                            ]}>
                            {size}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  <View style={styles.modalButtonsContainer}>
                    <TouchableOpacity
                      style={[styles.modalButton]}
                      onPress={() => {
                        dispatch(
                          productSlice.actions.setFavoriteProduct({
                            _id: selectedProduct._id,
                            price: selectedProduct.price,
                            description: selectedProduct.description,
                            name: selectedProduct.name,
                            sizes: selectedProduct.sizes,
                            image: selectedProduct.image,
                          }),
                        );
                      }}>
                      <Icon name="favorite-border" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.modalButton]}
                      onPress={() => {
                        dispatch(
                          productSlice.actions.setCartProduct({
                            _id: selectedProduct._id,
                            price: selectedProduct.price,
                            description: selectedProduct.description,
                            name: selectedProduct.name,
                            sizes: selectedProduct.sizes,
                            image: selectedProduct.image,
                          }),
                        );
                      }}>
                      <Icon name="add-shopping-cart" size={30}></Icon>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )}
        </Modal>
      </ScrollView>

      {/* Sticky toolbar at the bottom */}
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            navigation.navigate('Избранное');
          }}>
          <Icon name="favorite" size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            navigation.navigate('Корзина');
          }}>
          <Icon name="shopping-cart-checkout" size={30}></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            navigation.navigate('Профиль');
          }}>
          <Icon name="account-circle" size={30}></Icon>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.toolbarButton}
          onPress={() => {
            navigation.navigate('Тестовый');
          }}>
          <Icon name="adb" size={30}></Icon>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    height: 400,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cardBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  modalImage: {
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  modalDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sizeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sizeButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  sizeButtonText: {
    fontSize: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  toolbar: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: 'gray',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  toolbarButton: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Home;
