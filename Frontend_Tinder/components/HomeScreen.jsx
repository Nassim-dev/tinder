import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios'; // Assurez-vous que axios est importé

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
  //       setError('Echec du chargement du profil');
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfile();
  // }, []);

  const profile = {
    pseudo: "Wakanda",
    firstaname: "John",
    name: "Doe",
    email: "toto@test.fr",
    image: require('./../assets/7.jpg')
  };

  // Décommenter si vous voulez utiliser le chargement
  // if (loading) {
  //   return (
  //     <View style={styles.container}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profil</Text>
      {profile ? (
        <View style={styles.card}>
          <Image
            source={profile.image} // Image locale
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileText}>Pseudo: {profile.pseudo}</Text>
            <Text style={styles.profileText}>Prénom: {profile.firstaname}</Text>
            <Text style={styles.profileText}>Nom: {profile.name}</Text>
            <Text style={styles.profileText}>Email: {profile.email}</Text>
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
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    width: '100%', 
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden', 
    marginVertical: 20, 
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
    bottom: 10, 
    left: 10, 
    right: 10, 
    borderRadius: 5, 
    padding: 10,
  },
  profileText: {
    fontSize: 16,
    marginVertical: 2,
    color: '#000', 
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default HomeScreen;