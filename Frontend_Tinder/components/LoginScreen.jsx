import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await axios.get('http://localhost:5000/signup', {
        email,
        password,
      });

      if (response.data.success) {
        navigation.navigate('Home');
      }
    } catch (err) {
      setError('Information incorrecte.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
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
      
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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

export default LoginScreen;