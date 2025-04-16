import { createSlice } from "@reduxjs/toolkit";


const profileSlice=createSlice({
    name:'profile',
    initialState:{profileC:'false'},
    reducers:{
        profileCompletion(state){
            state.profileC=true;
        }
    }
})

export const profileActions=profileSlice.actions;
export default profileSlice.reducer;