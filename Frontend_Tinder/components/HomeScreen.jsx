import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useBackendUrl } from '../BackendUrlContext'; // Importer le hook
import AsyncStorage from '@react-native-async-storage/async-storage';

// Image par défaut pour les utilisateurs sans photo
const defaultImage = require('../assets/7.jpg');

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);  // Stocker plusieurs utilisateurs
  const backendUrl = useBackendUrl(); // Utiliser le hook pour obtenir l'URL

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Récupérer le token depuis AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          // Faire la requête avec Axios pour récupérer la liste des utilisateurs
          const response = await axios.get(`${backendUrl}/api/user/profiles`, config);  // Assurez-vous que l'endpoint soit correct
          console.log('Users data:', response.data);
          setUsers(response.data);  // Stocker la liste des utilisateurs
        } else {
          console.log('No token found, user is not authenticated.');
        }
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [backendUrl]);

  // Fonction pour calculer l'âge à partir de la date de naissance
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Fonction de rendu pour chaque utilisateur
  const renderUserCard = (item) => (
    <View key={item._id} style={styles.card}>
      <Image
        source={item.photos.length > 0 ? { uri: item.photos[0] } : defaultImage} // Utiliser l'image par défaut si aucune photo
        style={styles.profileImage}
      />
      <View style={styles.profileInfo}>
        <View style={styles.profileDetails}>
          <Text style={styles.profileName}>
            {item.username || 'Nom inconnu'}, {item.birthdate ? calculateAge(item.birthdate) : 'Âge inconnu'}
          </Text>
          <Text style={styles.profileSubInfo}>
            {item.bio || 'Aucune bio disponible'}
          </Text>
          <Text style={styles.profileSubInfo}>
            {item.location || 'Localisation non disponible'}
          </Text>
        </View>
        <View style={styles.iconRow}>
          <MaterialCommunityIcons name="zodiac-leo" size={24} color="white" />
          <Text style={styles.iconText}>Leo</Text>
          <Text style={styles.iconText}>•</Text>
          <Ionicons name="body" size={24} color="white" />
          <Text style={styles.iconText}>Non-smoker</Text>
          <Text style={styles.iconText}>•</Text>
          <Ionicons name="paw" size={24} color="white" />
          <Text style={styles.iconText}>Cat lover</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Utiliser map pour afficher une liste d'utilisateurs */}
      {users.length > 0 ? (
        users.map(renderUserCard)  // Parcourir le tableau des utilisateurs
      ) : (
        <Text>Aucun utilisateur trouvé</Text>  // Afficher si aucun utilisateur n'est trouvé
      )}

      {/* Si vous avez des boutons d'action globaux, vous pouvez les placer ici */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.reject]}>
          <Ionicons name="close" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.heart]}>
          <Ionicons name="heart" size={40} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: '90%',
    height: 400,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
    marginBottom: 20,
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profileInfo: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
    borderRadius: 10,
  },
  profileDetails: {
    marginBottom: 10,
  },
  profileName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileSubInfo: {
    color: 'white',
    fontSize: 14,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  actionButtons: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  reject: {
    backgroundColor: '#f5f5f5',
  },
  heart: {
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HomeScreen;
