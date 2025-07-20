import React, { useEffect, useState } from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';

type Photo = {
  id: number;
  url: string;
};

const SearchScreen = () => {
  const [postsData, setPostsData] = useState<{ id: string; imageUrl: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        // Fetch grid images for search/explore
        const gridResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=12');
        const gridData = await gridResponse.json();
        
        if (gridData.success && gridData.photos && gridData.photos.length > 0) {
          const formattedPosts = gridData.photos.map((photo: Photo, index: number) => ({
            id: `search_${index + 1}`,
            imageUrl: photo.url,
          }));
          setPostsData(formattedPosts);
          console.log('Fetched search images:', formattedPosts);
        } else {
          // Fallback data if API fails
          console.warn('Failed to fetch search images, using fallback data');
          const fallbackPosts = Array.from({ length: 12 }, (_, index) => ({
            id: `fallback_${index + 1}`,
            imageUrl: `https://picsum.photos/400/400?random=${index + 100}`,
          }));
          setPostsData(fallbackPosts);
        }
      } catch (error) {
        console.error('Error fetching search images:', error);
        // Use fallback data on error
        const fallbackPosts = Array.from({ length: 12 }, (_, index) => ({
          id: `error_${index + 1}`,
          imageUrl: `https://picsum.photos/400/400?random=${index + 200}`,
        }));
        setPostsData(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const refreshImages = async () => {
    setLoading(true);
    try {
      const gridResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=12');
      const gridData = await gridResponse.json();
      
      if (gridData.success && gridData.photos) {
        const formattedPosts = gridData.photos.map((photo: Photo, index: number) => ({
          id: `refresh_${Date.now()}_${index}`,
          imageUrl: photo.url,
        }));
        setPostsData(formattedPosts);
      }
    } catch (error) {
      console.error('Error refreshing search images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && postsData.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.searchBoxContainer}>
          <TextInput
            style={styles.searchBox}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading images...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image 
            source={{ uri: item.imageUrl }} 
            style={styles.postImage}
            onError={(error) => console.log('Search image load error:', error)}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={refreshImages}
        contentContainerStyle={styles.gridContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBoxContainer: {
    padding: 15,
    paddingBottom: 10,
  },
  searchBox: {
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    paddingTop: 5,
  },
  postImage: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default SearchScreen;