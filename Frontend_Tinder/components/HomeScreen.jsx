import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useBackendUrl } from '../BackendUrlContext'; // Importer le hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const backendUrl = useBackendUrl(); // Utiliser le hook pour obtenir l'URL

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Récupérer le token depuis AsyncStorage
        const token = await AsyncStorage.getItem('token');
        
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
    
          // Faire la requête avec Axios
          const response = await axios.get(`${backendUrl}/api/user/profile`, config);
          console.log('Profile data:', response.data);
          setProfile(response.data)
        } else {
          console.log('No token found, user is not authenticated.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
      finally{
        setLoading(false)
      }
    };
    

    fetchProfile();
  }, [backendUrl]);
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

  return (
    <View style={styles.container}>
      {profile ? (
        <View style={styles.card}>
          <Image
            source={{ uri: profile.image }} // Assurez-vous que l'image est une URL
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{profile.pseudo}, {profile.age}</Text>
              <Text style={styles.profileSubInfo}>Photographe • 14 miles away</Text>
            </View>
            <View style={styles.iconRow}>
              <MaterialCommunityIcons name="zodiac-leo" size={24} color="white" />
              <Text style={styles.iconText}>Leo</Text>
              <Text style={styles.iconText}>•</Text>
              <Ionicons name="ios-body" size={24} color="white" />
              <Text style={styles.iconText}>Non-smoker</Text>
              <Text style={styles.iconText}>•</Text>
              <Ionicons name="ios-paw" size={24} color="white" />
              <Text style={styles.iconText}>Cat lover</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text>Aucune donnée de profil disponible</Text>
      )}
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
    height: '80%',
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'transparent',
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
