
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../GlobalVariabls/constant";
import { useNavigate } from "react-router-dom";


export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await axios.post(`${constants}/auth/register`, { email, password });
      console.log(resp, "this is from acction");
      // const navigate = useNavigate()
      // if (resp.data.email) {
      //   navigate('/')
      // }
      return resp.data;
    } catch (error) {
      if (error.response && error.response.data.err) {
        return rejectWithValue (error.response.data.err);
      } else {
        return rejectWithValue(error.err);
      }
    }
  }
);

export const Login = createAsyncThunk(
  "user/Login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      //post req to check credentials
      const resp = await axios.post(`${constants}/auth/login`, { email, password });
      console.log(resp.data.Token);

      return resp.data;
    } catch (error) {
      console.log(error.response.data.err);
      if (error.response && error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.err);
      }
    }
  }
);

export const EmailForCode = createAsyncThunk(
  "user/EmailForCode",
  async ({ email}, { rejectWithValue }) => {
    try {
      //post req to check credentials
      const resp = await axios.post(`${constants}/auth/forgetPassword`, { email});
      console.log(resp.data);

      return resp;
    } catch (error) {
      console.log(error.response.data.err);
      if (error.response && error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.err);
      }
    }
  }
);
export const SendCode = createAsyncThunk(
  "user/SendCode",
  async ({ code,email }, { rejectWithValue }) => {
    try {
      //post req to check credentials
      const resp = await axios.post(`${constants}/auth/verifyCode`, { code,email });
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.log(error.response.data.err);
      if (error.response && error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.err);
      }
    }
  }
);
export const ResetNewPassword = createAsyncThunk(
  "user/resetPass",
  async ({  password,email,token }, { rejectWithValue }) => {
    try {
      //post req to check credentials
      const resp = await axios.patch(`${constants}/auth/newPassword`, {  password ,email,token});
      console.log(resp.data);

      return resp.data;
    } catch (error) {
      console.log(error.response.data.err);
      if (error.response && error.response.data.err) {
        return rejectWithValue(error.response.data.err);
      } else {
        return rejectWithValue(error.err);
      }
    }
  }
);