import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, RefreshControl, StyleSheet } from 'react-native';
import { fetchProducts } from "../utils/api";
import ProductCart from '../components/ProductCart';
import Slider from '@react-native-community/slider';
import {Picker} from '@react-native-picker/picker';


const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [minRating, setMinRating] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      const uniqueCategories = [...new Set(data.map((product) => product.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const refreshFunction = () => {
    getProducts();
  };

  const filteredProducts = products.filter((product) => {
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false;
    }
    return product.rating.rate >= minRating;
  });

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={categoryFilter}
        onValueChange={(itemValue) => setCategoryFilter(itemValue)}
      >
        <Picker.Item label="Toutes les catégories" value="all" />
        {categories.map((category) => (
          <Picker.Item key={category} label={category} value={category} />
        ))}
      </Picker>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>Note minimale : {minRating}</Text>
        <Slider
          style={{ width: 200, height: 40 }}
          minimumValue={1}
          maximumValue={5}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          step={0.25}
          value={minRating}
          onValueChange={value => setMinRating(value)}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="purple" style={styles.loader} />
      ) : filteredProducts.length === 0 ? (
        <Text style={styles.noProductText}>Aucun produit trouvé.</Text>
      ) : (
        <ScrollView
          style={styles.scrollView}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refreshFunction} />}
        >
          <View style={styles.productsContainer}>
            {filteredProducts.map((product) => (
              <ProductCart key={product.id} product={product} navigation={navigation} />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 20,
  },
  noProductText: {
    paddingHorizontal: 20,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  slider: {
    width: '100%',
  },
});

export default Home;
