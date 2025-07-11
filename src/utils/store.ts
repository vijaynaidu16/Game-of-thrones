import { configureStore } from "@reduxjs/toolkit";
import characterAPIReducer from './gotAPI'; // path relative to this file

const store = configureStore({
  reducer: {
    characters: characterAPIReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
