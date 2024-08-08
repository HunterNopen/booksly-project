import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    bannerData: []
}

export const bookslySlice = createSlice({
    name: "booksly",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        }
    }
})



export const { setBannerData } = bookslySlice.actions;

export default bookslySlice.reducer;