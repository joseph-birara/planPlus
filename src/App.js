
import LogIn from './featurs/user/LogIn';

import Register from './featurs/user/Register';
import React from 'react';
import Home from './featurs/user/Home';
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
import SubTask from './featurs/tasks/SubTask';
import Calculatore from './featurs/tasks/Calculatore';


 

class App extends React.Component {
  constructor() {
    super()
  
    this.state = {
      
      route: 'signin',
      logedIn: false,
      
    }
  }
 
  
  
  onRoutChange = (rout) => {
    if (rout === 'Home') {
      this.setState({ logedIn: true })
      
    }
    

    this.setState({route:rout})
  }
  render() {
    
    
  
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
           <Route path='/' element={<HomePage />} />
          

          <Route path="/entercode" element={<EnterCode/>} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/insertemail" element={<InsertEmail />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/loading" element={<LoadingPage />} />
          <Route path="/task" element={<Task />} />
          <Route path="/subtask" element={<SubTask />} />
                    {/* <Route path="/cal" element={<Calculatore />} /> */}


          
          

        </Routes>
      </BrowserRouter>
      
    </div>
  );
    }
}

export default App