// Path: components\StoriesBar.jsx
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import StoryItem from './ui/StoryItem';

const StoriesBar = () => {
  const [storiesData, setStoriesData] = useState([
    { id: 'your', imageUrl: require('@/assets/user_profile.jpg'), isYourStory: true },
    { id: 'user1', imageUrl: '#' },
    { id: 'user2', imageUrl: '#' },
    { id: 'user3', imageUrl: '#' },
    { id: 'user4', imageUrl: '#' },
    { id: 'user5', imageUrl: '#' },
    { id: 'user6', imageUrl: '#' },
    { id: 'user7', imageUrl: '#' },
    { id: 'user8', imageUrl: '#' },
    { id: 'user9', imageUrl: '#' },
    { id: 'user10', imageUrl: '#' },
    { id: 'user11', imageUrl: '#' },
    { id: 'user12', imageUrl: '#' },
  ]);

  useEffect(() => {
    const fetchImages = async () => {
      const updatedStoriesData = [...storiesData];

      for (let i = 0; i < updatedStoriesData.length; i++) {
        // Skip fetching for the first item ("your" story)
        if (!updatedStoriesData[i].isYourStory) {
          try {
            const response = await fetch('https://boringapi.com/api/v1/photos/random?num=1');
            const data = await response.json();
            if (data.success && data.photos.length > 0) {
              updatedStoriesData[i].imageUrl = data.photos[0].url;
            } else {
              console.warn(`Failed to fetch image for story ${updatedStoriesData[i].id}`);
              // Optionally, set a default image URL here
              // updatedStoriesData[i].imageUrl = 'fallback_url';
            }
          } catch (error) {
            console.error(`Error fetching image for story ${updatedStoriesData[i].id}:`, error);
            // Optionally, handle the error by setting a default image URL
            // updatedStoriesData[i].imageUrl = 'error_url';
          }
        }
      }
      setStoriesData(updatedStoriesData);
      console.log('Updated stories data:', updatedStoriesData);
    };

    fetchImages();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainer}
    >
      {storiesData.map((story) => (
        <StoryItem key={story.id} story={story} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a2a2a2',
    height: 100,
    flexGrow: 0,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
});

export default StoriesBar;