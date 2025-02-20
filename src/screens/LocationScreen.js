import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, FlatList, Keyboard, Platform, TextInput, KeyboardAvoidingView } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { register } from '../services/api';
import {MAP_API} from "@env"
const LocationScreen = ({navigation}) => {
  const route = useRoute();
  const {email,password,phone,username} = route.params;

  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 24.8607,
    longitude: 67.0011,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const GOOGLE_MAPS_API_KEY =`${MAP_API}`; 

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.length > 2) {
        fetchSuggestions();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${GOOGLE_MAPS_API_KEY}&components=country:pk`
      );
      
      if (response.data.status === 'OK') {
        setSuggestions(response.data.predictions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionSelect = async (placeId) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${placeId}&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      if (response.data.status === 'OK') {
        const { lat, lng } = response.data.results[0].geometry.location;
        const newLocation = { latitude: lat, longitude: lng };
        
        setLocation(newLocation);
        setAddress(response.data.results[0].formatted_address);
        setMapRegion(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng,
        }));
        setSuggestions([]);
        Keyboard.dismiss();
      }
    } catch (error) {
      console.error('Error fetching location details:', error);
    }
  };

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
      );

      if (response.data.status === 'OK') {
        setAddress(response.data.results[0].formatted_address);
      }
    } catch (error) {
      alert('Error fetching address');
    }
  };

  const handleMapPress = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setLocation({ latitude, longitude });
    getAddressFromCoordinates(latitude, longitude);
    setSuggestions([]);
  };

  const handleConfirmLocation = async () => {
    console.log('username = ' + username);


    const registerUser = await register(username,email,phone,password,location.longitude,location.latitude);
    console.log("-> User registered successfully");

    navigation.navigate('MainAppTabs');
  };

  const renderSuggestionItem = ({ item }) => (
    <TouchableOpacity
      style={s`p-3 border-b border-gray-200`}
      onPress={() => handleSuggestionSelect(item.place_id)}
    >
      <Text style={[s`text-gray-600`, { fontFamily: 'Outfit-Regular' }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s`flex-1`}>
      {/* Full-screen Map */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={s`absolute top-0 left-0 right-0 bottom-0`}
        onPress={handleMapPress}
        region={mapRegion}
      >
        {location && <Marker coordinate={location} />}
      </MapView>

      {/* Header with Search */}
      <View style={s`absolute top-0 left-0 right-0 pt-4 pb-2 bg-white shadow-md px-4`}>
        <Text style={[s`text-2xl text-gray-800 mb-2`, { fontFamily: 'Outfit Bold' }]}>
          Select Location
        </Text>
        <Text>{username}{email}{password}{phone}</Text>
        
        <View style={s`bg-gray-100 rounded-xl px-4 py-2 flex-row items-center`}>
          <Icon name="search1" size={20} color="#666" />
          <TextInput
            style={[s`flex-1 ml-3 text-gray-600`, { fontFamily: 'Outfit-Regular' }]}
            placeholder="Search for an address..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setSuggestions([])}
          />
        </View>

        {suggestions.length > 0 && (
          <View style={s`mt-2 max-h-40 bg-white rounded-lg shadow-lg`}>
            <FlatList
              data={suggestions}
              renderItem={renderSuggestionItem}
              keyExtractor={(item) => item.place_id}
              keyboardShouldPersistTaps="always"
            />
          </View>
        )}
      </View>

      {/* Bottom Card */}
      <View style={s`absolute bottom-0 left-0 right-0`}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={s`bg-white mx-5 mb-5 p-5 rounded-xl shadow-lg`}
        >
          <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4`}>
            <Icon name="enviroment" size={20} color="#666" />
            <Text 
              style={[s`flex-1 ml-3 text-gray-500`, { fontFamily: 'Outfit-Regular' }]}
              numberOfLines={2}
            >
              {address || 'Tap on map to select location'}
            </Text>
          </View>

          <TouchableOpacity
            style={[s`rounded-xl py-4 items-center`, { backgroundColor: '#FF3D44' }]}
            onPress={handleConfirmLocation}
          >
            <Text style={[s`text-white text-xl`, { fontFamily: 'Outfit-Medium' }]}>
              Confirm Location
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LocationScreen;