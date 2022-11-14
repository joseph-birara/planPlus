import { createSlice } from "@reduxjs/toolkit";
import {
    GetAllTasks,
    CreateTask,
    DeleteTask,
    UpdateStatus,
    UpdateData,
    EditTask,
    UpdateSubTaskStatus,
    DeleteSubTask,
    CreateSubTask,
    GetAllNotifications,
    DeleteNotification,

} from "./TaskActions";
const initialState = {
    allTasks: '',
    loading:false,
    success:false,
    error: null,
    taskeCreated: '',
    taskStatusUpdated: '',
    subTaskAdded: '',
    SubTaskUpdated: '',
    taskDeleteNote: '',
    subTaskDeleteNote: '',
    taskEdited: '',
    subTaskEdited: '',
    notifications:'',
    
    
}
const TasksSlice = createSlice({
    name: 'Task',
    initialState,
    reducers: {
        empity: (state) => {
             state.taskeCreated=''
        },
        taskEditMessage: (state) => {
            state.taskEdited=''
        },
        subTaskEditMessage: (state) => {
            state.subTaskEdited=''
        },
        subTaskcreateMessage: (state) => {
            state.subTaskAdded=''
        },
        sortingBypriority: (state) => {
            // if (state.allTasks && state.allTasks.length > 0) {
            //     console.log(state,"before sorting");
            //   return state.allTasks.sort((a, b) => a.priority[0] - b.priority[0]);
                

            // }
        }


    },
    extraReducers: {
        //notification 
        // get
        [GetAllNotifications.pending]:(state)=>{
            state.loading = true;
             console.log("from notifications slice loading");
    
        },
        [GetAllNotifications.fulfilled]:(state,{payload})=>{
            
            state.notifications=payload.data.notification
            
            state.loading = false;
            state.success = true;
            console.log("from notifications slice accepted");
            console.log(payload.data
            )
            console.log("from tasks slice accepted");
                
        },
        [GetAllNotifications.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("from notificationsslice rejected");
            console.log("this is the payload",payload);
    
        },
        [DeleteNotification.pending]:(state)=>{
            state.loading = true;
             console.log("delete loading from tasks slice loading");
    
        },
        [DeleteNotification.fulfilled]:(state,action)=>{
            
            
            
            state.loading = false;
            state.success = true;
            console.log("delete from notification slice accepted");
            
            
                
        },
        [DeleteNotification.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("delete from notification slice rejected");
            console.log(payload);
    
        },
        //get all tasks
        [GetAllTasks.pending]:(state)=>{
            state.loading = true;
             console.log("from notification slice loading");
    
        },
        [GetAllTasks.fulfilled]:(state,{payload})=>{
            
            state.allTasks=payload.data.tasks
            
            state.loading = false;
            state.success = true;
            console.log("from tasks slice accepted");
            console.log(payload.data.tasks
            )
            console.log("from tasks slice accepted");
                
        },
        [GetAllTasks.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("from tasks slice rejected");
            console.log("this is the payload",payload);
    
        },
        [CreateTask.pending]:(state)=>{
            state.loading = true;
            state.taskeCreated=''
    
        },
        [CreateTask.fulfilled]:(state,{payload})=>{
            state.tasks = payload;
            state.taskeCreated="task crated successfully"
            state.loading = false;
            state.success = true;
            console.log("from tasks slice");
            console.log(payload)
            
        },
        [CreateTask.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log(payload);
            state.taskeCreated="adding task rejected try agin"
    
        },
        //delet task by id
        [DeleteTask.pending]:(state)=>{
            state.loading = true;
             console.log("delete loading from tasks slice loading");
    
        },
        [DeleteTask.fulfilled]:(state,action)=>{
            
            const  _id =action.payload
            
            state.loading = false;
            state.success = true;
            console.log("delete from tasks slice accepted");
            
            state.allTasks.filter((task) => task._id !== _id);
            
                
        },
        [DeleteTask.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("delete from tasks slice rejected");
            console.log(payload);
    
        },
        //update status of a task by id
        [UpdateStatus.pending]:(state)=>{
            state.loading = true;
            console.log("UpdateStatus loading from tasks slice loading");
            
    
        },
        [UpdateStatus.fulfilled]:(state,action)=>{
            
            
            // const {_id,status} =action.payload
            
            // state.map((task) => task._id === _id && (task.status = status))
            
                
        },
        [UpdateStatus.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("update status from tasks slice rejected");
            console.log(payload);
    
        },
        //UpdateData  of a task by id to get information to be edited
        [UpdateData.pending]:(state)=>{
            state.loading = true;
            console.log("UpdateData loading from tasks slice loading");
            state.taskEdited=''
    
        },
        [UpdateData.fulfilled]:(state,{payload})=>{
            
            
            
            state.loading = false;
            state.success = true;
            console.log("UpdateData from tasks slice accepted");
            console.log(payload.data)
            state.taskEdited="task edited successfully"
            
                
        },
        [UpdateData.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("UpdateData from tasks slice rejected");
            console.log(payload);
            state.taskEdited="task editing rejected"
    
        },
        
        //update status of a subtask by id
        [UpdateSubTaskStatus.pending]:(state)=>{
            state.loading = true;
             console.log("UpdateSubTaskStatus loading from tasks slice loading");
    
        },
        [UpdateSubTaskStatus.fulfilled]:(state,{payload})=>{
            
            
            
            state.loading = false;
            state.success = true;
            console.log("UpdateSubTaskStatus  from tasks slice accepted");
            console.log(payload.data)
            
                
        },
        [UpdateSubTaskStatus.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("UpdateSubTaskStatus  from tasks slice rejected");
            console.log(payload);
    
            },
        //delet sub task by id
        [DeleteSubTask.pending]:(state)=>{
            state.loading = true;
             console.log("delete loading from tasks slice loading");
    
        },
        [DeleteSubTask.fulfilled]:(state,{payload})=>{
            
            
            
            state.loading = false;
            state.success = true;
            console.log("delete from tasks slice accepted");
            console.log(payload.data)
            
                
        },
        [DeleteSubTask.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log("delete from tasks slice rejected");
            console.log(payload);
    
        },

        // create subtask
        [CreateSubTask.pending]:(state)=>{
            state.loading = true;
            console.log("crating subtask.....");
            state.subTaskAdded = ''
    
        },
        [CreateSubTask.fulfilled]:(state,{payload})=>{
            state.tasks = payload;
            
            state.loading = false;
            state.success = true;
            console.log("from subtasks slice created successfully");
            console.log(payload)
            state.subTaskAdded="sub task successfully added"
                
        },
        [CreateSubTask.rejected]:(state,{payload})=>{
            state.loading = false;
            state.error = payload;
            console.log(payload);
            console.log("from subtasks slice rejected");
            state.subTaskAdded="sub task rejected"

    
        },



    }
})


export const selectCurrentTasks = state => state.Task
export const {empity,taskEditMessage,subTaskEditMessage,subTaskcreateMessage,sortingBypriority} =TasksSlice.actions
export default TasksSlice.reducer