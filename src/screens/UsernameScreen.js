import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { checkUsername, checkUsernameAvailability } from '../services/api'; // Add your API for checking the username

const UsernameScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true); // Track availability

  const handleUsernameCheck = async () => {
    // try {
    //   // Validate the username
    //   const isUnique = await checkUsernameAvailability(username); // API call to check if username exists

    //   if (isUnique) {
    //     // If unique, navigate to Signup screen
    //     navigation.navigate('SignupScreen', { username });
    //   } else {
    //     // If username already exists, show an error
    //     setIsUsernameAvailable(false);
    //     Vibration.vibrate(100); // Optional: Vibrate when username is not available
    //   }
    // } catch (error) {
    //   console.log('Error checking username:', error.message);
    //   // Handle error message here
    // }
    try{
        const login = await checkUsername(username)
        
        if(login.message === 'available'){
            setIsUsernameAvailable(true);
            Vibration.vibrate(300);
            navigation.navigate("SignupScreen",{username})
        }else{
          console.log('Please choose another username:', login.message);
            setIsUsernameAvailable(false);
            Vibration.vibrate(100);
        }

      }catch(error) {
        setIsUsernameAvailable(false);
        console.log('Error logging in:', error.message);   
        // Handle error message here
      }
    // navigation.navigate("SignupScreen",{username})
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <View style={s`flex-1 justify-center px-10`}>
        <Text style={[s`text-2xl text-gray-800`, { fontFamily: 'Outfit Bold' }]}>
          Enter a Username
        </Text>

        {/* Username Input */}
        <View style={s`mb-6 mt-10`}>
          <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
            <Icon name="user" size={20} color="#666" />
            <TextInput
              style={[s`flex-1 ml-3 text-gray-500`, { fontFamily: 'Outfit-Regular' }]}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#00000050"
            />
          </View>
          {/* Show error if username is not available */}
          {!isUsernameAvailable && (
            <Text style={s`text-red-500 text-sm mt-2`}>
              Username is already taken. Please choose another one.
            </Text>
          )}
        </View>

        {/* Check Username Button */}
        <TouchableOpacity
          style={[s`rounded-2xl py-4 mb-4 items-center`, { backgroundColor: '#FF3D44' }]}
          onPress={handleUsernameCheck}
        >
          <Text style={[s`text-white text-xl`, { fontFamily: 'Outfit-Medium' }]}>
            Proceed
          </Text>
        </TouchableOpacity>

        {/* Navigation to Login */}
        <View style={s`flex-row justify-center mt-3`}>
          <Text style={[s`text-gray-600`, { fontFamily: 'Outfit-Regular' }]}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={[s`text-primary`, { fontFamily: 'Outfit-Medium' }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UsernameScreen;
