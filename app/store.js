// Path: app\store.js
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/appReducer';

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;