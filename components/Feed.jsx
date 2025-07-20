import PostItem from '@/components/ui/PostItem';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Feed = () => {
  const [postsData, setPostsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { bottom } = useSafeAreaInsets();

  // Sample captions for more realistic posts
  const sampleCaptions = [
    "Living my best life! ✨",
    "Good vibes only 🌟",
    "Just another day in paradise 🏖️",
    "Grateful for this moment 🙏",
    "Adventure awaits! 🚀",
    "Making memories 📸",
    "Sunshine and good times ☀️",
    "Weekend mood activated 🎉",
    "Chasing dreams and sunsets 🌅",
    "Life is beautiful 🌺"
  ];

  const usernames = [
    "alex_adventure", "sarah_smile", "mike_moments", "luna_light", 
    "david_dreams", "emma_explore", "chris_creative", "mia_magic",
    "jake_journey", "zoe_zen"
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        // Fetch 10 random photos for posts
        const response = await fetch('https://boringapi.com/api/v1/photos/random?num=10');
        const data = await response.json();
        
        if (data.success && data.photos && data.photos.length > 0) {
          const formattedPosts = data.photos.map((photo, index) => ({
            id: `post_${index + 1}`,
            imageUrl: photo.url,
            user: usernames[index % usernames.length],
            caption: sampleCaptions[index % sampleCaptions.length],
            likes: Math.floor(Math.random() * 500) + 50,
            comments: [],
          }));
          
          setPostsData(formattedPosts);
          console.log('Fetched posts:', formattedPosts);
        } else {
          // Fallback data if API fails
          console.warn('Failed to fetch posts from API, using fallback data');
          const fallbackPosts = Array.from({ length: 5 }, (_, index) => ({
            id: `fallback_${index + 1}`,
            imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
            user: usernames[index % usernames.length],
            caption: sampleCaptions[index % sampleCaptions.length],
            likes: Math.floor(Math.random() * 500) + 50,
            comments: [],
          }));
          setPostsData(fallbackPosts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        // Use fallback data on error
        const fallbackPosts = Array.from({ length: 5 }, (_, index) => ({
          id: `error_${index + 1}`,
          imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
          user: usernames[index % usernames.length],
          caption: sampleCaptions[index % sampleCaptions.length],
          likes: Math.floor(Math.random() * 500) + 50,
          comments: [],
        }));
        setPostsData(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  console.log('Feed postsData:', postsData);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading posts...</Text>
      </View>
    );
  }

  if (!postsData || postsData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No posts available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => {
        console.log('Rendering post:', item);
        return <PostItem post={item} />;
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 50 }}
      refreshing={loading}
      onRefresh={() => {
        // Refresh functionality
        const fetchPosts = async () => {
          setLoading(true);
          try {
            const response = await fetch('https://boringapi.com/api/v1/photos/random?num=10');
            const data = await response.json();
            
            if (data.success && data.photos) {
              const formattedPosts = data.photos.map((photo, index) => ({
                id: `refresh_${Date.now()}_${index}`,
                imageUrl: photo.url,
                user: usernames[index % usernames.length],
                caption: sampleCaptions[index % sampleCaptions.length],
                likes: Math.floor(Math.random() * 500) + 50,
                comments: [],
              }));
              setPostsData(formattedPosts);
            }
          } catch (error) {
            console.error('Error refreshing posts:', error);
          } finally {
            setLoading(false);
          }
        };
        fetchPosts();
      }}
    />
  );
};

export default Feed;