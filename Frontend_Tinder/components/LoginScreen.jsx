import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Link } from 'react-native';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { LinearGradient } from 'expo-linear-gradient';
import config from '../tamagui.config';
import axios from 'axios';
import Logo from './Logo';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = ({setIsSignedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      console.log('response', response);
  
      if (response.status === 200) {
        setIsSignedIn(true);
        navigation.replace('Accueil');
        console.log('navigation', navigation);
      } else {
        setError('Informations incorrectes.');
      }
    } catch (err) {
      // Afficher l'erreur dans la console pour le débogage
      console.error('Erreur de connexion:', err);
  
      // Déterminer si l'erreur provient de la réponse du serveur
      if (err.response) {
        // Le serveur a répondu avec un code d'état hors de la plage 2xx
        setError(`Erreur: ${err.response.data.message || 'Une erreur est survenue.'}`);
      } else if (err.request) {
        // La requête a été faite mais aucune réponse n'a été reçue
        setError('Pas de réponse du serveur. Veuillez réessayer plus tard.');
      } else {
        // Quelque chose s'est mal passé lors de la configuration de la requête
        setError(`Erreur: ${err.message}`);
      }
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
        <Logo/>
      <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>Je n'ai pas de compte</Text>
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
  title:{
    color:'#fff',
    fontSize: 24,
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
  linkText: {
    paddingTop:15,
    color: '#fff',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
