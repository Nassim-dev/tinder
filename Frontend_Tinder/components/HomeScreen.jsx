import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from 'react-native';
import axios from 'axios'; // Assurez-vous que axios est importé
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Utilisez les icônes appropriées

const HomeScreen = ({ navigation }) => {
  // const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const response = await axios.post('http://localhost:5000/user/profile');
  //       setProfile(response.data);
  //     } catch (err) {
  //       setError('Échec du chargement du profil');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  const profile = {
    pseudo: "Wakanda",
    firstaname: "John",
    name: "Doe",
    email: "toto@test.fr",
    image: require('./../assets/7.jpg')
  };

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
          {/* Image de profil pleine largeur */}
          <Image
            source={profile.image} // Image locale
            style={styles.profileImage}
          />

          {/* Informations superposées sur l'image */}
          <View style={styles.profileInfo}>
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{profile.pseudo}, {profile.age}</Text>
              <Text style={styles.profileSubInfo}>Photographe • 14 miles away</Text>
            </View>

            {/* Icônes du bas */}
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

          {/* Boutons d'actions style Tinder */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, styles.reject]}>
              <Ionicons name="close" size={40} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.heart]}>
              <Ionicons name="heart" size={40} color="green" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>Aucune donnée de profil disponible</Text>
      )}
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
    bottom: 20,
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
    bottom: -30,
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
