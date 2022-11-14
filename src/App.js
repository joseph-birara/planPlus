
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
import PageNotFound from './featurs/components/PageNotFound';
import ViewDetail from './featurs/tasks/ViewDetail';
import FilterCard from './featurs/components/FilterCard';
import SortCard from './featurs/components/SortCard';
import NotificationPage from './featurs/components/NotificationPage';
import Account from './featurs/acconts/Account';
import Themes from './featurs/acconts/Themes'
import LanguagePage from './featurs/acconts/LanguagePage';
import PrivacyPolicyPage from './featurs/acconts/PrivacyPolicyPage';
import ProfilePage from './featurs/acconts/ProfilePage';
import TermsOfUsePage from './featurs/acconts/TermsOfUsePage';
import DeleteAccount from './featurs/acconts/DeleteAccount';
import SignOutPage from './featurs/acconts/SignOutPage';
import Editask from './featurs/tasks/Editask';
import EditSubTask from './featurs/subTasks/EditSubTask';


 

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
          <Route path="/addsubtask" element={userToken ? <AddSubTask /> : <LogIn />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/viewtask' element={<ViewDetail />} />
          <Route path='/filter' element={<FilterCard />} />
          <Route path='/sort' element={<SortCard />} />
          <Route path='/notify' element={<NotificationPage />} />
          <Route path='/account' element={<Account />} />
          <Route path='/theme' element={<Themes />} />
          <Route path='/language' element={<LanguagePage />} />
          <Route path='/policy' element={<PrivacyPolicyPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/terms' element={<TermsOfUsePage />} />
          <Route path='/deleteAccount' element={<DeleteAccount />} />
          <Route path='/logout' element={<SignOutPage />} />
          <Route path='/editTask' element={<Editask />} />
          <Route path='/editSubtask' element={<EditSubTask />} />
          


          
          

          
          









          


          
          

        </Routes>
      </BrowserRouter>
      
    </div>
  );
    }


export default App