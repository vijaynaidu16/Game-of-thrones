import { createSlice } from "@reduxjs/toolkit";

const characterAPI = createSlice({
    name: 'character',
    initialState: {
        characters: null,
    },
    reducers : {
        addCharacters: (state, action) => {
            state.characters = action.payload;
        }
    }
})

export const {addCharacters} = characterAPI.actions;
export default characterAPI.reducer;