import { createSlice } from "@reduxjs/toolkit";


const initialToken=localStorage.getItem('token');
const initialUserId=localStorage.getItem('userId');
const initialAuthState={
    token:initialToken,
      
    userId: initialUserId,

    isLoggedIn:!!initialToken
}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state, action) {
            const { token, userId } = action.payload;
            state.token = token;
            state.userId = userId;
            state.isLoggedIn = !!token;

            localStorage.setItem('token', token);     
            localStorage.setItem('userId', userId);
        },

        logout(state){
            state.token=null;
            state.isLoggedIn=false;
            state.userId=null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');

        }
    }
})
export const authActions=authSlice.actions;
export default authSlice.reducer;