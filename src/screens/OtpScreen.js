import React, { useState, useEffect } from 'react';
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
import Icon from 'react-native-vector-icons/AntDesign'; // For the resend icon
import { useNavigation } from '@react-navigation/native';

const OtpScreen = () => {
  const navigation = useNavigation();

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    if (isTimerActive && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    }

    if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [isTimerActive, timer]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if the current one is filled
    if (text.length === 1 && index < 3) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleResendCode = () => {
    setTimer(60);
    setIsTimerActive(true);
    Vibration.vibrate(100); // Vibrate on resend
    // Add logic to resend OTP
    console.log('Resending OTP...');
  };

  const handleVerifyCode = () => {
    const otpCode = otp.join('');
    console.log('Verifying OTP:', otpCode);
    // Add your verification logic here
    navigation.navigate('LocationScreen'); // Navigate to HomeScreen on success
  };

  return (
    <SafeAreaView style={s`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={s`flex-1 justify-center px-10`}>
        
        {/* Header */}
        <View style={s`items-center mb-6`}>
          <Text style={[s`text-3xl text-gray-500`, { fontFamily: 'Outfit Bold' }]}>
            Enter OTP
          </Text>
          <Text style={[s`text-base text-gray-300`, { fontFamily: 'Outfit-Regular' }]}>
            Please check your email to proceed
          </Text>
        </View>

        {/* OTP Input */}
        <View style={s`flex-row justify-between mb-6`}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                s`w-14 h-14 text-center border border-gray-300 rounded-lg`,
                { fontFamily: 'Outfit-Regular', fontSize: 24 },
              ]}
              value={digit}
              onChangeText={text => handleOtpChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              autoFocus={index === 0}
              id={`otp-input-${index}`}
            />
          ))}
        </View>

        {/* Timer and Resend Button */}
        <View style={s`flex-row items-center justify-center mb-6`}>
          {isTimerActive ? (
            <Text style={[s`text-gray-500`, { fontFamily: 'Outfit-Regular' }]}>
              Resend in {timer}s
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResendCode} style={s`flex-row items-center`}>
              <Icon name="reload1" size={20} color="#FF3D44" />
              <Text style={[s`text-primary ml-2`, { fontFamily: 'Outfit-Medium' }]}>
                Resend Code
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[s`rounded-2xl py-4 items-center`, { backgroundColor: '#FF3D44' }]}
          onPress={handleVerifyCode}>
          <Text style={[s`text-white text-xl`, { fontFamily: 'Outfit-Medium' }]}>
            Verify Code
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OtpScreen;
