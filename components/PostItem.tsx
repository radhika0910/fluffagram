import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Post = {
  user: string;
  imageUrl: string;
  caption: string;
  likes?: number;
  comments?: Array<{ user: string; text: string }>;
};

interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes || 0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  console.log('PostItem rendering:', post);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: `https://i.pravatar.cc/150?u=${post.user}` }}
            style={styles.profilePicture}
          />
          <Text style={styles.username}>{post.user}</Text>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image 
        source={{ uri: post.imageUrl }} 
        style={styles.postImage} 
        onError={(error) => console.log('Image load error:', error)}
      />

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
            <Ionicons 
              name={liked ? "heart" : "heart-outline"} 
              size={28} 
              color={liked ? "#FF3040" : "black"} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={26} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleSave}>
          <Ionicons 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={26} 
            color="black" 
          />
        </TouchableOpacity>
      </View>

      {/* Likes Count */}
      <View style={styles.likesContainer}>
        <Text style={styles.likesText}>{likesCount.toLocaleString()} likes</Text>
      </View>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.username}>{post.user}</Text> {post.caption}
        </Text>
      </View>

      {/* Comments */}
      {post.comments && post.comments.length > 0 && (
        <TouchableOpacity style={styles.commentsContainer}>
          <Text style={styles.commentsText}>
            View all {post.comments.length} comments
          </Text>
        </TouchableOpacity>
      )}

      {/* Time */}
      <Text style={styles.timeText}>2 hours ago</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  postImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
  likesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  likesText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  captionContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  captionText: {
    fontSize: 14,
    lineHeight: 18,
  },
  commentsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  commentsText: {
    color: '#999',
    fontSize: 14,
  },
  timeText: {
    color: '#999',
    fontSize: 12,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
});

export default PostItem;