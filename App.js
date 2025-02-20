import React, { useEffect } from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native'; // Import NavigationContainer
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'; // Import
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgetScreen from './src/screens/ForgetScreen';
import Home from './assets/svg/svgnew/Home';
import CircleIcon from './assets/svg/svgnew/CircleIcon';
import List from './assets/svg/svgnew/List';
import AddScreen from './src/screens/AddScreen';
import Add from './assets/svg/svgnew/Add';
import OrderScreen from './src/screens/OrderScreen';
import Fav from './assets/svg/svgnew/Fav';
import ProfileScreen from './src/screens/ProfileScreen';
import Profile from './assets/svg/svgnew/Profile';
import OtpScreen from './src/screens/OtpScreen';
import SplashScreen from './src/screens/SplashScreen';
import LocationScreen from './src/screens/LocationScreen';
// import HomeScreen from './src/screens/HomeScreen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Feather';
import UsernameScreen from './src/screens/UsernameScreen';
import SearchScreen from './src/screens/SearchScreen';
import CourseScreen from './src/screens/CourseScreen';
import {FoodProvider, useFoodContext} from './src/Context/FoodContext';
import UploadContentData from './src/screens/UploadContentData';
import ChatScreen from './src/screens/ChatScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfessionalDashboardScreen from './src/screens/ProfessionalDashboardScreen ';

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <FoodProvider>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="UsernameScreen" component={UsernameScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgetScreen" component={ForgetScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="CourseScreen" component={CourseScreen} />
        <Stack.Screen name="UploadContentData" component={UploadContentData} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
        <Stack.Screen name="ProfessionalDashboardScreen" component={ProfessionalDashboardScreen} />

        <Stack.Screen name="MainAppTabs" component={MainAppTabs} />
      </Stack.Navigator>
    </FoodProvider>
  );
}

function MainAppTabs() {
  
  
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.9)', // Semi-transparent black background
          height: 50, // Set height of the tab bar
          paddingHorizontal: 20,
          paddingVertical: 3,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
         
        },
        
        tabBarActiveTintColor: '#FFFFFF', // White for active icons
        tabBarInactiveTintColor: '#777777', // Gray for inactive icons
        
        tabBarLabel: () => null,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Home color={focused ? '#FFFFFF' : '#777777'} />
          ),
          headerShown: false,
        
        }}
      />

      <Tab.Screen
        name="Discover"
        component={SearchScreen} // You might want to rename this component
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="search1"
              size={24}
              color={focused ? '#FFFFFF' : '#777777'}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({focused}) => (
            // <View style={styles.addButton}>
            <Icon
              name="plus"
              size={24}
              color={focused ? '#FFFFFF' : '#777777'}
            />
            // </View>
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={OrderScreen} // Replace with actual Inbox component
        options={{
          tabBarIcon: ({focused}) => (
            <Icons
              name="shopping-bag"
              size={24}
              color={focused ? '#FFFFFF' : '#777777'}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Profile colors={focused ? '#FFFFFF' : '#777777'} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  

  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <AuthStack />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    padding: 8,
    marginTop: -20, // Raise the button slightly
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
  },
});

export default App;
