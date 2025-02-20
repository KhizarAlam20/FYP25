//context api to set state from FoodDetection to either 1 or 0

import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    const [showButton, setShowButton] = useState(false); 
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkLoginStatus = async () => {
        const userData = await AsyncStorage.getItem('@auth');
        if (userData) {
          setIsAuthenticated(true);  
          console.log('AUTHENTICATION: ' + isAuthenticated)
        }
      };
  
      checkLoginStatus();
    }, []);
  
    return (
      <FoodContext.Provider value={{isAuthenticated, setIsAuthenticated, showButton, setShowButton }}>
        {children}
      </FoodContext.Provider>
    );
  };
  
  export const useFoodContext = () => {
    return useContext(FoodContext);
  };