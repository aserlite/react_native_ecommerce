import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../App';

const ProductCart = ({ product, navigation }) => {
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

  const openProduct = () => {
    navigation.navigate('DetailPage', { product });
  };

  const truncateTitle = (title) => {
    if (title.length > 50) {
      return title.substring(0, 50) + '...';
    }
    return title;
  };
  const addSimilarItem = () => {
    addToCart(product);
  };

  const removeOneItem = () => {
    removeOneFromCart(product.id);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={openProduct}>
      <Image style={styles.image} source={{ uri: product.image }} resizeMode="contain" />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{truncateTitle(product.title)}</Text>
        <Text style={styles.price}>{product.price} $</Text>
        {product.category.toLowerCase().includes('clothing') && (
        <View style={styles.sizeSelectorContainer}>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'S' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('S')}
          >
            <Text style={[styles.sizeOptionText, selectedSize === 'S' && styles.selectedSizeText]}>S</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'M' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('M')}
          >
            <Text style={[styles.sizeOptionText, selectedSize === 'M' && styles.selectedSizeText]}>M</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sizeOption, selectedSize === 'L' && styles.selectedSizeOption]}
            onPress={() => setSelectedSize('L')}
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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1, 
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sizeSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  sizeOption: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  selectedSizeOption: {
    backgroundColor: 'black',
  },
  sizeOptionText: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedSizeText: {
    color: 'white',
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
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
});

export default ProductCart;
