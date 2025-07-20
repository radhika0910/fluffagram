// Path: app\(tabs)\reels.jsx
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const ReelsScreen = () => {
  const [reelsData, setReelsData] = useState([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const videoPlayers = useRef({});

  useEffect(() => {
    const fetchReels = async () => {
      try {
        const response = await fetch(
          'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
        );
        const data = await response.json();
        setReelsData(data);
        setLoading(false);
        
      } catch (error) {
        console.error('Error fetching reels:', error);
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    if (viewableItems.length > 0) {
      const newIndex = viewableItems[0].index;
      if (newIndex !== currentReelIndex) {
        
        const previousItemId = reelsData[currentReelIndex]?.id;
        if (previousItemId && videoPlayers.current[previousItemId]) {
          videoPlayers.current[previousItemId].pause();
        }
        setCurrentReelIndex(newIndex);
       
      }
    }
  }, [currentReelIndex, reelsData]);

  const renderItem = ({ item, index }) => {
    const isActive = index === currentReelIndex;
    return (
      <View style={styles.reelContainer}>
        <VideoPlayer
          videoUrl={item.videoUrl}
          isActive={isActive}
          videoPlayers={videoPlayers}
          itemId={item.id}
        />
        <View style={styles.reelFooter}>
          <View style={styles.reelFooterLeft}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.musicRow}>
              <Ionicons name="musical-note" size={16} color="white" />
              <Text style={styles.musicTitle}>Original Audio - {item.author}</Text>
            </View>
          </View>
          <View style={styles.reelFooterRight}>
            <TouchableOpacity style={styles.iconContainer}>
              <AntDesign name="heart" size={32} color="white" />
              <Text style={styles.iconText}>1.2M</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="chatbubble-outline" size={32} color="white" />
              <Text style={styles.iconText}>12K</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Feather name="send" size={32} color="white" />
              <Text style={styles.iconText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="ellipsis-vertical" size={32} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.reelHeader}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="camera-outline" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reels</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="search" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reelsData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reelContainer: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width,
    height,
  },
  reelFooter: {
    position: 'absolute',
    bottom: 80,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  reelFooterLeft: {
    flex: 1,
  },
  author: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  musicRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicTitle: {
    marginLeft: 5,
    color: 'white',
  },
  reelFooterRight: {
    alignItems: 'center',
    marginLeft: 20,
  },
  iconContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    marginTop: 5,
  },
  reelHeader: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  headerButton: {
    padding: 10,
  },
});

const VideoPlayer = ({ videoUrl, isActive, videoPlayers, itemId }) => {
  const player = useVideoPlayer(videoUrl, (player) => {
    player.loop = true;
    videoPlayers.current[itemId] = player;
    
    if (isActive) {
      player.play();
    }
  });

  useEffect(() => {
   
    if (player) {
      if (isActive) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, [isActive, player]);

  return (
    <VideoView
      style={styles.video}
      player={player}
      resizeMode="cover"
      allowsFullscreen
      allowsPictureInPicture
    />
  );
};

export { VideoPlayer };
export default ReelsScreen;