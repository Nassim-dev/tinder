import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';  // Utilisation pour faire des requêtes à ton backend

const HomeScreen = ({ navigation }) => {
  const [matchId, setMatchId] = useState('');  // L'ID du match doit être stocké ici

  const confirmMatch = async () => {
    try {
      // Appeler le backend pour confirmer le match
      const response = await axios.post(`http://localhost:3000/api/match/${matchId}/confirm`);

      // Récupérer le conversationId du match confirmé
      const { conversationId } = response.data;

      // Naviguer vers MessagerieScreen avec le conversationId
      navigation.navigate('MessagerieScreen', { conversationId });
    } catch (error) {
      console.error('Erreur lors de la confirmation du match', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <TouchableOpacity style={styles.button} onPress={confirmMatch}>
        <Text style={styles.buttonText}>Confirmer le match et ouvrir la messagerie</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;
