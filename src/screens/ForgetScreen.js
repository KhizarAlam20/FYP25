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
import { useNavigation } from '@react-navigation/native';
import { resetPassword } from '../services/api';

const ForgotScreen = () => {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = async () => {
    // Basic validation
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long');
      return;
    }

    try {
      await resetPassword(newPassword);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error resetting password:', error.message);
      setErrorMessage('Failed to reset password. Please try again.');
    }
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 justify-center`}>
        
        {/* Header */}
        <View style={s`items-center mb-12`}>
          <Text style={[s`text-2xl text-gray-800`, { fontFamily: 'Outfit Bold' }]}>
            Reset Password
          </Text>
          <Text style={[s`text-gray-500 mt-2 text-center px-10`, { fontFamily: 'Outfit-Regular' }]}>
            Please enter your new password
          </Text>
        </View>

        {/* Reset Password Form */}
        <View style={s`px-10`}>
          {/* New Password Input */}
          <View style={s`mb-5`}>
            <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="lock" size={20} color="#666" />
              <TextInput
                style={[s`flex-1 ml-3 text-gray-800`, { fontFamily: 'Outfit-Regular' }]}
                placeholder="Enter new password"
                value={newPassword}
                onChangeText={(text) => {
                  setNewPassword(text);
                  setErrorMessage('');
                }}
                secureTextEntry={!showNewPassword}
                placeholderTextColor="#00000050"
              />
              <TouchableOpacity
                onPressIn={() => {
                  setShowNewPassword(true);
                  Vibration.vibrate(100);
                }}
                onPressOut={() => setShowNewPassword(false)}
              >
                <Icon name={showNewPassword ? 'eye' : 'eyeo'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View style={s`mb-6`}>
            <View style={s`flex-row items-center bg-gray-100 rounded-xl px-4 py-2`}>
              <Icon name="lock" size={20} color="#666" />
              <TextInput
                style={[s`flex-1 ml-3 text-gray-800`, { fontFamily: 'Outfit-Regular' }]}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrorMessage('');
                }}
                secureTextEntry={!showConfirmPassword}
                placeholderTextColor="#00000050"
              />
              <TouchableOpacity
                onPressIn={() => {
                  setShowConfirmPassword(true);
                  Vibration.vibrate(100);
                }}
                onPressOut={() => setShowConfirmPassword(false)}
              >
                <Icon name={showConfirmPassword ? 'eye' : 'eyeo'} size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={[s`text-red-500 mb-4 text-center`, { fontFamily: 'Outfit-Regular' }]}>
              {errorMessage}
            </Text>
          ) : null}

          {/* Password Requirements */}
          <View style={s`mb-6`}>
            <Text style={[s`text-gray-500 mb-2`, { fontFamily: 'Outfit-Regular' }]}>
              Password must:
            </Text>
            <Text style={[s`text-gray-500 ml-4`, { fontFamily: 'Outfit-Regular' }]}>
              • Be at least 6 characters long
            </Text>
            <Text style={[s`text-gray-500 ml-4`, { fontFamily: 'Outfit-Regular' }]}>
              • Include both letters and numbers
            </Text>
          </View>

          {/* Reset Button */}
          <TouchableOpacity
            style={[s`rounded-2xl py-4 mb-9 items-center`, { backgroundColor: '#FF3D44' }]}
            onPress={handleResetPassword}
          >
            <Text style={[s`text-white text-xl`, { fontFamily: 'Outfit-Medium' }]}>
              Reset Password
            </Text>
          </TouchableOpacity>

          {/* Back to Login */}
          <TouchableOpacity 
            style={s`items-center`}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={[s`text-primary`, { fontFamily: 'Outfit-Medium' }]}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotScreen;