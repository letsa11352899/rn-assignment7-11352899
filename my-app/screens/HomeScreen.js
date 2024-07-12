import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, ImageBackground, StyleSheet, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import addCircleIcon from '../assets/add_circle.png';
import filterIcon from '../assets/Filter.png';
import listViewIcon from '../assets/Listview.png';
import logo from '../assets/Logo.png';
import menuIcon from '../assets/Menu.png';
import closeIcon from '../assets/Close.png';

const HomeScreen = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('cart');
        if (storedCart) {
          setCart(JSON.parse(storedCart));
        }
      } catch (error) {
        console.error('Error loading cart from AsyncStorage:', error);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    const itemInCart = cart.some(item => item.id === product.id);
    if (!itemInCart) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={toggleMenu}>
          <Image source={menuIcon} style={styles.iconImage} />
        </TouchableOpacity>
        <Image source={logo} style={styles.logoImage} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}>
            <Image source={require('../assets/Search.png')} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Cart')}>
            <Image source={require('../assets/shopping bag.png')} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal visible={showMenu} transparent animationType="slide">
        <View style={styles.menuOverlay}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleMenu}>
              <Image source={closeIcon} style={styles.closeIconImage} />
            </TouchableOpacity>
            <Text style={styles.menuHeader}>LETSA ERIC</Text>
            <View style={styles.menuItemsContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.menuItemText}>Store</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Locations')}>
                <Text style={styles.menuItemText}>Locations</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Blog')}>
                <Text style={styles.menuItemText}>Blog</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Jewelry')}>
                <Text style={styles.menuItemText}>Jewelry</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Electronic')}>
                <Text style={styles.menuItemText}>Electronic</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Clothing')}>
                <Text style={styles.menuItemText}>Clothing</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.storyContainer}>
        <Text style={styles.storyHeader}>OUR STORY</Text>
        <View style={styles.filterListIcons}>
          <TouchableOpacity style={styles.icon}>
            <Image source={listViewIcon} style={styles.iconImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image source={filterIcon} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })} style={styles.productContainer}>
            <ImageBackground source={{ uri: item.image }} style={styles.image}>
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.plusIconContainer}>
                <Image source={addCircleIcon} style={styles.plusIcon} />
              </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.productName}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
        <Text style={styles.cartButtonText}>Go to Cart ({cart.length})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  closeIcon: {
    marginTop: 20,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  menuOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    width: '70%',
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  
  menuHeader: {
    fontSize: 24,
    textAlign: 'left',
    marginTop: 15,
    borderBottomWidth: 1,
    borderColor: "#FF5733",
  },
  menuItemsContainer: {
    marginTop: 10,
  },
  menuItem: {
    paddingVertical: 10,
  },
  menuItemText: {
    fontSize: 18,
  },
  storyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  storyHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  filterListIcons: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  productContainer: {
    flex: 1,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  plusIconContainer: {
    padding: 6,
    margin: 10,
  },
  plusIcon: {
    tintColor: '#FF0027',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  price: {
    fontSize: 16,
    color: '#ff4500',
    marginTop: 5,
    textAlign: 'center',
  },
  cartButton: {
    marginTop: 20,
    backgroundColor: '#000',
    padding: 15,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HomeScreen;
