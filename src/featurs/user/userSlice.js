import { createSlice } from "@reduxjs/toolkit";
import {
    RegisterUser,
    Login,
    NewPassword,
    EmailForCode,
    SendCode

} from "./UserActions";

const initialState = {
    userInfo:{},
    userToken:"",
    loading:false,
    success:false,
    error: null,
    resetPassword: '',
    emailForReset: '',
    codeForReset:''
}

const UserSlice = createSlice({
    name:'User',
    initialState,
    reducers:{},
    extraReducers:{
        //register user
        [RegisterUser.pending]:(state)=>{
            state.loading = true;
    
        },
        [RegisterUser.fulfilled]:(state,{payload})=>{
            const{email,Token} = payload;
            state.userInfo={email};
            state.userToken={Token}
            state.loading = false;
            state.success = true;
            console.log("succes signup",state.userInfo);
                
        },
        [RegisterUser.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log(payload);
    
        },
        //login user
        [Login.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [Login.fulfilled]:(state,{payload}) =>{
            
            const{email,Token} = payload;
            state.userInfo={email};
            state.userToken={Token}
            state.loading = false;
            state.success = true //registered
            console.log("succes login",state.userInfo);
        },
        [Login.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        },
        //email for reset user password
        [EmailForCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [EmailForCode.fulfilled]:(state,{payload}) =>{
            
            const{emailForReset} = payload;
            state.emailForReset={emailForReset};
            
            state.loading = false;
            state.success = true //registered
            console.log("succes login",state.userInfo);
        },
        [EmailForCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        },
        //sending code to reset user password
        [SendCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [SendCode.fulfilled]:(state,{payload}) =>{
            
            const{codeForReset} = payload;
            state.codeForReset={codeForReset};
            
            state.loading = false;
            state.success = true //registered
            console.log("succes login",state.userInfo);
        },
        [SendCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        },
        //sending new password to reset user password
        [ NewPassword.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [NewPassword.fulfilled]:(state,{payload}) =>{
            
            const{resetPassword} = payload;
            state.resetPassword={resetPassword};
            
            state.loading = false;
            state.success = true //registered
            console.log("succes login",state.userInfo);
        },
        [NewPassword.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        }





    }

})

export const selectCurrentUsers = (state) => state.User;
export default UserSlice.reducer;