import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bleachIcon from '../assets/Do Not Bleach.png';
import tumbleDryIcon from '../assets/Do Not Tumble Dry.png';
import dryCleanIcon from '../assets/Do Not Wash.png';
import ironIcon from '../assets/Iron Low Temperature.png';
import shippingIcon from '../assets/Shipping.png';
import arrowIcon from '../assets/Up.png';
import addToBasketIcon from '../assets/Plus.png';
import heartIcon from '../assets/Heart.png';
import productIcon from '../assets/Export.png';
import logo from '../assets/Logo.png';
import menuIcon from '../assets/Menu.png';
import closeIcon from '../assets/Close.png';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const [cart, setCart] = useState([]);
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
            <Text style={styles.menuHeader}>WORNOR BELIEVE</Text>
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

      <ScrollView style={styles.scrollContainer} contentContainerStyle={{ paddingBottom: 100 }}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">{product.title}</Text>
            <Image source={productIcon} style={styles.productIcon} />
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>
          
          <View style={styles.materials}>
            <Text style={styles.sectionHeader}>MATERIALS</Text>
            <Text style={styles.text}>We work with monitoring programmes to ensure compliance with safety, health, and quality standards for our products.</Text>
            <View style={styles.materialItem}>
              <Image source={bleachIcon} style={styles.materialIcon} />
              <Text style={styles.text}>Do not use bleach</Text>
            </View>
            <View style={styles.materialItem}>
              <Image source={tumbleDryIcon} style={styles.materialIcon} />
              <Text style={styles.text}>Do not tumble dry</Text>
            </View>
            <View style={styles.materialItem}>
              <Image source={dryCleanIcon} style={styles.materialIcon} />
              <Text style={styles.text}>Dry clean with tetrachloroethylene</Text>
            </View>
            <View style={styles.materialItem}>
              <Image source={ironIcon} style={styles.materialIcon} />
              <Text style={styles.text}>Iron at a maximum of 110ºC/230ºF</Text>
            </View>
          </View>
          
          <View style={styles.shipping}>
            <View style={styles.shippingTextContainer}>
              <Image source={shippingIcon} style={styles.shippingIcon} />
              <Text style={styles.sectionHeader}>Free Flat Rate Shipping</Text>
              <Image source={arrowIcon} style={styles.shippingEndIcon} />
            </View>
          </View>
          <Text style={styles.time}>Estimated to be delivered on 09/11/2021 - 12/11/2021.</Text>
        </View>
      </ScrollView>
        
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
          <Image source={addToBasketIcon} style={styles.bottomIcon} />
          <Text style={styles.addButtonText}>ADD TO BASKET</Text>
          <Image source={heartIcon} style={styles.heartIcon} />
        </TouchableOpacity>  
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  icon: {
    padding: 10,
  },
  headerIcons: {
    flexDirection: 'row',
  },  
  scrollContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
  infoContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  productIcon: {
    marginLeft: 10,
    marginBottom: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 16,
    marginBottom: 40,
    padding: 30,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  materials: {
    marginBottom: 20,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  materialIcon: {
    width: 30,
    height: 24,
    marginRight: 10,
    marginBottom: 10,
  },
  shipping: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingIcon: {
    width: 30,
    height: 24,
    marginRight: 10,
  },
  shippingEndIcon: {
    width: 30,
    height: 24,
    marginLeft: 60,
  },
  shippingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderColor: '#eee',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    padding: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    
  },
  bottomIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  heartIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
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
    padding: 10,
    justifyContent: 'flex-start',
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
  menuItemText: {
    fontSize: 18,
  },
});

export default ProductDetailScreen;
