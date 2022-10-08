import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    passWord:''
}
const logInSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        emailInput: (state,action) => {
            state.email = action.payload
        },
        
        passInput: (state,action) => {
            state.passWord = action.payload
        },
    }


})

export const { passInput, emailInput } = logInSlice.actions;
export default logInSlice.reducer