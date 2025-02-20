import React, { useState, useRef } from 'react';
import { 
  SafeAreaView,
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Animated 
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 12.99,
      quantity: 2,
      image: require('./user1.jpg'),
      description: 'Classic tomato and mozzarella',
      options: ['Large', 'Extra Cheese'],
    },
    {
      id: '2',
      name: 'Garlic Bread',
      price: 4.99,
      quantity: 1,
      image: require('./user1.jpg'),
      description: 'Freshly baked with garlic butter',
      options: ['Family Pack'],
    },
    {
      id: '3',
      name: 'Caesar Salad',
      price: 8.99,
      quantity: 3,
      image: require('./user1.jpg'),
      description: 'Fresh greens with croutons',
      options: ['Extra Dressing'],
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCartItems(items => items.filter(item => item.id !== id));
      fadeAnim.setValue(1);
    });
  };

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {/* Header */}
      <View style={s`flex-row justify-between items-center px-4 py-3 border-b border-gray-100`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="left" size={20} color="#FF3D44" />
        </TouchableOpacity>
        <Text style={[s`text-lg text-gray-800`, { fontFamily: 'Outfit-Bold' }]}>
          Your Cart
        </Text>
        <Icon name="shoppingcart" size={20} color="#FF3D44" />
      </View>

      {cartItems.length === 0 ? (
        <View style={s`flex-1 justify-center items-center`}>
          <Icon name="shoppingcart" size={48} color="#FF3D44" style={s`opacity-30 mb-4`} />
          <Text style={[s`text-base text-gray-500`, { fontFamily: 'Outfit-Regular' }]}>
            Your cart is empty
          </Text>
        </View>
      ) : (
        <>
          <ScrollView 
            style={s`flex-1`} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={s`pb-24`}
          >
            <View style={s`p-4`}>
              {cartItems.map(item => (
                <Animated.View 
                  key={item.id}
                  style={[s`bg-white rounded-lg p-3 mb-3 shadow-sm`, { 
                    opacity: fadeAnim,
                    transform: [{ scale: fadeAnim }] 
                  }]}
                >
                  <View style={s`flex-row items-start`}>
                    <Image 
                      source={item.image} 
                      style={s`w-20 h-20 rounded-lg`} 
                    />
                    <View style={s`flex-1 ml-3`}>
                      <View style={s`flex-row justify-between items-start`}>
                        <View style={s`flex-1`}>
                          <Text 
                            style={[s`text-base text-gray-800 mb-1`, { fontFamily: 'Outfit-Medium' }]}
                            numberOfLines={1}
                          >
                            {item.name}
                          </Text>
                          <Text 
                            style={[s`text-xs text-gray-400 mb-2`, { fontFamily: 'Outfit-Regular' }]}
                            numberOfLines={1}
                          >
                            {item.description}
                          </Text>
                        </View>
                        <TouchableOpacity 
                          onPress={() => removeItem(item.id)}
                          style={s`p-1`}
                        >
                          <Icon name="close" size={16} color="#6B7280" />
                        </TouchableOpacity>
                      </View>

                      <View style={s`flex-row flex-wrap mb-2`}>
                        {item.options.map((option, index) => (
                          <View 
                            key={index} 
                            style={s`bg-red-50 rounded-full px-2 py-1 mr-2 mb-1`}
                          >
                            <Text style={[s`text-xs text-red-500`, { fontFamily: 'Outfit-Medium' }]}>
                              {option}
                            </Text>
                          </View>
                        ))}
                      </View>

                      <View style={s`flex-row justify-between items-center`}>
                        <Text style={[s`text-base text-red-500`, { fontFamily: 'Outfit-Medium' }]}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </Text>
                        
                        <View style={s`flex-row items-center bg-gray-50 rounded-lg`}>
                          <TouchableOpacity 
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            style={s`px-3 py-1`}
                          >
                            <Icon name="minus" size={14} color="#FF3D44" />
                          </TouchableOpacity>
                          
                          <Text style={[s`px-2 text-gray-800`, { fontFamily: 'Outfit-Medium' }]}>
                            {item.quantity}
                          </Text>
                          
                          <TouchableOpacity 
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            style={s`px-3 py-1`}
                          >
                            <Icon name="plus" size={14} color="#FF3D44" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </ScrollView>

          {/* Checkout Footer */}
          <View style={[s`absolute bottom-0 left-0 right-0 bg-white pt-3`, styles.shadow]}>
            <View style={s`px-4 pb-3`}>
              <View style={s`flex-row justify-between items-center mb-3`}>
                <Text style={[s`text-gray-500`, { fontFamily: 'Outfit-Regular' }]}>
                  Total Amount
                </Text>
                <Text style={[s`text-lg text-gray-800`, { fontFamily: 'Outfit-Bold' }]}>
                  ${total.toFixed(2)}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={s`bg-red-500 rounded-lg py-3 items-center`}
                activeOpacity={0.9}
              >
                <Text style={[s`text-white text-base`, { fontFamily: 'Outfit-Medium' }]}>
                  Checkout Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CartScreen;