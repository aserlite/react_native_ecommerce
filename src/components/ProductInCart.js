import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../App';

const ProductInCart = ({ product }) => {
  const { removeFromCart, addToCart, removeOneFromCart } = useContext(CartContext);

  const removeItem = () => {
    removeFromCart(product.id); 
  };

  const addSimilarItem = () => {
    addToCart(product);
  };

  const removeOneItem= () => {
    removeOneFromCart(product.id);
  }

  return (
    <View style={styles.container}>
      <View style={styles.productContainer}>
        <Image style={styles.image} source={{ uri: product.image }} resizeMode="cover" />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{product.title}</Text>
          {product.size ? (
          <Text >Taille : {product.size}</Text>
          ):(
            <Text></Text>
          )}
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={removeOneItem}>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>-</Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.quantity}>{product.incart} </Text>
            <TouchableOpacity onPress={addSimilarItem}>
              <View style={styles.quantityButton}>
                <Text style={styles.quantityButtonText}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={removeItem}>
        <View style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Retirer du panier</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  quantityButton: {
    backgroundColor: '#000000',
    padding: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  quantityButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  clearButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 16,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductInCart;
