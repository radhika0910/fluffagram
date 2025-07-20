// Path: app\(tabs)\index.tsx
import Feed from '@/components/Feed';
import StoriesBar from '@/components/StoriesBar';
import TopNavigationBar from '@/components/TopNavigationBar';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavigationBar />
      <StoriesBar />
      <View style={styles.feedContainer}> 
        <Feed />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  feedContainer: {
    flex: 1, 
  },
});

export default HomeScreen;