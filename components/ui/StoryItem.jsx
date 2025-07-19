// Path: components\ui\StoryItem.jsx
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const StoryItem = ({ story }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => console.log(`View ${story.id}'s story`)}>
      <View style={[styles.imageContainer, story.isYourStory && styles.yourStoryBorder]}>
        <Image source={story.imageUrl} style={styles.image} />
        {story.isYourStory && (
          <View style={styles.addIcon}>
            <Icon name="pluscircle" size={16} color="#4c8bf5" />
          </View>
        )}
      </View>
      <Text style={styles.username}>{story.isYourStory ? 'Your Story' : story.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 70,
    marginHorizontal: 8,
    alignItems: 'center',
    height: 100,
    
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: '#c13584', 
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  yourStoryBorder: {
    borderColor: '#ccc',
  },
  image: {
    width: 54,
    height: 54,
    borderRadius: 27,
    
  },
  addIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    
  },
  username: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default StoryItem;