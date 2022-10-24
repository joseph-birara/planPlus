import { createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import {
    RegisterUser,
    Login,
    ResetNewPassword,
    EmailForCode,
    SendCode

} from "./UserActions";


const initialState = {
    userInfo:{},
    userToken: "",
    error:'',
    loading:false,
    success:false,
    resetPasswordToken: '',
    emailForReset: '',
    codeForReset: '',
    RequestMessageForLogIn: '',
    RequestMessageForRegister:''
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
            state.RequestMessageForRegister=''
            console.log("registration succes",state.userInfo,state.success);
                
        },
        [RegisterUser.rejected]:(state,{payload})=>{
            state.loading = false;
            state.RequestMessageForRegister = "registration failed , try again";
            console.log(payload);
            
    
        },
        //login user
        [Login.pending]:(state) =>{
            state.loading = true;
            state.error = null
            console.log("log in loading ....");
        },
        [Login.fulfilled]:(state,{payload}) =>{
            
            
            state.userInfo=payload.data.email;
            state.userToken=payload.data.Token
            console.log(payload,'py');
            state.loading = false;
            state.RequestMessageForLogIn =''
            state.success = true //registered
            console.log("token from login slice =", state.userToken);
            
        },
        [Login.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.RequestMessageForLogIn = "log in rejected, try again"
            console.log("log in rejected =", payload);
        },
        //email for reset user password
        [EmailForCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
            console.log("sent email loading .....");
        },
        [EmailForCode.fulfilled]:(state,{payload}) =>{
            
            
            state.emailForReset=payload.data.email;
            
            state.loading = false;
            state.success = true 
            
            console.log("sent email slice paylode",payload.data.email);
        },
        [EmailForCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
            console.log("sent email rejected",payload);
        },
        //sending code to reset user password
        [SendCode.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [SendCode.fulfilled]:(state,{payload}) =>{
            
            
            state.resetPasswordToken=payload.token;
            
            state.loading = false;
            state.success = true //registered
            console.log("code recived inside slice",payload.token);
        },
        [SendCode.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        },
        //sending new password to reset user password
        [ ResetNewPassword.pending]:(state) =>{
            state.loading = true;
            state.error = null
        },
        [ResetNewPassword.fulfilled]:(state,{payload}) =>{
            
            const{resetPassword} = payload;
            state.resetPassword={resetPassword};
            
            state.loading = false;
            state.success = true //registered
            console.log("reset new password",state.userInfo);
        },
        [ResetNewPassword.rejected]:(state,{payload}) =>{
            state.loading = false;
            state.error = payload
        }





    }

})

export const selectCurrentUsers = (state) => state.User;
export default UserSlice.reducer;