import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { CartContext } from '../../App';

const Checkout = ({ route, navigation }) => {
  const { cart, getCartTotal } = useContext(CartContext);
  const [shippingAddress, setShippingAddress] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const cartTotal = getCartTotal();
  const itemCount = cart.reduce((total, product) => total + product.incart, 0);

  const placeOrder = () => {
    validateShippingAddress();
    validateFullName();
    validateEmail();
    validatePhoneNumber();
    alert('Order placed!');
  };

  const validateShippingAddress = () => {
    if (shippingAddress.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer une adresse de livraison valide.');
    }
  };

  const validateFullName = () => {
    if (fullName.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer votre nom complet.');
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer une adresse email valide.');
    }
  };

  const validatePhoneNumber = () => {
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
      Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide (10 chiffres).');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total : {cartTotal} $</Text>
        <Text style={styles.summaryText}>{itemCount} {itemCount > 1 ? 'articles' : 'article'} dans le panier</Text>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse de livraison :</Text>
        <TextInput
          style={styles.input}
          value={shippingAddress}
          onChangeText={text => setShippingAddress(text)}
          placeholder="Entrez votre adresse de livraison"
          onBlur={validateShippingAddress}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nom complet :</Text>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={text => setFullName(text)}
          placeholder="Entrez votre nom complet"
          onBlur={validateFullName}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Adresse email :</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={text => setEmail(text)}
          placeholder="Entrez votre adresse email"
          keyboardType="email-address"
          onBlur={validateEmail}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Numéro de téléphone :</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
          placeholder="Entrez votre numéro de téléphone"
          keyboardType="phone-pad"
          onBlur={validatePhoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={placeOrder}>
        <Text style={styles.buttonText}>Valider la commande</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Checkout;
