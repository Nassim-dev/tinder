import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import { View, Text, StyleSheet } from 'react-native';
import HomeScreen from './components/HomeScreen';
import MessagerieScreen from './components/MessagerieScreen';
import SettingScreen from './components/SettingScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen name="Login" component={LoginScreen} />  
      <Stack.Screen name="Signup" component={SignupScreen} /> 
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MessagerieScreen" component={MessagerieScreen} />
      <Stack.Screen name="SettingScreen" component={SettingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: 'rgba(165,18,18,1)',
  },
});
