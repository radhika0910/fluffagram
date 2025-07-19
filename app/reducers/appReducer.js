// Path: app\reducers\appReducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profilePicture: '',
  posts: [],
  videos: [],
};

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
});

export const { setProfilePicture, setPosts, setVideos } = appSlice.actions;
export default appSlice.reducer;