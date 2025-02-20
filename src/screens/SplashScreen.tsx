import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Navigate to the HomeScreen after 5 seconds
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 5000);

    // Cleanup the timer on unmount
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Koala</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF3D44',
  },
  text: {
    fontSize: 30,
    color: 'white',
    fontFamily:"Outfit-Medium"
  },
});

export default SplashScreen;
