
import LogIn from './featurs/user/LogIn';

import Register from './featurs/user/Register';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import InsertEmail from './featurs/user/InsertEmail';

import EnterCode from './featurs/user/EnterCode'
import NewPassword from './featurs/user/NewPassword'
import LoadingPage from './featurs/LoadingPage';
import HomePage from './featurs/tasks/HomePage';
import Task from './featurs/tasks/Task';
import SubTask from './featurs/subTasks/SubTask';
import AddTask from './featurs/tasks/AddTask';
import AddSubTask from './featurs/subTasks/AddSubTask';
import { useSelector } from 'react-redux';
import { selectCurrentUsers } from './featurs/user/userSlice';


 

function App () {
  
 
  
  
  
    const {userToken} = useSelector(selectCurrentUsers)

   
      
    
    
  
  return (
    <div className=''>
      <div className='' >
        
        
      </div>

      {/* {this.state.route === 'signin' ?
        <LogIn onRoutChange={this.onRoutChange} /> :
        
        (
          this.state.route === 'Register' ?
            <Register
             
              onRoutChange={this.onRoutChange} /> :
            <div>
              
          <Home/>
              

         
      
            </div>)} */}
      
      <BrowserRouter>
        <Routes>
           <Route path='/' element={userToken?<HomePage />:<LogIn/>} />
          

          <Route path="/entercode" element={<EnterCode/>} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/insertemail" element={<InsertEmail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/task" element={userToken?<Task />:<LogIn/>} />
          <Route path="/subtask" element={userToken?<SubTask />:<LogIn/>} />
          
          <Route path="/addtask" element={userToken?<AddTask />:<LogIn/>} />
          <Route path="/addsubtask" element={userToken?<AddSubTask/>:<LogIn/>} />


          
          

        </Routes>
      </BrowserRouter>
      
    </div>
  );
    }


export default App