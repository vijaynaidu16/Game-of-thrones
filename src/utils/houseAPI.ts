import { createSlice } from "@reduxjs/toolkit";

const HousesAPI = createSlice({
    name: 'houses',
    initialState: {
        housedata: []
    },
    reducers: {
        addHouseData: (state, action) => {
            state.housedata = action.payload;
        }
    }
});

export const {addHouseData} = HousesAPI.actions;
export default HousesAPI.reducer;