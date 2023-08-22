import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

interface Product {
  id: number;
  name: string;
  price: number;
  image: number;
}

const mockProductData: Product[] = [
  { id: 1, name: 'Борщ', price: 200, image: require('./assets/Borsh.jpeg') },
  { id: 2, name: 'Паста', price: 350, image: require('./assets/Pasta.jpeg') },
  { id: 3, name: 'Хинкали', price: 60, image: require('./assets/Hin.jpeg') },
  { id: 4, name: 'Торт', price: 500, image: require('./assets/Tort.jpeg') },
  // ... Добавьте больше продуктов по желанию
];

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(mockProductData);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {products.map((product) => (
        <TouchableOpacity key={product.id} style={styles.card}>
          <ImageBackground source={product.image} style={styles.cardBackground}>
            <View style={styles.productInfoTopLeft}>
              <Text style={styles.productNameTopLeft}>{product.name}</Text>
            </View>
            <View style={styles.productInfoTopRight}>
              <Text style={styles.productPriceTopRight}>{product.price.toFixed(2)}₽</Text>
            </View>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={styles.addButtonBottomRight}
                onPress={() => console.log(`Added ${product.name} to cart`)}
              >
                <Text style={styles.addButtonText}>Купить</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    height: 400, // Увеличили высоту карточки
    marginBottom: 24, // Увеличили отступ снизу
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
  productInfoTopLeft: {
    position: 'absolute', // Верхний левый угол
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productNameTopLeft: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  productInfoTopRight: {
    position: 'absolute', // Верхний правый угол
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productPriceTopRight: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 8,
    paddingRight: 8,
  },
  addButtonBottomRight: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 6,
    alignSelf: 'flex-end',
    marginBottom: 12,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
