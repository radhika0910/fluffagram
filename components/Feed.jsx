// Path: components\Feed.jsx
import PostItem from '@/components/ui/PostItem';
import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

const Feed = () => {
  const postsData = useSelector((state) => state.app.posts); 
  const { bottom } = useSafeAreaInsets();

  return (
    <FlatList
      data={postsData}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PostItem post={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottom + 50 }}
    />
  );
};

export default Feed;