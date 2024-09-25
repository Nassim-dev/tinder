import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { LinearGradient } from 'expo-linear-gradient';
import config from '../tamagui.config';

const LoginChoiceScreen = ({ navigation }) => {
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
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.btnText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.btnText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
      </Theme>
    </TamaguiProvider>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  btnText: {
    color: 'rgba(165,18,18,1)',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LoginChoiceScreen;
