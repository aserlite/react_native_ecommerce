import React, { createContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import HomePage from './src/pages/HomePage';
import DetailPage from './src/pages/DetailPage';
import Cart from './src/pages/Cart';
import Paiement from './src/pages/Paiement';
import Checkout from './src/pages/Checkout';

export const CartContext = createContext();

const Stack = createNativeStackNavigator();

const App = () => {
  const [cart, setCart] = useState([]);

  const getById = (id) => {
    return cart.find((item) => {
      return item.id === id;
    })
  }

  const addToCart = (item) => {
    let itemAlreadyInCart = false;
    const updatedCart = cart.map((cartItem) => {
      if (cartItem.id === item.id) {
        itemAlreadyInCart = true;
        cartItem.incart++;
      }
      return cartItem;
    });

    if (!itemAlreadyInCart) {
      item.incart = 1;
      updatedCart.push(item);
    }

    setCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => {
      return item.id != itemId;
    });
    setCart(updatedCart);
  };

  const removeOneFromCart = (itemId) => {
    const newCart = []
    cart.forEach((cartItem) => {
      if (cartItem.id === itemId) {
        if (cartItem.incart - 1 === 0) {
          return
        } else {
          cartItem.incart--;
        }
      }
      newCart.push(cartItem)
    });
    setCart(newCart);

  };

  const emptyCart = () => {
    if (cart.length !== 0) {
      return true
    } else {
      return false
    }
  }

  const updateCartItem = (itemId, updatedValues) => {
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return { ...item, ...updatedValues };
      } else {
        return item;
      }
    });
    setCart(updatedCart);
  };

  const getCartTotal = () => {
    let total = 0;
    if (!cart.length) return 0
    cart.forEach((cartItem) => {
      total += cartItem.price * cartItem.incart;
    });
    return Math.round(total * 100) / 100;
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart,updateCartItem ,getById, addToCart, emptyCart, removeFromCart, removeOneFromCart, getCartTotal, clearCart }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomePage"
            component={HomePage}
            options={({ navigation }) => ({
              title: 'Accueil',
              headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <View style={{ marginRight: 20 }}>
                    <Ionicons name="cart-outline" size={24} color="black" />
                  </View>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen name="DetailPage" component={DetailPage} options={{ title: 'Page produit' }} />
          <Stack.Screen name="Cart" component={Cart} options={{ title: 'Panier' }} />
          <Stack.Screen name="Paiement" component={Paiement} options={{ title: 'Récapitulatif de votre commande' }} />
          <Stack.Screen name="Checkout" component={Checkout} options={{ title: 'Checkout' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
};

export default App;
