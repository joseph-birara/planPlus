import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../GlobalVariabls/constant";

export const GetAllTasks = createAsyncThunk(
  "tasks/alltasks",
  async ({token} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks`);
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);