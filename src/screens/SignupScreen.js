import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Vibration,
} from 'react-native';
import { s } from 'react-native-wind';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation, useRoute } from '@react-navigation/native';
import { signup } from '../services/api';

const SignupScreen = () => {
  const navigation = useNavigation();
  
  //fetchusername
  const route = useRoute();
  const { username } = route.params;

console.log("username is " + username);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    try {
      navigation.navigate('LocationScreen',
        {
          email: email,
          password: password,
          phone: phone,
          username: username,
        });
    } catch (error) {
      console.log('Error signing up:', error.message);
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleSocialSignup = platform => {
    navigation.navigate('OtpScreen');
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 justify-center`}>
        
        {/* Header */}
        <View style={s`items-center mb-12`}>
          <Text style={[s`text-2xl text-gray-800`, { fontFamily: 'Outfit Bold' }]}>
            Create Account
          </Text>
          {/* <Text>{username}</Text> */}
        </View>

        {/* Signup Form */}
        <View style={s`px-10`}>
          {/* Email Input */}
          <View style={s`mb-5`}>
            <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="mail" size={20} color="#666" />
              <TextInput
                style={[s`flex-1 ml-3 text-gray-500`, { fontFamily: 'Outfit-Regular' }]}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#00000050"
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={s`mb-5`}>
            <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="phone" size={20} color="#666" />
              <TextInput
                style={[s`flex-1 ml-3 text-gray-500`, { fontFamily: 'Outfit-Regular' }]}
                placeholder="Enter your phone number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#00000050"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={s`mb-6`}>
            <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="lock" size={20} color="#666" />
              <TextInput
                style={[s`flex-1 ml-3 text-gray-800`, { fontFamily: 'Outfit-Regular' }]}
                placeholder="Create password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#00000050"
              />
              <TouchableOpacity
                onPressIn={() => {
                  setShowPassword(true);
                  Vibration.vibrate(100);
                }}
                onPressOut={() => setShowPassword(false)}
              >
                <Icon name={showPassword ? 'eye' : 'eyeo'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Signup Button */}
          <TouchableOpacity
            style={[s`rounded-2xl py-4 mb-4 items-center`, { backgroundColor: '#FF3D44' }]}
            onPress={handleSignup}
          >
            <Text style={[s`text-white text-xl`, { fontFamily: 'Outfit-Medium' }]}>
              Sign Up
            </Text>
          </TouchableOpacity>

          {/* Social Signup Options */}
          <View style={s`mb-6`}>
            <View style={s`flex-row items-center mt-7`}>
              <View style={s`flex-1 h-0.5 bg-gray-200`} />
              <Text style={[s`mx-4 text-gray-500`, { fontFamily: 'Outfit-Regular' }]}>
                or continue with
              </Text>
              <View style={s`flex-1 h-0.5 bg-gray-200`} />
            </View>
            <View style={s`flex-row justify-center space-x-4`}>
              <TouchableOpacity
                style={s`bg-white border border-gray-200 rounded-2xl p-3 mt-5 flex-1 items-center flex-row justify-center`}
                onPress={() => handleSocialSignup('Google')}
              >
                <Icon name="google" size={20} color="#DB4437" />
                <Text style={[s`ml-2 text-gray-800`, { fontFamily: 'Outfit-Medium' }]}>
                  Google
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Link */}
          <View style={s`flex-row justify-center mt-3`}>
            <Text style={[s`text-gray-600`, { fontFamily: 'Outfit-Regular' }]}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={[s`text-primary`, { fontFamily: 'Outfit-Medium' }]}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignupScreen;