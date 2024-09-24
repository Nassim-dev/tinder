import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const SignupScreen = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [firstName, setfirstName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        pseudo,
        firstName,
        name,
        email,
        password,
        gender,
      });

      if (response.data.success) {
        alert('Inscription réussie');
        navigation.navigate('Login');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l’inscription.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        style={styles.input}
      />

      <TextInput
        placeholder="Prénom"
        value={firstName}
        onChangeText={setfirstName}
        style={styles.input}
      />
      
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      
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

      <Text style={styles.label}>Genre</Text>
      <Picker
        selectedValue={gender}
        style={styles.picker}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Sélectionner votre genre" value="" />
        <Picker.Item label="Homme" value="homme" />
        <Picker.Item label="Femme" value="femme" />
      </Picker>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <Button title="S'inscrire" onPress={handleSignup} />
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  picker: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
