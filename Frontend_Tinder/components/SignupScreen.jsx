import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { TamaguiProvider, Theme } from '@tamagui/core';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker'; 
import Logo from './Logo';
import config from '../tamagui.config';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons'; 

const SignupScreen = ({ navigation }) => {
  const [pseudo, setPseudo] = useState('');
  const [firstName, setFirstName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(false);
    setDob(currentDate); 
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3000/api/user/signup', {
        username,
        firstName,
        lastName,
        email,
        password,
      });
      

      if (response.data.message === 'Utilisateur créé avec succès') {
        alert('Inscription réussie');
        navigation.navigate('Login');  // Rediriger vers la page de connexion
      } else {
        setError('Une erreur est survenue.');
      }
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
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
          <Logo />
          <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            {renderStep()}

            {error && <Text style={styles.error}>{error}</Text>}

            <View style={styles.buttonContainer}>
              {step > 1 && (
                <TouchableOpacity
                  style={[styles.btn, styles.backBtn]}
                  onPress={() => setStep(step - 1)}
                >
                  <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
              )}

              {step > 1 && step < 6 ? (
                <TouchableOpacity
                  style={[styles.btn, styles.nextBtn]}
                  onPress={handleNextStep}
                >
                <Text style={styles.btnText}>Suivant</Text>
                </TouchableOpacity>
                ) : step === 6 ? (
                <TouchableOpacity style={[styles.btn, styles.nextBtn]} onPress={handleSignup}>
                <Text style={styles.btnText}>S'inscrire</Text>
                </TouchableOpacity>
              ) : null}

            </View>

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
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  datePicker: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: 'rgba(85,5,5,1)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  backBtn: {
    backgroundColor: 'rgba(165,18,18,0.8)',
    borderWidth: 0.5,
    borderColor: '#fff',
    width: 80, 
    alignItems: 'center',
    marginRight: 10,
    padding: 10,
  },
  nextBtn: {
    width: 220,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    width: 300,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginTop: 10,
    width: 200,
    alignItems: 'center',
  },
  linkText: {
    paddingTop:15,
    color: '#fff',
  },
  btnText: {
    color: 'rgba(165,18,18,1)',
    fontWeight: '700',
    fontSize: 16,
  },
  btnBackText:{
    color: '#fff',
  },
  activeText: {
    color: '#fff', 
  },
  activeBtn: {
    backgroundColor: 'rgba(165,18,18,1)',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;
