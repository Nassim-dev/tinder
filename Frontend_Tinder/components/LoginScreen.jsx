import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { LinearGradient } from 'expo-linear-gradient';
import config from '../tamagui.config';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });

      if (response.data.success) {
        navigation.navigate('MainApp');
      } else {
        setError('Informations incorrectes.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    }
  };

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
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Se connecter</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    width: '80%',
  },
  btn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  btnText: {
    color: 'rgba(165,18,18,1)',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
