// Path: components\TopNavigationBar.jsx
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TopNavigationBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => console.log('Open Camera')}>
        <Icon name="camera" size={28} color="black" />
      </TouchableOpacity>
      {/* <Image
        source={require('@/assets/instagram_logo.jpg')} 
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <Image
        source={require('@/assets/text_instagram.jpg')} 
        style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity onPress={() => console.log('Open Direct Messages')}>
        <Icon name="send" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  logo: {
    width: 100,
    height: 50,
  },
  
});

export default TopNavigationBar;