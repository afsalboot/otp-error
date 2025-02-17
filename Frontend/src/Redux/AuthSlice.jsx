import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
    name:"userData",
    initialState:{
        userInfo:null
    },
    reducers:{
        storeUser:(state,action) => {
            state.userInfo = action.payload;
        },
        clearUser:(state) => {
            state.userInfo = null;
        }
    }
})

export const {storeUser,clearUser} = user.actions;
export default user.reducer