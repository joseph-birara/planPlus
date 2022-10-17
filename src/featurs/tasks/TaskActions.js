import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../GlobalVariabls/constant";

export const GetAllTasks = createAsyncThunk(
  "user/RegisterUser",
  async ( { rejectWithValue }) => {
    try {
      const resp = await axios.post('http://localhost:3004/Task');
      console.log(resp.data);
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