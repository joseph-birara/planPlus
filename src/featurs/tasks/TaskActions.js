import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import constants from "../../GlobalVariabls/constant";

export const GetAllTasks = createAsyncThunk(
  "tasks/alltasks",
  async ({ userToken }, { rejectWithValue }) => {
    console.log("aqw",userToken)
    try {
      const resp = await axios.get(`${constants}/tasks`,{
         headers: {
          'content-type': 'text/json',
           "authorization":`Bearer ${userToken}`
    }
      });
      console.log("get all tasks action",resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const CreateTask = createAsyncThunk(
  "tasks/createTasks",
  async ({title,note,dateTime,duration,category,priority,reminder,status,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.post(`${constants}/tasks/create`, {title, note, dateTime, duration, category, priority, reminder, status }, {
        headers: {
          'content-type': 'text/json',
          "authorization": `Bearer ${userToken}`
        }
      });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const DeleteTask = createAsyncThunk(
  "tasks/DeleteTask",
  async ({_id,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${constants}/tasks/delete`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        _id:_id
      },
    });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateStatus = createAsyncThunk(
  "tasks/update",
  async ({ _id, status, userToken }, { rejectWithValue }) => {
    console.log("from action ",_id,status);
    try {
      const resp = await axios.patch(`${constants}/tasks/updateStatus`,{
        _id: _id,
        status:status
      },
        
         {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });
      console.log(resp,"from action update ");
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateData = createAsyncThunk(
  "tasks/edit",
  async ({_id,user,title,note,dateTime,duration,category,priority,reminder,status,reminderStatus,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.put(`${constants}/tasks/update`,{_id,user,title,note,dateTime,duration,category,priority,reminder,status,reminderStatus},{
        headers: {
          'content-type': 'text/json',
          "authorization": `Bearer ${userToken}`
        }
      });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const EditTask = createAsyncThunk(
  "tasks/edit",
  async ({_id,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.get(`${constants}/tasks/edit`,{_id},{
        headers: {
          'content-type': 'text/json',
          "authorization": `Bearer ${userToken}`
        }
      });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateSubTaskStatus = createAsyncThunk(
  "tasks/update",
  async ({_id,status,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.patch(`${constants}/subTasks/updateStatus`,{
        _id: _id,
        status:status
      },
        
         {
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
//delete subtask

export const DeleteSubTask = createAsyncThunk(
  "subTask/DeleteSubTask",
  async ({_id,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${constants}/subTasks/delete`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        _id:_id
      },
    });
      console.log(resp);
      return resp;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);

