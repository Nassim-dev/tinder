import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { useBackendUrl } from '../BackendUrlContext';
import axios from 'axios';

export default function Localisation() {
    const backendUrl = useBackendUrl(); 

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      await sendLocationToBackend(latitude, longitude);
    })();
  }, []);

  const sendLocationToBackend = async (latitude, longitude) => {
    try {
      const response = await axios.put(`${backendUrl}/api/user/signup`, {
        location: {
          latitude,
          longitude
        }
      });

    
      if (response.status === 200) {
        console.log('Localisation envoyée avec succès');
      } else {
        console.log('Erreur lors de l\'envoi de la localisation');
      }
    } catch (error) {
      console.error('Erreur lors de la requête POST:', error);
    }
  };

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
