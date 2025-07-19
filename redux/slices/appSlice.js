// Path: redux\slices\appSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicture: '',
  posts: [],
  videos: [],
};

// Async thunk to fetch video data
export const fetchVideos = createAsyncThunk(
  'app/fetchVideos',
  async () => {
    try {
      const response = await fetch(
        'https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProfilePicture: (state, action) => {
      state.profilePicture = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        console.error('Failed to fetch videos:', action.error);
      });
  },
});

export const { setProfilePicture, setPosts, setVideos } = appSlice.actions;
export default appSlice.reducer;
