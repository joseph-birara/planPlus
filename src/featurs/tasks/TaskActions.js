import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../GlobalVariabls/constant";

export const GetAllTasks = createAsyncThunk(
  "tasks/alltasks",
  async ({token} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks`,{
         headers: {
          'content-type': 'text/json',
           token:token
    }
      });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const CreateTask = createAsyncThunk(
  "tasks/createTasks",
  async ({id,user,title,note,dateTime,duration,catagory,priority,reminder,status} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.post(`${constants}/tasks`,{id,user,title,note,dateTime,duration,catagory,priority,reminder,status});
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const DeleteTask = createAsyncThunk(
  "tasks/delettask",
  async ({id} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks/delete${id}`);
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateStatus = createAsyncThunk(
  "tasks/update",
  async ({id,status} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.patch(`${constants}/tasks/updateStatus${id}`,status);
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateData = createAsyncThunk(
  "tasks/edit",
  async ({id} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks/update${id}`);
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const EditTask = createAsyncThunk(
  "tasks/edit",
  async ({id} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks/edit${id}`);
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);

