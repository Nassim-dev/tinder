import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { LinearGradient } from 'expo-linear-gradient';
import SignupScreen from './components/SignupScreen';
import LoginScreen from './components/LoginScreen';
import config from './tamagui.config';

export default function App() {
  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
        <LinearGradient
          colors={[
            'rgba(106,12,12,1)',
            'rgba(230,9,9,1)',
            'rgba(165,18,18,1)',
            'rgba(85,5,5,1)',
          ]}
          style={styles.gradient}
        >
          <Text style={styles.title}>Tinder</Text>
          <SignupScreen />
        </LinearGradient>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff', 
  },
});
