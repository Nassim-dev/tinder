import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignupScreen = ({ navigation }) => {
  const [gender, setGender] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [firstName, setfirstName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [error, setError] = useState(null);
  const [showGenderModal, setShowGenderModal] = useState(false);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        pseudo,
        firstName,
        name,
        email,
        password,
        gender,
        dob,
      });

      if (response.data.success) {
        alert('Inscription réussie');
        navigation.navigate('Login');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de l’inscription.');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowPicker(false);
    setDob(currentDate);
  };
  
  const genderOptions = [
    { label: "Homme", value: "homme" },
    { label: "Femme", value: "femme" },
  ];

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

      <Text style={styles.label}>Date de naissance</Text>
      <TouchableOpacity 
        style={styles.datePicker} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateText}>{dob.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <Text style={styles.label}>Genre</Text>
      <TouchableOpacity 
        style={styles.genderPicker} 
        onPress={() => setShowGenderModal(true)}
      >
        <Text style={styles.genderText}>{gender || 'Sélectionner votre genre'}</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={showGenderModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={genderOptions}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() => {
                  setGender(item.value);
                  setShowGenderModal(false);
                }}
              >
                <Text style={styles.modalOptionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity 
            style={styles.closeModalButton} 
            onPress={() => setShowGenderModal(false)}
          >
            <Text style={styles.closeModalText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      
      {error && <Text style={styles.error}>{error}</Text>}
      
      <TouchableOpacity style={styles.btn} onPress={handleSignup}>
        <Text style={styles.btnText}>S'inscrire</Text>
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
  input: {
    borderWidth: 1,
    borderColor: '#fff', 
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  dateText: {
    color: '#000',
  },
  genderPicker: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 10,
    marginVertical: 10,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    alignItems: 'center',
  },
  genderText: {
    color: '#000',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff', 
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: 'rgba(165,18,18,1)',
    fontWeight: '700',
    fontSize: 16,
  },
  modalContainer: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth:1,
    borderRadius: 16,
    borderColor: 'rgba(255, 255, 255, 0.2)', 
    width: '80%', 
    height: '30%',
    alignSelf: 'center', 
  },
  modalOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    color: '#fff', 
    fontSize: 18,
  },
  closeModalButton: {
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(165,18,18,1)',
    borderRadius: 5,
  },  
  closeModalText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignupScreen;
