import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    popup: false,
};

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        togglePopup: (state) => {
            state.popup = !state.popup;
        },
    }, 
});

export const { setHome } = homeSlice.actions;
export default homeSlice.reducer;