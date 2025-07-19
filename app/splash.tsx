// Path: app\splash.tsx
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { setPosts, setProfilePicture } from '../redux/slices/appSlice';

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
        const postsResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=10');
        const postsData = await postsResponse.json();
        if (postsData.success) {
          const formattedPosts = postsData.photos.map((photo: Photo, index: number) => ({
            id: `${index + 1}`,
            imageUrl: photo.url,
            user: `user_${index + 1}`,
            caption: 'Sample caption',
            likes: Math.floor(Math.random() * 100),
            comments: [],
          }));
          dispatch(setPosts(formattedPosts));
        }

        const profileResponse = await fetch('https://boringapi.com/api/v1/photos/random?num=1');
        const profileData = await profileResponse.json();
        if (profileData.success) {
          dispatch(setProfilePicture(profileData.photos[0].url));
        }

        setTimeout(() => {
          router.replace('/(tabs)'); 
        }, 2000);
      } catch (error) {
        console.error('Error initializing app:', error);
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