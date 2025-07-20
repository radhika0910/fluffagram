import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setPosts, setProfilePicture } from './slices/appSlice';

// Define the type for the API response
type Photo = {
  id: number;
  url: string;
};

const SplashScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.log('Initializing app...');
        
        // Fetch posts
        const postsResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=10');
        const postsData = await postsResponse.json();
        
        console.log('Posts API Response:', postsData);
        
        if (postsData.success && postsData.photos) {
          const formattedPosts = postsData.photos.map((photo: Photo, index: number) => ({
            id: `${index + 1}`,
            imageUrl: photo.url,
            user: `user_${index + 1}`,
            caption: `Amazing photo #${index + 1}! 📸✨`,
            likes: Math.floor(Math.random() * 500) + 50,
            comments: [],
          }));
          
          console.log('Formatted posts:', formattedPosts);
          dispatch(setPosts(formattedPosts));
        } else {
          // Fallback data if API fails
          console.log('API failed, using fallback data');
          const fallbackPosts = Array.from({ length: 5 }, (_, index) => ({
            id: `${index + 1}`,
            imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
            user: `user_${index + 1}`,
            caption: `Sample post #${index + 1} 📸`,
            likes: Math.floor(Math.random() * 500) + 50,
            comments: [],
          }));
          dispatch(setPosts(fallbackPosts));
        }

        // Fetch profile picture
        try {
          const profileResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=1');
          const profileData = await profileResponse.json();
          if (profileData.success && profileData.photos) {
            dispatch(setProfilePicture(profileData.photos[0].url));
          }
        } catch (error) {
          console.error('Profile picture fetch failed:', error);
          dispatch(setProfilePicture('https://i.pravatar.cc/150?u=default'));
        }

        // Simulate a delay for the splash screen
        setTimeout(() => {
          console.log('Navigating to tabs...');
          router.replace('/(tabs)'); 
        }, 3000);
      } catch (error) {
        console.error('Error initializing app:', error);
        // Use fallback data on error
        const fallbackPosts = Array.from({ length: 5 }, (_, index) => ({
          id: `${index + 1}`,
          imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
          user: `user_${index + 1}`,
          caption: `Sample post #${index + 1} 📸`,
          likes: Math.floor(Math.random() * 500) + 50,
          comments: [],
        }));
        dispatch(setPosts(fallbackPosts));
        
        setTimeout(() => {
          router.replace('/(tabs)');
        }, 2000);
      }
    };

    initializeApp();
  }, [dispatch, router]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/instagram_logo.jpg')} style={styles.logo} />
      <Text style={styles.appName}>Flufffagram</Text>
      <Text style={styles.developerText}>Developed by CodeRads ❤️</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  developerText: {
    position: 'absolute',
    bottom: 50,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default SplashScreen;