import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration, // Import Vibration module
} from 'react-native';
import {s} from 'react-native-wind'; // Assuming you're using a styling library
import Icon from 'react-native-vector-icons/AntDesign'; // Import from react-native-vector-icons
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkUsername, login, register} from '../services/api';
import Add from '../../assets/svg/svgnew/Add';
import FoodDoodleBackground from './FoodDoodleBackground';
import { useFoodContext } from '../Context/FoodContext';

const LoginScreen = () => {

  const navigation = useNavigation();
  const {isAuthenticated,setIsAuthenticated} = useFoodContext();



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(true);


  useEffect(() => {
    const checkLoginStatus = async () => {
        try {
            const storedData = await AsyncStorage.getItem('@auth');  // Retrieve stored data
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                // You can check if the data contains a valid token or whatever indicates the user is logged in
                console.log('User is already logged in');
                navigation.replace('MainAppTabs');  // Navigate to the home screen if logged in
            } else {
                console.log('No login data found');
                navigation.replace('LoginScreen');  // Navigate to login screen if no data
            }
        } catch (e) {
            console.log('Error reading data', e);
            navigation.replace('Login');
        }
    };

    checkLoginStatus();
}, [navigation]);


  const handleLogin = async () => {
    // // Add your login logic here
    console.log('Logging in with email:', email);
    try {
      const data = await login(email, password);
      try{
        await AsyncStorage.setItem('@auth', JSON.stringify(data)); 
        setIsAuthenticated(true); 
        console.log('Data stored successfully');
      }catch(e){
        console.log('Error storing data', e);
      }
     
      setIsPasswordCorrect(data); 
      navigation.navigate('MainAppTabs');
    } catch (error) {
   
      // Handle error message here
    }

    setIsPasswordCorrect(false);
    console.log('Error registering:', error.message);
    // navigation.navigate('MainAppTabs');

    // navigation.navigate('OtpScreen');
  };

  const handleSignup = () => {
    navigation.navigate('UsernameScreen');
  };

  const handleForget = () => {
    navigation.navigate('ForgetScreen');
  };

  const handleSocialLogin = platform => {
    console.log(`Logging in with ${platform}`);
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      {/* <FoodDoodleBackground/> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 justify-center`}>
        {/* Header with Logo */}
        <View style={s`items-center mb-12`}>
          <Text
            style={[s`text-2xl text-gray-800`, {fontFamily: 'Outfit Bold'}]}>
            Welcome
          </Text>
        </View>

        {/* Login Form */}
        <View style={s`px-10`}>
          {/* Email Input */}
          <View style={s`mb-5`}>
            {/* <Text style={[s`text-gray-500 mb-2`, { fontFamily: 'Outfit-Medium' }]}>
              Email
            </Text> */}
            <View
              style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="mail" size={20} color="#666" />
              <TextInput
                style={[
                  s`flex-1 ml-3 text-gray-500`,
                  {fontFamily: 'Outfit-Regular'},
                ]}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#00000050"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={s`mb-6 `}>
            {/* <Text style={[s`text-gray-500 mb-2`, { fontFamily: 'Outfit-Medium' }]}>
              Password
            </Text> */}
            <View
              style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="lock" size={20} color="#666" />
              <TextInput
                style={[
                  s`flex-1 ml-3 text-gray-800`,
                  {fontFamily: 'Outfit-Regular'},
                ]}
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#00000050"
              />
              <TouchableOpacity
                onPressIn={() => {
                  setShowPassword(true);
                  Vibration.vibrate(100); // Vibrate on press
                }}
                onPressOut={() => setShowPassword(false)}>
                <Icon
                  name={showPassword ? 'eye' : 'eyeo'}
                  size={20}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* if password not correct */}
            {!isPasswordCorrect && (
              <View
                style={s`flex-row mt-3 items-center bg-red-100 rounded-xl px-4 py-2`}>
                <Icon name="closecircle" size={20} color="#FF3D44" />
                <Text style={s`ml-2 text-red-500`}>
                  Incorrect username or password
                </Text>
              </View>
            )}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={s`items-end mb-5`} onPress={handleForget}>
            <Text style={[s`text-primary`, {fontFamily: 'Outfit-Medium'}]}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              s`rounded-2xl py-4 mb- items-center`,
              {backgroundColor: '#FF3D44'},
            ]}
            onPress={handleLogin}>
            <Text
              style={[s`text-white text-xl`, {fontFamily: 'Outfit-Medium'}]}>
              Login
            </Text>
          </TouchableOpacity>

          {/* Social Login Options */}
          <View style={s` mb-6`}>
            {/* Divider */}
            <View style={s`flex-row items-center mt-7`}>
              <View style={s`flex-1 h-0.5 bg-gray-200`} />
              <Text
                style={[s`mx-4 text-gray-500`, {fontFamily: 'Outfit-Regular'}]}>
                or continue with
              </Text>
              <View style={s`flex-1 h-0.5 bg-gray-200`} />
            </View>
            <View style={s`flex-row justify-center space-x-4`}>
              {/* Google Login Button */}
              <TouchableOpacity
                style={s`bg-white border border-gray-200 rounded-2xl p-4 mt-5 flex-1 items-center flex-row justify-center`}
                onPress={() => handleSocialLogin('Google')}>
                <Icon name="google" size={20} color="#DB4437" />
                <Text
                  style={[
                    s`ml-2 text-gray-800`,
                    {fontFamily: 'Outfit-Medium'},
                  ]}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={s`flex-row justify-center mt-3`}>
            <Text style={[s`text-gray-600`, {fontFamily: 'Outfit-Regular'}]}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={[s`text-primary`, {fontFamily: 'Outfit-Medium'}]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
