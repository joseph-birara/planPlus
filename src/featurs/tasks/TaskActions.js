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
  async ({task,subTask,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.post(`${constants}/tasks/create`, {task,subTask}, {
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
      return _id;
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
      return {_id, status};
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);
export const UpdateData = createAsyncThunk(
  "tasks/UpdateData",
  async ({_id,title,note,dateTime,duration,category,priority,reminder,status,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.patch(`${constants}/tasks/update`,{_id,title,note,dateTime:new Date(dateTime).toISOString(),duration,category,priority,reminder,status},{
        
      headers: {
        Authorization: `Bearer ${userToken}`,
      }
    });
      console.log(resp);
      return {_id,title,note,dateTime,duration,category,priority,reminder,status};
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
); 

//notification actions
export const GetAllNotifications = createAsyncThunk(
  "tasks/alltasks",
  async ({ userToken }, { rejectWithValue }) => {
    console.log("aqw",userToken)
    try {
      const resp = await axios.get(`${constants}/notification`,{
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
export const DeleteNotification = createAsyncThunk(
  "tasks/DeleteTask",
  async ({_id,userToken} ,{ rejectWithValue }) => {
    try {
      const resp = await axios.delete(`${constants}/notification/delete`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        _id:_id
      },
    });
      console.log(resp);
      return _id;
    } catch (error) {
      
        return rejectWithValue(error.err);
      }
    }
  
);




//sub tasks actions 

//
//

export const UpdateSubTaskStatus = createAsyncThunk(
  "subTasks/updateStatus",
  async ({ _id, status, userToken }, { rejectWithValue }) => {
        console.log("update status subtask action");

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
  "subTask/Delete",
  async ({ _id, userToken }, { rejectWithValue }) => {
    console.log("delete subtask action");
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
//create subtask 
export const CreateSubTask = createAsyncThunk(
  "subTasks/create",
  async ({ id, title, note, dateTime, duration, priority, reminder, userToken }, { rejectWithValue }) => {
        console.log("create  subtask action");

    try {
      const resp = await axios.post(`${constants}/subTasks/create`, {id,title, note, dateTime:new Date(dateTime).toISOString(), duration,  priority, reminder}, {
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

//update subtask all parametrs


export const UpdateSubTaskData = createAsyncThunk(
  "subTasks/update",
  async ({ _id, task, title, note, dateTime, duration, priority, reminder, status, reminderStatus, userToken }, { rejectWithValue }) => {
        console.log("update sub task subtask action");

    try {
      const resp = await axios.put(`${constants}/subTasks/update`,{_id,task,title,note,dateTime:new Date(dateTime).toISOString(),duration,priority,reminder,status,reminderStatus},{
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

//get the subtask to be edited


