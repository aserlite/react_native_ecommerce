import React, { useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { CartContext } from '../../App';
import ProductInPaiement from '../components/ProductInPaiement';

const Cart = ({ navigation }) => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const cartTotal = getCartTotal();
  const itemCount = cart.reduce((total, product) => total + product.incart, 0);

  const proceedPaiement = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.total}>Total : {cartTotal} $</Text>
          <Text style={styles.itemCount}>{itemCount} {itemCount > 1 ? 'articles' : 'article'} dans le panier</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={proceedPaiement}>
          <Text style={styles.clearButtonText}>Payer ma commande</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {cart.map((product) => (
          <ProductInPaiement key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  itemCount: {
    fontSize: 14,
    color: '#888888',
  },
  checkoutBtn: {
    backgroundColor: '#1f8f25',
    padding: 10,
    borderRadius: 5,
  },
  clearButtonText: {
    color: '#FFFFFF',
    textAlign:'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
