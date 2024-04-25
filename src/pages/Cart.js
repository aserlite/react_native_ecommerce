import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../App';
import ProductInCart from '../components/ProductInCart';

const Cart = ({ navigation }) => {
  const { cart, getCartTotal, clearCart, emptyCart } = useContext(CartContext);
  const cartTotal = getCartTotal();
  
  const isCart = () => {
    const empty = emptyCart();
    if(empty){
      return true
    }else{
      return false
    }
  }

  const proceedPaiement = () => {
    navigation.navigate('Paiement');
  };

  return (
    <View style={styles.container}>
      {isCart() === true ? (
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.total}>Total : {cartTotal} $</Text>
            <TouchableOpacity style={styles.clearButton} onPress={clearCart}>
              <Text style={styles.clearButtonText}>Vider le panier</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.scrollView}>
            {cart && cart.map((product,index) => (
              <ProductInCart key={index} product={product} />
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.paiement} onPress={proceedPaiement}>
            <Text style={styles.clearButtonText}>Valider ma commande</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.empty}>Votre Panier est vide</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  empty: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#c41d1d',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  paiement: {
    backgroundColor: '#1f8f25',
    padding: 15,
    borderRadius: 5,
    margin: 25,
    marginBottom: 50,
  },
});

export default Cart;
