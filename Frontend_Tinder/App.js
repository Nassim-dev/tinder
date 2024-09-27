import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import MessagerieScreen from './components/MessagerieScreen';
import ConversationsListScreen from './components/ConversationsListScreen';  // Ajout de l'écran de liste de conversations
import SettingScreen from './components/SettingScreen';
import LoginScreen from './components/LoginScreen';
import SignupScreen from './components/SignupScreen';
import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { Main } from 'tamagui';
import { BackendUrlProvider } from './BackendUrlContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MessagerieStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ConversationsList" 
        component={ConversationsListScreen} 
        options={{ headerShown: true, title: 'Conversations' }} 
      />
      <Stack.Screen 
        name="MessagerieScreen" 
        component={MessagerieScreen} 
        options={{ headerShown: true, title: 'Messages' }} 
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
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
        component={MessagerieStack}  // Utiliser le stack pour la messagerie
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mon profil"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-circle" size={size} color={color} />
          ),
        }}
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
