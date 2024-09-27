import { useCallback, useEffect, useState } from "react";
import { useBackendUrl } from "../BackendUrlContext";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Foundation';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

const SettingScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const backendUrl = useBackendUrl();

 

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get(`${backendUrl}/api/user/profile`, config);
          console.log('Profile data:', response.data);
          setProfile(response.data);
        } else {
          console.log('No token found, user is not authenticated.');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl]);
//nicolas999@test.fr
//a
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Supprimer le token avant de naviguer
      // setIsSignedIn(false); // Mettre à jour l'état de connexion
      navigation.navigate('Login'); // Naviguer vers l'écran de connexion
      console.log("Logout");
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#122c91" />
      </View>
    );
  }

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={{ flex: 1, padding: 30 }}>
        <View style={{ flex: 1, alignItems: 'center', padding: 20 }}>
          <Avatar.Image size={80} style={{ marginBottom: 10 }} source={{ uri: 'https://img.freepik.com/free-icon/user_318-563642.jpg' }} />
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 24, color: 'black', fontFamily: 'Lato-Black' }}>{profile?.username || 'Nom non disponible'}</Text>
            <Text style={{ fontSize: 16, color: 'gray', fontFamily: 'Lato-regular' }}>{profile?._id || '#ID non disponible'}</Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: 'rgba(165,18,18,1)', width: '60%', borderRadius: 25, alignItems: 'center', height: 45, justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontFamily: 'Lato-Bold', fontSize: 15 }}>Editer le profil</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {profile && (
            <>
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon2 name="email" color="#122c91" size={24} />
                </View>
                <Text style={{ color: 'black', alignSelf: 'center', marginLeft: 14, fontSize: 16, fontFamily: 'Lato-Regular' }}>{profile.email || 'Email non disponible'}</Text>
              </View>
              <View style={{ width: '100%', backgroundColor: '#e9ebf7', height: 0.5, marginBottom: 10 }}></View>

              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="male-female-outline" color="#122c91" size={24} />
                </View>
                <Text style={{ color: 'black', alignSelf: 'center', marginLeft: 14, fontSize: 16, fontFamily: 'Lato-Regular' }}>{profile.gender || 'Genre non disponible'}</Text>
              </View>
              <View style={{ width: '100%', backgroundColor: '#e9ebf7', height: 0.5, marginBottom: 10 }}></View>

              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon3 name="date" color="#122c91" size={24} />
                </View>
                <Text style={{ color: 'black', alignSelf: 'center', marginLeft: 14, fontSize: 16, fontFamily: 'Lato-Regular' }}> 
                   {profile.birthdate ? new Date(profile.birthdate).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Date de naissance non disponible'}
                </Text>
              </View>
              <View style={{ width: '100%', backgroundColor: '#e9ebf7', height: 0.6, marginBottom: 10 }}></View>
              <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <View style={{ width: 40, height: 40, borderRadius: 50, alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon4 name="text-color" color="#122c91" size={24} />
                </View>
                <Text style={{ color: 'black', alignSelf: 'center', marginLeft: 14, fontSize: 16, fontFamily: 'Lato-Regular' }}>
                {profile.bio}
                </Text>
              </View>
              <View style={{ width: '100%', backgroundColor: '#e9ebf7', height: 0.5, marginBottom: 10 }}></View>

              {/* Événement de déconnexion */}
              <TouchableOpacity onPress={handleLogout}>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                  <View style={{ width: 40, height: 40, borderRadius: 50, backgroundColor: '#e9ebf7', alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon name="log-out-outline" color="#122c91" size={24} />
                  </View>
                  <Text style={{ color: 'black', alignSelf: 'center', marginLeft: 14, fontSize: 16, fontFamily: 'Roboto-Bold' }}>
                    Se déconnecter
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SettingScreen;
