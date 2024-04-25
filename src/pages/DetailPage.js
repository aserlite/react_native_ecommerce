import React, { useContext, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../App';

const DetailPage = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart, removeOneFromCart, getById, updateCartItem} = useContext(CartContext);
  const [selectedSize, setSelectedSize] = useState('');

  const addProductToCart = () => {
    if (selectedSize && product.category.toLowerCase().includes('clothing')) {
      const productWithSize = { ...product, size: selectedSize };
      addToCart(productWithSize);
    } else if (product.category.toLowerCase().includes('clothing')) {
      alert("Veuillez choisir une taille")
    } else {
      addToCart(product)
    }
  };

  const updateProductSize = (productId, size) => {
    updateCartItem(productId, { size });
  };

  const removeOneItem = () => {
    removeOneFromCart(product.id);
  };

  const addSimilarItem = () => {
    addToCart(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '★' : '☆'}
        </Text>
      );
    }
    return stars;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
        <Text style={styles.title}>{product.title}</Text>
        <View style={styles.infosContainer}>
          <Text style={styles.price}>{product.price} $</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.starContainer}>{renderStars(product.rating.rate)}</View>
            <Text style={styles.ratingCount}>({product.rating.count} avis)</Text>
          </View>
        </View>
        <Text style={styles.description}>{product.description}</Text>

        {product.category.toLowerCase().includes('clothing') && (
          <View style={styles.sizeSelectorContainer}>
            <Text style={styles.sizeSelectorLabel}>Sélectionnez la taille :</Text>
            <TouchableOpacity
              style={[styles.sizeOption, selectedSize === 'S' && styles.selectedSizeOption]}
              onPress={() => {
                setSelectedSize('S');
                updateProductSize(product.id, 'S');
              }}
            >
              <Text style={[styles.sizeOptionText, selectedSize === 'S' && styles.selectedSizeText]}>S</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sizeOption, selectedSize === 'M' && styles.selectedSizeOption]}
              onPress={() => {
                setSelectedSize('M');
                updateProductSize(product.id, 'M');
              }}
            >
              <Text style={[styles.sizeOptionText, selectedSize === 'M' && styles.selectedSizeText]}>M</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sizeOption, selectedSize === 'L' && styles.selectedSizeOption]}
              onPress={() => {
                setSelectedSize('L');
                updateProductSize(product.id, 'L');
              }}
            >
              <Text style={[styles.sizeOptionText, selectedSize === 'L' && styles.selectedSizeText]}>L</Text>
            </TouchableOpacity>

          </View>
        )}

        {getById(product.id) ? (
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={removeOneItem}>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.quantity}>{getById(product.id).incart}</Text>
            <TouchableOpacity onPress={addSimilarItem}>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={addProductToCart}>
            <Text style={styles.addButtonText}>Ajouter au panier</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 20,
  },
  infosContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  image: {
    width: '80%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailsContainer: {
    width: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  ratingContainer: {
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 20,
    color: '#FFD700',
  },
  ratingCount: {
    fontSize: 14,
    color: '#888',
  },
  sizeSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  sizeSelectorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  sizeOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedSizeOption: {
    backgroundColor: 'black',
  },
  sizeOptionText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    color: 'white',
  },
});

export default DetailPage;
