// Path: app\(tabs)\profile.tsx
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
type Photo = {
  id: number;
  url: string;
};

const ProfileScreen = () => {
const profilePicture = useSelector((state: { app: { profilePicture: string } }) => state.app.profilePicture);
const [postsData, setPostsData] = useState<{ id: string; imageUrl: string }[]>([]); 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Fetch grid images
        const gridResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=6');
        const gridData = await gridResponse.json();
        if (gridData.success && gridData.photos.length > 0) {
          const formattedPosts = gridData.photos.map((photo: Photo, index: number) => ({
            id: `${index + 1}`,
            imageUrl: photo.url,
          }));
          setPostsData(formattedPosts);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.username}>username</Text>
      </View>

      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: profilePicture || 'https://via.placeholder.com/100' }}
          style={styles.profilePicture}
        />
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>120</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>150</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Grid Images */}
      <FlatList
        data={postsData}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={{ uri: item.imageUrl }} style={styles.postImage} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  editProfileButton: {
    margin: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    alignItems: 'center',
  },
  editProfileText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  postImage: {
    width: '33.33%',
    aspectRatio: 1,
    margin: 1,
    backgroundColor: '#ffc0cb',
  },
});

export default ProfileScreen;