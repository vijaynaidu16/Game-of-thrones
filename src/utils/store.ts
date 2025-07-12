import { configureStore } from "@reduxjs/toolkit";
import characterAPIReducer from "./gotAPI"; // path relative to this file
import HouseAPIReducer from "./houseAPI";
const store = configureStore({
  reducer: {
    characters: characterAPIReducer,
    houses: HouseAPIReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
