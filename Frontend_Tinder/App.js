import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import MessagerieScreen from './components/MessagerieScreen';
import SettingScreen from './components/SettingScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { BackendUrlProvider } from './BackendUrlContext';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs()

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ setIsSignedIn }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(165,18,18,1)',
        },
        tabBarActiveTintColor: 'white', 
        tabBarInactiveTintColor: 'rgba(85,5,5,1)', 
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Messagerie"
        component={MessagerieScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mon profil"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
        component={(props) => <SettingScreen {...props} setIsSignedIn={setIsSignedIn} />} // Utiliser ici le prop `component`
      />
    </Tab.Navigator>
  );
}

function AuthStack({ setIsSignedIn }) {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        children={(props) => <LoginScreen {...props} setIsSignedIn={setIsSignedIn} />}
      />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <BackendUrlProvider>
      <NavigationContainer>
        {isSignedIn ? <MainTabs /> : <AuthStack setIsSignedIn={setIsSignedIn} />}
      </NavigationContainer>
    </BackendUrlProvider>
  );
}
