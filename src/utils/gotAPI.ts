import { createSlice } from "@reduxjs/toolkit";

const characterAPI = createSlice({
    name: 'characters',
    initialState: {
        characters: [],
    },
    reducers : {
        addCharacters: (state, action) => {
            state.characters = action.payload;
        }
    }
})

export const {addCharacters} = characterAPI.actions;
export default characterAPI.reducer;