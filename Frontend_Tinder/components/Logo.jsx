import React, { useState } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';


const Logo = ({ navigation }) => {



  return (
    <View style={styles.ctnLogo}>
        <Image style={styles.logo} source={require('../assets/Logo.png')}/>
    </View>
  );
};

const styles = StyleSheet.create({
    ctnLogo:{
        alignItems: 'center',
        marginBottom:50,
    },
    logoText:{
        color: '#fff',
    },
});

export default Logo;
