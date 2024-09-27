import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useBackendUrl } from '../BackendUrlContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-deck-swiper';

// Image par défaut pour les utilisateurs sans photo
const defaultImage = require('../assets/7.jpg');
const likeGif = require('../assets/like.gif'); // Chemin vers votre GIF de like
const dislikeGif = require('../assets/unlike.gif'); // Chemin vers votre GIF de dislike

// Image par défaut pour les utilisateurs sans photo

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);  // Liste des utilisateurs
  const [gifVisible, setGifVisible] = useState(false); // État pour le GIF
  const [currentGif, setCurrentGif] = useState(null); // GIF actuel à afficher
  const backendUrl = useBackendUrl(); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          const response = await axios.get(`${backendUrl}/api/user/profiles`, config);  
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

  if (users.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Aucun utilisateur trouvé</Text>
      </View>
    );
  }

  const handleSwipeRight = () => {
    setCurrentGif(likeGif); // Définir le GIF à afficher
    setGifVisible(true); // Afficher le GIF
    setTimeout(() => {
      setGifVisible(false); // Cacher le GIF après 3 secondes
    }, 500);
  };

  const handleSwipeLeft = () => {
    setCurrentGif(dislikeGif); // Définir le GIF à afficher
    setGifVisible(true); // Afficher le GIF
    setTimeout(() => {
      setGifVisible(false); // Cacher le GIF après 3 secondes
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Swiper
        cards={users}
        renderCard={(user) => {
          if (!user) {
            return null;
          }
          return (
            <View style={styles.card}>
              <Image
                source={user.photos.length > 0 ? { uri: user.photos[0] } : defaultImage}
                style={styles.profileImage}
              />
              <View style={styles.profileInfo}>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>
                    {user.username || 'Nom inconnu'}, {user.birthdate ? calculateAge(user.birthdate) : 'Âge inconnu'}
                  </Text>
                  <Text style={styles.profileSubInfo}>{user.bio || 'Aucune bio disponible'}</Text>
                  <Text style={styles.profileSubInfo}>{user.location || 'Localisation non disponible'}</Text>
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
        }}
        onSwipedRight={handleSwipeRight} // Appel de la fonction pour swipe à droite
        onSwipedLeft={handleSwipeLeft} // Appel de la fonction pour swipe à gauche
        onSwiped={() => console.log('User Swiped!')}
        onSwipedAll={() => console.log('All Users Swiped!')}
        cardIndex={0}
        backgroundColor="#f5f5f5"
      />

      {/* Affichage du GIF */}
      {gifVisible && (
        <View style={styles.gifContainer}>
          <Image
            source={currentGif}
            style={styles.gifImage}
            resizeMode="contain"
          />
        </View>
      )}

      {/* Boutons d'action */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={[styles.actionButton, styles.reject]} onPress={() => console.log('Rejected')}>
          <Ionicons name="close" size={40} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.heart]} onPress={() => console.log('Liked')}>
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
    width: '100%',
    height: 600 ,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginBottom: 20,
    position: 'relative',
    elevation: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
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
  gifContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 10,
  },
  gifImage: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;
