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
  const [step, setStep] = useState(1); 
  const [error, setError] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [birthdate, setBirthdate] = useState(new Date()); 
  const [gender, setGender] = useState('');
  const [preference, setPreference] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || birthdate;
    setShowPicker(false);
    setBirthdate(currentDate); 
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${backendUrl}/api/user/signin`, {
        username,
        email,
        password,
        bio,
        birthdate,
        gender,
      });

      if (response.data.success) {
        alert('Inscription réussie');
        navigation.navigate('Login');
      } else {
        setError('Une erreur est survenue.');
      }
    } catch (err) {
      setError('Une erreur est survenue.');
    }
  };

  const handleNextStep = () => {
    switch (step) {
      case 1:
        if (!username) {
          setError('Veuillez entrer votre prénom');
          return;
        }
        break;
      case 2:
        if (!bio) {
          setError('Veuillez entrer quelques mots sur vous.');
          return;
        }
        break;
      case 3:
        if (!birthdate) {
          setError('Veuillez entrer votre date de naissance.');
          return;
        }
        break;
      case 4:
        if (!gender) {
          setError('Veuillez sélectionner votre sexe.');
          return;
        }
        break;
      case 5:
        if (!preference) {
          setError('Veuillez sélectionner votre préférence.');
          return;
        }
        break;
      case 6:
        if (!email || !password) {
          setError('Veuillez entrer un email et un mot de passe.');
          return;
        }
        break;
      default:
        break;
    }
    setError(null);
    setStep(step + 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.stepContainer}> 
            <TextInput
              placeholder="Prénom"
              value={username}
              onChangeText={setUsername}
              style={styles.input}
            />

            <TouchableOpacity
              style={[styles.btn, styles.nextBtn]}
              onPress={handleNextStep}
            >
              <Text style={styles.btnText}>Suivant</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <TextInput
            placeholder="quelques mots sur vous"
            value={bio}
            onChangeText={setBio}
            style={styles.input}
          />
        );
      case 3:
        return (
          <View>
            <Text style={styles.label}>Date de naissance</Text>
            <TouchableOpacity
              style={styles.datePicker}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateText}>
                {birthdate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={birthdate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        );
        case 4:
          return (
            <View>
              <TouchableOpacity
                style={[styles.btn, gender === 'homme' && styles.activeBtn]}
                onPress={() => setGender('homme')}
              >
                <Entypo name="man" size={24} color="black" />
                <Text style={[styles.btnText, gender === 'homme' && styles.activeText]}>Je suis un homme</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, gender === 'femme' && styles.activeBtn]}
                onPress={() => setGender('femme')}
              >
                <Ionicons name="woman" size={24} color="black" />
                <Text style={[styles.btnText, gender === 'femme' && styles.activeText]}>Je suis une femme</Text>
              </TouchableOpacity>
            </View>
          );
          case 5:
            return (
              <View>
                <TouchableOpacity
                  style={[styles.btn, preference === 'homme' && styles.activeBtn]}
                  onPress={() => setPreference('homme')}
                >
                  <Entypo name="man" size={24} color="black" />
                  <Text style={[styles.btnText, preference === 'homme' && styles.activeText]}>Je recherche un homme</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn, preference === 'femme' && styles.activeBtn]}
                  onPress={() => setPreference('femme')}
                >
                  <Ionicons name="woman" size={24} color="black" />
                  <Text style={[styles.btnText, preference === 'femme' && styles.activeText]}>Je recherche une femme</Text>
                </TouchableOpacity>
              </View>
            );
      case 6:
        return (
          <View>
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
          </View>
        );
      default:
        return null;
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
  stepContainer: {
    alignItems: 'center',
  },
  title: {
    color: '#fff',
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
