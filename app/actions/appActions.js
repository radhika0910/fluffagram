// Path: app\actions\appActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setVideos } from '../reducers/appReducer';

// Export actions from the slice
export { setPosts, setProfilePicture, setVideos } from '../reducers/appReducer';

// Async thunk to fetch video data
export const fetchVideos = createAsyncThunk(
  'app/fetchVideos',
  async (_, { dispatch }) => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
      );
      const data = await response.json();
      dispatch(setVideos(data));
      return data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }
);