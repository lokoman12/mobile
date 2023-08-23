import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';

interface Product {
  _id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: Array<string>;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [imageBaseUrl, setImageBaseUrl] = useState<string>('http://46.229.128.194:5555/image/');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(-1); // -1 means no size selected
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    axios.get('http://46.229.128.194:5555/Products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setSelectedSizeIndex(-1); // Reset the selected size when opening the modal
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedSizeIndex(-1); // Reset the selected size when closing the modal
    setModalVisible(false);
  };

  const selectSize = (index: number) => {
    setSelectedSizeIndex(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
        <TouchableOpacity key={product._id} style={styles.card} onPress={() => openModal(product)}>
          <ImageBackground source={{ uri: imageBaseUrl + product.image }} style={styles.cardBackground}>
            {/* Other components inside the ImageBackground */}
          </ImageBackground>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} transparent animationType="slide">
        {selectedProduct && (
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <ImageBackground source={{ uri: imageBaseUrl + selectedProduct.image }} style={styles.modalImage}>
                  {/* Other components inside the modal image background */}
                </ImageBackground>
                <Text style={styles.modalDescription}>{`Название: ${selectedProduct.name}`}</Text>
                <Text style={styles.modalDescription}>{`Описание: ${selectedProduct.description}`}</Text>
                {selectedProduct.sizes && (
                  <View style={styles.sizeContainer}>
                    {selectedProduct.sizes.map((size, index) => (
                      <TouchableOpacity
                        key={index}
                        style={[
                          styles.sizeButton,
                          selectedSizeIndex === index && { backgroundColor: 'green' },
                        ]}
                        onPress={() => selectSize(index)}
                      >
                        <Text style={[styles.sizeButtonText, selectedSizeIndex === index && { color: 'white' }]}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'green' }]}>
                    <Text style={styles.modalButtonText}>Добавить в избранное</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: 'blue' }]}>
                    <Text style={styles.modalButtonText}>Добавить в корзину</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    height: 400,
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
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
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
